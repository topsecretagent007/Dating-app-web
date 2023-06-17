import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ReactCodeInput from 'react-code-input';


import { FiArrowLeft } from "react-icons/fi";
import UserContext from "../../../context/userContext";

import ModelLogo from "../../../assets/Modal-Logo.png"
import Image1 from "../../../assets/image-1.png"
import EhterCodeImg from "../../../assets/3d-mobile-phone-with-security-code-padlock.png"



export default function PhoneVerification() {
    const [value, setValue] = useState('');
    const { phoneNumber, setPhoneNumber } = useContext(UserContext);
    const [enterCode, setEnterCode] = useState(false);



    const sendCode = async () => {
        await setPhoneNumber(value);
        await setEnterCode(true);
        await console.log("number", phoneNumber)
    }

    const VerifyCode = async () => {
        await setEnterCode(false);
    }

    return (
        <>
            {!enterCode ? <>
                <h2 className="w-16 lg:w-24 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={ModelLogo} alt="ModelLogo" />
                </h2>
                <img src={Image1} alt="ModelLogo" className="mx-auto w-60 xl:w-64 justify-center" />
                <div className="text-lg xl:text-xl 2xl:text-2xl font-bold text-start my-3"> My number is</div>
                <div className="w-full xl:text-2xl lg:w-2/3 mx-auto px-5">
                    <div className="justify-center">
                        <PhoneInput
                            international
                            defaultCountry=""
                            value={value}
                            onChange={setValue}
                            maxLength={19}
                        />
                    </div>
                    <hr className="w-4/5 2xl:w-2/3 h-px mx-auto my-3 border-0 bg-buleLight" />

                </div>
                <div className="text-sm xl:text-lg justify-center my-5 xl:my-8 leading-relaxed">
                    Please enter your mobile number to receive a verification code. <br />Message and data rates may apply.
                </div>
                <div className="my-5 xl:my-10">
                    <button onClick={() => sendCode()} className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">CONTINUE</button>
                </div>
            </> : <>
                <h2 className="w-16 lg:w-24 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={ModelLogo} alt="ModelLogo" />
                </h2>
                <div onClick={() => setEnterCode(!enterCode)}>
                    <FiArrowLeft className="text-pinkLight text-sm md:text-xl lg:text-2xl xl:text-4xl mt-8 xl:mt-10" />
                </div>
                <img src={EhterCodeImg} alt="EhterCodeImg" className="mx-auto w-60 xl:w-64 justify-center" />
                <div className="my-4 lg:text-lg xl:text-xl leading-relaxed">
                    Please enter your verification code below <br className="hidden md:block" />
                    and click the verify button.<br />
                    <span className="text-pinkLight">{phoneNumber}</span></div>
                <div className="px-10 md:px-0 text-sm lg:text-xl mx-auto">
                    <ReactCodeInput type='text' fields={6} />
                </div>
                <div className="text-sm lg:text-lg xl:text-xl justify-center px-10 my-5">
                    Didn’t receive the code?
                    <button onClick={() => sendCode()} className="text-buleLight py-3 block mx-auto cursor-pointer">RESEND</button>
                </div>
                <div className="my-5 xl:my-10">
                    <button onClick={() => VerifyCode()} className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">VERIFY</button>
                </div>
            </>
            }
        </>
    )
}