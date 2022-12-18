import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Fragment, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import styles from "../styles/Home.module.css";
import { tokens } from "../utils/tokens";
import Loader from "../components/Loader";

const token1 = tokens;
const token2 = tokens;

export default function Stake() {
  const [expand, setExpand] = useState(false);
  const [selectedToken1, setSelectedToken1] = useState(token1[0]);
  const [selectedToken2, setSelectedToken2] = useState(token2[0]);

  return (
    <div
      className={`w-screen min-h-screen no-repeat bg-cover bg-[#03071E]
        ${
          !expand
            ? `${styles.bg} bg-[url('../assets/landing.png')]`
            : `bg-[#03071E]`
        }
          `}
    >
      <Navbar expand={expand} setExpand={setExpand} />
      {expand ? null : (
        <>
          <div className=" w-full mt-10 flex flex-col justify-center items-center px-2 pb-10">
            <div className="w-full flex flex-col lg:w-7/12 justify-around">
              <h1 className=" text-gray-100 text-3xl font-semibold">Staking</h1>
              <span className="mt-5 bg-orange-500 opacity-90 px-6 py-4 text-md font-normal rounded-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                ipsam blanditiis nobis pariatur ullam, itaque aut veniam
                voluptate quis saepe exercitationem esse cum voluptates
                architecto inventore atque velit quos? Ratione.
              </span>
            </div>
            <div
              className={` mt-8 lg:w-7/12 border rounded-lg border-gray-500 px-4 py-6 bg-transparent backdrop-blur-xl`}
            >
              <div className=" flex items-center justify-between">
                <span className=" text-gray-100 text-lg font-semibold">
                  Stake XDC
                </span>
                <button
                  type="button"
                  className=" flex hover:scale-105 transition ease-in-out items-center w- ml-6 mt-2 hover:bg-transparent border hover:border-gray-300 rounded-md opacity-90 text-xs font-semibold font-fredoka text-white px-3 py-2 mr-2 mb-2"
                >
                  <img
                    className=" w-5 mr-2"
                    src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/ffffff/external-wallet-interface-kiranshastry-lineal-kiranshastry.png"
                  />
                  Buy XDC
                </button>
              </div>

              {/* <div className="lg:w-5/12 flex items-center justify-start "></div> */}
              <div class="mt-4 relative border border-gray-500 py-4 px-6 rounded-md flex items-center justify-between">
                <div className=" text-white">
                  <div>Staking APR</div>
                  <div>8.5%</div>
                </div>
                <div className=" text-white">
                  <div className=" text-white">Max slashing</div>
                  <div>30%</div>
                </div>
                <div className=" text-white">
                  <div className=" text-white">Wallet Balance</div>
                  <div>XDC 80</div>
                </div>
              </div>

              <div class="mt-4 relative flex items-center text-white justify-between">
                <div class="mt-4 relative border border-gray-500 py-4 px-6 rounded-sm flex items-center flex-col w-full mr-2 justify-center">
                  <h3 className=" text-md mb-1">Claimable XDC</h3>
                  <h3 className=" text-xl font-semibold">0</h3>
                  <h3 className=" text-sm mt-1">$ 0</h3>
                  <button
                    type="button"
                    className="text-black w-full mt-6 bg-orange-500 text-sm font-fredoka active:bg-orange-600 font-normal rounded-sm px-5 py-2.5 mr-2 mb-2"
                  >
                    Cooldown to unstake
                  </button>
                </div>
                <div class="mt-4 relative border w-full border-gray-500 py-4 px-6 rounded-sm flex items-center flex-col ml-2 justify-between">
                  <h3 className=" text-md mb-1">Claimable XDC</h3>
                  <h3 className=" text-xl font-semibold">0</h3>
                  <h3 className=" text-sm mt-1">$ 0</h3>
                  <button
                    type="button"
                    className="text-black w-full mt-6 bg-orange-500 text-sm font-fredoka active:bg-orange-600 font-normal rounded-sm px-5 py-2.5 mr-2 mb-2"
                  >
                    Claim XDC
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="text-white w-full mt-6 bg-orange-600 text-md font-fredoka active:bg-orange-700 font-medium rounded-sm px-5 py-2.5 mr-2 mb-2"
              >
                Stake
              </button>
            </div>
          </div>
          {/* <Loader msg={"Message here  "} /> */}
        </>
      )}
      <Footer />
    </div>
  );
}
