import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Fragment, useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import styles from "../styles/Home.module.css";
import { tokens } from "../utils/tokens";
import Loader from "../components/Loader";
import Link from "next/link";
import { STAKING_CONTRACT_ABI, STAKING_CONTRACT_ADDRESS } from "../Constants";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";

const token1 = tokens;
const token2 = tokens;

export default function Stake() {
  const [expand, setExpand] = useState(false);
  const [selectedToken, setSelectedToken] = useState(tokens[0]);

  const [selectedToken1, setSelectedToken1] = useState(token1[0]);
  const [selectedToken2, setSelectedToken2] = useState(token2[0]);
  const [inputAmount, setInputAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [earnedRewards, setEarnedRewards] = useState(0);
  const provider = useProvider();
  const { data: signer } = useSigner();
  const contract = useContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_CONTRACT_ABI,
    signerOrProvider: signer || provider,
  });

  const { address } = useAccount();

  const stakeTokens = async (_amount) => {
    try {
      // add the required address
      const _stake = await contract.stake(selectedToken1.address, _amount);
      setLoading(true);
      await _stake.wait();
      setLoading(false);
      // toast.success();
    } catch (err) {
      // toast.error("")
      console.error(err);
    }
  };

  const getStakedTokens = async () => {
    try {
      const _getTokens = await contract.getBalance(selectedToken1.address);
      setBalance(parseInt(_getTokens));
    } catch (err) {
      // toast.error("")
      console.error(err);
    }
  };

  const getEarnedRewards = async () => {
    try {
      // pasting the token address here
      const _earnings = await contract.getRewardEarned(
        selectedToken1.address,
        address
      );
      setEarnedRewards(parseInt(_earnings));
      console.log(earnedRewards);
    } catch (err) {
      console.error(err);
    }
  };

  // call this function in the withdraw button with inputAmount as _amount
  const withdraw = async (_amount) => {
    try {
      const _withdraw = await contract.withdraw(
        selectedToken1.address,
        _amount
      );
      setLoading(true);
      await _withdraw.wait();
      setLoading(false);
    } catch (err) {
      console.error(err);
      // toast.error(err);
    }
  };

  const redeemRewards = async () => {
    try {
      // in the param put in the token that was staked
      const _redeemRewards = await contract.reedemReward(
        selectedToken1.address
      );
      setLoading(true);
      await _redeemRewards.wait();
      setLoading(false);
      // toast.success("Redeemed rewards")
    } catch (err) {
      console.error(err);
      // toast.error(err)
    }
  };

  const stakeEther = async (_amount) => {
    try {
      const _stakeEth = await contract.stakeEth(
        {
          value: ethers.utils.parseEther("0.1"), // input the amount here dhruv
        },
        _amount
      );
      setLoading(true);
      await _stakeEth.wait();
      setLoading(false);
      // toast.success("staked successfully!")
    } catch (err) {
      console.error(err);
      // toast.error(err)
    }
  };

  const withdrawEther = async (_amount) => {
    try {
      const _withdrawEth = await contract.withdrawEth(_amount);
      setLoading(true);
      await _withdrawEth.wait();
      setLoading(false);
      // toast.success("withdrawn successfully")
    } catch (err) {
      console.error(err);
      // toast.error(err)
    }
  };

  const redeemRewardEth = async () => {
    try {
      const _redeemRewardsEth = await contract.reedemRewardETH();
      setLoading(true);
      await _redeemRewardsEth.wait();
      setLoading(false);
      // toast.success("Rewards redeemed!!!")
    } catch (err) {
      console.error(err);
      // toast.error("failed to redeem rewards")
    }
  };

  useEffect(() => {
    getEarnedRewards();
    getStakedTokens();
  }, []);

  // const withdrawTokens = async () => {
  //   try {
  //     const _withdraw = await contract.withdraw()
  //   }
  //   catch (err) {

  //   }
  // }

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
                <div className=" text-gray-100  flex  items-center text-lg font-semibold">
                  Stake{" "}
                  <Listbox
                    className=" ml-3"
                    value={selectedToken}
                    onChange={setSelectedToken}
                  >
                    <div className="relative mt-0">
                      <Listbox.Button className="relative  cursor-default rounded-md w-28 lg:w-36 px-4 py-2.5 bg-gray-700 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          {selectedToken.symbol}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-200"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100 "
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-36 z-[100] overflow-auto rounded-md  bg-gray-900  backdrop-blur-xl py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {tokens.map((token, tokenId) => (
                            <Listbox.Option
                              key={tokenId}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-100"
                                }`
                              }
                              value={token}
                            >
                              {({ selectedToken }) => (
                                <>
                                  <span
                                    className={`block truncate  ${
                                      selectedToken
                                        ? "font-medium"
                                        : "font-normal"
                                    }`}
                                  >
                                    {token.symbol}
                                  </span>
                                  {selectedToken ? (
                                    <span className="absolute  inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon
                                        className="h-5 w-5 text-gray-900"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
                <Link href="/xdc">
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
                </Link>
              </div>

              {/* <div className="lg:w-5/12 flex items-center justify-start "></div> */}
              <div class="mt-4 relative border border-gray-500 py-4 px-6 rounded-md flex items-center justify-between">
                <div className=" text-white">
                  <div>Staking APR</div>
                  <div>12%</div>
                </div>
                <div className=" text-white">
                  <div className=" text-white">Max slashing</div>
                  <div>0%</div>
                </div>
                <div className=" text-white">
                  <div className=" text-white">Wallet Balance</div>
                  <div>XDC {balance}</div>
                </div>
              </div>

              <div class="mt-4 relative flex items-center text-white justify-between">
                <div class="mt-4 relative border border-gray-500 py-4 px-6 rounded-sm flex items-center flex-col w-full mr-2 justify-center">
                  <h3 className=" text-md mb-1">Staked</h3>
                  <h3 className=" text-xl font-semibold">0</h3>
                  <div className=" text-sm mt-1">
                    <input
                      type="number"
                      id=""
                      className={` mt-5 bg-gray-800 text-white border  lg:w-full border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      placeholder="0"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className="text-black w-72 mt-6 bg-orange-500 text-sm font-fredoka active:bg-orange-600 font-normal rounded-sm px-5 py-2.5 mr-2 mb-2"
                  >
                    Unstake
                  </button>
                </div>
                <div class="mt-4 relative border w-full border-gray-500 py-4 px-6 rounded-sm flex items-center flex-col ml-2 justify-between">
                  <h3 className=" text-md mb-1">Claimable</h3>
                  <h3 className=" text-xl font-semibold">0</h3>
                  <div className=" text-sm mt-1">
                    <input
                      type="number"
                      id=""
                      className={` mt-5 bg-gray-800 text-white border  lg:w-full border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      placeholder="0"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className="text-black w-72 mt-6 bg-orange-500 text-sm font-fredoka active:bg-orange-600 font-normal rounded-sm px-5 py-2.5 mr-2 mb-2"
                  >
                    Claim XDC
                  </button>
                </div>
              </div>
              <input
                onChange={(e) => setInputAmount(+e.target.value)}
                type="number"
                id=""
                className={` mt-5 bg-gray-800 text-white border  lg:w-full border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder="0"
                required
              />
              <button
                type="button"
                className="text-white w-full mt-6 bg-orange-600 text-md font-fredoka active:bg-orange-700 font-medium rounded-sm px-5 py-2.5 mr-2 mb-2"
                onClick={() => stakeTokens(inputAmount)}
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
