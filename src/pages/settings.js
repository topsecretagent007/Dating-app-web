import Setting from "../component/settings/index";
import React, { useState } from "react";

import Header from "../component/header/index";
import Footer from "../component/footer/index";


export default function SettingsPage() {

    return (
        <div>
            <Header />
            <Setting />
            {/* <Footer /> */}
        </div >
    )
}