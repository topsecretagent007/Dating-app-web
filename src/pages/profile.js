import ProfileSetting from "../component/profilesetting/index";
import React, { useState } from "react";

import Header from "../component/header/index";
import Footer from "../component/footer/index";


export default function ProfilePage() {

    return (
        <div>
            <Header />
            <ProfileSetting />
            <Footer />
        </div >
    )
}