import Home from "../component/home/index";
import React, { useState } from "react";

import Header from "../component/header/index";
import Footer from "../component/footer/index";


export default function Landing() {

    return (
        <div>
            <Header />
            <Home />
            <Footer />
        </div >
    )
}