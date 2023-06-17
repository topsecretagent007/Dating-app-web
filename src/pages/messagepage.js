import Messages from "../component/messages/index";
import React, { useState } from "react";

import Header from "../component/header/index";
import Footer from "../component/footer/index";


export default function MessagePage() {

    return (
        <div>
            <Header />
            <Messages />
            <Footer />
        </div >
    )
}