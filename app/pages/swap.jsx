import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Fragment, useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { tokens } from "../utils/tokens";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import styles from "../styles/Home.module.css";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";
import { SWAP_ROUTER_ADDRESS, SWAP_ROUTER_ABI } from "../Constants/index.js";

const token1 = tokens;
const token2 = tokens;

export default function Swap() {
  const [expand, setExpand] = useState(false);
  const [selectedToken1, setSelectedToken1] = useState(token1[0]);
  const [selectedToken2, setSelectedToken2] = useState(token2[0]);

  const { address, isConnected } = useAccount();
  console.log(address);
  const provider = useProvider();
  const { data: signer } = useSigner();

  const contract = useContract({
    address: SWAP_ROUTER_ADDRESS,
    abi: SWAP_ROUTER_ABI,
    signerOrProvider: signer || provider,
  });

  const [reserveA, setReserveA] = useState(0);
  const [reserveB, setReserveB] = useState(0);
  const [amountOne, setAmountOne] = useState(0);
  const [amountTwo, setAmountTwo] = useState(0);
  const [exactAmountIn, setExactAmountIn] = useState(false);
  const [exactAmountOut, setExactAmountOut] = useState(false);
  const [amountOut, setAmountOut] = useState(0);
  const [amountIn, setAmountIn] = useState(0);
  const [inputAmount, setInputAmount] = useState(1);

  // function checkIfAmountSet() {
  //   if (amountOne > 0) {
  //     setExactAmountIn(true);
  //   } else if (amountTwo > 0) {
  //     setExactAmountOut(true);
  //   }
  // }

  function handleInput(event) {
    setInputAmount(+event.target.value);
  }

  // ask dhruv about the params
  const swap = async () => {
    try {
      if (amounts && path) {
        const _swap = await contract._swap(
          amounts,
          path,
          connectedWalletAddress
        );
        setLoading(true);
        await _swap.wait();
        setLoading(false);
        // toast.success("")
      }
    } catch (err) {
      // toast.error(err.reason)
      console.error(err);
    }
  };

  const handleSwapSubmit = () => {
    try {
      if (exactAmountIn) {
        swapExactAmountOfTokens(amountOne);
      } else if (exactAmountOut) {
        swapTokensForExactAmount(amountTwo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ask dhruv about params
  const swapExactAmountOfTokens = async (valueIn) => {
    try {
      if (valueIn) {
        const path = [`${selectedToken1}`, `${selectedToken1}`];
        const _swapExactTokens = await contract.swapExactTokensForTokens(
          ethers.utils.parseEther(valueIn.toString()),
          1,
          path,
          connectedWalletAddress,
          _deadline
        );
        setLoading(true);
        await _swapExactTokens.wait();
        setLoading(false);
        // taost.success("swapped");
      }
    } catch (err) {
      // toast.err(err.reason)
      console.error(err);
    }
  };

  const swapTokensForExactAmount = async (valueOut) => {
    try {
      if (valueOut) {
        const _swapTokens = await contract.swapTokensForExactTokens(
          valueOut,
          0,
          path,
          connectedWalletAddress,
          _deadline
        );
        setLoading(true);
        await _swapTokens.wait();
        setLoading(false);
        // taost.success("SWAPPED!!!");
      }
    } catch (err) {
      // taost.error("err.reason")
      console.error(err);
    }
  };
  // payable func
  const swapExactAmountOfEthForTokens = async (valueOut) => {
    try {
      if (valueOut) {
        const _amount = ethers.utils.parseEther("0.1");
        const _swapEth = await contract.swapExactETHForTokens(
          valueOut,
          path,
          connectedWalletAddress,
          _deadline,
          {
            value: _amount,
          }
        );
        setLoading(true);
        await _swapEth.wait();
        setLoading(false);
        // toast.success();
      }
    } catch (err) {
      // taost.error(err.reason);
      console.error(err);
    }
  };

  const swapEthForExactAmountOfTokens = async (valueOut) => {
    try {
      if (valueOut) {
        const _amount = ethers.utils.parseEther("0.01");
        const _swapTokens = await contract.swapETHForExactTokens(
          valueOut,
          path,
          connectedWalletAddress,
          _deadline,
          { value: _amount }
        );
        setLoading(true);
        await _swapTokens.wait();
        setLoading(false);
        // toast.success();
      }
    } catch (err) {
      // toast.error(err.reason);
      console.error(err.reason);
    }
  };

  const swapTokensForExactAmountOfEth = async (valueOut) => {
    try {
      if (valueOut) {
        const _swapTokensForEth = await contract.swapTokensForExactETH(
          valueOut,
          0,
          path,
          connectedWalletAddress,
          _deadline
        );
        setLoading(true);
        await _swapTokensForEth.wait();
        setLoading(false);
        // taost.success("");
      }
    } catch (err) {
      // toast.error(err.reason);
      console.error(err);
    }
  };

  const swapExactAmountOfTokensForEth = async (valueIn) => {
    try {
      if (valueIn) {
        const _swapTokensForEth = await contract.swapExactTokensForETH(
          valueIn,
          0,
          path,
          connectedWalletAddress,
          _deadline
        );
        setLoading(true);
        await _swapTokensForEth.wait();
        setLoading(false);
        // toast.success("asdf");
      }
    } catch (err) {
      // toast.error("")
      console.error(err);
    }
  };

  // 3 params on this one
  const quote = async () => {
    try {
      const _fetchQuote = await contract.quote(0, 0, 0);
      // setQuote(_fetchQuote);
    } catch (err) {
      // toast.error(err.reason);
      console.error(err);
    }
  };

  /// As Soon as user selects both the tokens , call getReserve
  const getReserves = async (tokenA, tokenB) => {
    const response = await contract.getReserve(tokenA, tokenB);
    console.log(response);
    setReserveA(ethers.utils.formatEther(response.reserveA));
    setReserveB(ethers.utils.formatEther(response.reserveB));
    console.log(
      ethers.utils.formatEther(response.reserveA),
      ethers.utils.formatEther(response.reserveB)
    );
    // setOutAmount(_getAmount);
  };

  /// Exact Amount in , user give 1st input
  const getAmountOut = async (amountA, reserveA, reserveB) => {
    if (amountA != 0) {
      const amountOut = await contract.getAmountOut(
        ethers.utils.parseEther(amountA.toString()),
        ethers.utils.parseEther(reserveA.toString()),
        ethers.utils.parseEther(reserveB.toString())
      );

      console.log(ethers.utils.formatEther(amountOut));
      setAmountOut(ethers.utils.formatEther(amountOut));
      setAmountTwo(ethers.utils.formatEther(amountOut).slice(0, 7));
    }
  };

  /// Exact Amount out , user give 2nd input
  const getAmountIn = async (amountB, reserveA, reserveB) => {
    if (amountB != 0) {
      const amountIn = await contract.getAmountIn(
        ethers.utils.parseEther(amountB.toString()),
        ethers.utils.parseEther(reserveA.toString()),
        ethers.utils.parseEther(reserveB.toString())
      );

      console.log(ethers.utils.formatEther(amountIn));
      setAmountIn(ethers.utils.formatEther(amountIn));
      setAmountOne(ethers.utils.formatEther(amountIn).slice(0, 7));
    }
  };

  useEffect(() => {
    getAmountOut(inputAmount, reserveA, reserveB);
    getAmountIn(inputAmount, reserveA, reserveB);
  }, []);

  // const getAmountsOut = async () => {
  //   const _getAmounts = await contract.getAmountsOut(
  //     0,
  //     path
  //   );
  //   // setAllAmounts(_getAmounts);
  // }

  // const getAmountsIn = async () => {
  //   const _getAmounts = await contract.getAmountsIn(
  //     0,
  //     path
  //   );
  //   // setInAmounts(_getAmounts);
  // }

  /// fetched reserves when both tokens are set
  useEffect(() => {
    if (
      selectedToken1 != 0 &&
      selectedToken2 != 0 &&
      selectedToken1 != selectedToken2
    ) {
      if (selectedToken1.symbol != "XDC" && selectedToken2.symbol != "XDC") {
        getReserves(selectedToken1.address, selectedToken2.address);
      }
    }
  }, [selectedToken1, selectedToken2]);

  return (
    <div
      className={`w-screen min-h-screen no-repeat bg-cover bg-[#03071E]
        ${
          !expand
            ? `${styles.bg} bg-[url('../assets/landing.png')]`
            : `bg-[#03071E]`
        }
          `}
    >
      <Navbar expand={expand} setExpand={setExpand} />
      {expand ? null : (
        <div className=" w-full flex justify-center items-center px-2">
          <div className=" lg:max-w-xl rounded-md mx-auto lg:mx-auto font-fredoka text-white px-0 py-0 bg-[#03071e68] opacity-100 backdrop-blur-lg flex flex-col items-center justify-center mt-32 md:mt-12 xl:mt-32 2xl:mt-40 mb-32 ">
            <h2 className=" rounded-t-md text-xl font-semibold tracking-wid w-full bg-[blue-700] py-4 px-4 border-b border-gray-400">
              Swap Tokens
            </h2>
            <div className=" px-4 py-8">
              <label className="" htmlFor="">
                Enter Value
              </label>
              <div className="mt-2 w-full flex items-center justify-between mb-2">
                <input
                  type="number"
                  id=""
                  className="bg-gray-50 border  lg:w-full w-32 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  required
                  value={amountOne}
                  onChange={(e) => {
                    setAmountOne(e.target.value);
                    getAmountOut(e.target.value, reserveA, reserveB);
                    setExactAmountIn(true);
                  }}
                />
                <div className="lg:w-28 w-24 "></div>
                {/* <button
                  //   onClick={openModal}
                  type="button"
                  className="text-white mt-1  bg-blue-700 text-sm hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md lg:w-48 px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Select Token
                </button> */}
                <Listbox value={selectedToken1} onChange={setSelectedToken1}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative  cursor-default rounded-md w-28 lg:w-36 px-4 py-2.5 bg-gray-700 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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

              <label className="mt-6" htmlFor="">
                Enter Value
              </label>

              <div className=" w-full flex items-center justify-between ">
                <input
                  type="number"
                  id=""
                  className="mt-2  bg-gray-50 border lg:w-full w-32 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  required
                  value={amountTwo}
                  onChange={(e) => {
                    setAmountTwo(e.target.value);
                    getAmountIn(e.target.value, reserveA, reserveB);
                    setExactAmountOut(true);
                  }}
                />
                <div className="lg:w-28 w-24 "></div>
                {/* <button
                  //   onClick={openModal}
                  type="button"
                  className="text-white mt-1  bg-blue-700 text-sm hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md lg:w-48 px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Select Token
                </button> */}
                <Listbox value={selectedToken2} onChange={setSelectedToken2}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative cursor-default rounded-md w-28 lg:w-36 px-4 py-2.5 bg-gray-700 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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

              <div className="px-2 border-t border-gray-400 pt-6 w-full mt-6 mx-auto">
                <button
                  type="button"
                  className="text-white w-full bg-orange-600 text-md font-fredoka active:bg-orange-700 font-medium rounded-sm px-5 py-2.5 mr-2 mb-2"
                >
                  Swap
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
