import React, { useEffect, useState, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import { MdDelete, MdVideoLibrary, MdNotifications } from "react-icons/md";
import { GoChevronRight } from "react-icons/go";
import { HiUsers } from "react-icons/hi";
import { AiOutlineMail, AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import GoolgleMap from "../component/other/maps";
import NotificationModal from "../component/modal/notificationmodal";
import InviteModal from "../component/modal/invitemodal";
import CountryChangeModal from "../component/modal/ChangCountry";
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
import { doc, updateDoc, getDoc, collection, getDocs, setDoc } from "firebase/firestore";
import { showData } from "../config/constant";
import { usePrompt } from '../hooks/useCallbackPrompt'

export default function SettingsPage() {
    const [showDialog, setShowDialog] = useState(false);
    const onConfirmFunc = async () => {
        await SettingSave();
    }
    usePrompt(showDialog, onConfirmFunc);
    const navigate = useNavigate();
    const { user } = UserAuth();
    const [inviteModal, setInviteModal] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [contactModal, setContactModal] = useState(false);
    const [addPartnerModal, setAddPartnerModal] = useState(false);
    const [phoneVerification, setPhoneVerification] = useState(false);
    const [notificationModal, setNotificationModal] = useState(false);
    const [locationModal, setLocationModal] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const menuDropdown = useRef(null);
    const [phoneNumber, setPhoneNumber] = useState();
    const [loading, setLoading] = useState(false);
    const [firstAge, setFirstAge] = useState(18);
    const [lastAge, setLastAge] = useState(99);
    const [distance, setDistance] = useState(0);
    const [pointLatitude, setPointLatitude] = useState(0);
    const [pointLongitude, setPointLongitude] = useState(0);
    const [currentMiles, setCurrentMiles] = useState(false);
    const [address, setAddress] = useState(null);
    const [countryID, setCountryID] = useState(null);
    const [countryName, setCountryName] = useState(null);
    const [userShow, setUserShow] = useState([]);
    const [userVerified, setUserVerified] = useState(false);
    const [matches, setMatches] = useState([]);
    const [partnerData, setPartnerData] = useState([]);
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [mNotification, setMNotification] = useState(null);
    const [cNotification, setCNotification] = useState(null);
    const [lNotification, setLNotification] = useState(null);


    const modalClose = () => {
        setLogoutModal(false);
        setDeleteModal(false);
        setContactModal(false);
    }

    const SettingSave = async () => {
        setLoading(true);
        await updateDoc(doc(db, "Users", user.uid), {
            age_range: {
                max: lastAge,
                min: firstAge
            },
            showGender: userShow,
            maximum_distance: distance,
            miles: currentMiles,
        });
        setLoading(false);
    }

    const deletePartner = async (usesUid) => {
        setLoading(true);
        await setDoc(doc(db, "Relationship", user.uid), {
            isRelationship: false,
            partner: {
                partnerId: "",
                partnerImage: "",
                partnerName: ""
            },
            updataAt: new Date(),
            userId: user.uid
        });
        await setDoc(doc(db, "Relationship", usesUid), {
            isRelationship: false,
            partner: {
                partnerId: "",
                partnerImage: "",
                partnerName: ""
            },
            updataAt: new Date(),
            userId: usesUid
        });
        setLoading(false);
        getUserInfo();
    }

    const addPartner = async (onPartner) => {
        setLoading(true);
        await setDoc(doc(db, "Relationship", user.uid), {
            isRelationship: true,
            partner: {
                partnerId: onPartner?.reqUid,
                partnerImage: onPartner?.imageUrl,
                partnerName: onPartner?.userName
            },
            pendingAcc: {
                0: {
                    createdAt: new Date(),
                    imageUrl: onPartner?.imageUrl,
                    reqUid: onPartner?.reqUid,
                    userName: onPartner?.userName
                }
            },
            pendingReq: {
                0: {
                    createdAt: new Date(),
                    imageUrl: onPartner?.imageUrl,
                    reqUid: onPartner?.reqUid,
                    userName: onPartner?.userName
                }
            },
            updataAt: new Date(),
            userId: user.uid
        });
        await setDoc(doc(db, "Relationship", onPartner.reqUid), {
            isRelationship: true,
            partner: {
                partnerId: user.uid,
                partnerImage: userImage,
                partnerName: userName
            },
            pendingAcc: {
                0: {
                    createdAt: new Date(),
                    imageUrl: userImage,
                    reqUid: user.uid,
                    userName: userName
                }
            },
            pendingReq: {
                0: {
                    createdAt: new Date(),
                    imageUrl: userImage,
                    reqUid: user.uid,
                    userName: userName
                }
            },
            updataAt: new Date(),
            userId: onPartner.reqUid
        });
        setLoading(false);
        getUserInfo();
    }

    const getUserInfo = async () => {
        setLoading(true);
        const docSnap = await getDoc(doc(db, "Users", user.uid));
        if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserName(userData.UserName);
            setUserImage(userData.Pictures[0]?.url);
            setMNotification(userData.matchesNotification);
            setCNotification(userData.chatNotification);
            setLNotification(userData.likesNotification);
            setFirstAge(userData.age_range?.min);
            setLastAge(userData.age_range?.max);
            setPhoneNumber(userData.phoneNumber);
            setCurrentMiles(userData.miles);
            setPointLatitude(userData.point?.geopoint._lat);
            setPointLongitude(userData.point?.geopoint._long);
            if (userData.miles) {
                setDistance(userData.maximum_distance * 4 / 2.5);
            } else {
                setDistance(userData.maximum_distance);
            }
            setAddress(userData.location?.address);
            setCountryID(userData.location?.countryID);
            setCountryName(userData.location?.countryName);
            setUserShow(userData.showGender);
            setUserVerified(userData.verified === 3);
        }
        const querySnapshot = await getDocs(
            collection(db, "Users", user.uid, "Matches")
        );
        const docAddPartner = await getDoc(doc(db, "Relationship", user.uid));
        if (docAddPartner.exists()) {
            const addPartnerData = docAddPartner.data();
            setPartnerData(addPartnerData);
        }
        const data = querySnapshot.docs.map((doc) => doc.data());
        setMatches(data);
        setLoading(false);
    }

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
                setNotificationModal(false);
                setInviteModal(false);
                setLogoutModal(false);
                setDeleteModal(false);
                setContactModal(false);
                setAddPartnerModal(false);
                setLocationModal(false);
                setPhoneVerification(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuDropdown]);

    useEffect(() => {
        if (user && user.uid) {
            getUserInfo();
        }
    }, [user])

    const listItems = partnerData?.pendingReq !== undefined || partnerData?.pendingAcc !== undefined ?
        <>
            {
                partnerData.isRelationship === false ?
                    <>
                        {
                            partnerData.pendingAcc?.[0]?.reqUid !== undefined &&
                            <>
                                <div className="w-full flex">
                                    <div className="hover:border-l-pinkLight hover:bg-[#bebebe] border-l-white border-l-2 gap-5 flex w-full px-3 py-3 border-b-[0.1px] border-b-black/10 items-center">
                                        <img src={partnerData.pendingAcc[0]?.imageUrl} alt="avatar" className="w-12 h-12 my-auto object-cover rounded-full" />
                                        <div className="w-full block text-[#888888] text-start items-center text-base justify-between md:flex">
                                            <div className="w-36 md:w-44  truncate font-bold">{partnerData.pendingAcc[0]?.userName} (pending)</div>
                                            <button onClick={() => deletePartner(partnerData?.pendingAcc[0]?.reqUid)} className="md:px-3 md:py-2 px-2 py-2 truncate rounded-2xl bg-pinkLight text-white text-base xl:text-lg cursor-pointer ">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        {
                            partnerData.pendingReq?.[0]?.reqUid !== undefined &&
                            <>
                                <div className="w-full flex">
                                    <div className="hover:border-l-pinkLight hover:bg-[#bebebe] border-l-white border-l-2 gap-5 flex w-full px-3 py-3 border-b-[0.1px] border-b-black/10 items-center">
                                        <img src={partnerData.pendingReq[0]?.imageUrl} alt="avatar" className="w-12 h-12 my-auto object-cover rounded-full" />
                                        <div className="w-full block text-[#888888] text-start items-center text-base justify-between md:flex">
                                            <div className="w-36 md:w-44  truncate font-bold">{partnerData.pendingReq[0]?.userName} (Requested)</div>
                                            <div className="justify-center gap-2 flex">
                                                <div onClick={() => addPartner(partnerData.pendingReq[0])} className="p-2 rounded-full bg-green-500 text-black text-lg xl:text-xl cursor-pointer "><AiOutlinePlus /></div>
                                                <div onClick={() => deletePartner(partnerData?.pendingReq[0]?.reqUid)} className=" cursor-pointer p-2 rounded-full bg-pinkLight text-black text-lg xl:text-xl "><AiOutlineClose /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </>
                    :
                    <>
                        <div className="w-full flex">
                            <div className="hover:border-l-pinkLight hover:bg-[#bebebe] border-l-white border-l-2 gap-5 flex w-full px-3 py-3 border-b-[0.1px] border-b-black/10 items-center">
                                <img src={partnerData?.partner?.partnerImage} alt="avatar" className="w-12 h-12 my-auto object-cover rounded-full" />
                                <div className="w-full block text-[#888888] text-start items-center text-base justify-between md:flex">
                                    <div className="w-36 md:w-44  truncate font-bold">{partnerData?.partner?.partnerName}</div>
                                    <button onClick={() => deletePartner(partnerData?.partner?.partnerId)} className="md:px-3 md:py-2 px-2 py-2 truncate rounded-2xl bg-pinkLight text-white text-base xl:text-lg cursor-pointer ">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
        :
        <div className="text-[#5a5a5a] text-lg py-4 font-mono justify-center border-b-[0.5px] border-b-black/10">
            <p>No users are connected.</p>
        </div>;

    return (
        <div>
            <Header />
            <div className="w-full h-full bg-cover flex bg-[#FFFBFE] justify-center min-h-screen py-14" >
                <div className="w-[300px] md:w-[600px] xl:w-[1300px] 2xl:w-[2250px] px-5 xl:px-20 mx-auto  xl:flex gap-12">
                    <div className="w-full xl:w-2/3">
                        <div className="w-full  xl:flex gap-5">
                            <div className="w-full xl:w-1/2 rounded-xl bg-white border-2 border-black/5 mb-5">
                                <div className="text-lg lg:text-xl xl:text-2xl py-4 text-start font-bold border-b-2 border-b-black/5">
                                    <div className="px-5 text-[#5a5a5a]">Account Settings</div>
                                </div>
                                <div className="text-sm lg:text-lg gap-6 py-2 xl:texl-xl justify-between text-start flex items-center border-b-2 border-b-black/5 ">
                                    <div className="w-full justify-between flex pl-5">
                                        <div className="justify-start w-full">Verification Status</div>
                                        {
                                            !userVerified ?
                                                <div onClick={() => navigate("/verifyprofile")} className="justify-end text-red-600 cursor-pointer">Unverified</div>
                                                :
                                                <div className="justify-end text-green-600">Verified</div>
                                        }
                                    </div>
                                    <div className="justify-end pr-5">
                                        <GoChevronRight />
                                    </div>
                                </div>
                                <div className="text-sm lg:text-lg gap-6 py-2 xl:texl-xl justify-between text-start flex items-center border-b-2 border-b-black/5">
                                    <div className="w-full justify-between flex pl-5">
                                        <div className="justify-start w-full">Verification Profile</div>
                                        <div className="justify-end text-green-600 cursor-pointer">Verified</div>
                                    </div>
                                    <div className="justify-end pr-5">
                                        <GoChevronRight />
                                    </div>
                                </div>
                                <div onClick={() => setPhoneVerification(!phoneVerification)} className="text-sm lg:text-lg gap-6 py-2 xl:texl-xl justify-between text-start flex items-center">
                                    <div className="w-full justify-between md:flex pl-5">
                                        <div className="justify-start w-full">Phone Number</div>
                                        {
                                            phoneNumber === "" ?
                                                <div className="justify-end md:text-end w-full cursor-pointer text-red-600">Unverified</div>
                                                :
                                                <div className="justify-end md:text-end w-full cursor-pointer text-green-600">verified</div>
                                        }
                                    </div>
                                    <div className="justify-end pr-5">
                                        <GoChevronRight />
                                    </div >
                                </div>
                            </div>
                            <div className="w-full xl:w-1/2 rounded-xl bg-white border-2 border-black/5 mb-5">
                                <div className="text-lg lg:text-xl xl:text-2xl py-4 text-start font-bold border-b-2 border-b-black/5">
                                    <div className="px-5 text-[#5a5a5a]">Partner</div>
                                </div>
                                {listItems}

                                <div className="text-sm lg:text-lg gap-6 py-2 px-10 xl:texl-xl justify-between text-start flex items-center">
                                    {
                                        listItems.type === "div" ?
                                            <button onClick={() => setAddPartnerModal(!addPartnerModal)} className="w-full  justify-center xl:text-xl rounded-full py-2 px-10 xl:py-4 xl:px-12  mx-auto items-center flex text-white bg-pinkLight hover:bg-pinkLight/80 font-bold">
                                                <FiPlus />
                                                Add Partner
                                            </button>
                                            :
                                            <button className="w-full  justify-center xl:text-xl rounded-full py-2 px-10 xl:py-4 xl:px-12  mx-auto items-center flex text-white bg-pink-900 font-bold">
                                                <FiPlus />
                                                Add Partner
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="w-full xl:flex gap-5 pb-10">
                            <div className="w-full xl:w-1/2 rounded-xl bg-white border-2 border-black/5">
                                <div className="text-lg lg:text-xl xl:text-2xl py-4 text-start font-bold border-b-2 border-b-black/5">
                                    <div className="px-5 text-[#5a5a5a]">Account Settings</div>
                                </div>
                                <div className="text-sm gap-6 py-2 lg:texl-lg justify-between text-start flex items-center border-b-2 border-b-black/5 cursor-pointer">
                                    <div onClick={() => setLocationModal(true)} className="w-full justify-between md:flex pl-5">
                                        <div className="justify-start w-2/5">Current location</div>
                                        <div className="justify-end md:text-end w-full text-blue-500 font-bold">{address} {countryID} {countryName}</div>
                                    </div>
                                    <div className="justify-end pr-5">
                                        <GoChevronRight />
                                    </div>
                                </div>
                                <div className="p-5">
                                    <GoolgleMap lat={pointLatitude} long={pointLongitude} />
                                </div>
                            </div>
                            <div className="w-full xl:w-1/2 rounded-xl bg-white border-2 border-black/5">
                                <div className="text-lg lg:text-xl xl:text-2xl py-4 text-start font-bold border-b-2 border-b-black/5">
                                    <div className="px-5 text-[#5a5a5a]">Search settings</div>
                                </div>
                                <SettingShow text="Show me " value={userShow} items={showData} onHandleChange={e => (setUserShow(e), setShowDialog(true))} multiple={true} />
                                <div className="gap-6 py-1 justify-between text-start items-center border-b-2 border-b-black/5">
                                    <div className="w-full pl-5 text-sm xl:text-lg py-2">
                                        <div className="justify-start w-full font-bold text-[#5a5a5a]">Maximum distance</div>
                                        <Distance distance={distance} miles={currentMiles} onMiles={(e) => (setCurrentMiles(e), setShowDialog(true))} onDistance={(e) => (setDistance(e), setShowDialog(true))} />
                                    </div>
                                </div>
                                <div className="text-sm lg:text-lg gap-6 xl:texl-xl justify-between text-start items-center">
                                    <div className="w-full pl-5 py-">
                                        <div className="justify-start w-full font-bold text-[#5a5a5a]">Age range</div>
                                        <AgeRange first={firstAge} last={lastAge} onFirstAge={e => (setFirstAge(e), setShowDialog(true))} onLastAge={e => (setLastAge(e), setShowDialog(true))} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full xl:w-1/3  md:px-14 xl:px-5">
                        <button onClick={() => setNotificationModal(!notificationModal)} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-black rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                            <div className="w-48 xl:w-64 items-center flex">
                                <div className="w-1/6">
                                    <MdNotifications />
                                </div>
                                <div className="w-5/6 text-start font-semibold">
                                    Notifications
                                </div>
                            </div>
                        </button>
                        <button onClick={() => (setInviteModal(!inviteModal))} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-pinkLight rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                            <div className="w-48 xl:w-64 items-center flex">
                                <div className="w-1/6">
                                    <HiUsers />
                                </div>
                                <div className="w-5/6 text-start font-semibold">
                                    Invite your friends
                                </div>
                            </div>
                        </button>
                        <button onClick={() => (setLogoutModal(!logoutModal))} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-black rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                            <div className="w-48 xl:w-64 items-center flex">
                                <div className="w-1/6">
                                    <FaSignOutAlt />
                                </div>
                                <div className="w-5/6 text-start font-semibold">
                                    Log out
                                </div>
                            </div>
                        </button>
                        <button onClick={() => (setDeleteModal(!deleteModal))} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-pinkLight rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                            <div className="w-48 xl:w-64 items-center flex">
                                <div className="w-1/6">
                                    <MdDelete />
                                </div>
                                <div className="w-5/6 text-start font-semibold">
                                    Delete Account
                                </div>
                            </div>
                        </button>
                        <button onClick={() => (setContactModal(!contactModal))} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-black rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                            <div className="w-48 xl:w-64 items-center flex">
                                <div className="w-1/6">
                                    <AiOutlineMail />
                                </div>
                                <div className="w-5/6 text-start font-semibold">
                                    Contact
                                </div>
                            </div>
                        </button>
                        <button onClick={() => navigate("/tutorial")} className="w-full bg-white xl:text-2xl border-[0.5px] border-black/10  text-pinkLight rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                            <div className="w-48 xl:w-64 items-center flex">
                                <div className="w-1/6">
                                    <MdVideoLibrary />
                                </div>
                                <div className="w-5/6 text-start font-semibold">
                                    Tutorial
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                {
                    notificationModal &&
                    <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                        <div className="w-full h-screen bg-cover flex px-8  justify-center items-center bg-black/90" >
                            <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                                <NotificationModal mNtificationSetting={mNotification} cNtificationSetting={cNotification} lNtificationSetting={lNotification} closeModal={() => (getUserInfo(), setNotificationModal(false))} />
                            </div>
                        </div >
                    </div>
                }
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
                                <LogoutModal closeModal={() => modalClose()} />
                            </div>
                        </div >
                    </div>
                }
                {
                    deleteModal &&
                    <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                        <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                            <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                                <DeleteModal closeModal={() => modalClose()} />
                            </div>
                        </div >
                    </div>
                }
                {
                    contactModal &&
                    <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                        <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                            <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-8 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                                <ContactModal closeModal={() => setContactModal(false)} />
                            </div>
                        </div >
                    </div>
                }
                {
                    locationModal &&
                    <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                        <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                            <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-8 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                                <CountryChangeModal onChangeLat={(e) => setPointLatitude(e)} onChangeLong={(e) => setPointLongitude(e)} closeModal={() => setLocationModal(false)} />
                            </div>
                        </div >
                    </div>
                }
                {
                    addPartnerModal &&
                    <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                        <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                            <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                                <AddPartnerModal matchesUser={matches} myImage={userImage} myName={userName} onPartnerAdd={() => getUserInfo()} closeModal={() => (setAddPartnerModal(false))} />
                            </div>
                        </div >
                    </div>
                }
                {
                    phoneVerification &&
                    <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                        <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                            <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                                <PhoneVerification closeModal={() => setPhoneVerification(false)} />
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