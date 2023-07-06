import React from "react";
import Header from "../component/header/index";
import Footer from "../component/footer/index";
import YouTube from 'react-youtube-embed'

export default function TutorialPage() {

    return (
        <div>
            <Header />
            <div className="w-full h-full bg-cover flex bg-[#FFFBFE] justify-center min-h-screen py-10">
                <div className="w-[300px] md:w-[600px] xl:w-[1000px] 2xl:w-[1750px] px-5 mx-auto xl:flex gap-12">
                    <div className="w-full grid md:grid-cols-2 gap-3 pb-10 overflow-y-hidden">
                        <YouTube id='8nPs61YalRY' />
                        <YouTube id='ysz5S6PUM-U' />
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}