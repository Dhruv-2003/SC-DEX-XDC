import Link from "next/link";
import React,{ useState } from "react";
import { Transition } from "@headlessui/react";
import { BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import logo from "../public/img/logo.png";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = (props: any): JSX.Element => {
  // --------- States here ------------- //
  const {expand, setExpand} = props
  return (
    <nav className="max-w-full flex justify-between items-center px-6 py-8 lg:flex lg:justify-around lg:px-0 font-plus relative lg:items-center text-white">
      {!expand ? (
        <a
          href="#"
          className="self-center ml-2 lg:hidden"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <BiMenu className="text-5xl" />
        </a>
      ) : (
        <a
          href="#"
          className="self-center text-center lg:hidden fixed left-[80%] z-50 rounded-full ml-3 border-2 px-2 py-2"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <MdClose className="text-4xl text-white" />
        </a>
      )}
      <div className="flex justify-between w-[200px] -order-1 lg:w-72">
        <div className="flex items-start justify-start space-x-2 w-auto cursor-pointer">
          <Link
            href="/"
          >
            {!expand ? <Image width={100} src={logo} alt="logo" /> : null }
          </Link>
        </div>
      </div>
      <ul className="hidden lg:flex justify-around items-center basis-2/5 text-lg">
        <Link href="/">
          <div className="cursor-pointer relative hover:animate-pulse group py-0.5 px-0.5 ">
            <div
              className="absolute -inset-1 blur-lg transition-all"
            ></div>
            <button
              className="relative border-[#D100D1] py-1 transition-all text-xl"
            >
              Token
            </button>
          </div>
        </Link>
        <Link href="/">
          <div className="cursor-pointer hover:animate-pulse relative group py-0.5 px-0.5 ">
            <div
              className="absolute -inset-1 blur-lg transition-all"
            ></div>
            <button
              className="relative border-[#D100D1] py-1 transition-all text-xl"
            >
              Pool
            </button>
          </div>
        </Link>
        <Link href="/Activity">
          <div className="cursor-pointer hover:animate-pulse relative group py-0.5 px-0.5 ">
            <div
              className="absolute -inset-1 blur-lg transition-all"
            ></div>
            <button
              className="relative border-[#D100D1] py-1 transition-all text-xl"
            >
              Activity
            </button>
          </div>
        </Link>
        <Link href="/DEX">
          <div className="cursor-pointer hover:animate-pulse relative group py-0.5 px-0.5 ">
            <div
              className="absolute -inset-1 blur-lg transition-all"
            ></div>
            <button className="relative border-[#D100D1] py-1 transition-all text-xl">
              App
            </button>
          </div>
        </Link>
      </ul>
      <div className="hidden lg:flex items-center">
        <ConnectButton />
      </div>
      {/* --------------- Mobile and Tablets --------------- */}
      {/* ------------- Transition for Mobile Menu -------------- */}
      <Transition
        show={expand}
        enter="transition ease-out duration-1000 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-1000 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        className="lg:hidden w-screen h-screen fixed overflow-y left-0 top-0 z-10"
      >
        <div
          className="lg:hidden flex flex-col items-center h-full px-4 w-full py-10 md:px-8"
          id="mobile-menu"
        >
          <div className="flex justify-center space-x-2 items-center w-auto mb-24">
            <Link
              href="/"
              onClick={() => {
                setExpand(!expand);
              }}
            >
              <Image src={logo} width={200} height={180} alt="logo" />
            </Link>
          </div>
          <ul className=" flex flex-col justify-between basis-2/6 items-start mb-6">
            <Link href="/">
              <button
                className="cursor-pointer transition-all text-3xl mb-4"
              >
                Token
              </button>
            </Link>
            <Link href="/">
              <button
                className="cursor-pointer  transition-all text-3xl mb-4"
              >
                Pool
              </button>
            </Link>
            <Link href="/Activity">
              <button
                className="cursor-pointer  transition-all text-3xl mb-4"
              >
                Activity
              </button>
            </Link>
            <Link href="/DEX">
              <button
                className="cursor-pointer transition-all text-3xl mb-4"
                onClick={() => {
                  setExpand(!expand);
                }}
              >
                App
              </button>
            </Link>
          </ul>
          <div className="flex items-center ">
            <ConnectButton />
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navbar;