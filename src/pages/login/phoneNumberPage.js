import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ReactCodeInput from 'react-code-input';
import { FiArrowLeft } from "react-icons/fi";
import ModelLogo from "../../assets/Modal-Logo.png"
import Image1 from "../../assets/image-1.png"
import EhterCodeImg from "../../assets/3d-mobile-phone-with-security-code-padlock.png"
import { UserAuth } from "../../context/AuthContext";
import LoadingModal from "../../component/loadingPage";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function PhoneNumberPage() {
    const navigate = useNavigate();
    const [number, setNumber] = useState('');
    const [errMessage, setErrMessage] = useState("");
    const [flag, setFlag] = useState(false);
    const [confirmObj, setConfirmObj] = useState(null);
    const [code, setCode] = useState("");
    const { setUpRecaptcha, user } = UserAuth();
    const [loading, setLoading] = useState(false);

    const getEnterCode = async () => {
        setErrMessage("")
        if (number === "" || number === undefined) return setErrMessage("Invalid Phone Number");
        try {
            const response = await setUpRecaptcha(number);
            setConfirmObj(response);
            setFlag(true);
        } catch (error) {
            setErrMessage(error.message)
        }
    }

    const verifyEnterCode = async () => {
        if (code == "" || code == null) return;
        try {
            const res = await confirmObj.confirm(code);
            //navigate("/");
        } catch (error) {
            setErrMessage(error.message);
        }
    }

    useEffect(() => {
        const setUserInfo = async () => {
            setLoading(true);
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setLoading(false);
                navigate("/");
            } else {
                const loginData = { apple: "", fb: "", google: "", phone: "" };
                if (user.providerData[0].providerId == 'google.com') loginData.google = user.uid;
                if (user.providerData[0].providerId == 'phone') loginData.phone = user.uid
                if (user.providerData[0].providerId == 'apple.com') loginData.apple = user.uid;
                if (user.providerData[0].providerId == 'facebook.com') loginData.fb = user.uid;
                const data = {
                    LoginID: loginData,
                    timestamp: new Date(),
                    userId: user.uid,
                    metode: user.providerData[0].providerId,
                    verified: 0,
                    UserName: "",
                    user_DOB: "",
                    age: "",
                    editInfo: {
                        showOnProfile: false,
                        university: "",
                        userGender: ""
                    },
                    sexualOrientation: {
                        orientation: "",
                        showOnProfile: false
                    },
                    showGender: [],
                    desires: [],
                    status: "",
                };
                await setDoc(doc(db, "Users", user.uid), data);
                setLoading(false);
                navigate("/profile/age");
            }
        }
        if (user != null && user.uid != null) {
            setUserInfo();
        }
    }, [user])

    return (
        <div className="w-full absolute h-full min-h-screen bg-cover flex bg-[url('./assets/Blur-Bg.png')] px-8 py-20 xl:py-40 justify-center items-center" >
            {!flag &&
                <div className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px]">
                    <h2 className="w-16 lg:w-24 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <img src={ModelLogo} alt="ModelLogo" />
                    </h2>
                    <Link to='/login'>
                        <FiArrowLeft className="text-pinkLight text-sm md:text-xl lg:text-xl xl:text-3xl mt-8 xl:mt-10" />
                    </Link>
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
                                maxLength="15"
                            />
                        </div>
                        <hr className="w-4/5 2xl:w-2/3 h-px mx-auto my-3 border-0 bg-blueLight" />
                        {errMessage &&
                            < span className="w-4/5 2xl:w-2/3 h-px mx-auto pt-2 text-sm text-red-500">
                                {errMessage}
                            </span>
                        }
                    </div>
                    <div id="recaptcha-container" className="" />
                    <div className="text-sm xl:text-lg justify-center my-5 xl:my-8 leading-relaxed">
                        Please enter your mobile number to receive a verification code. <br />Message and data rates may apply.
                    </div>
                    <div className="my-5 xl:my-10">
                        <Link onClick={getEnterCode} className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">CONTINUE</Link>
                    </div>
                </div>
            }
            {flag &&
                <div className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px]">
                    <h2 className="w-16 lg:w-24 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <img src={ModelLogo} alt="ModelLogo" />
                    </h2>
                    <button onClick={() => setFlag(false)} className="mr-[100%]">
                        <FiArrowLeft className="text-pinkLight text-sm md:text-xl lg:text-2xl xl:text-4xl mt-8 xl:mt-10" />
                    </button>
                    <img src={EhterCodeImg} alt="EhterCodeImg" className="mx-auto w-60 xl:w-64 justify-center" />
                    <div className="my-4 lg:text-lg xl:text-xl leading-relaxed">
                        Please enter your verification code below <br className="hidden md:block" />
                        and click the verify button.<br />
                        <span className="text-pinkLight">{number}</span></div>
                    <div className="lg:text-xl px-10 mx-auto">
                        <ReactCodeInput type='text' fields={6} value={code} onChange={(e) => setCode(e)} />
                    </div>
                    <div className="text-sm lg:text-lg xl:text-xl justify-center px-10 my-5">
                        Didn’t receive the code?
                        <button className="text-blueLight block mx-auto py-3" onClick={getEnterCode}>RESEND</button>

                    </div>
                    <div className="mb-10" onClick={verifyEnterCode}>
                        <button className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">VERIFY</button>
                    </div>
                </div>
            }
            {
                loading &&
                <LoadingModal />
            }
        </div >

    )
}