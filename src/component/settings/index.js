import React, { useEffect, useState, useRef } from "react";
import { Slider } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FiPlus, FiChevronUp, FiChevronDown, FiCopy } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import { MdDelete, MdVideoLibrary, MdNotifications } from "react-icons/md";
import { GoChevronRight } from "react-icons/go";
import { HiUsers } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import PatnerUser from "../users/partnerUser"

import GoolgleMap from "./maps";
import InviteModal from "./modal/invitemodal";
import LogoutModal from "./modal/logoutmodal";
import DeleteModal from "./modal/deletemodal";
import ContactModal from "./modal/contactmodal";
import AddPartnerModal from "./modal/addpartnermodal";
import PhoneVerification from "./modal/phoneverification";


export default function ProfileSetting() {
    const [inputAge, setInputAge] = useState("");
    const [inviteModal, setInviteModal] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [contactModal, setContactModal] = useState(false);
    const [addPartnerModal, setAddPartnerModal] = useState(false);
    const [phoneVerification, setPhoneVerification] = useState(false);
    const [length, setLength] = useState(50);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [swich, serSwich] = useState(false);
    const [unit, setUnit] = useState('');

    const handleToggle = () => {
        alert("fgfg");
        setIsChecked(!isChecked);
    };

    const totalLength = async (e) => {
        e.preventDefault();
        await setLength(e);
        console.log("max", e)
    }
    const menuDropdown = useRef(null)

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
                setInviteModal(false);
                setLogoutModal(false);
                setDeleteModal(false);
                setContactModal(false);
                setAddPartnerModal(false);
                setPhoneVerification(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuDropdown]);

    useEffect(() => {
        if (swich === true)
            setUnit("Miles")
        else
            setUnit("Km")
    }, [swich])

    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: 36,
        height: 20,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#E50AAC',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#E50AAC',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 16,
            height: 16,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));
    // onClick={() => serSwich(!swich)}
    return (
        <div className="w-full h-full bg-cover flex bg-[#f1f1f1] justify-center min-h-screen pb-48 md:pb-36 lg:pb-32 xl:pb-28" >
            <div className="w-[300px] md:w-[600px] xl:w-[1300px] 2xl:w-[2250px] px-5 pt-[103px] mx-auto xl:pt-32 xl:flex gap-12">
                <div className="w-full xl:w-2/3">
                    <div className="w-full  xl:flex gap-5">
                        <div className="w-full xl:w-1/2 rounded-xl bg-white border-2 border-black/5 mb-5">
                            <div className="text-lg lg:text-xl xl:text-2xl py-4 text-start font-bold border-b-2 border-b-black/5">
                                <div className="px-5">Account Settings</div>
                            </div>
                            <a href="/verifyprofile" className="text-sm lg:text-lg gap-6 py-2 xl:texl-xl justify-between text-start flex items-center border-b-2 border-b-black/5 cursor-pointer">
                                <div className="w-full justify-between flex pl-5">
                                    <div className="justify-start w-full">Verification Status</div>
                                    <div className="justify-end text-red-600">Unverified</div>
                                </div>
                                <div className="justify-end pr-5">
                                    <GoChevronRight />
                                </div>
                            </a>
                            <div className="text-sm lg:text-lg gap-6 py-2 xl:texl-xl justify-between text-start flex items-center border-b-2 border-b-black/5 cursor-pointer">
                                <div className="w-full justify-between flex pl-5">
                                    <div className="justify-start w-full">Verification Profile</div>
                                    <div className="justify-end text-green-600">Verified</div>
                                </div>
                                <div className="justify-end pr-5">
                                    <GoChevronRight />
                                </div>
                            </div>
                            <div onClick={() => setPhoneVerification(!phoneVerification)} className="text-sm lg:text-lg gap-6 py-2 po xl:texl-xl justify-between text-start flex items-center cursor-pointer">
                                <div className="w-full justify-between md:flex pl-5">
                                    <div className="justify-start w-full">Phone Number</div>
                                    <div className="justify-end md:text-end w-full">+1 661 237 3792</div>
                                </div>
                                <div className="justify-end pr-5">
                                    <GoChevronRight />
                                </div >
                            </div>
                        </div>
                        <div className="w-full xl:w-1/2 rounded-xl bg-white border-2 border-black/5 mb-5">
                            <div className="text-lg lg:text-xl xl:text-2xl py-4 text-start font-bold border-b-2 border-b-black/5">
                                <div className="px-5">Partner</div>
                            </div>
                            <div className="text-sm lg:text-lg gap-6 py-2 xl:texl-xl justify-between text-start flex items-center hover:bg-[#bebebe] hover:border-l-pinkLight border-b-2 border-l-white border-l-2 border-b-black/5 cursor-pointer">
                                <PatnerUser />
                            </div>
                            <div className="text-sm lg:text-lg gap-6 py-2 px-10 xl:texl-xl justify-between text-start flex items-center">
                                <button onClick={() => setAddPartnerModal(!addPartnerModal)} className="w-full  justify-center xl:text-xl rounded-full py-2 px-10 xl:py-4 xl:px-20  mx-auto items-center flex text-white bg-pinkLight hover:bg-pinkLight/80 font-bold">
                                    <FiPlus />
                                    Add Partner
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full xl:flex gap-5 pb-10">
                        <div className="w-full xl:w-1/2 rounded-xl bg-white border-2 border-black/5">
                            <div className="text-lg lg:text-xl xl:text-2xl py-4 text-start font-bold border-b-2 border-b-black/5">
                                <div className="px-5">Account Settings</div>
                            </div>
                            <div className="text-sm gap-6 py-2 lg:texl-lg justify-between text-start flex items-center border-b-2 border-b-black/5 cursor-pointer">
                                <div className="w-full justify-between md:flex pl-5">
                                    <div className="justify-start w-full">Current location</div>
                                    <div className="justify-end md:text-end w-full">Denver CO United States, 80260</div>
                                </div>
                                <div className="justify-end pr-5">
                                    <GoChevronRight />
                                </div>

                            </div>
                            <div className="p-5">
                                <GoolgleMap />
                            </div>
                        </div>
                        <div className="w-full xl:w-1/2 rounded-xl bg-white border-2 border-black/5">
                            <div className="text-lg lg:text-xl xl:text-2xl py-4 text-start font-bold border-b-2 border-b-black/5">
                                <div className="px-5">Search settings</div>
                            </div>
                            <a href="/profile" className="text-sm gap-6 py-2 lg:texl-lg justify-between text-start flex items-center border-b-2 border-b-black/5 cursor-pointer">
                                <div className="w-full justify-between lg:flex pl-5 items-center">
                                    <div className="justify-start w-full">Show me</div>
                                    <div className="justify-end w-full">WOMAN, WOMAN + WOMAN COUPLE</div>
                                </div>
                                <div className="justify-end pr-5">
                                    <GoChevronRight />
                                </div>
                            </a>
                            <div className="gap-6 py-1 justify-between text-start items-center border-b-2 border-b-black/5">
                                <div className="w-full pl-5 text-sm xl:text-lg py-2">
                                    <div className="justify-start w-full">Maximum distance</div>
                                    <div className="p-3">
                                        <div className="justify-start">308{unit}</div>
                                        <Slider size="sm" defaultValue={length} onChange={(e) => totalLength(e)} />
                                        <div className="justify-start flex gap-4 items-center mt-5">
                                            <div>Miles</div>
                                            <div className="relative inline-flex items-center cursor-pointer">
                                                <FormControlLabel
                                                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked  />}
                                                    // onClick={() => serSwich(!swich)}
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm lg:text-lg gap-6 xl:texl-xl justify-between text-start items-center">
                                <div className="w-full pl-5 py-">
                                    <div className="justify-start w-full">Age range</div>
                                    <div className="justify-start grid grid-cols-3 md:grid-cols-4 2xl:grid-cols-4 gap-4 items-center py-3">
                                        <div className="text-sm font-bold">
                                            <div className="text-start py-2">
                                                From
                                            </div>
                                            <div className="flex items-center text-pinkLight bg-[#f3f3f3] rounded-xl">
                                            <input type="number" className="rounded-l-xl w-full bg-[#F3F3F3] px-2 py-4 text-right" placeholder="18" min="18" max="99" />
                                                <div className="bg-[#f3f3f3] pr-3 p-1">
                                                    <FiChevronUp />
                                                    <FiChevronDown />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm font-bold">
                                            <div className="text-start py-2">
                                                To
                                            </div>
                                            <div className="flex items-center text-pinkLight bg-[#f3f3f3] rounded-xl">
                                            <input type="number" className="rounded-l-xl w-full bg-[#F3F3F3] px-2 py-4 text-right" placeholder="99" min="18" max="99" />
                                                <div className="bg-[#f3f3f3] pr-3 p-1">
                                                    <FiChevronUp />
                                                    <FiChevronDown />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full xl:w-1/3">
                    <a href="/notification">
                        <button className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-black rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-[#888888] hover:text-white">
                            <div className="w-48 xl:w-64 items-center flex">
                                <div className="w-1/6">
                                    <MdNotifications />
                                </div>
                                <div className="w-5/6 font-bold">
                                    Notifications
                                </div>
                            </div>
                        </button>
                    </a>
                    <button onClick={() => setInviteModal(!inviteModal)} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-pinkLight rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                        <div className="w-48 xl:w-64 items-center flex">
                            <div className="w-1/6">
                                <HiUsers />
                            </div>
                            <div className="w-5/6 font-bold">
                                Invite your friends
                            </div>
                        </div>
                    </button>
                    <button onClick={() => setLogoutModal(!logoutModal)} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-black rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-[#888888] hover:text-white">
                        <div className="w-48 xl:w-64 items-center flex">
                            <div className="w-1/6">
                                <FaSignOutAlt />
                            </div>
                            <div className="w-5/6 font-bold">
                                Log out
                            </div>
                        </div>
                    </button>
                    <button onClick={() => setDeleteModal(!deleteModal)} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-pinkLight rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                        <div className="w-48 xl:w-64 items-center flex">
                            <div className="w-1/6">
                                <MdDelete />
                            </div>
                            <div className="w-5/6 font-bold">
                                Delete Account
                            </div>
                        </div>
                    </button>
                    <button onClick={() => setContactModal(!contactModal)} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-black rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-[#888888] hover:text-white">
                        <div className="w-48 xl:w-64 items-center flex">
                            <div className="w-1/6">
                                <AiOutlineMail />
                            </div>
                            <div className="w-5/6 font-bold">
                                Contact
                            </div>
                        </div>
                    </button>
                    <a href="/tutorial">
                        <button className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-pinkLight rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                            <div className="w-48 xl:w-64 items-center flex">
                                <div className="w-1/6">
                                    <MdVideoLibrary />
                                </div>
                                <div className="w-5/6 font-bold">
                                    Tutorial
                                </div>
                            </div>
                        </button>
                    </a>
                </div>
            </div>

            {
                inviteModal &&
                <div className={`fixed z-50 w-full h-full min-h-screen `}>
                    <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                            <InviteModal />
                        </div>
                    </div >
                </div>
            }
            {
                logoutModal &&
                <div className={`fixed z-50 w-full h-full min-h-screen `}>
                    <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                            <LogoutModal />
                        </div>
                    </div >
                </div>
            }
            {
                deleteModal &&
                <div className={`fixed z-50 w-full h-full min-h-screen `}>
                    <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                            <DeleteModal />
                        </div>
                    </div >
                </div>
            }
            {
                contactModal &&
                <div className={`fixed z-50 w-full h-full min-h-screen `}>
                    <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                            <ContactModal />
                        </div>
                    </div >
                </div>
            }
            {
                addPartnerModal &&
                <div className={`fixed z-50 w-full h-full min-h-screen `}>
                    <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                            <AddPartnerModal />
                        </div>
                    </div >
                </div>
            }
            {
                phoneVerification &&
                <div className={`fixed z-50 w-full h-full min-h-screen `}>
                    <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                            <PhoneVerification />
                        </div>
                    </div >
                </div>
            }
        </div >
    )
}