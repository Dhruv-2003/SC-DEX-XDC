import React from "react";

const Hero = (): JSX.Element => {
    return(
        <div className="font-fredoka text-white flex flex-col items-start justify-center h-[70vh] px-14">
            <h1 className="text-4xl mb-2">XDC Swap</h1>
            <p className="text-xl">Now you can swap XDC tokens to Eth</p>
            <button className="border-2 py-3 px-14 mt-7 font-chakra hover:bg-white hover:text-black">DEX</button>
        </div>
    )
}

export default Hero