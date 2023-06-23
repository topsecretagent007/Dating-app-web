import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBell, FaRocketchat, FaIdCard, FaSignOutAlt } from "react-icons/fa";
import { RiPhoneFindFill } from "react-icons/ri";
import { DiAptana } from "react-icons/di";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Logo from "../../assets/Logo.png"
import Avatar from "../../assets/avatar.png";

export default function Header() {
    const navigate = useNavigate();
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { user, logOut } = UserAuth();
    const [pictures, setPictures] = useState([]);
    const [page, setPage] = useState("");


    const goToPage = (url) => {
        navigate(url);
    }

    const menuDropdown = useRef(null);

    useEffect(() => {
        function handleScroll() {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
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



    return (
        <div className="relative ">
            <div className={`w-full fixed z-[9999] flex bg-[#000000]/80 justify-between items-center transition-all duration-300 px-5 md:px-10 lg:px-16 ${visible ? 'top-0' : '-translate-y-full'}`} >
                <img onClick={() => goToPage("/")} src={Logo} alt="LogoImg" className="cursor-pointer w-40 justify-start py-5" />
                <div className="hidden xl:flex w-full text-start text-white text-xl 2xl:text-2xl 2xl:gap-2 mx-16 ">
                    <div onClick={() => goToPage("/")} className={`${page === "/" ? "border-t-pinkLight text-pinkLight" : "border-t-[#000000]/10"} cursor-pointer border-t-4  hover:border-t-pinkLight px-3 py-6 xl:py-10 hover:text-pinkLight  `} >
                        Home
                    </div>
                    <div onClick={() => goToPage("/find")} className={`${page === "/find" ? "border-t-pinkLight text-pinkLight" : "border-t-[#000000]/10"} cursor-pointer border-t-4 hover:border-t-pinkLight px-3 py-6 xl:py-10 hover:text-pinkLight  `}>
                        Browse Profiles
                    </div>
                    <div onClick={() => goToPage("/message")} className={`${page === "/message" ? "border-t-pinkLight text-pinkLight" : "border-t-[#000000]/10"} cursor-pointer border-t-4 hover:border-t-pinkLight px-3 py-6 xl:py-10 hover:text-pinkLight  `}>
                        Messages
                    </div>
                    <div onClick={() => goToPage("/notification")} className={`${page === "/notification" ? "border-t-pinkLight text-pinkLight" : "border-t-[#000000]/10"} cursor-pointer border-t-4 hover:border-t-pinkLight px-3 py-6 xl:py-10 hover:text-pinkLight  `}>
                        Notification
                    </div>
                    <div onClick={() => goToPage("/profile")} className={`${page === "/profile" ? "border-t-pinkLight text-pinkLight" : "border-t-[#000000]/10"} cursor-pointer border-t-4 hover:border-t-pinkLight px-3 py-6 xl:py-10 hover:text-pinkLight  `}>
                        Profile
                    </div>
                    <div onClick={() => goToPage("/settings")} className={`${page === "/settings" ? "border-t-pinkLight text-pinkLight" : "border-t-[#000000]/10"} cursor-pointer border-t-4 hover:border-t-pinkLight px-3 py-6 xl:py-10 hover:text-pinkLight `}>
                        Settings
                    </div>
                </div>

                <div className="cursor-pointer" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                    {
                        pictures[0] && pictures[0]["url"] != "" ?
                            <img src={pictures[0]["url"]} className="w-11 h-10 md:w-12 md:h-11 xl:w-14 xl:h-11 2xl:w-20 2xl:h-16 object-cover rounded-full" />
                            :
                            <img src={Avatar} className="w-11 md:w-12 xl:w-14 2xl:w-20 overflow-hidden rounded-full" />
                    }
                </div>


            </div >
            {showMobileMenu &&
                <div ref={menuDropdown} className={`absolute transition-all duration-300 top-20 right-1 md:right-9 lg:right-14 xl:top-[110px] bg-white rounded-lg flex flex-col z-[9999] text-start`}>
                    <div onClick={() => goToPage("/")} className="cursor-pointer py-1 px-5 hover:text-white hover:bg-pinkLight items-center flex gap-2">
                        <FaHome />
                        Home
                    </div>
                    <div onClick={() => goToPage("/find")} className="cursor-pointer py-1 px-5 hover:text-white hover:bg-pinkLight items-center flex gap-2">
                        <RiPhoneFindFill />
                        Browse Profiles
                    </div>
                    <div onClick={() => goToPage("/message")} className="cursor-pointer py-1 px-5 hover:text-white hover:bg-pinkLight items-center flex gap-2">
                        <FaRocketchat />
                        Message
                    </div>
                    <div onClick={() => goToPage("/notification")} className="cursor-pointer py-1 px-5 hover:text-white hover:bg-pinkLight items-center flex gap-2">
                        <FaBell />
                        Notification
                    </div>
                    <div onClick={() => goToPage("/profile")} className="cursor-pointer py-1 px-5 hover:text-white hover:bg-pinkLight items-center border-t-[0.1px] border-dotted border-t-[#888888] flex gap-2">
                        <FaIdCard />
                        My profile
                    </div>
                    <div onClick={() => goToPage("/settings")} className="cursor-pointer py-1 px-5 hover:text-white hover:bg-pinkLight items-center flex gap-2">
                        <DiAptana />
                        Settings
                    </div>
                    <div className="py-1 px-5 hover:text-white hover:bg-pinkLight items-center border-t-[0.1px] border-dotted border-t-[#888888] flex gap-2" onClick={() => {
                        logOut();
                    }}>
                        <FaSignOutAlt />
                        Sign out
                    </div>
                </div>}
        </div>
    )
}