import React, { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { MdOutlineLocationOn } from "react-icons/md";
import ImageSlider from "../other/myimageslider";

export default function PreviewProfile() {
    const { user } = UserAuth();
    const [userName, setUserName] = useState();
    const [description, setDescription] = useState();
    const [images, setImages] = useState();
    const [userLooking, setUserLooking] = useState();
    const [interests, setInterests] = useState();

    useEffect(() => {
        const getUserInfo = async () => {
            const docSnap = await getDoc(doc(db, "Users", user.uid));
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setImages(userData.Pictures)
                setDescription(userData.editInfo?.about)
                setUserName(userData.UserName)
                setUserLooking(userData.desires)
                setInterests(userData.interest)
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
        <div className="w-full xl:flex gap-14">
            <div className="w-full">
                <ImageSlider myImages={images} />
            </div>
            <div className="w-full pt-5 xl:pt-0 xl:w-2/5">
                <div className="justify-between flex">
                    <div className="text-start">
                        <div className="text-lg md:text-xl xl:text-2xl font-bold">{userName}</div>
                        <div className="text-sm md:text-md lg:text-lg xl:text-xl text-[#888888]">Address </div>
                    </div>
                </div>
                <div className="flex text-md xl:text-2xl items-center gap-2">
                    <div className="text-pinkLight text-2xl" >
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
                    <div className="text-sm flex lg:text-lg xl:text-xl text-[#888888] leading-relaxed">{userLooking.map((item, index) => (
                        <div key={index} className="px-1">
                            <div >{item},</div>
                        </div>
                    ))}</div>
                </div>
                <div className="text-start py-5">
                    <div className="text-md md:text-lg lg:text-xl xl:text-2xl font-bold">Interest</div>
                    <div className="text-sm lg:text-lg xl:text-xl text-[#888888] leading-relaxed">{interests}</div>
                </div>
            </div>
        </div >
    )
}