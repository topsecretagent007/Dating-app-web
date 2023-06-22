import React, { useState } from "react";

import Header from "../component/header/index";
import Footer from "../component/footer/index";


export default function TutorialPage() {

    return (
        <div>
            <Header />
            <div className="w-full h-full bg-cover flex bg-[#FFFBFE] justify-center min-h-screen py-10">
                <div className="w-[300px] md:w-[600px] xl:w-[1000px] 2xl:w-[1750px] px-5 pt-[103px] mx-auto xl:pt-32 xl:flex gap-12">
                    <div className="w-full grid md:grid-cols-2 gap-3 pb-10 overflow-y-hidden">
                        <video className="w-full aspect-video" controls >
                            <source src="https://www.youtube.com/watch?v=8nPs61YalRY" type="video/mp4" />
                        </video>
                        <video className="w-full aspect-video" controls >
                            <source src="https://www.youtube.com/shorts/C22HoOmm0V4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}