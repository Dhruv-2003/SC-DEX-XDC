import React from "react";

const Swap = (): JSX.Element => {
    return(
        <div className="font-fredoka text-white bg-[#03071E] border-y-2 flex flex-col items-center justify-center mt-32 md:mt-12 xl:mt-32 2xl:mt-40 mb-32">
            <h1 className="pb-8 pt-2 text-2xl">
                Swap
            </h1>
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
        </div>
    )
}

export default Swap