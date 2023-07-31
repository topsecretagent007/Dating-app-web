import React from "react";
import Header from "../component/header/index";
import Footer from "../component/footer/index";
import YouTube from 'react-youtube-embed'

export default function TutorialPage() {

    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, { passive: false });

    return (
        <div>
            <Header />
            <div className="w-full h-full bg-cover flex bg-[#FFFBFE] justify-center min-h-[calc(100vh-186px)] pt-2 pb-10 md:py-10">
                <div className="w-full md:w-[600px] xl:w-[1000px]  px-5 mx-auto xl:flex gap-12">
                    <div className="w-full grid md:grid-cols-2 gap-3 pb-10">
                        <div className="bg-black py-6 rounded-xl xl:h-[315px] ">
                            <YouTube id='C22HoOmm0V4' />
                        </div>
                        <div className="bg-black py-6 rounded-xl xl:h-[315px] ">
                            <YouTube id='7pHCB6agyR0' />
                        </div>
                        <div className="bg-black py-6 rounded-xl xl:h-[315px] ">
                            <YouTube id='8nPs61YalRY' />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}