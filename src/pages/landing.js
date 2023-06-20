import React from "react";

import Header from "../component/header/index";
import Footer from "../component/footer/index";


export default function Landing() {

    return (
        <div>
            <Header />
            <div className="w-full h-full absolute min-h-screen bg-cover flex bg-[url('./assets/5232845.png')] justify-between items-center" >
            </div >
            <Footer />
        </div >
    )
}