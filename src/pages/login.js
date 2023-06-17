import WelcomePage from "../component/login/welcomePage";
import PhoneNumberPage from "../component/login/phoneNumberPage";
import EnterCode from "../component/login/enterCode";



import React, { useState } from "react";

export default function LoginPage() {

    return (
        <div>
            <EnterCode />
            <WelcomePage />
            <PhoneNumberPage />
        </div >
    )
}