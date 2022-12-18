import React, { useEffect } from "react";
import { Button, NumberInput, Select, TextInput } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import {tokens} from '../utils/tokens'
import { TOKEN_ONE_ADDRESS, TOKEN_TWO_ADDRESS,
  SWAP_ROUTER_ADDRESS, SWAP_ROUTER_ABI } from "../Constants/Index";
import { Contract, ethers } from "ethers";

const Swap = (): JSX.Element => {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const contract = useContract({
    address: SWAP_ROUTER_ADDRESS,
    abi: SWAP_ROUTER_ABI,
    signerOrProvider: signer || provider
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState([...tokens]);
  const [desiredAmountA, setDesiredAmountA] = useState<number>(0);
  const [desiredAmountB, setDesiredAmountB] = useState<number>(0);
  const [liquidity, setLiquidity] = useState();
  const [amounts, setAmounts] = useState([]);
  const [path, setPath] = useState([]);

  // Creating some global variables to use in the upcoming liquidity functions
  const userAddress: any = useAccount();
  const connectedWalletAddress: any = userAddress.address;
  const addressTokenA: string = TOKEN_ONE_ADDRESS;
  const addressTokenB: string = TOKEN_TWO_ADDRESS;
  const _deadline: number = 0;
  const _amountAMin: number = 1;
  const _amountBMin: number = 1;

  function handleChange(event: any): void {
      setDesiredAmountA(parseInt(event.target.value));
      setDesiredAmountB(parseInt(event.target.value));
  }

  const getDeadline = (): number => {
    const _deadline = Math.floor(Date.now() / 1000);
    console.log(_deadline)
    return _deadline;
  }

  useEffect(() => {
    getDeadline();
  }, [])

  const addLiquidity = async (valueOne: number, valueTwo: number): Promise<void> => {
    try {
      if(addressTokenA && addressTokenB && valueOne && valueTwo && _amountAMin && _amountBMin && connectedWalletAddress && _deadline) {
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
        }
        else {
          alert("INPUT DUMBASS!!!");
        }
    }
    catch (err: any) {
      // alert shall be changed to toast.error(err.reason) once kushagra adds it
      alert(err.reason)
      console.error(err)
    }
  }

  // ask dhruv about the parameters
  const addLiquidityEth = async (val: number): Promise<void> => {
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
        value: _amount
      });
    }
    catch (err: any) 
    {
      console.error(err);
      alert(err.reason);  
    }
  }

  const returnLiquidity = async (): Promise<void> => {
    const _liquidity = await contract.getLiquidityAmount(
      connectedWalletAddress,
      addressTokenA,
      addressTokenB
    );
    setLiquidity(_liquidity);
  }

  // might need to take an input here
  const removeLiquidity = async (): Promise<void> => {
    try {
      if(addressTokenA && addressTokenB && liquidity && _amountAMin && _amountBMin &&connectedWalletAddress && _deadline) {
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
      }
    catch(err: any) {
      alert(err.reason);
      console.error(err)
    }
  }

  // ask dhruv about parameters
  const removeLiquidityEth = async (val: number): Promise<void> => {
    try {
      if(liquidity) {
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
    }
    catch (err: any) {
      alert(err.reason);
      console.error(err);
    }
  }

  // ask dhruv about the params
  const swap = async (): Promise<void> => {
    try {
      if(amounts && path) {
        const _swap = await contract._swap(
          amounts,
          path,
          connectedWalletAddress
        )
        setLoading(true);
        await _swap.wait();
        setLoading(false);
        // toast.success("")
      }
      } 
    catch (err: any) {
      // toast.error(err.reason)
      console.error(err)  
    }
  }

  // ask dhruv about params
  const swapExactAmountOfTokens = async (valueIn: number): Promise<void> => {
    try {
      if(valueIn) {
        const _swapExactTokens = await contract.swapExactTokensForTokens(
          valueIn,
          0,
          path,
          connectedWalletAddress,
          _deadline
        );
        setLoading(true);
        await _swapExactTokens.wait();
        setLoading(false);
        // taost.success("swapped");
      }
    }
    catch (err: any) {
      // toast.err(err.reason)
      console.error(err)  
    }
  }

  const swapTokensForExactAmount = async (valueOut: number): Promise<void> => {
    try {
      if(valueOut) {
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
    }
    catch (err: any) {
      // taost.error("err.reason")
      console.error(err)  
    }
  }
  // payable func
  const swapExactAmountOfEthForTokens = async (valueOut: number): Promise<void> => {
    try {
      if(valueOut) {
        const _amount = ethers.utils.parseEther("0.1");
        const _swapEth = await contract.swapExactETHForTokens(
          valueOut,
          path,
          connectedWalletAddress,
          _deadline,
          {
            value: _amount
          }
        );
        setLoading(true);
        await _swapEth.wait();
        setLoading(false);
        // toast.success();
      }
    } catch (err: any) {
      // taost.error(err.reason);
      console.error(err)
    }
  }

  const swapEthForExactAmountOfTokens = async (valueOut: number): Promise<void> => {
    try {
      if(valueOut) {
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
    }
    catch (err: any) {
      // toast.error(err.reason);
      console.error(err.reason);
    }
  }

  const swapTokensForExactAmountOfEth = async (valueOut: number): Promise<void> => {
    try {
      if(valueOut) {
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
    }
    catch (err: any) {
      // toast.error(err.reason);
      console.error(err);
    }
  }

  const swapExactAmountOfTokensForEth = async (valueIn: number): Promise<void> => {
    try {
      if(valueIn) {
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
    } 
    catch (err: any) {
      // toast.error("")
      console.error(err);  
    }
  }
  // 3 params on this one
  const quote = async (): Promise<void> => {
    try {
      const _fetchQuote: any = await contract.quote(
        0,
        0,
        0
      );
      // setQuote(_fetchQuote);
    } 
    catch (err: any) {
      // toast.error(err.reason);
      console.error(err)
    }
  }

  const getAmountOut = async (): Promise<void> => {
    const _getAmount = await contract.getAmountOut(
      0,
      0,
      0
    );
    // setOutAmount(_getAmount);
  }

  const getAmountIn = async ():Promise<void> => {
  const _getAmount = await contract.getAmountOut(
    0,
    0,
    0
  );
  // setOutAmount(_getAmount);
}

const getAmountsOut = async (): Promise<void> => {
  const _getAmounts = await contract.getAmountsOut(
    0,
    path
  );
  // setAllAmounts(_getAmounts);
}

const getAmountsIn = async (): Promise<void> => {
  const _getAmounts = await contract.getAmountsIn(
    0,
    path
  );
  // setInAmounts(_getAmounts);
}
  // this is for testing purposes
  // const testingCall = (): void => {
  //   addLiquidity(desiredAmountA, desiredAmountB);
  // }

  // useEffect(() => {
  //   returnLiquidity();
  // }, [returnLiquidity, liquidity])

  return (
    <>
      <div className=" rounded-md mx-auto lg:w-[400px] lg:mx-auto font-fredoka text-white px-0 py-0 bg-[#03071e68] opacity-100 backdrop-blur-lg flex flex-col items-center justify-center mt-32 md:mt-12 xl:mt-32 2xl:mt-40 mb-32 ">
        <h2 className=" rounded-t-md text-2xl font-bold tracking-wid w-full bg-blue-700 py-4 px-4 md:px-10">
          Swap
        </h2>
        <div className=" px-4 py-8">
          <label className="" htmlFor="">
            Enter Value
          </label>
          <div className="mt-2 w-full flex items-center justify-between mb-2">
            <input
              type="number"
              id=""
              className="bg-gray-50 border mr-8 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0"
              required
            />
            <div className="lg:w-28 w-24 ">
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1 ">
                  <Listbox.Button className="relative w-full  rounded-lg bg-gray-700 py-2.5 pl-3 cursor-pointer pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selected.name }</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
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
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full z-[1]  overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {tokens.map((token, tokenIdx) => (
                        <Listbox.Option
                          key={tokenIdx}
                          className={({ active }) =>
                            `relative  curson-pointer select-none py-2 px-2 lg:px-6 ${
                              active
                                ? "bg-gray-100 text-gray-900 "
                                : "text-white"
                            }`
                          }
                          value={token.symbol}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium " : "font-normal"
                                }`}
                              >
                                {token.symbol}
                              </span>
                              
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

          <label className="mt-6" htmlFor="">
            Enter Value
          </label>

          <div className=" w-full flex items-center justify-between ">
            <input
              type="number"
              id=""
              className="mt-2 mr-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0"
              required
            />
            <div className="lg:w-28 w-24 ">
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1 ">
                  <Listbox.Button className="relative w-full curson-pointer rounded-lg bg-gray-700  py-2.5 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
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
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full   overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {tokens.map((token, tokenIdx) => (
                        <Listbox.Option
                          key={tokenIdx}
                          className={({ active }) =>
                            `relative  curson-pointer select-none py-2 px-2 lg:px-6 ${
                              active
                                ? "bg-gray-100 text-gray-900 "
                                : "text-white"
                            }`
                          }
                          value={token.symbol}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium " : "font-normal"
                                }`}
                              >
                                {token.symbol}
                              </span>
                              
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            {/* <button
              type="button"
              className="text-white mt-4 bg-blue-700 text-md font-fredoka hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Select Token
            </button> */}
          </div>

          <div className="px-2 border-t border-gray-400 pt-6 w-full mt-6 mx-auto">
            <button
              type="button"
              className="text-white w-full bg-blue-700 text-md font-fredoka hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Swap
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Swap;
