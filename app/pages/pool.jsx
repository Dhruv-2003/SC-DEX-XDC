import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Fragment, useState, useEffect } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import styles from "../styles/Home.module.css";
import { tokens } from "../utils/tokens";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { Contract, ethers } from "ethers";
import {
  SWAP_ROUTER_ADDRESS,
  SWAP_ROUTER_ABI,
  Token_ABI,
  WXDC_ADDRESS,
} from "../Constants/index.js";

const token1 = tokens;
const token2 = tokens;

export default function Pool() {
  const [expand, setExpand] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [selectedToken1, setSelectedToken1] = useState(token1[0]);
  const [selectedToken2, setSelectedToken2] = useState(token2[0]);

  const newPool = () => {
    setToggle(!toggle);
  };

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([...tokens]);
  const [desiredAmountA, setDesiredAmountA] = useState(0);
  const [desiredAmountB, setDesiredAmountB] = useState(0);
  const [liquidity, setLiquidity] = useState();
  const [amounts, setAmounts] = useState([]);

  const [reserveA, setReserveA] = useState(0);
  const [reserveB, setReserveB] = useState(0);

  // Creating some global variables to use in the upcoming liquidity functions
  const { address } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const contract = useContract({
    address: SWAP_ROUTER_ADDRESS,
    abi: SWAP_ROUTER_ABI,
    signerOrProvider: signer || provider,
  });

  const connectedWalletAddress = address;
  // const addressTokenA = TOKEN_ONE_ADDRESS;
  // const addressTokenB = TOKEN_TWO_ADDRESS;
  const _deadline = 0;
  const _amountAMin = 1;
  const _amountBMin = 1;

  function handleChange(event) {
    setDesiredAmountA(parseInt(event.target.value));
    setDesiredAmountB(parseInt(event.target.value));
  }

  const getDeadline = () => {
    const _deadline = Math.floor(Date.now() / 1000);
    console.log(_deadline);
    return _deadline;
  };

  useEffect(() => {
    getDeadline();
  }, []);

  const addLiquidity = async (valueOne, valueTwo) => {
    try {
      if (
        addressTokenA &&
        addressTokenB &&
        valueOne &&
        valueTwo &&
        _amountAMin &&
        _amountBMin &&
        connectedWalletAddress &&
        _deadline
      ) {
        const _addLiquidity = await contract.addLiquidity(
          addressTokenA,
          addressTokenB,
          valueOne,
          valueTwo,
          _amountAMin,
          _amountBMin,
          connectedWalletAddress,
          _deadline // current time + 10 mins
        );
        setLoading(true);
        await _addLiquidity.wait();
        setLoading(false);
      } else {
        alert("INPUT DUMBASS!!!");
      }
    } catch (err) {
      // alert shall be changed to toast.error(err.reason) once kushagra adds it
      alert(err.reason);
      console.error(err);
    }
  };

  // ask dhruv about the parameters here
  const addLiquidityEth = async (val) => {
    try {
      const _amount = ethers.utils.parseEther("0.1");
      const _addLiquidity = await contract.addLiquidityEth(
        addressTokenA,
        val,
        0,
        0,
        connectedWalletAddress,
        _deadline,
        {
          value: _amount,
        }
      );
    } catch (err) {
      console.error(err);
      alert(err.reason);
    }
  };

  const returnLiquidity = async () => {
    const _liquidity = await contract.getLiquidityAmount(
      connectedWalletAddress,
      addressTokenA,
      addressTokenB
    );
    setLiquidity(_liquidity);
  };

  // might need to take an input here
  const removeLiquidity = async () => {
    try {
      if (
        addressTokenA &&
        addressTokenB &&
        liquidity &&
        _amountAMin &&
        _amountBMin &&
        connectedWalletAddress &&
        _deadline
      ) {
        const _removeLiquidity = await contract.removeLiquidity(
          addressTokenA,
          addressTokenB,
          liquidity,
          _amountAMin,
          _amountBMin,
          connectedWalletAddress,
          _deadline
        );
        setLoading(true);
        await _removeLiquidity.wait();
        setLoading(false);
        // toast.success("Liquidity removed");
      }
    } catch (err) {
      alert(err.reason);
      console.error(err);
    }
  };

  // ask dhruv about parameters
  const removeLiquidityEth = async (val) => {
    try {
      if (liquidity) {
        const _removeLiquidity = await contract.removeLiquidityETH(
          addressTokenA,
          liquidity,
          val,
          0,
          connectedWalletAddress,
          _deadline
        );
        setLoading(true);
        await _removeLiquidity.wait();
        setLoading(false);
        // toast.success()
      }
    } catch (err) {
      alert(err.reason);
      console.error(err);
    }
  };

  /// As Soon as user selects both the tokens , call getReserve
  const getReserves = async (tokenA, tokenB) => {
    const response = await contract.getReserve(tokenA, tokenB);
    setReserveA(ethers.utils.formatEther(response.reserveA));
    setReserveB(ethers.utils.formatEther(response.reserveB));
    console.log(
      ethers.utils.formatEther(response.reserveA),
      ethers.utils.formatEther(response.reserveB)
    );
    // setOutAmount(_getAmount);
  };

  // 3 params on this one
  const quoteB = async (amountA, reserveA, reserveB) => {
    try {
      if (amountA) {
        const _fetchQuote = await contract.quote(
          ethers.utils.parseEther(amountA.toString()),
          ethers.utils.parseEther(reserveA.toString()),
          ethers.utils.parseEther(reserveB.toString())
        );
        console.log(ethers.utils.formatEther(_fetchQuote));
        // setQuote(_fetchQuote);
        setDesiredAmountB(ethers.utils.formatEther(_fetchQuote));
      }
    } catch (err) {
      // toast.error(err.reason);
      console.error(err);
    }
  };

  const quoteA = async (amountB, reserveA, reserveB) => {
    try {
      if (amountB) {
        const _fetchQuote = await contract.quote(
          ethers.utils.parseEther(amountB.toString()),
          ethers.utils.parseEther(reserveA.toString()),
          ethers.utils.parseEther(reserveB.toString())
        );
        console.log(ethers.utils.formatEther(_fetchQuote));
        // setQuote(_fetchQuote);
        setDesiredAmountA(ethers.utils.formatEther(_fetchQuote));
      }
    } catch (err) {
      // toast.error(err.reason);
      console.error(err);
    }
  };

  /// fetched reserves when both tokens are set
  useEffect(() => {
    if (
      selectedToken1 != 0 &&
      selectedToken2 != 0 &&
      selectedToken1 != selectedToken2
    ) {
      getReserves(selectedToken1.address, selectedToken2.address);
    }
  }, [selectedToken1, selectedToken2]);

  return (
    <div
      className={`w-screen min-h-screen no-repeat bg-cover bg-[#03071E]
        ${
          !expand
            ? `${styles.bg2} bg-[url('../assets/landing.png')]`
            : `bg-[#03071E]`
        }
          `}
    >
      <Navbar expand={expand} setExpand={setExpand} />
      {expand ? null : (
        <div className=" w-full mt-10 flex flex-col justify-center items-center px-2">
          <div className="w-full flex justify-around">
            <h1 className=" text-gray-100 text-3xl font-semibold">Pools</h1>
            <button
              onClick={newPool}
              className="active:scale-95 bg-[#fc6f38] px-3 py-2 text-sm font-semibold rounded-md"
            >
              + New Pool
            </button>
          </div>
          <div
            className={`${
              toggle ? `visible` : `hidden`
            } mt-8 lg:w-7/12 border rounded-lg border-gray-500 px-4 py-6 bg-transparent backdrop-blur-xl`}
          >
            <span className=" text-gray-100 text-lg font-semibold">
              Select Pair
            </span>
            <div className="lg:w-5/12 flex items-center justify-start ">
              {/* token1 */}
              <div className="">
                <Listbox value={selectedToken1} onChange={setSelectedToken1}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative  cursor-default rounded-md w-36 lg:w-36 px-4 py-2.5 bg-gray-800 text-white pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">
                        {selectedToken1.symbol}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-200"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100 "
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full z-[100] overflow-auto rounded-md  bg-transparent backdrop-blur-xl py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {tokens.map((token, tokenId) => (
                          <Listbox.Option
                            key={tokenId}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-100"
                              }`
                            }
                            value={token}
                          >
                            {({ selectedToken1 }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selectedToken1
                                      ? "font-medium"
                                      : "font-normal"
                                  }`}
                                >
                                  {token.symbol}
                                </span>
                                {selectedToken1 ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon
                                      className="h-5 w-5 text-gray-900"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>

              {/* token2 */}
              <div className="ml-4 lg:ml-7">
                <Listbox value={selectedToken2} onChange={setSelectedToken2}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative cursor-default rounded-md w-36 lg:w-36 px-4 py-2.5 bg-gray-800 text-white pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">
                        {selectedToken2.symbol}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-200"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md  bg-transparent backdrop-blur-xl py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {tokens.map((token, tokenId) => (
                          <Listbox.Option
                            key={tokenId}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-100"
                              }`
                            }
                            value={token}
                          >
                            {({ selectedToken2 }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selectedToken2
                                      ? "font-medium"
                                      : "font-normal"
                                  }`}
                                >
                                  {token.symbol}
                                </span>
                                {selectedToken2 ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon
                                      className="h-5 w-5 text-gray-900"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
            {/* <div class="mt-4 relative pt-1 flex flex-col">
              <label for="customRange3" className=" text-white">
                0.05 % fee tier
              </label>
              <input
                type="range"
                className="mt-3 lg:w-full h-2 bg-orange-500 rounded-lg appearance-none cursor-pointer form-range p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
                min="0"
                max="3"
                step="1"
                id="customRange3"
              />
            </div> */}
            <div class="mt-4 relative pt-1 flex flex-col">
              <span className=" text-gray-100 text-lg font-semibold">
                Deposit Amounts
              </span>

              <input
                type="number"
                id=""
                className="mt-3 bg-gray-800 text-white border  lg:w-full border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="token 1"
                required
                value={desiredAmountA}
                onChange={(e) => {
                  setDesiredAmountA(e.target.value);
                  quoteB(e.target.value, reserveA, reserveB);
                }}
              />

              <input
                type="number"
                id=""
                className="mt-3 bg-gray-800 text-white border  lg:w-full border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="token 2"
                required
                value={desiredAmountB}
                onChange={(e) => {
                  setDesiredAmountB(e.target.value);
                  quoteA(e.target.value, reserveA, reserveB);
                }}
              />
            </div>
            <button
              type="button"
              className="text-white w-full mt-6 bg-orange-600 text-md font-fredoka active:bg-orange-700 font-medium rounded-sm px-5 py-2.5 mr-2 mb-2"
            >
              Create Pool
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
