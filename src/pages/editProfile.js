import EditProfile from "../component/editprofile/index.js";
import React, { useState } from "react";

import Header from "../component/header/index";
import Footer from "../component/footer/index";


export default function EditProfilePage() {

    return (
        <div>
            <Header />
            <EditProfile />
            <Footer />
        </div >
    )
}