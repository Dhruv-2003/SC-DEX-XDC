import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Footer from "../components/Footer";
import Image from "next/image";
import coin from '../assets/coin.png'

export default function Home() {
  const [expand, setExpand] = useState(false);
  return (
    <div
      className={`w-screen min-h-screen no-repeat bg-cover ${
        !expand ? `${styles.bg} bg-[url('../assets/landing.png')] bg-cover lg:bg-center bg-no-repeat` : `bg-[#03071E]`
      }`}
    >
      <Navbar expand={expand} setExpand={setExpand} />
      {expand ? null : (
        <div className="mt-20 lg:ml-12 lg:mt-48 flex items-center lg:justify-start justify-around flex-wrap-reverse">
        <div className="font-fredoka mt-8 tracking-wide text-white flex flex-col items-start justify-center  px-14">
          <h1 className="text-4xl mb-2">XDC Swap</h1>
          <p className="text-xl ">Swap your XDC tokens to ETH</p>
          <Link href="/DEX">
            <button className="border-2 py-2 px-4 rounded-sm mt-5 font-chakra bg-white text-black hover:bg-transparent hover:text-white">
              Launch App
            </button>
          </Link>
        </div>
        <div className="lg:hidden animate-pulse  max-w-md">
          <Image src={coin} />
        </div>
        </div>
      )}
      {expand ? null : <Footer />}
    </div>
  );
}
