import React, { useContext } from "react";
import { Link } from "react-router-dom";
import 'react-phone-number-input/style.css';
import { useNavigate } from "react-router-dom";

import ReactCodeInput from 'react-code-input';
import { FiArrowLeft } from "react-icons/fi";
import UserContext from "../../context/userContext";
import ModelLogo from "../../assets/Modal-Logo.png"
import EhterCodeImg from "../../assets/3d-mobile-phone-with-security-code-padlock.png"
import { collection, addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase';

export default function EnterCode() {
    const navigate = useNavigate();
    const { phoneNumber } = useContext(UserContext);
    const { setUserId } = useContext(UserContext);
    const collectionRef = collection(db, 'Users');

    
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
                    <button className="text-blueLight block mx-auto py-3">RESEND</button>

                </div>
                <div className="mb-10">
                    <Link className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">VERIFY</Link>
                </div>
            </div>
        </div >
    )
}