import Notification from "../component/notification/index";
import React, { useState } from "react";

import Header from "../component/header/index";
import Footer from "../component/footer/index";


export default function NotificationPage() {

    return (
        <div>
            <Header />
            <Notification />
            <Footer />
        </div >
    )
}