import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBell, FaRocketchat, FaIdCard, FaSignOutAlt } from "react-icons/fa";
import { RiPhoneFindFill } from "react-icons/ri";
import { DiAptana } from "react-icons/di";
import { BsFillChatDotsFill, BsFire } from "react-icons/bs";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Logo from "../../assets/Logo.png"
import Avatar from "../../assets/avatar.png";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { user, logOut } = UserAuth();
    const [pictures, setPictures] = useState([]);
    const [currentLocation, setCurrentLocation] = useState("");
    const [hiddenHeader, setHiddenHeader] = useState(false);

    const goToPage = (url) => {
        navigate(url);
    }

    const menuDropdown = useRef(null);

    useEffect(() => {
        function handleScroll() {
            const currentScrollPos = window.pageYOffset;
            setPrevScrollPos(currentScrollPos);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuDropdown.current && !menuDropdown.current.contains(event.target)) {
                setShowMobileMenu(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuDropdown]);

    useEffect(() => {
        const getUserInfo = async () => {
            const docSnap = await getDoc(doc(db, "Users", user.uid));
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setPictures(userData.Pictures);
            }
        }
        if (user && user.uid) {
            getUserInfo();
        }
    }, [user])

    useEffect(() => {
        const getLocation = () => {
            if (location.pathname === "/find") { setHiddenHeader(true); }
            else { setHiddenHeader(false) }

            if (location.pathname === "/message") { setCurrentLocation("Messages"); }
            else if (location.pathname === "/profile") { setCurrentLocation("Profile"); }
            else if (location.pathname === "/settings") { setCurrentLocation("Settings"); }
            else if (location.pathname.includes("/notification")) { setCurrentLocation("Notification"); }
            else if (location.pathname === "/tutorial") { setCurrentLocation("Tutorial"); }
            else if (location.pathname === "/editprofile") { setCurrentLocation("Edit Profile"); }
            else if (location.pathname === "/verifyprofile") { setCurrentLocation("Verify Profile"); }
            else if (location.pathname === "/profilepreview") { setCurrentLocation("My Profile"); }
            else setHiddenHeader(true);

        }
        if (location) {
            getLocation();
        }
    }, [location])


    return (
        <div className=" ">
            {
                !hiddenHeader &&
                <>
                    <div className="bg-pinkLight relative z-[9] md:hidden w-full h-20 rounded-br-xl text-3xl text-white font-semibold py-5">
                        {currentLocation}
                    </div>
                    <div className="bg-pinkLight border-none w-full h-4 md:hidden">
                        <div className="bg-[#FFFBFE] w-full h-4 rounded-tl-full"></div>
                    </div>
                </>
            }
            <div className={`w-full z-[9999] hidden md:flex bg-[#000000]/80 justify-between items-center transition-all px-5 md:px-10 lg:px-16 `} >
                <img onClick={() => goToPage("/profile")} src={Logo} alt="LogoImg" className="cursor-pointer w-40 justify-start py-5" />
                <div className="hidden xl:flex w-full text-start text-white text-xl 2xl:text-2xl 2xl:gap-2 mx-16 ">
                    <div onClick={() => goToPage("/find")} className={`${location.pathname === "/find" || location.pathname === "/likedUsers/:id" || location.pathname.includes("likedUsers") ? "border-t-pinkLight text-pinkLight" : "border-t-[#000000]/10"} cursor-pointer  border-t-4 hover:border-t-pinkLight px-3 py-6 xl:py-10 hover:text-pinkLight  `}>
                        Browse Profiles
                    </div>
                    <div onClick={() => goToPage("/message")} className={`${location.pathname === "/message" ? "border-t-pinkLight text-pinkLight" : "border-t-[#000000]/10"}  cursor-pointer border-t-4 hover:border-t-pinkLight px-3 py-6 xl:py-10 hover:text-pinkLight  `}>
                        Messages
                    </div>
                    <div onClick={() => goToPage("/notification/matches")} className={`${location.pathname.includes("/notification") ? "border-t-pinkLight text-pinkLight" : "border-t-[#000000]/10"}  cursor-pointer border-t-4 hover:border-t-pinkLight px-3 py-6 xl:py-10 hover:text-pinkLight  `}>
                        Notification
                    </div>
                    <div onClick={() => goToPage("/profile")} className={`${location.pathname === "/profile" || location.pathname === "/profilepreview" ? "border-t-pinkLight text-pinkLight" : "border-t-[#000000]/10"}  cursor-pointer border-t-4 hover:border-t-pinkLight px-3 py-6 xl:py-10 hover:text-pinkLight  `}>
                        Profile
                    </div>
                    <div onClick={() => goToPage("/settings")} className={`${location.pathname === "/settings" ? "border-t-pinkLight text-pinkLight" : "border-t-[#000000]/10"}  cursor-pointer border-t-4 hover:border-t-pinkLight px-3 py-6 xl:py-10 hover:text-pinkLight `}>
                        Settings
                    </div>
                </div>

                <div className="cursor-pointer" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                    {
                        pictures[0] && pictures[0]["url"] !== "" ?
                            <img src={pictures[0]["url"]} alt="avatar" className="w-11 h-10 md:w-12 md:h-11 xl:w-14 xl:h-11 2xl:w-20 2xl:h-16 object-cover rounded-full" />
                            :
                            <img src={Avatar} alt="avatar" className="w-11 md:w-12 xl:w-14 2xl:w-20 overflow-hidden rounded-full" />
                    }
                </div>
            </div >

            <div className="md:hidden fixed z-[9] items-center grid grid-cols-4 bottom-0 bg-white w-full h-20 shadow-3xl shadow-pinkLight/50">
                <div onClick={() => goToPage("/find")} className={`${location.pathname === "/find" || location.pathname === "/likedUsers/:id" || location.pathname.includes("likedUsers") ? "text-pinkLight" : "text-[#5a5a5a]"} text-xl mx-auto cursor-pointer`}>
                    <BsFire />
                </div>
                <div onClick={() => goToPage("/message")} className={`${location.pathname === "/message" ? "text-pinkLight" : "text-[#5a5a5a]"} text-xl mx-auto cursor-pointer`}>
                    <BsFillChatDotsFill />
                </div>
                <div onClick={() => goToPage("/notification/matches")} className={`${location.pathname.includes("/notification") ? "text-pinkLight" : "text-[#5a5a5a]"} text-xl mx-auto cursor-pointer`}>
                    <FaBell />
                </div>
                <div onClick={() => goToPage("/profile")} className="rounded-full border-[0.1px] border-pinkLight p-1 mx-auto cursor-pointer">
                    {
                        pictures[0] && pictures[0]["url"] !== "" ?
                            <img src={pictures[0]["url"]} alt="pictures" className="w-10 h-10 rounded-full object-cover" />
                            :
                            <img src={Avatar} alt="avatar" className="w-10 md:w-10 overflow-hidden rounded-full" />
                    }
                </div>
            </div>
            {showMobileMenu &&
                <div ref={menuDropdown} className={`absolute border-[0.1px] border-black/50 transition-all duration-300 top-20 right-1 md:right-9 lg:right-14 xl:top-[110px] bg-white rounded-lg flex flex-col z-[9999] text-start`}>
                    <div onClick={() => goToPage("/find")} className=" cursor-pointer py-1 px-5 hover:text-white hover:bg-pinkLight items-center flex gap-2">
                        <RiPhoneFindFill />
                        Browse Profiles
                    </div>
                    <div onClick={() => goToPage("/message")} className=" cursor-pointer py-1 px-5 hover:text-white hover:bg-pinkLight items-center flex gap-2">
                        <FaRocketchat />
                        Message
                    </div>
                    <div onClick={() => goToPage("/notification/matches")} className=" cursor-pointer py-1 px-5 hover:text-white hover:bg-pinkLight items-center flex gap-2">
                        <FaBell />
                        Notification
                    </div>
                    <div onClick={() => goToPage("/profile")} className=" cursor-pointer py-1 px-5 hover:text-white hover:bg-pinkLight items-center border-t-[0.1px] border-dotted border-t-[#888888] flex gap-2">
                        <FaIdCard />
                        My profile
                    </div>
                    <div onClick={() => goToPage("/settings")} className=" cursor-pointer py-1 px-5 hover:text-white hover:bg-pinkLight items-center flex gap-2">
                        <DiAptana />
                        Settings
                    </div>
                    <div className=" py-1 px-5 hover:text-white hover:bg-pinkLight items-center border-t-[0.1px] border-dotted border-t-[#888888] flex gap-2 cursor-pointer" onClick={() => {
                        logOut();
                    }}>
                        <FaSignOutAlt />
                        Sign out
                    </div>
                </div>}
        </div>
    )
}