import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import Logo from "../../assets/Logo1.svg";
import Image3 from "../../assets/image-3.png"

export default function Location() {

    return (
        <div className="bg-[#FFFBFE] rounded-xl w-full h-screen flex">
            <div className="pt-20 pl-2 md:pl-5 xl:pl-20 2xl:pl-40">
                <Link to='/profile/profiledata' className="">
                    <FiArrowLeft className="text-pinkLight text-xl lg:text-2xl xl:text-4xl my-3" />
                </Link>
            </div>
            <div className="w-full">
                <div className="w-40 md:w-60 mx-auto pt-12 pb-10 justify-center items-center">
                    <img src={Logo} alt="Logo" className="mx-auto" />
                </div>
                <div className="w-full">
                    <img src={Image3} alt="Image3" className="w-60 md:w-80 xl:w-96 2xl:w-[750px] mx-auto" />
                    <div className="text-sm xl:text-2xl font-bold py-10 xl:leading-loose">
                        You’ll need to provide a location in order to search users around you.
                    </div>
                    <Link to="/profile/photoupload" className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">Allow Location</Link>
                </div>
            </div>
            <div className="pt-20 pr-2 md:pr-5 xl:pr-20 2xl:pr-40">
            </div>
        </div>
    )
}