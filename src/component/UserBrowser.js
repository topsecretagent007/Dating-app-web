import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiTwotoneFlag, AiOutlineClose } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsHeartFill } from "react-icons/bs";
import ImageSlider from "./other/imageslider";
import ReporteModal from "./modal/reportemodal";
import ReportUserModal from "./modal/reportusermodal";
import LoadingModal from "../component/loadingPage";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, doc, getDoc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import geolocator from 'geolocator';
geolocator.config({
    language: "en",
    google: {
        version: "3",
        key: "AIzaSyC5bHiW99yF2oAPsaqNHeZZc5AlrgDdFd8"
    }
});

export default function UserBrowser({ userData, matched = false, onRemoveUser }) {
    const { user } = UserAuth();
    const navigate = useNavigate();
    const [reporteModal, setReportoModal] = useState(false);
    const [reportUser, setReportUser] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const menuDropdown = useRef(null);
    const [loading, setLoading] = useState(false);
    const [myName, setMyName] = useState("");
    const [myPicture, setMyPicture] = useState("");
    const [distance, setDistance] = useState(0);
    const [partnerName, setPartnerName] = useState("");
    const [partnerAvarta, setPartnerAvatar] = useState("");
    const [partnerId, setPartnerId] = useState("");

    const Lookingprofile = async (userId) => {
        navigate(`/likedUsers/${userId}`)
    }

    const openUserModal = () => {
        setReportUser(false);
        setReportoModal(true);
    }

    const likeAction = async (isLike) => {
        setLoading(true);
        const likedByUserIds = [];
        const action = isLike ? "LikedUser" : "DislikedUser";
        const querySnapshot = await getDocs(collection(db, "Users", user.uid, "LikedBy"));
        querySnapshot.forEach((doc) => {
            likedByUserIds.push(doc.id);
        });

        if (likedByUserIds.includes(userData.userId)) {
            if (isLike) {
                await setDoc(doc(db, "Users", userData.userId, "Matches", user.uid), {
                    Matches: user.uid,
                    pictureUrl: myPicture,
                    timestamp: new Date(),
                    userName: myName,
                });
                await setDoc(doc(db, "Users", user.uid, "Matches", userData.userId), {
                    Matches: userData.userId,
                    pictureUrl: userData.Pictures[0].url,
                    timestamp: new Date(),
                    userName: userData.UserName,
                });
                await setDoc(doc(db, "chats", `${user.uid}-${userData.userId}`), {
                    docId: `${user.uid}-${userData.userId}`,
                    active: false,
                    isclear1: false,
                    isclear2: false,
                });
                navigate("/message");
            } else {
                await deleteDoc(doc(db, "Users", user.uid, "LikedBy", userData.userId));
            }
        } else {
            await setDoc(doc(db, "Users", user.uid, "CheckedUser", userData.userId), {
                [action]: userData.userId,
                pictureUrl: userData.Pictures[0].url,
                timestamp: new Date(),
                userName: userData.UserName,
            });
            if (isLike) {
                await setDoc(doc(db, "Users", userData.userId, "LikedBy", user.uid), {
                    LikedBy: user.uid,
                    pictureUrl: myPicture,
                    timestamp: new Date(),
                    userName: myName,
                });
            } else {
                await deleteDoc(doc(db, "Users", userData.userId, "LikedBy", user.uid));
            }
            onRemoveUser();
        }
        setLoading(false);

    };

    useEffect(() => {
        const getUserInfo = async () => {
            setLoading(true);
            const docSnap = await getDoc(doc(db, "Users", user.uid));
            if (docSnap.exists()) {
                const myData = docSnap.data();
                setMyName(myData.UserName);
                setMyPicture(myData.Pictures[0]?.url);
                var options = {
                    from: {
                        latitude: parseFloat(myData.location?.latitude),
                        longitude: parseFloat(myData.location?.longitude)
                    },
                    to: {
                        latitude: parseFloat(userData.location?.latitude),
                        longitude: parseFloat(userData.location?.longitude)
                    },
                    formula: "HAVERSINE",
                    unitSystem: 0
                };
                const address = await new Promise((resolve) => {
                    const result = geolocator.calcDistance(options);
                    return resolve(result);
                })
                setDistance(parseInt(address))
            } else {
                console.log("No such document!");
            }
            const docSnapPartner = await getDoc(doc(db, "Relationship", userData.userId));
            if (docSnapPartner.exists()) {
                const partnerData = docSnapPartner.data();
                console.log(partnerData, "partnerData")
                setPartnerName(partnerData.partner.partnerName);
                setPartnerAvatar(partnerData.partner.partnerImage);
                setPartnerId(partnerData.partner.partnerId);
            }
            setLoading(false);
        }
        if (user && user.uid && userData) {
            getUserInfo();
        }
    }, [userData])

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
                setReportoModal(false);
                setReportUser(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuDropdown]);


    return (
        < div className="w-full xl:flex gap-14" >
            <div className="w-full max-w-xl">
                <ImageSlider pictures={userData.Pictures} />
            </div>
            <div className="w-full pt-5 xl:pt-0 xl:w-2/5">
                <div className="justify-between flex">
                    <div className="text-start">
                        <div className="text-lg md:text-xl xl:text-2xl font-bold text-[#5a5a5a]">{userData?.UserName}</div>
                        <div className="text-sm lg:text-lg py-1 text-[#888888] capitalize">
                            {userData?.age}, {userData.editInfo?.userGender.toLowerCase()}, {userData.sexualOrientation?.orientation.toLowerCase()}
                            <br />
                            {userData?.status.toLowerCase()}, {distance}Km

                        </div>
                    </div>
                    {
                        !matched &&
                        <button onClick={() => setReportUser(!reportUser)} className="text-sm md:text-lg lg:text-xl xl:text-2xl my-auto text-red-600 justify-end p-2 xl:p-4 border-2 border-[#888888] bg-white rounded-full">
                            <AiTwotoneFlag />
                        </button>
                    }
                </div>
                <div className="flex text-sm lg:text-lg items-center gap-2 text-[#888888]">
                    <div className="text-pinkLight text-2xl" >
                        <MdOutlineLocationOn />
                    </div>
                    <div className="capitalize">
                        {userData.location?.countryName}
                    </div>
                </div>
                <div className="w-full text-start py-5">
                    <div className="text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-[#5a5a5a]">About me</div>
                    <div className=" text-sm lg:text-lg text-[#888888] leading-relaxed break-words">
                        {userData.editInfo?.about}
                    </div>
                </div>
                <div className="text-start py-5 max-w-xl">
                    <div className="text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-[#5a5a5a]">Desires</div>
                    <div className="grid grid-cols-3 text-sm lg:text-lg text-[#888888] leading-relaxed">
                        {userData.desires?.map((item, index) => (
                            <div key={index} className="px-1 capitalize">
                                <div >{item.toLowerCase()}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-start py-5 max-w-xl">
                    <div className=" text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-[#5a5a5a]">Interest</div>
                    {userData.interest && userData.interest.length > 0 &&
                        <div className="grid grid-cols-3 text-sm lg:text-lg xl:text-xl text-[#888888] leading-relaxed">
                            {userData.interest.map((item, index) => (
                                <div key={index} className="px-1">
                                    <div >{item}</div>
                                </div>
                            ))
                            }
                        </div>
                    }
                </div>
                {
                    partnerName !== "" &&
                    <>
                        <div className="text-start text-md md:text-lg lg:text-xl xl:text-2xl pb-3 font-bold text-[#5a5a5a]">Partner</div>
                        <div className="flex border-[0.5px] border-black/10 rounded-xl px-6 py-4 max-w-xl text-start items-center gap-5 cursor-pointer" onClick={() => Lookingprofile(partnerId)}>
                            <img src={partnerAvarta} alt="partnerAvarta" className="w-14 h-14 rounded-full" />
                            <div className="text-2xl text-[#5a5a5a] font-semibold">
                                {partnerName}
                            </div>
                        </div>
                    </>
                }
                {matched ?
                    <div className="justify-between pt-5 text-sm md:text-base lg:text-lg xl:text-xl">
                        <div className="justify-center xl:py-3 flex rounded-xl text-white bg-pinkLight items-center gap-2 py-1 lg:py-2 cursor-pointer" onClick={() => navigate(`/message/${userData.userId}`)} >
                            <BsHeartFill />
                            <div>Send Message</div>
                        </div>
                    </div>
                    :
                    <div className="justify-between grid grid-cols-2 gap-4 pt-5 text-sm md:text-base lg:text-lg xl:text-xl">
                        <div className="justify-center xl:py-3 flex rounded-xl text-white bg-pinkLight items-center gap-2 py-1 lg:py-2 cursor-pointer" onClick={() => likeAction(true)} >
                            <BsHeartFill />
                            <div>Like</div>
                        </div>
                        <div className="justify-center items-center border-[#888888] border-[0.1px] rounded-xl gap-2 py-1 lg:py-2 xl:py-3 flex cursor-pointer text-[#888888]" onClick={() => likeAction(false)}>
                            <AiOutlineClose />
                            <div>Dislike</div>
                        </div>
                    </div >
                }
            </div>
            {
                reporteModal &&
                <div className={`fixed z-50 top-0 left-0 w-full h-full min-h-screen `}>
                    <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                            <ReporteModal
                                closeModal={() => setReportoModal(false)}
                            />
                        </div>
                    </div >
                </div>
            }

            {
                reportUser &&
                <div className={`fixed z-50 top-0 left-0 w-full h-full min-h-screen `}>
                    <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                            <ReportUserModal
                                openModal={() => openUserModal()} usersId={userData.userId}
                            />
                        </div>
                    </div >
                </div>
            }
            {
                loading &&
                <LoadingModal />
            }
        </div >
    )
}