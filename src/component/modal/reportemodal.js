import React from "react";
import ModelLogo from "../../assets/Modal-Logo.png"
import { IoMdClose } from "react-icons/io";

export default function ReporteModal({closeModal}) {

    return (
        <>
            <h2 className="w-16 lg:w-24 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src={ModelLogo} alt="ModelLogo" />
            </h2>
            <div className="p-2 rounded-full text-pinkLight text-xl absolute justify-center flex top-3 right-1 cursor-pointer bg-white">
                <IoMdClose onClick={() => closeModal()}/>
            </div>
            <p className="text-lg lg:text-xl xl:text-3xl font-bold my-3 text-pinkLight">Information</p>
            <span className="text-sm xl:text-lg 2xl:text-xl my-3 lg:leading-relaxed">
                User reported!
            </span>
            <div className="w-full lg:flex gap-2">
                <button className="w-5/6 xl:w-2/3 px-6 py-3 text-pinkLight border-2 border-pinkLight hover:bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3 hover:text-white gap-1" onClick={closeModal}>
                    <div className="text-sm xl:text-lg">Continue</div>
                </button>
            </div>
        </>
    )
}