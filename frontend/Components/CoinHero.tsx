import React, {useState} from "react";
import coinImage from "../public/img/coin.png";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { Transition } from "@headlessui/react";

const CoinHero = (): JSX.Element => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return(
    <section className="font-fredoka px-2 py-20 text-white">
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
              <button
                className="border-full py-2 px-6 border-2  hover:bg-white hover:text-black hover:border-2 hover:border-black"
                onClick={() => setShowModal(!showModal)}
                >
                Buy Now
              </button>
              <Transition
              show={showModal}
              enter="transform transition duration-[500ms] ease-in"
              enterFrom="opacity-0 scale-0"
              enterTo="opacity-100 rotate-0 scale-100"
              leave="transform duration-[300ms] transition ease-out"
              leaveFrom="opacity-100 rotate-0 scale-100 "
              leaveTo="opacity-0 scale-0 "
              className="w-[100vw] h-[100vh] bg-[#4d4c4cd9] fixed z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
            >
              <div className=" bg-shade-bg sm:max-w-full  h-1/2 sm:w-1/2 sm:h-1/2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 z-50 flex flex-col justify-center items-center">
                <p className="sm:mb-14 mb-6 text-lg">Select Amount of XDC Stable coin</p>
                <div className="px-2 flex flex-col sm:flex-row justify-center items-center">
                  <input
                    type="text"
                    className="text-black text-center bg-shade-9 w-[300px] sm:max-w-sm text-2xl sm:text-2xl outline-none py-4 px-1 mb-6 sm:mb-0 sm:mr-24"
                  />
                  <p>XDC Coin</p>
                  <a
                    className="self-center text-center fixed z-50 top-1 sm:left-full left-[78%] rounded-full ml-3 bg-white curosor-pointer px-2 py-2 "
                    onClick={() => {
                      setShowModal(!showModal);
                    }}
                  >
                    <MdClose className="text-4xl text-black cursor-pointer" />
                  </a>
                </div>
                <a
                  className="play-btn text-center py-4 w-[80%] sm:w-[35%] block animate-text cursor-pointer hover:animate-text-hover text-2xl mt-10 border-2 hover:bg-[#3E6B89]"
                >
                  Buy
                </a>
              </div>
            </Transition>
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