import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcSettings, FcSupport } from "react-icons/fc";
import { GoAlert } from "react-icons/go";
import Avatar from "../assets/avatar.png";
import Header from "../component/header/index";
import Footer from "../component/footer/index";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import LoadingModal from "../component/loadingPage";

export default function ProfilePage() {
    const navigate = useNavigate();
    const { user } = UserAuth();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [pictures, setPictures] = useState([]);

    const goToPage = (url) => {
        navigate(url);
    }

    useEffect(() => {
        setLoading(true);
        const getUserInfo = async () => {
            const docSnap = await getDoc(doc(db, "Users", user.uid));
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setName(userData.UserName);
                setPictures(userData.Pictures);
                setLoading(false);
            }
        }
        if (user && user.uid) {
            getUserInfo();
        }
    }, [user])


    return (
        <div>
            <Header />
            <div className="w-full h-full bg-cover flex bg-[#FFFBFE] justify-center min-h-screen pt-10 pb-28" >
                <div className="w-full px-5 pt-20 xl:px-[24%] xl:pt-32">
                    <div className="text-2xl font-bold justify-start xl:absolute z-10">My Profile</div>
                    {
                        pictures[0] && pictures[0]["url"] != "" ?
                            <img src={pictures[0]["url"]} alt="Avatar" className="w-80 h-80 object-cover mx-auto rounded-full" />
                            :
                            <img src={Avatar} alt="Avatar" className="w-80 h-80 object-cover mx-auto rounded-full" />

                    }
                    <div className="text-xl xl:text-2xl font-bold pt-6 xl:pt-10">{name}</div>
                    <div className="justify-center flex mx-auto gap-44 xl:gap-52 -mt-10">
                        <div onClick={()=> goToPage("/settings")} >
                            <button className="justify-start cursor-pointer text-xl xl:text-5xl p-2 rounded-full bg-blueLight border-4 xl:border-8 border-white"
                            >
                                <FcSettings />
                            </button>
                            <div className="block xl:text-xl text-[#888888]">Setting</div>
                        </div>
                        <div onClick={()=> goToPage("/editprofile")}>
                            <button className="justify-start text-xl xl:text-5xl p-2 rounded-full bg-green-600 border-4 xl:border-8 border-white"
                            >
                                <FcSupport />
                            </button>
                            <div className="block xl:text-xl text-[#888888]">Edit Info</div>
                        </div>
                    </div>
                    <div className="justify-center flex mx-auto -mt-6 xl:-mt-12">
                        <div onClick={()=> goToPage("/verifyprofile")}>
                            <button className="justify-start text-xl xl:text-5xl p-2 rounded-full text-yellow-500 bg-red-600 border-4 xl:border-8 border-white"
                            >
                                <GoAlert />
                            </button>
                            <div className="block xl:text-xl text-[#888888] xl:mt-2">Not verified</div>
                        </div>
                    </div>
                    <div className="text-pinkLight text-lg xl:text-xl py-2 mt-5">Subsribe now</div>
                    <div className="xl:text-xl pb-12">
                        for unlimited matches and contacts
                    </div>
                    <div className="pb-20">
                        <button className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-8 xl:py-4 xl:px-32">Subscribe now</button>
                    </div>
                </div>
            </div>
            <Footer />
            {
                loading &&
                <LoadingModal />
            }
        </div >
    )
}