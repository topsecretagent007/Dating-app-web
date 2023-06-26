import React from "react";
import Header from "../component/header/index";
import Footer from "../component/footer/index";

export default function Landing() {

    return (
        <div>
            <Header />
            <div className="w-full h-full relative min-h-screen top-0 bg-cover flex bg-[url('./assets/5232845.png')] justify-between items-center z-10" >
            </div >
            <Footer  />
        </div >
    )
}