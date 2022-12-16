import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Fragment, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { tokens } from "../utils/tokens";
import { Dialog, Listbox, Transition } from "@headlessui/react";

const token1 = tokens;
const token2 = tokens;

export default function swap() {
  const [expand, setExpand] = useState(false);
  const [selectedToken1, setSelectedToken1] = useState(token1[0]);
  const [selectedToken2, setSelectedToken2] = useState(token2[0]);

  return (
    <div
      className={`w-screen min-h-screen no-repeat bg-cover bg-[#03071E]
        ${!expand ? `bg-[url('../assets/landing.png')]` : `bg-[#03071E]`}
          `}
    >
      <Navbar expand={expand} setExpand={setExpand} />
      {expand ? null : (
        <div className=" w-full flex justify-center items-center px-2">
          <div className=" max-w-xl rounded-md mx-auto lg:mx-auto font-fredoka text-white px-0 py-0 bg-[#03071e68] opacity-100 backdrop-blur-lg flex flex-col items-center justify-center mt-32 md:mt-12 xl:mt-32 2xl:mt-40 mb-32 ">
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
                  className="bg-gray-50 border  lg:w-full w-44 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  required
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
                    <Listbox.Button className="relative  cursor-default rounded-md w-36 lg:w-36 px-4 py-2.5 bg-gray-700 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
                  className="mt-2  bg-gray-50 border lg:w-full w-44 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  required
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
                    <Listbox.Button className="relative cursor-default rounded-md w-36 lg:w-36 px-4 py-2.5 bg-gray-700 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{selectedToken2.symbol}</span>
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
                                    selectedToken2 ? "font-medium" : "font-normal"
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
                  className="text-white w-full bg-blue-700 text-md font-fredoka hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
