import React, { useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Swap from "../Components/Swap";

const DEX = (): JSX.Element => {
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <div
      className={`w-screen min-h-screen no-repeat bg-cover bg-[#03071E]
      ${!expand ? `bg-[url('/img/landing-image.png')]` : `bg-[#03071E]`}
        `}
    >
      <Navbar expand={expand} setExpand={setExpand} />
      {expand ? null : (
        <div className=" w-full flex justify-center items-center px-2">
          <Swap />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default DEX;
// ${!expand ? `bg-[url('/img/landing-image.png')]` : `bg-[#03071E]`}
