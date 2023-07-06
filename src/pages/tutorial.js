import React from "react";
import Header from "../component/header/index";
import Footer from "../component/footer/index";
import ReactPlayer from 'react-player/youtube'

export default function TutorialPage() {

    return (
        <div>
            <Header />
            <div className="w-full h-full bg-cover flex bg-[#FFFBFE] justify-center min-h-screen py-10">
                <div className="w-[300px] md:w-[600px] xl:w-[1000px] 2xl:w-[1750px] px-5 mx-auto xl:flex gap-12">
                    <div className="w-full grid md:grid-cols-2 gap-3 pb-10 overflow-y-hidden">
                        <video
                            className="w-full aspect-video"
                            src="https://www.youtube.com/watch?v=8nPs61YalRY"
                            type="video/mp4"
                            autoPlay
                            controls
                        ></video>
                        <video
                            className="w-full aspect-video"
                            src="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                            type="video/mp4"
                            autoPlay
                            controls
                        ></video>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}