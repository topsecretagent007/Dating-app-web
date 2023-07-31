import React, { useState } from "react";
import ModelLogo from "../../assets/Modal-Logo.png";
import { AiFillCheckCircle, AiOutlineCheck } from "react-icons/ai"
import { IoMdClose } from "react-icons/io";

export default function PremiumModal({ closeModal }) {
    const [premiumState, setPremiumState] = useState(true);



    return (
        <>
            <h2 className="hidden w-16 lg:w-24 absolute justify-center md:flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src={ModelLogo} alt="ModelLogo" />
            </h2>
            <div className="p-2 rounded-full text-pinkLight text-xl absolute justify-center flex top-3 right-1 cursor-pointer bg-white">
                <IoMdClose onClick={() => closeModal()} />
            </div>
            <p className="text-base md:text-xl xl:text-3xl font-bold my-3 text-[#5a5a5a]">Get Our Premium Plans</p>
            <span className="text-sm md:text-lg 2xl:text-xl my-3 lg:leading-relaxed text-[#5a5a5a]">
                please select ant one.
            </span>
            {
                premiumState ?
                    <>
                        <div className="mb-5 mt-4 md:mt-9 px-3 py-5 items-center gap-2 md:gap-4 rounded-2xl border-[1px] border-pinkLight bg-[#fbd7f1] flex mx-auto cursor-pointer">
                            <div className="text-pinkLight text-2xl">
                                <AiFillCheckCircle />
                            </div>
                            <div className="w-full text-start">
                                <div className="justify-between flex font-semibold text-2xl">
                                    <div className="">1 Month</div>
                                    <div className="">$11.99</div>
                                </div>
                                <div className="text-md break-words w-full">
                                    Unlimited No Ads Subscription (Unjabbed: Unvaccinated Dating)
                                </div>
                            </div>
                        </div>

                        <div className="mb-5 mt-4 md:mt-9 px-3 py-5 items-center gap-2 md:gap-4 rounded-2xl border-[1px] border-pinkLight bg-[#fbd7f1] flex mx-auto cursor-pointer">
                            <div className="text-pinkLight text-2xl">
                                <AiFillCheckCircle />
                            </div>
                            <div className="w-full text-start">
                                <div className="justify-start flex font-semibold text-2xl">
                                    Free subscription
                                </div>
                            </div>
                        </div>

                        <div className="mb-5 mt-4 md:mt-9 px-3 py-5 items-center gap-2 md:gap-3 rounded-2xl border-[1px] border-[#86dce7] bg-[#dcf6ff] flex mx-auto cursor-pointer">
                            <div className="text-[#21d4f6] text-2xl">
                                <AiFillCheckCircle />
                            </div>
                            <div className="w-full text-start">
                                <div className="justify-between flex font-semibold text-2xl">
                                    <div className="">6 Month</div>
                                    <div className="">$54.99</div>
                                </div>
                                <div className="text-md break-words w-full">
                                    Six month Subscription (Unjabbed: Unvaccinated Dating)
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <div className="mb-5 mt-4 md:mt-9 p-3 md:p-7 items-center gap-2 md:gap-4 rounded-2xl border-[0.5px] border-red-500 bg-red-100 flex mx-auto">
                        <div className="text-red-600 text-2xl">
                            <AiFillCheckCircle />
                        </div>
                        <p className="text-sm lg:text-xl xl:text-2xl font-semibold">No active product found!! $0.00</p>
                    </div>
            }
            <div className="bg-white py-2 px-3 md:px-6 rounded-2xl text-start">
                <div className="flex items-center py-2 gap-2">
                    <div className="text-pinkLight text-lg md:text-xl">
                        <AiOutlineCheck />
                    </div>
                    <p className="text-base md:text-xl xl:text-2xl font-semibold">No Ads!</p>
                </div>
                <div className="flex items-center py-2 gap-2">
                    <div className="text-pinkLight text-lg md:text-xl">
                        <AiOutlineCheck />
                    </div>
                    <p className="text-base md:text-xl xl:text-2xl font-semibold">Unlimited swipes!</p>
                </div>
                <div className="flex items-center py-2 gap-2">
                    <div className="text-pinkLight text-lg md:text-xl">
                        <AiOutlineCheck />
                    </div>
                    <p className="text-base md:text-xl xl:text-2xl font-semibold">No restriction on distance!</p>
                </div>
                <div className="flex items-center py-2 gap-2">
                    <div className="text-pinkLight text-lg md:text-xl">
                        <AiOutlineCheck />
                    </div>
                    <p className="text-base md:text-xl xl:text-2xl font-semibold">Unlimited connections and chat!</p>
                </div>
            </div>

            <div className="w-full mt-8 lg:flex gap-2">
                {premiumState ?
                    <button className="w-full px-6 py-3 text-pinkLight border-2 border-pinkLight hover:bg-pinkLight rounded-full  mx-auto flex justify-center items-center my-3 hover:text-white">
                        <div className="text-sm xl:text-lg font-bold">Continue</div>
                    </button>
                    :
                    <button className="w-full px-6 py-3 bg-[#5a5a5a] text-white rounded-full  mx-auto flex justify-center items-center my-3">
                        <div className="text-sm xl:text-lg font-bold">Continue</div>
                    </button>
                }
            </div>
        </>
    )
}