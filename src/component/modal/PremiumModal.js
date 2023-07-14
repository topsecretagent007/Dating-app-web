import React, { useState } from "react";
import ModelLogo from "../../assets/Modal-Logo.png";
import { AiFillCheckCircle, AiOutlineCheck } from "react-icons/ai"
import { IoMdClose } from "react-icons/io";

export default function PremiumModal({ closeModal }) {
    const [premiumState, setPremiumState] = useState(false)

    return (
        <>
            <h2 className="w-16 lg:w-24 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src={ModelLogo} alt="ModelLogo" />
            </h2>
            <div className="p-2 rounded-full text-pinkLight text-xl absolute justify-center flex top-1 right-1 transform translate-x-1/2 -translate-y-1/2 cursor-pointer bg-[#faeaf6]">
                <IoMdClose onClick={() => closeModal()} />
            </div>
            <p className="text-base md:text-xl xl:text-3xl font-bold my-3 text-[#5a5a5a]">Get Our Premium Plans</p>
            <span className="text-sm md:text-lg 2xl:text-xl my-3 lg:leading-relaxed text-[#5a5a5a]">
                please select ant one.
            </span>
            <div className="mb-5 mt-4 md:mt-9 p-3 md:p-7 items-center gap-2 md:gap-4 rounded-2xl border-[0.5px] border-red-500 bg-red-100 flex mx-auto">
                <div className="text-red-600 text-2xl">
                    <AiFillCheckCircle />
                </div>
                <p className="text-sm lg:text-xl xl:text-2xl font-semibold">No active product found!! $0.00</p>
            </div>
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
                    <button className="w-full px-6 py-3 text-pinkLight border-2 border-pinkLight hover:bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3 hover:text-white">
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