import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { BsTelephone, BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import ModelLogo from "../../assets/Modal-Logo.png";
import { UserAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDoc, doc, setDoc } from "firebase/firestore";

export default function WelcomePage() {
    const navigate = useNavigate();
    const [agreeCheck, setAgreeCheck] = useState(false);
    const [checkboxColor, setCheckboxColor] = useState(true);
    const { googleSignIn, user } = UserAuth();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const setUserInfo = async () => {
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                const loginData = { apple: "", fb: "", google: "", phone: "" };
                if(user.providerData[0].providerId=='google.com') loginData.google = user.uid;
                if(user.providerData[0].providerId=='phone') loginData.phone = user.uid;
                if(user.providerData[0].providerId=='apple.com') loginData.apple = user.uid;
                if(user.providerData[0].providerId=='facebook.com') loginData.fb = user.uid;
                const data = {
                    LoginID: loginData,
                    timestamp: new Date(),
                    userId: user.uid,
                    metode: user.providerData[0].providerId,
                    verified: 0
                }
                await setDoc(doc(db, "Users", user.uid), data);
                navigate("/profile/age")
            }
        }
        if (user != null && user.uid != null) {
            setUserInfo();
            //navigate("/profile/age")
        }
    }, [user])

    return (
        <div className="w-full absolute h-full min-h-screen bg-cover flex bg-[url('./assets/Blur-Bg.png')] px-8 py-20 justify-center items-center" >
            <div className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px]">
                <h2 className="w-16 lg:w-24 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={ModelLogo} alt="ModelLogo" />
                </h2>
                <Link to='/'>
                    <FiArrowLeft className="text-pinkLight text-sm md:text-xl lg:text-2xl xl:text-4xl mt-8 xl:mt-10" />
                </Link>
                <p className="text-lg lg:text-xl xl:text-3xl font-bold my-3">Welcome!</p>
                <span className="text-sm xl:text-lg 2xl:text-xl my-3 lg:leading-relaxed">
                    By signing in, you are indicating that you have read the Privacy Policy and
                    agree to the Terms of Service
                </span>
                <div className="w-full">
                    {agreeCheck ?
                        <Link to="/login/phoneinput" className="w-5/6 xl:w-2/3 px-6 py-3 bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3  text-white gap-1">
                            <BsTelephone /> <div className="text-sm xl:text-lg">Continue with Phone Number</div>
                        </Link>
                        :
                        <Link to="" className="w-5/6 xl:w-2/3 px-6 py-3 bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3  text-white gap-1">
                            <BsTelephone /> <div className="text-sm xl:text-lg">Continue with Phone Number</div>
                        </Link>
                    }
                </div>
                <div className="lg:my-6 2xl:my-10 my-3">
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-full h-px my-8 border-0 bg-[#888888]" />
                        <div className="text-sm absolute px-2 xl:px-12 xl:text-lg font-medium text-[#888888] -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-[#888888]">Or Register Using</div>
                    </div>
                </div>
                <div className="xl:flex gap-3 justify-center my-3 px-5">
                    <div className="rounded-xl bg-blueLight px-6 xl:px-16 py-2 xl:py-4 justify-center flex xl:gap-3 items-center text-white gap-2 mb-3 xl:mb-0 text-sm xl:text-2xl cursor-pointer">
                        <BsFacebook />
                        Facebook
                    </div>
                    <div className="rounded-xl bg-white border-2 border-[#888888] px-6 xl:px-16 py-2 xl:py-4 justify-center flex xl:gap-3 items-center gap-2 text-sm xl:text-2xl text-[#888888] cursor-pointer" onClick={() => handleGoogleSignIn()}>
                        <FcGoogle />
                        Google
                    </div>
                </div>
                <div className="w-full xl:w-1/2  xl:text-end items-center my-5 text-sm">
                    <input id="default-checkbox" type="checkbox" value={agreeCheck} className={`${checkboxColor ? "text-black" : "text-red-600"} accent-pinkLight bg-gray-100 rounded-xl mr-1`} onChange={() => setAgreeCheck(!agreeCheck)} />
                    I agree to terms and conditions
                </div>
                <div className="text-pinkLight text-sm justify-center my-6 ">Terms of use & Privacy Policy</div>
            </div>
        </div >
    )
}