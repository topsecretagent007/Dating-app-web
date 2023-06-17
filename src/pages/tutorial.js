import Tutorial from "../component/tutorial/index.js";
import React, { useState } from "react";

import Header from "../component/header/index";
import Footer from "../component/footer/index";


export default function TutorialPage() {

    return (
        <div>
            <Header />
            <Tutorial />
            <Footer />
        </div >
    )
}