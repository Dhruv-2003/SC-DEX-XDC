import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Footer from "../components/Footer";
import Image from "next/image";
import coin from "../assets/coin.png";
import Loader from "../components/Loader";
// import { fetchPrice } from "../api";

export default function Home() {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <div
        className={`w-screen min-h- pb-20 md:pb-0 lg:min-h-max no-repeat bg-cover ${
          !expand
            ? `${styles.bg} bg-[url('../assets/landing.png')] bg-cover lg:bg-center bg-no-repeat`
            : `bg-[#03071E]`
        }`}
      >
        {/* <Loader /> */}
        <Navbar expand={expand} setExpand={setExpand} />
        {expand ? null : (
          <>
            <div className="mt-20 lg:ml-12 lg:mt-48 lg:pb-48 flex items-center lg:justify-start justify-around flex-wrap-reverse">
              <div className="font-fredoka mt-8 tracking-wide text-white flex flex-col items-start justify-center  px-14">
                <h1 className="text-4xl mb-2">XDC-DEX</h1>
                <p className="text-xl ">Swap your XDC tokens to ETH</p>
                <Link href="/xdc">
                  {/* <button className="border-2 py-2 px-4 rounded-sm mt-5 font-chakra bg-white text-black hover:bg-transparent hover:text-white">
                Launch App
              </button> */}

                  <button
                    type="button"
                    className=" mt-5 flex hover:scale-105 transition ease-in-out items-center bg-gray-900 text-white border hover:border-gray-300 rounded-sm text-lg hover:bg-orange-500 font-semibold font-fredoka hover:text-black px-3 py-2 mr-2 mb-2"
                  >
                    {/* <img
                  className=" w-8 mr-2"
                  src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/ffffff/external-wallet-interface-kiranshastry-lineal-kiranshastry.png"
                /> */}
                    Launch App
                  </button>
                </Link>
              </div>
              <div className="lg:hidden animate-pulse  max-w-md">
                <Image src={coin} />
              </div>
            </div>
          </>
        )}
      </div>
      <div
        className={`w-screen min-h-scree bg-[#03071E] no-repeat bg-cover text-center pt-10  flex items-center justify-center flex-col ${
          !expand
            ? `${styles.bg12} bg-cover lg:bg-center bg-no-repeat`
            : `bg-[#03071E]`
        }`}
      >
        <div className="text-white w-full my-5 flex flex-col justify-center items-center mb-12 z-[1] lg:mb-20">
          <h1 className=" text-3xl font-semiobold"> Our Main Features</h1>
          <div className="w-11/12 grid md:grid-cols-3   md:gap-4 gap-3 mt-8  rounded-md">
            <div className=" border px-6 py-10  bg-[#fc6f38] text-gray-800">
              <h1>XDC Stable Coin</h1>
              <p></p>
            </div>
            <div className=" border px-6 py-10">
              <h1>XDC Stable Coin</h1>
              <p></p>
            </div>
            <div className=" border px-6 py-10 bg-[#fc6f38] text-gray-800">
              <h1>XDC Stable Coin</h1>
              <p></p>
            </div>
            <div className=" border px-6 py-10">
              <h1>XDC Stable Coin</h1>
              <p></p>
            </div>
            <div className=" border px-6 py-10 bg-[#fc6f38] text-gray-800">
              <h1>XDC Stable Coin</h1>
              <p></p>
            </div>
            <div className=" border px-6 py-10">
              <h1>XDC Stable Coin</h1>
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-ful">{expand ? null : <Footer />}</div>
    </>
  );
}
