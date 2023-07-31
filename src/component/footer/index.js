import React from "react";

export default function Footer() {

    return (
        <div className="w-full hidden md:block z-[9999] lg:flex bg-black text-white py-4 justify-between bottom-0 px-20" >
            <span className="justify-start text-sm md:text-base lg:text-xl">Copyright 2023 Unjabbed All rights reserved.</span>
            <div className="justify-end pt-4 lg:pt-0 lg:flex">
                <a href="https://unjabbed.app/privacy-policy/">
                    <button className="px-4 py-1 lg:py-2 border-b-2 border-b-black hover:border-b-2 hover:border-b-[#888888]/80 hover:text-pinkLight">
                        <span className="">Privacy-Policy</span>
                    </button>
                </a>
                <a href="https://unjabbed.app/terms-conditions/">
                    <button className="px-4 py-1 lg:py-2 border-b-2 border-b-black hover:border-b-2 hover:border-b-[#888888]/80 hover:text-pinkLight">
                        <span className="">Terms-Conditions</span>
                    </button>
                </a>
            </div>

        </div >
    )
}