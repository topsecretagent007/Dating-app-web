import WelcomePage from "./login/welcomePage";
import PhoneNumberPage from "./login/phoneNumberPage";
import EnterCode from "./login/enterCode";



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