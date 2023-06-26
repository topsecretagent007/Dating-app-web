import React, { useEffect, useState, useRef } from "react";
import { FiPlus, FiSave } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import { MdDelete, MdVideoLibrary, MdNotifications } from "react-icons/md";
import { GoChevronRight } from "react-icons/go";
import { HiUsers } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import PatnerUser from "../component/users/partnerUser";
import GoolgleMap from "../component/other/maps";
import InviteModal from "../component/modal/invitemodal";
import LogoutModal from "../component/modal/logoutmodal";
import DeleteModal from "../component/modal/deletemodal";
import ContactModal from "../component/modal/contactmodal";
import AddPartnerModal from "../component/modal/addpartnermodal";
import PhoneVerification from "../component/modal/phoneverification";
import SettingShow from "../component/combox/settingshow";
import Distance from "../component/other/distance";
import AgeRange from "../component/other/agerange";
import Header from "../component/header/index";
import Footer from "../component/footer/index";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import LoadingModal from "../component/loadingPage";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { showData } from "../config/constant";

export default function SettingsPage() {
    const navigate = useNavigate();
    const { user } = UserAuth();
    const [inviteModal, setInviteModal] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [contactModal, setContactModal] = useState(false);
    const [addPartnerModal, setAddPartnerModal] = useState(false);
    const [phoneVerification, setPhoneVerification] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const menuDropdown = useRef(null);
    const [phoneNumber, setPhoneNumber] = useState();
    const [loading, setLoading] = useState(false);
    const [firstAge, setFirstAge] = useState(18);
    const [lastAge, setLastAge] = useState(99);
    const [distance, setDistance] = useState(0);
    const [miles, setMiles] = useState(false);
    const [address, setAddress] = useState('');
    const [countryID, setCountryID] = useState('');
    const [countryName, setCountryName] = useState('');
    const [userShow, setUserShow] = useState([]);

    const SettingSave = async () => {
        setLoading(true);
        await updateDoc(doc(db, "Users", user.uid), {
            age_range: {
                max: lastAge,
                min: firstAge
            },
            showGender: userShow,
            location: {
                address: address,
                countryID: countryID,
                countryName: countryName
            },
            maximum_distance: distance,
            miles: miles,
        });
        setLoading(false);
    }

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
        setLoading(true);
        const getUserInfo = async () => {
            const docSnap = await getDoc(doc(db, "Users", user.uid));
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setFirstAge(userData.age_range?.min);
                setLastAge(userData.age_range?.max);
                setPhoneNumber(userData.phoneNumber);
                setDistance(userData.maximum_distance);
                setMiles(userData.miles);
                setAddress(userData.location?.address);
                setCountryID(userData.location?.countryID);
                setCountryName(userData.location?.countryName);
                setUserShow(userData.showGender);
                setLoading(false);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        if (user && user.uid) {
            console.log(user)
            getUserInfo();
        }
    }, [user])

    const goToPage = (url) => {
        navigate(url);
    }

    return (
        <div>
            <Header />
            <div className="w-full h-full bg-cover flex bg-[#FFFBFE] justify-center min-h-screen pb-40 lg:pb-64 pt-28" >
                <div className="w-[300px] md:w-[600px] xl:w-[1300px] 2xl:w-[2250px] px-5 xl:px-20 mx-auto xl:pt-32 xl:flex gap-12">
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
                                <div onClick={() => setPhoneVerification(!phoneVerification)} className="text-sm lg:text-lg gap-6 py-2 xl:texl-xl justify-between text-start flex items-center cursor-pointer">
                                    <div className="w-full justify-between md:flex pl-5">
                                        <div className="justify-start w-full">Phone Number</div>
                                        <div className="justify-end md:text-end w-full">{phoneNumber}</div>
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
                                    <button onClick={() => setAddPartnerModal(!addPartnerModal)} className="w-full  justify-center xl:text-xl rounded-full py-2 px-10 xl:py-4 xl:px-12  mx-auto items-center flex text-white bg-pinkLight hover:bg-pinkLight/80 font-bold">
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
                                        <div className="justify-end md:text-end w-full text-blue-500 font-bold">{address} {countryID} {countryName}</div>
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
                                <SettingShow text="Show me " value={userShow} items={showData} onHandleChange={e => setUserShow(e)} multiple={true} />
                                <div className="gap-6 py-1 justify-between text-start items-center border-b-2 border-b-black/5">
                                    <div className="w-full pl-5 text-sm xl:text-lg py-2">
                                        <div className="justify-start w-full font-bold">Maximum distance</div>
                                        <Distance distance={distance} miles={miles} onMiles={e => setMiles(e)} onDistance={e => setDistance(e)} />
                                    </div>
                                </div>
                                <div className="text-sm lg:text-lg gap-6 xl:texl-xl justify-between text-start items-center">
                                    <div className="w-full pl-5 py-">
                                        <div className="justify-start w-full font-bold">Age range</div>
                                        <AgeRange first={firstAge} last={lastAge} onFirstAge={e => setFirstAge(e)} onLastAge={e => setLastAge(e)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full xl:w-1/3  md:px-14 xl:px-5">
                        <button onClick={() => goToPage("/notification")} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-black rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                            <div className="w-48 xl:w-64 items-center flex">
                                <div className="w-1/6">
                                    <MdNotifications />
                                </div>
                                <div className="w-5/6 text-start font-bold">
                                    Notifications
                                </div>
                            </div>
                        </button>
                        <button onClick={() => setInviteModal(!inviteModal)} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-pinkLight rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                            <div className="w-48 xl:w-64 items-center flex">
                                <div className="w-1/6">
                                    <HiUsers />
                                </div>
                                <div className="w-5/6 text-start font-bold">
                                    Invite your friends
                                </div>
                            </div>
                        </button>
                        <button onClick={() => setLogoutModal(!logoutModal)} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-black rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                            <div className="w-48 xl:w-64 items-center flex">
                                <div className="w-1/6">
                                    <FaSignOutAlt />
                                </div>
                                <div className="w-5/6 text-start font-bold">
                                    Log out
                                </div>
                            </div>
                        </button>
                        <button onClick={() => setDeleteModal(!deleteModal)} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-pinkLight rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                            <div className="w-48 xl:w-64 items-center flex">
                                <div className="w-1/6">
                                    <MdDelete />
                                </div>
                                <div className="w-5/6 text-start font-bold">
                                    Delete Account
                                </div>
                            </div>
                        </button>
                        <button onClick={() => setContactModal(!contactModal)} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-black rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                            <div className="w-48 xl:w-64 items-center flex">
                                <div className="w-1/6">
                                    <AiOutlineMail />
                                </div>
                                <div className="w-5/6 text-start font-bold">
                                    Contact
                                </div>
                            </div>
                        </button>
                        <button onClick={() => goToPage("/tutorial")} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-pinkLight rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                            <div className="w-48 xl:w-64 items-center flex">
                                <div className="w-1/6">
                                    <MdVideoLibrary />
                                </div>
                                <div className="w-5/6 text-start font-bold">
                                    Tutorial
                                </div>
                            </div>
                        </button>
                        <button onClick={() => SettingSave()} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-pinkLight rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                            <div className="w-48 xl:w-64 items-center flex">
                                <div className="w-1/6">
                                    <FiSave />
                                </div>
                                <div className="w-5/6 text-start font-bold">
                                    Save
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                {
                    inviteModal &&
                    <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                        <div className="w-full h-screen bg-cover flex px-8  justify-center items-center bg-black/90" >
                            <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                                <InviteModal />
                            </div>
                        </div >
                    </div>
                }
                {
                    logoutModal &&
                    <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                        <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                            <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                                <LogoutModal />
                            </div>
                        </div >
                    </div>
                }
                {
                    deleteModal &&
                    <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                        <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                            <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                                <DeleteModal />
                            </div>
                        </div >
                    </div>
                }
                {
                    contactModal &&
                    <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                        <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                            <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                                <ContactModal />
                            </div>
                        </div >
                    </div>
                }
                {
                    addPartnerModal &&
                    <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                        <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                            <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                                <AddPartnerModal />
                            </div>
                        </div >
                    </div>
                }
                {
                    phoneVerification &&
                    <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                        <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                            <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                                <PhoneVerification />
                            </div>
                        </div >
                    </div>
                }
            </div >
            <Footer />
            {
                loading &&
                <LoadingModal />
            }
        </div >
    )
}