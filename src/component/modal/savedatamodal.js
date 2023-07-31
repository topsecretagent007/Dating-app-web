import React from "react";
import ModelLogo from "../../assets/Modal-Logo.png";
import { IoMdClose } from "react-icons/io";

export default function SaveDataModal({ onCloseModal, onSaveModal }) {

    return (
        <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
            <div className="w-full h-screen bg-cover flex px-8  justify-center items-center bg-black/90" >
                <div className="w-2/5 bg-white rounded-xl px-6 relative py-12 text-center">
                    <h2 className="w-10 lg:w-16 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <img src={ModelLogo} alt="ModelLogo" />
                    </h2>
                    <div className="p-2 rounded-full text-pinkLight text-xl absolute justify-center flex top-3 right-1 cursor-pointer bg-white">
                        <IoMdClose onClick={() => onCloseModal()} />
                    </div>
                    <span className="text-sm xl:text-lg 2xl:text-xl lg:leading-relaxed mt-4 px-4">
                        Would you like to save your changes?
                    </span>
                    <div className="grid md:grid-cols-2 mt-10 gap-4 px-5">
                        <button onClick={() => (onSaveModal())} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-pinkLight rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white" >
                            Ok
                        </button>
                        <button onClick={() => onCloseModal()} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-pinkLight rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                            No
                        </button>
                    </div>
                </div>
            </div >
        </div>
    )
}