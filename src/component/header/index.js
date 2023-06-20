import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { FaHome, FaBell, FaRocketchat, FaIdCard, FaSignOutAlt } from "react-icons/fa";
import { RiPhoneFindFill } from "react-icons/ri";
import { DiAptana } from "react-icons/di";

import Logo from "../../assets/Logo.png"
import Avatar from "../../assets/istockphoto-1167582073-612x6121.png"


export default function Header() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

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


    return (
        <div className="relative ">
            <div className={`w-full fixed z-[9999] flex bg-[#000000]/80 justify-between items-center transition-all duration-300 px-5 md:px-10 lg:px-16 ${visible ? 'top-0' : '-translate-y-full'}`} >
                <img src={Logo} alt="LogoImg" className="w-40 justify-start py-5" />
                <div className="hidden xl:flex w-full text-start text-white text-xl 2xl:text-2xl 2xl:gap-2 mx-16 ">
                    <div className="border-t-2 border-t-[#000000]/10 hover:border-t-pinkLight px-3 py-6 xl:py-10">
                        <Link to='/' className="">Home</Link>
                    </div>
                    <div className="border-t-2 border-t-[#000000]/10 hover:border-t-pinkLight px-3 py-6 xl:py-10 hover:text-pinkLight focus:border-t-pinkLight focus:text-pinkLight">
                        <Link to='/find' className="">Browse Profiles</Link>
                    </div>
                    <div className="border-t-2 border-t-[#000000]/10 hover:border-t-pinkLight px-3 py-6 xl:py-10">
                        <Link to='/message' className="">Messages</Link>
                    </div>
                    <div className="border-t-2 border-t-[#000000]/10 hover:border-t-pinkLight px-3 py-6 xl:py-10">
                        <Link to='/notification' className="">Notification</Link>
                    </div>
                    <div className="border-t-2 border-t-[#000000]/10 hover:border-t-pinkLight px-3 py-6 xl:py-10">
                        <Link to='/profile' className="">Profile</Link>
                    </div>
                    <div className="border-t-2 border-t-[#000000]/10 hover:border-t-pinkLight px-3 py-6 xl:py-10">
                        <Link to='/settings' className="">Settings</Link>
                    </div>
                </div>

                <div className="" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                    <img src={Avatar} className="w-11 md:w-12 xl:w-14 2xl:w-20 overflow-hidden rounded-full" />
                </div>


            </div >
            {showMobileMenu &&
                <div ref={menuDropdown} className={`absolute transition-all duration-300 top-20 right-1 md:right-9 lg:right-14 xl:top-[110px] bg-white rounded-lg flex flex-col z-[9999] text-start`}>
                    <Link to='/' className="py-1 px-5 hover:text-white hover:bg-pinkLight items-center flex gap-2">
                        <FaHome />
                        Home
                    </Link>
                    <Link to='/find' className="py-1 px-5 hover:text-white hover:bg-pinkLight items-center flex gap-2">
                        <RiPhoneFindFill />
                        BrowserRouter
                    </Link>
                    <Link to='/message' className="py-1 px-5 hover:text-white hover:bg-pinkLight items-center flex gap-2">
                        <FaRocketchat />
                        Message
                    </Link>
                    <Link to='/notification' className="py-1 px-5 hover:text-white hover:bg-pinkLight items-center flex gap-2">
                        <FaBell />
                        Notification
                    </Link>
                    <Link to='/profile' className="py-1 px-5 hover:text-white hover:bg-pinkLight items-center border-t-[0.1px] border-dotted border-t-[#888888] flex gap-2">
                        <FaIdCard />
                        My profile
                    </Link>
                    <Link to='/settings' className="py-1 px-5 hover:text-white hover:bg-pinkLight items-center flex gap-2">
                        <DiAptana />
                        Settings
                    </Link>
                    <Link to='' className="py-1 px-5 hover:text-white hover:bg-pinkLight items-center border-t-[0.1px] border-dotted border-t-[#888888] flex gap-2">
                        <FaSignOutAlt />
                        Sign out
                    </Link>
                </div>}
        </div>
    )
}