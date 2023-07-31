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
    const [myData, setMyData] = useState();
    const [loading, setLoading] = useState(false);
    const [partnerName, setPartnerName] = useState("");
    const [partnerAvarta, setPartnerAvatar] = useState("");
    const [partnerId, setPartnerId] = useState("");
    const [partnerGender, setPartnerGender] = useState("");
    const [partnerStatus, setPartnerStatus] = useState("");

    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, { passive: false });

    const Lookingprofile = async (userId) => {
        navigate(`/likedUsers/${userId}`)
    }

    useEffect(() => {
        const goToUserInfo = async () => {
            setLoading(true);
            const docSnap = await getDoc(doc(db, "Users", user.uid));
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setMyData(userData);
            } else {
                console.log("No such document!");
            }
            const docSnapPartner = await getDoc(doc(db, "Relationship", user.uid));
            if (docSnapPartner.exists()) {
                const partnerData = docSnapPartner.data();
                setPartnerName(partnerData?.partner.partnerName);
                setPartnerAvatar(partnerData?.partner.partnerImage);
                setPartnerId(partnerData?.partner.partnerId);
                const docPartnerData = await getDoc(doc(db, "Users", partnerData?.partner.partnerId));
                if (docPartnerData.exists()) {
                    const partnerUserData = docPartnerData.data();
                    setPartnerGender(partnerUserData?.editInfo?.userGender);
                    setPartnerStatus(partnerUserData?.status);
                }
            }
            setLoading(false);
        }
        if (user && user.uid) {
            goToUserInfo();
        }
    }, [user])

    return (
        <>
            <Header />
            <div className="w-full h-full min-h-[calc(100vh-154px)] bg-cover px-[13%] bg-[#FFFBFE] pt-2 pb-28 md:py-14">
                <div className="w-full md:flex justify-center gap-14 mx-auto">
                    <div className="w-full max-w-2xl">
                        <ImageSlider />
                    </div>
                    <div className="w-full xl:w-1/2 max-w-lg">
                        <div className="justify-between flex">
                            <div className="text-start">
                                <div className="text-lg md:text-xl xl:text-2xl font-bold text-[#5a5a5a]">{myData?.UserName}</div>
                                <div className="text-sm lg:text-lg text-[#888888] capitalize">
                                    {myData?.age}, {myData?.editInfo?.userGender.toLowerCase()}, {myData?.sexualOrientation?.orientation.toLowerCase()}
                                    <br />
                                    {myData?.status.toLowerCase()}, distance
                                </div>
                            </div>
                        </div>
                        <div className="flex text-md xl:text-2xl items-center gap-2 text-[#888888]">
                            <div className="text-pinkLight text-xl" >
                                <MdOutlineLocationOn />
                            </div>
                            <div className="capitalize">
                                {myData?.location.countryName.toLowerCase()}
                            </div>
                        </div>
                        <div className="text-start py-5">
                            <div className="text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-[#5a5a5a]">About me</div>
                            <div className="text-sm lg:text-lg text-[#888888] leading-relaxed">
                                {myData?.editInfo?.about}
                            </div>
                        </div>
                        <div className="text-start py-5">
                            <div className="text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-[#5a5a5a]">Desires</div>
                            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 text-sm lg:text-lg text-[#888888] leading-relaxed capitalize" >{myData?.desires.map((item, index) => (
                                <div key={index} className="px-1 ">
                                    <div >{item.toLowerCase()}</div>
                                </div>
                            ))}</div>
                        </div>
                        <div className="text-start py-5">
                            <div className="text-md md:text-lg lg:text-xl xl:text-2xl font-bold text-[#5a5a5a]">Interest</div>
                            {myData?.interest && myData?.interest.length > 0 &&
                                <div className="grid grid-cols-2 md:grid-cols-3 text-sm lg:text-lg text-[#888888] leading-relaxed list-none capitalize">
                                    <>
                                        {myData?.interest.map((item, index) => (
                                            <div key={index} className="px-1">
                                                <div >{item}</div>
                                            </div>
                                        ))}
                                    </>
                                </div>
                            }

                        </div>
                        {
                            partnerStatus !== "" &&
                            <>
                                <div className="text-start text-md md:text-lg lg:text-xl xl:text-2xl pb-3 font-bold text-[#5a5a5a]">Partner</div>
                                <div className="flex border-[0.5px] border-black/10 rounded-xl px-6 py-4 max-w-xl text-start items-center gap-5 cursor-pointer" onClick={() => Lookingprofile(partnerId)}>
                                    <img src={partnerAvarta} alt="partnerAvarta" className="w-14 h-14 rounded-full" />
                                    <div className="">
                                        <div className="text-2xl text-[#5a5a5a] font-bold">
                                            {partnerName}
                                        </div>
                                        <div className="text-lg text-[#5a5a5a] font-semibold capitalize">
                                            {partnerGender.toLowerCase()}, {partnerStatus.toLowerCase()}
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        <div onClick={() => navigate('/editprofile')} className="mt-16 md:mt-6 justify-center xl:py-3 xl:px-10 flex rounded-xl text-white bg-pinkLight items-center xl:gap-5 gap-2 md:gap-3 lg:gap-4 py-1 lg:py-2 text-xl cursor-pointer" >
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