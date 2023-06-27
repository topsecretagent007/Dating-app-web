import React from "react";
import ModelLogo from "../../assets/Modal-Logo.png"

export default function SaveAvatar({ onSaveImage, onCloseImage }) {

    return (
        <>
            <h2 className="w-16 lg:w-24 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src={ModelLogo} alt="ModelLogo" />
            </h2>
            <p className="text-lg lg:text-xl xl:text-3xl font-bold my-3 text-pinkLight">Notification</p>
            <span className="text-sm xl:text-lg 2xl:text-xl my-3 lg:leading-relaxed">
                Are you going to change your avatar?
            </span>

            <div className="w-full lg:flex gap-2">
                <button onClick={() => onSaveImage()} className="w-5/6 xl:w-2/3 px-6 py-3 text-pinkLight border-2 border-pinkLight hover:bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3 hover:text-white">
                    <div className="text-sm xl:text-lg font-bold">OK</div>
                </button>
                <button onClick={() => onCloseImage()} className="w-5/6 xl:w-2/3 px-6 py-3 text-pinkLight border-2 border-pinkLight hover:bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3 hover:text-white">
                    <div className="text-sm xl:text-lg font-bold">Cancel</div>
                </button>
            </div>
        </>
    )
}