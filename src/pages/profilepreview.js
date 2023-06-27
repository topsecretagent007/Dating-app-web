import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { MdOutlineLocationOn } from "react-icons/md";
import ImageSlider from "../component/other/myimageslider";
import LoadingModal from "../component/loadingPage";
import Header from "../component/header/index";
import Footer from "../component/footer/index";


export default function PreviewProfile() {
    const navigate = useNavigate();
    const { user } = UserAuth();
    const [userName, setUserName] = useState();
    const [description, setDescription] = useState();
    const [images, setImages] = useState([]);
    const [userLooking, setUserLooking] = useState([]);
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(false);


    const goToPage = (url) => {
        navigate(url);
    }

    useEffect(() => {
        setLoading(true);

        const getUserInfo = async () => {
            const docSnap = await getDoc(doc(db, "Users", user.uid));
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setDescription(userData.editInfo?.about)
                setUserName(userData.UserName)
                setUserLooking(userData.desires)
                setInterests(userData.interest)
                setLoading(false);

            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        if (user && user.uid) {
            getUserInfo();
        }
    }, [user])

    return (
        <>
            <Header />
            <div className="w-full h-full min-h-screen bg-cover px-[13%] bg-[#FFFBFE] py-14">
                <div className="w-full md:flex justify-center gap-14 mx-auto">
                    <div className="w-full max-w-2xl">
                        <ImageSlider />
                    </div>
                    <div className="w-full xl:w-1/2 max-w-lg">
                        <div className="justify-between flex">
                            <div className="text-start">
                                <div className="text-lg md:text-xl xl:text-2xl font-bold">{userName}</div>
                                <div className="text-sm md:text-md lg:text-lg xl:text-xl text-[#888888]">Address </div>
                            </div>
                        </div>
                        <div className="flex text-md xl:text-2xl items-center gap-2">
                            <div className="text-pinkLight text-xl" >
                                <MdOutlineLocationOn />
                            </div>
                            <div>
                                Location
                            </div>
                        </div>
                        <div className="text-start py-5">
                            <div className="text-md md:text-lg lg:text-xl xl:text-2xl font-bold">About me</div>
                            <div className="text-sm lg:text-lg xl:text-xl text-[#888888] leading-relaxed">
                                {description}
                            </div>
                        </div>
                        <div className="text-start py-5">
                            <div className="text-md md:text-lg lg:text-xl xl:text-2xl font-bold">Desires</div>
                            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 text-sm lg:text-lg xl:text-xl text-[#888888] leading-relaxed">{userLooking.map((item, index) => (
                                <div key={index} className="px-1">
                                    <div >{item}</div>
                                </div>
                            ))}</div>
                        </div>
                        <div className="text-start py-5">
                            <div className="text-md md:text-lg lg:text-xl xl:text-2xl font-bold">Interest</div>
                            <div className="grid grid-cols-2 md:grid-cols-3 text-sm lg:text-lg xl:text-xl text-[#888888] leading-relaxed list-none">
                                {interests != [] &&
                                    <>
                                        {interests.map((item, index) => (
                                            <div key={index} className="px-1">
                                                <div >{item}</div>
                                            </div>
                                        ))}
                                    </>
                                }
                            </div>
                        </div>
                        <div onClick={() => goToPage('/editprofile')} className="mt-16 md:mt-6 justify-center xl:py-3 xl:px-10 flex rounded-xl text-white bg-pinkLight items-center xl:gap-5 gap-2 md:gap-3 lg:gap-4 py-1 lg:py-2 text-xl" >
                            <div>OK</div>
                        </div>
                    </div>
                </div>
                {
                    loading &&
                    <LoadingModal />
                }
            </div >
            <Footer />
        </>

    )
}