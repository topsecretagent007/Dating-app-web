import React, { useState, useEffect } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ModelLogo from "../../assets/Modal-Logo.png"
import Image1 from "../../assets/image-1.png"
import { UserAuth } from "../../context/AuthContext";
import LoadingModal from "../../component/loadingPage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { FiArrowLeft } from "react-icons/fi";
import EhterCodeImg from "../../assets/3d-mobile-phone-with-security-code-padlock.png"
import ReactCodeInput from 'react-code-input';
import { IoMdClose } from "react-icons/io";
import { FiChevronLeft } from "react-icons/fi";

export default function PhoneVerification({ closeModal }) {
    const [number, setNumber] = useState('');
    const [errMessage, setErrMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(false);
    const { user, linkPhoneNumber, verifyPhoneNumber } = UserAuth();
    const [verificationId, setVerificationId] = useState(null);
    const [code, setCode] = useState("");
    const [showRecaptcha, setShowRecaptcha] = useState(true);

    const verifyEnterCode = async () => {
        console.log(verificationId, code);
        if (code === "" || code === null) return;
        try {
            const res = linkPhoneNumber(verificationId, code);
            console.log(res, "ok");
            await updateDoc(doc(db, "Users", user.uid), {
                phoneNumber: number
            });
            await closeModal();
        } catch (error) {
            setErrMessage(error.message);
            console.log(error)
        }
    }
    const getEnterCode = async () => {
        setErrMessage("")
        if (number === "" || number === undefined) return setErrMessage("Invalid Phone Number");
        try {
            const response = await verifyPhoneNumber(number);
            setVerificationId(response);
            setShowRecaptcha(false);
            setFlag(true);
        } catch (error) {
            setErrMessage(error.message)
        }
    }

    useEffect(() => {
        const getUserInfo = async () => {
            setLoading(true);
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setNumber(userData.phoneNumber);
                setLoading(false);
            } else {
                console.log("No such document!");
                setLoading(false);
            }
        }
        if (user && user.uid) {
            getUserInfo();
        }
    }, [user])

    return (
        <>
            {!flag &&
                <>
                    <h2 className="hidden w-16 lg:w-24 absolute justify-center md:flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <img src={ModelLogo} alt="ModelLogo" />
                    </h2>
                    <div className="hidden p-2 rounded-full text-pinkLight text-xl absolute justify-center md:flex top-3 right-1 cursor-pointer bg-white">
                        <IoMdClose onClick={() => closeModal()} />
                    </div>
                    <div onClick={() => closeModal()} className="text-pinkLight text-xl md:hidden">
                        <FiChevronLeft />
                    </div>
                    <img src={Image1} alt="ModelLogo" className="mx-auto w-60 xl:w-64 justify-center" />
                    <div className="text-lg xl:text-xl 2xl:text-2xl font-bold text-start my-3"> My number is</div>
                    <div className="w-full xl:text-2xl lg:w-2/3 mx-auto px-5">
                        <div className="justify-center">
                            <PhoneInput
                                type="tel"
                                international
                                defaultCountry=""
                                value={number}
                                onChange={setNumber}
                                minLength="9"
                                maxLength="20"
                            />
                        </div>
                        <hr className="w-4/5 2xl:w-2/3 h-px mx-auto my-3 border-0 bg-blueLight" />
                        {errMessage &&
                            < span className="w-4/5 2xl:w-2/3 h-px mx-auto pt-2 text-sm text-red-500">
                                {errMessage}
                            </span>
                        }
                    </div>
                    {showRecaptcha && <div id="recaptcha-container" className="" />}
                    <div className="text-sm xl:text-lg justify-center my-5 xl:my-8 leading-relaxed">
                        Please enter your mobile number to receive a verification code. <br />Message and data rates may apply.
                    </div>
                    <div className="my-5 xl:my-10">
                        <button onClick={getEnterCode} className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">CONTINUE</button>
                    </div>
                </>}
            {flag &&
                <>
                    <h2 className="hidden w-16 lg:w-24 absolute justify-center md:flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <img src={ModelLogo} alt="ModelLogo" />
                    </h2>
                    <div className="hidden p-2 rounded-full text-pinkLight text-xl absolute justify-center md:flex top-3 right-1 cursor-pointer bg-white">
                        <IoMdClose onClick={() => closeModal()} />
                    </div>
                    <button onClick={() => setFlag(false)} className="mr-[100%]">
                        <FiArrowLeft className="text-pinkLight text-sm md:text-xl lg:text-2xl xl:text-4xl mt-8 xl:mt-10" />
                    </button>
                    <img src={EhterCodeImg} alt="EhterCodeImg" className="mx-auto w-60 xl:w-64 justify-center" />
                    <div className="my-4 lg:text-lg xl:text-xl leading-relaxed">
                        Please enter your verification code below <br className="hidden md:block" />
                        and click the verify button.<br />
                        <span className="text-pinkLight">{number}</span></div>
                    <div className="lg:text-xl px-1 mx-auto">
                        <ReactCodeInput type='number' fields={6} value={code} className="" onChange={(e) => setCode(e)} />
                    </div>
                    <div className="text-sm lg:text-lg xl:text-xl justify-center px-10 my-5">
                        Didn’t receive the code?
                        <button className="text-blueLight block mx-auto py-3" onClick={getEnterCode}>RESEND</button>
                    </div>
                    <div className="mb-10" onClick={() => verifyEnterCode()}>
                        <button className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">VERIFY</button>
                    </div>
                </>
            }
            {
                loading &&
                <LoadingModal />
            }
        </>
    )
}