import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Logo from "../../assets/Logo1.svg";
import MeDropdown from "../combox/medropdown";
import SexualDropdown from "../combox/sexualdropdown";
import StatusDropdown from "../combox/statusdropdown";
import LookDropdown from "../combox/lookingdropdown";
import ShowDropdown from "../combox/showdropdown";
import UserContext from "../../context/userContext";

export default function ProfileData() {
    const [name, setName] = useState("");
    const [brithday, setBrithday] = useState("");
    const [nextPage, setNextPage] = useState(false);
    const { userName, setUserName } = useContext(UserContext);
    const { userBrithday, setUserBrithday } = useContext(UserContext);
    const { userAge, setUserAge } = useContext(UserContext);
    const { userSex } = useContext(UserContext);
    const { userSexual } = useContext(UserContext);
    const { userStatus } = useContext(UserContext);
    const { userLooking } = useContext(UserContext);
    const { userShow } = useContext(UserContext);

    const nameChange = (event) => {
        setName(event.target.value);
    }

    const brithdayChange = (event) => {
        setBrithday(event.target.value);
        const today = new Date();
        const birthDate = new Date(event.target.value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        setUserAge(age);
        event.preventDefault();
    }

    const userProfileData = async () => {
        if (name !== "" && brithday !== "" && userSex !== "" && userSexual !== "" && userStatus !== "" && userLooking !== "" && userShow !== "") {
            console.log(userName, ",", userBrithday, ",", userSex, ",", userSexual, ",", userStatus, ",", userLooking, ",", userShow, ",")
        }
    }
    useEffect(() => {
        setUserName(name);
    }, [name]);

    useEffect(() => {
        setUserBrithday(brithday);
    }, [brithday]);

    useEffect(() => {
        if (name !== "" && brithday !== "" && userSex !== "" && userSexual !== "" && userStatus !== "" && userLooking !== "" && userShow !== "") {
            setNextPage(true);
        } else {
            setNextPage(false);
        }
    }, [name, brithday, userSex, userSexual, userStatus, userLooking, userShow])


    return (
        <div className="bg-[#FFFBFE] bg-cover rounded-xl w-full h-full min-h-screen py-10 flex">
            <div className="pt-20 pl-[8%]">
                <Link to='/profile/friendship' className="">
                    <FiArrowLeft className="text-pinkLight text-4xl my-3" />
                </Link>
            </div>
            <div className="w-full pb-10">
                <div className="w-full px-10 pt-20 pb-10 items-center">
                    <img src={Logo} alt="Logo" className="mx-auto" />
                </div>
                <div className="py-18 text-3xl text-start mb-20">
                    <div className="w-full md:grid-cols-2 grid md:justify-between md:gap-20 lg:grid-cols-3 pb-10">
                        <div className="text-lg xl:text-xl w-full 2xl:text-3xl text-start mx-auto">
                            <div className="py-2 font-bold w-full">User Name</div>
                            <input className="border-2 border-black bg-white rounded-xl w-full 2xl:text-2xl py-2 px-3 text-black text-base" placeholder="Your Name" value={name} onChange={(event) => nameChange(event)} />
                        </div>
                        <div className="text-lg xl:text-xl w-full 2xl:text-3xl text-start mx-auto">
                            <div className="py-2 font-bold w-full">Brithday</div>
                            <input type="date" className="border-2 border-black bg-white rounded-xl w-full 2xl:text-2xl py-2 px-3 text-black text-base" value={brithday} onChange={(event) => brithdayChange(event)} />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:justify-between md:gap-20 lg:grid-cols-3 pb-40">
                        <MeDropdown />
                        <SexualDropdown />
                        <StatusDropdown />
                        <LookDropdown />
                        <ShowDropdown />
                    </div>
                </div>
                {
                    nextPage ?
                        <Link to="/profile/location" onClick={() => userProfileData()} className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-8 xl:py-4 xl:px-32">Got it</Link>
                        :
                        <Link to="" onClick={() => userProfileData()} className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-8 xl:py-4 xl:px-32">Got it</Link>
                }
            </div>
            <div className=" pt-20 pl-[8%]">
            </div>
        </div>
    )
}