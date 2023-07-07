import React, { useState, useEffect } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ModelLogo from "../../assets/Modal-Logo.png"
import Image1 from "../../assets/image-1.png"
import { UserAuth } from "../../context/AuthContext";
import LoadingModal from "../../component/loadingPage";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function PhoneVerification({ closeModal }) {
    const [number, setNumber] = useState('');
    const [errMessage, setErrMessage] = useState("");
    const { user } = UserAuth();
    const [loading, setLoading] = useState(false);
    const [loginIdData, setLoginIdData] = useState();

    const savePhoneNumber = async () => {
        if (number == "") {
            setErrMessage("Phone number error")
        } else {
            setLoading(true);
            console.log(loginIdData);
            await setDoc(doc(db, "Users", user.uid), {
                LoginID: {
                    // phone: user.uid,
                    phone: "",
                    apple: "",
                    fb: "",
                    google: user.uid
                },
                phoneNumber: number,
            });
            setLoading(false);
        }
    }

    useEffect(() => {
        const getUserInfo = async () => {
            setLoading(true);
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setLoginIdData(userData.LoginID)
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
            <div className="w-full bg-white rounded-xl px-2 relative">
                <h2 className="w-16 absolute justify-center flex -top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={ModelLogo} alt="ModelLogo" />
                </h2>
                <img src={Image1} alt="ModelLogo" className="mx-auto w-60 xl:w-64 justify-center" />
                <div className="text-lg xl:text-xl 2xl:text-2xl font-bold text-start my-3"> My number is</div>
                <div className="w-full xl:text-2xl  px-[10%]">
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
                    <hr className="w-full h-px mx-auto my-3 border-0 bg-blueLight" />
                    {errMessage &&
                        < span className="w-4/5 2xl:w-2/3 h-px mx-auto pt-2 text-sm text-red-500">
                            {errMessage}
                        </span>
                    }
                </div>
                <div className="text-sm xl:text-lg justify-center my-5 xl:my-8 leading-relaxed">
                    Please enter your mobile number to receive a verification code. <br />Message and data rates may apply.
                </div>
                <div className="my-5 xl:my-10 flex gap-4 mx-auto justify-center">
                    <>
                        <button onClick={() => savePhoneNumber()} className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 ">Save</button>
                        <button onClick={() => closeModal()} className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 ">Close</button>
                    </>
                </div>
            </div>
            {
                loading &&
                <LoadingModal />
            }
        </>
    )
}