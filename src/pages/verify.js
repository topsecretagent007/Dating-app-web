import VerifyProfile from "../component/verify/index.js";
import React, { useState } from "react";

import Header from "../component/header/index";
import Footer from "../component/footer/index";


export default function Verify() {

    return (
        <div>
            <Header />
            <VerifyProfile />
            <Footer />
        </div >
    )
}