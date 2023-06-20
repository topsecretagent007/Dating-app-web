import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import 'react-phone-number-input/style.css';
import ReactCodeInput from 'react-code-input';
import { FiArrowLeft } from "react-icons/fi";
import UserContext from "../../context/userContext";
import ModelLogo from "../../assets/Modal-Logo.png"
import EhterCodeImg from "../../assets/3d-mobile-phone-with-security-code-padlock.png"
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../services/firebase.config';
import { User } from "firebase/auth";

export default function EnterCode() {
    const { phoneNumber } = useContext(UserContext);
    const { userName } = useContext(UserContext);
    const { userBrithday } = useContext(UserContext);
    const { userSex } = useContext(UserContext);
    const { userSexual } = useContext(UserContext);
    const { userStatus } = useContext(UserContext);
    const { userLooking } = useContext(UserContext);
    const { userShow } = useContext(UserContext);
    const { userAge } = useContext(UserContext);
    const { userId, setUserId } = useContext(UserContext);
    const { userDescription } = useContext(UserContext);
    const [inputImage, SetInputImage] = useState(false);
    const collectionRef = collection(db, 'Users');

    const updataProfile = async () => {
        // if (inputImage == "") {

        // } else {
        try {
            const docRef = await addDoc(collectionRef, {
                LoginID: { apple: "", fb: "", google: "", phone: "" },
                Pictures: [{ show: "ture", url: "" },],
                UserName: "",
                user_DOB: "",
                sexualOrientation: { orientation: "", showOnProfile: false },
                status: "",
                desires: "",
                editInfo: { showOnProfile: false, university: "", userGender: "" },
                showGender: "",
                discription: "",
                age: 0,
                timestamp: new Date(),
                verified: 0,
                showdesires: false,
                showstatus: false,
                phoneNumber: "",
                metode: "",
                miles: true,
                maximum_distance: 0,
                age_range: { max: "99", min: "18" },
                userId: "",
                gerHash: "",
                geoLocation: [],
                listSwipedUser: [],
                location: { address: "", countryID: "", countryName: "", latitude: 1.2312, longitude: 34.565467 },
                point: { geohash: "", geopoint: [] },
            });
            const updateUserId = doc(db, "Users", docRef.id)
            await updateDoc(updateUserId, {
                LoginID: { apple: "", fb: "", google: "", phone: docRef.id },
                userId: docRef.id
            });
            setUserId(docRef.id);
            console.log(userName, ",", userBrithday, ",", userSex, ",", userSexual, ",", userStatus, ",", userLooking, ",", userShow, ",", userDescription, ",", userAge, ",")
        } catch (err) {
            console.log(err);
        }
        // }
    }

    const resendCode = () => {
        console.log("resend", phoneNumber)
    }
    return (
        <div className="w-full absolute h-full min-h-screen bg-cover flex bg-[url('./assets/Blur-Bg.png')]  justify-center items-center" >
            <div className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px]">
                <h2 className="w-16 lg:w-24 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={ModelLogo} alt="ModelLogo" />
                </h2>
                <Link to='/login/phoneinput'>
                    <FiArrowLeft className="text-pinkLight text-sm md:text-xl lg:text-2xl xl:text-4xl mt-8 xl:mt-10" />
                </Link>
                <img src={EhterCodeImg} alt="EhterCodeImg" className="mx-auto w-60 xl:w-64 justify-center" />
                <div className="my-4 lg:text-lg xl:text-xl leading-relaxed">
                    Please enter your verification code below <br className="hidden md:block" />
                    and click the verify button.<br />
                    <span className="text-pinkLight">{phoneNumber}</span></div>
                <div className="lg:text-xl px-10 mx-auto">
                    <ReactCodeInput type='text' fields={6} />
                </div>
                <div className="text-sm lg:text-lg xl:text-xl justify-center px-10 my-5">
                    Didn’t receive the code?
                    <button onClick={() => resendCode()} className="text-buleLight block mx-auto py-3">RESEND</button>

                </div>
                <div className="mb-10">
                    {/* { */}
                    {/* inputImage ? */}
                    <Link to="/profile/age" onClick={() => updataProfile()} className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">VERIFY</Link>
                    {/* : */}
                    {/* <Link to="" onClick={() => updataProfile()} className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">VERIFY</Link> */}
                    {/* } */}
                </div>
            </div>
        </div >
    )
}