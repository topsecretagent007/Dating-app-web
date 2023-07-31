import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Logo from "../../assets/Logo1.svg";

export default function FriendShip() {
    const navigator = useNavigate();

    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, { passive: false });

    return (
        <div className="bg-[#FFFBFE] rounded-xl w-full h-full min-h-screen flex pb-10">
            <div className="pt-20 pl-2 md:pl-5 xl:pl-20 2xl:pl-40">
                <button onClick={() => navigator('/profile/age')}>
                    <FiArrowLeft className="text-pinkLight text-xl lg:text-2xl xl:text-4xl my-3" />
                </button>
            </div>
            <div className="w-full tracking-widest">
                <div className="w-40 md:w-60 mx-auto pt-12 pb-10 justify-center items-center">
                    <img src={Logo} alt="Logo" className="mx-auto" />
                </div>
                <div className="py-18 text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl text-start mb-10">
                    <div className="py-5 text-pinkLight">This is a community for unvaccinated singles looking to meet like-minded people for love, fun and friendship.</div>
                    <div className="py-5">
                        <div className="text-pinkLight">Be yourself.</div>
                        <div className="text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">Please make sure that your photos, age and bio are accurate and a true representation of who you are.</div>
                    </div>
                    <div className="py-5">
                        <div className="text-pinkLight">Play it cool.</div>
                        <div className="text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">Respect others and treat them as you would like to be treated.</div>
                    </div>
                    <div className="py-5">
                        <div className="text-pinkLight">Stay safe.</div>
                        <div className="text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">Don’t be too quick to give out personal information.</div>
                    </div>
                    <div className="py-5">
                        <div className="text-pinkLight">Be proactive.</div>
                        <div className="text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">Always report bad behavior.</div>
                    </div>
                </div>
                <button onClick={() => navigator("/profile/profiledata")} className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20 2xl:py-6 2xl:px-40">Continue</button>
            </div>
            <div className="pt-20 pr-2 md:pr-5 xl:pr-20 2xl:pr-40">
            </div>
        </div>
    )
}