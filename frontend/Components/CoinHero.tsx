import React from "react";
import coinImage from "../public/img/coin.png";
import Image from "next/image";

const CoinHero = (): JSX.Element => {
    return(
    <section className="px-2 py-20 text-white">
      <div className="md:flex items-center justify-around ">
        <div className=" md:w-3/5 px-32">
          <h2 className="text-4xl text-skin-base my-4 leading-tight lg:text-7xl tracking-tighter mb-6">
            XDC<br />
            Stable<span className="text-[#FFB200]">Coin</span>
          </h2>
          <p className="text-base text-skin-muted dark:text-skin-darkMuted lg:text-2xl sm:mb-14 mb-10">
            Price:&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $0.0989
          </p>
          <div>
              <button className="border-full py-2 px-6 border-2  hover:bg-white hover:text-black hover:border-2 hover:border-black">
                Buy Now
              </button>
          </div>
        </div>
        <div className="w-10/12 md:w-1/3 mx-auto md:mx-0 my-8 order-2 ">
          <Image src={coinImage} alt="CoinImage" />
        </div>
      </div>
    </section>
    )
}

export default CoinHero