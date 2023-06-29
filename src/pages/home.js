import React from "react";
import Header from "../component/header/index";
import Footer from "../component/footer/index";

export default function Landing() {

    return (
        <div className="bg-black min-h-screen">
            <Header />
            <div className="w-full relative min-h-[calc(100vh-186px)] top-0 bg-cover flex bg-[url('./assets/5232845.png')] justify-between items-center z-30" >
            </div >
            <Footer />
        </div >
    )
}