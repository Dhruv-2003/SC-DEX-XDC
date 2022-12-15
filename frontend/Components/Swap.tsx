import React from "react";
import { Button, NumberInput, Select, TextInput } from "@mantine/core";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import {tokens} from '../utils/tokens'

const people = [
  { name: "ETH"},
  { name: "BTC" },
  { name: "LTC" },
  { name: "XDC" },
  { name: "MATIC" },
  { name: "DOT" },
];

console.log(tokens)

const Swap = (): JSX.Element => {
  const [selected, setSelected] = useState(people[0]);
  return (
    <>
      {/* <div className="font-fredoka text-white bg-[#03071E] border-y-2 flex flex-col items-center justify-center mt-32 md:mt-12 xl:mt-32 2xl:mt-40 mb-32">
        <h1 className="pb-8 pt-2 text-2xl">Swap</h1>
        <div className="px-5 py-5 bg-white rounded flex items-center justify-between">
          <input className="text-black w-10/12 outline-none text-4xl" />
          <button className="text-black border-2 border-black rounded-md px-8 py-2 text-xl hover:bg-[#03071E] hover:text-white">
            ETH
          </button>
        </div>
        <div className="px-5 py-5 bg-white rounded flex items-center justify-between mt-10">
          <input className="text-black w-10/12 outline-none text-4xl" />
          <button className="text-black border-2 border-black rounded-md px-8 py-2 text-xl hover:bg-[#03071E] hover:text-white">
            XDC
          </button>
        </div>
        <button className="mt-10 mb-5 border-2 py-2 px-4 text-xl hover:bg-white hover:text-black">
          Swap
        </button>
      </div> */}

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
                      {people.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative  curson-pointer select-none py-2 px-2 lg:px-6 ${
                              active
                                ? "bg-gray-100 text-gray-900 "
                                : "text-white"
                            }`
                          }
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium " : "font-normal"
                                }`}
                              >
                                {person.name}
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
              className="text-white mt-2 bg-blue-700 text-md font-fredoka hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Select Token
            </button> */}
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
                      {people.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative  curson-pointer select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-white"
                            }`
                          }
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium " : "font-normal"
                                }`}
                              >
                                {person.name}
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
