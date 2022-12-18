import React, { useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import styles from '../styles/Home.module.css'
import BuyXDC from "../components/BuyXDC";

export default function Coin() {
  const [expand, setExpand] = useState(false);

  return (
    <div
      className={`w-screen min-h-screen no-repeat bg-cover ${
        !expand ? `${styles.bg2}` : `bg-[#03071E]`
      }`}
    >
      <Navbar expand={expand} setExpand={setExpand} />
      {expand ? null : <BuyXDC />}
      <Footer />
    </div>
  );
}
