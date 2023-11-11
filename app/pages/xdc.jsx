import React, { useState } from "react";
<<<<<<< HEAD
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import styles from "../styles/Home.module.css";
=======
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from '../styles/Home.module.css'
>>>>>>> c0b7a45e9105130576604d80e30be5ec5e4004e2
import BuyXDC from "../components/BuyXDC";

export default function Coin() {
  const [expand, setExpand] = useState(false);

  return (
    <div
      className={`w-screen min-h-screen flex items-center flex-col justify-between no-repeat bg-cover ${
        !expand ? `${styles.bg}` : `bg-[#03071E]`
      }`}
    >
      <Navbar expand={expand} setExpand={setExpand} />
      {expand ? null : <BuyXDC />}
      <div className=" w-full">
        <Footer />
      </div>
    </div>
  );
}
