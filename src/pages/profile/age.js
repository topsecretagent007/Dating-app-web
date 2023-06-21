import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Logo from "../../assets/Logo1.svg";
import Image2 from "../../assets/image-2.png"

export default function Age() {

    return (
        <div className="bg-[#FFFBFE] rounded-xl w-full h-full min-h-screen justify-center py-20">
            <div className="flex">
                <div className="pt-20 pl-2 md:pl-5 xl:pl-20 2xl:pl-40">
                    <Link to='/login/enter' className="">
                        <FiArrowLeft className="text-pinkLight text-xl lg:text-2xl xl:text-4xl my-3" />
                    </Link>
                </div>
                <div className="w-full">
                    <div className="w-40 md:w-60 mx-auto pt-12 pb-10 justify-center items-center">
                        <img src={Logo} alt="Logo" className="mx-auto" />
                    </div>
                    <div className="w-full">
                        <img src={Image2} alt="Image2" className="w-40 md:w-80 xl:w-96 2xl:w-[600px] mx-auto" />
                        <div className="text-sm xl:text-2xl font-bold py-10 xl:leading-loose">
                            Are you 18 years of age? In order to use this app you must be 18 years old or over.
                            <br />
                            If you aren’t please leave and do not continue.
                        </div>
                        <Link to="/profile/friendship" className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">I'm 18+</Link>
                    </div>
                </div>
                <div className="pt-20 pr-2 md:pr-5 xl:pr-20 2xl:pr-40">
                </div>
            </div>
        </div>
    )
}