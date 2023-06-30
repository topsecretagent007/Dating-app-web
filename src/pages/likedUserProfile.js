import React, { useState, useEffect } from "react";
import { BsHeartFill } from "react-icons/bs";
import { FiArrowLeftCircle } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { MdOutlineLocationOn } from "react-icons/md";
import ImageSlider from "../component/other/imageslider";
import LoadingModal from "../component/loadingPage";
import Header from "../component/header/index";
import Footer from "../component/footer/index";

export default function PreviewProfile() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = UserAuth();
    const [userName, setUserName] = useState("");
    const [userLooking, setUserLooking] = useState([]);
    const [interests, setInterests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [goToMessage, setGoToMessage] = useState(true);
    const [description, setDescription] = useState("");

    const goToPage = (url) => {
        navigate(url);
    }

    const likeBtn = async (id, value) => {
        setLoading(true);
        const userLikedBy = [];
        const otherUser = await getDoc(doc(db, "Users", id));
        const docSnap = await getDoc(doc(db, "Users", user.uid));
        const otherUserData = otherUser.data();
        const userData = docSnap.data();
        const docUserLikedBy = await getDocs(collection(db, "Users", user.uid, "LikedBy"));
        const docUserLikedId = await docUserLikedBy.docs.filter(doc => doc.data().LikedBy != null);
        docUserLikedId.forEach((doc) => {
            userLikedBy.push(doc.id)
        })

        if (value == true) {
            if (userLikedBy.includes(id)) {
                await setDoc(doc(db, "Users", user.uid, "Matches", id), {
                    Matches: id,
                    pictureUrl: otherUserData.Pictures[0]?.url,
                    timestamp: new Date(),
                    userName: otherUserData.UserName,
                    isRead: false,
                });
                await setDoc(doc(db, "Users", id, "Matches", user.uid), {
                    Matches: user.uid,
                    pictureUrl: userData.Pictures[0]?.url,
                    timestamp: new Date(),
                    userName: userData.UserName,
                    isRead: false,
                });
                await setDoc(doc(db, "chats", (user.uid + "-" + id)), {
                    docId: user.uid + "-" + id,
                    isclear1: false,
                    isclear2: false,
                    active: false,
                });
                goToPage("/notification")
                setLoading(false);
            } else {
                setLoading(false);
                goToPage("/notification")
                return;
            }

        } else {
            await deleteDoc(doc(db, "Users", user.uid, "LikedBy", id));
            await setDoc(doc(db, "Users", user.uid, "CheckedUser", id), {
                DislikedUser: id,
                pictureUrl: otherUserData.Pictures[0]?.url,
                timestamp: new Date(),
                userName: otherUserData.UserName,
            });
            goToPage("/notification")
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        const getUserInfo = async () => {
            const matchedUserid = [];
            const docUserMatch = await getDocs(collection(db, "Users", user.uid, "Matches"));
            const docUserMatchId = await docUserMatch.docs.filter(doc => doc.data().Matches != null);
            docUserMatchId.forEach((doc) => {
                matchedUserid.push(doc.id)
            })
            if (matchedUserid.includes(id)) setGoToMessage(false)
            const docSnap = await getDoc(doc(db, "Users", id));
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setDescription(userData.editInfo?.about)
                setUserName(userData.UserName)
                setUserLooking(userData.desires)
                setInterests(userData.interest)
                setLoading(false);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        if (id) {
            getUserInfo();
        }
    }, [id])

    return (
        <>
            <Header />
            <div className="w-full h-full min-h-screen bg-cover px-[13%] bg-[#FFFBFE] py-14">
                <div onClick={() => goToPage("/notification")} className="text-2xl text-pinkLight font-bold cursor-pointer mb-4">
                    <FiArrowLeftCircle />
                </div>
                <div className="w-full md:flex justify-center gap-14 mx-auto">
                    <div className="w-full max-w-xl">
                        <ImageSlider userImage={id} />
                    </div>
                    <div className="w-full xl:w-1/2 max-w-lg">
                        <div className="justify-between flex">
                            <div className="text-start">
                                <div className="text-lg md:text-xl xl:text-2xl font-bold">{userName}</div>
                                <div className="text-sm md:text-md lg:text-lg xl:text-xl text-[#888888]">Address </div>
                            </div>
                        </div>
                        <div className="flex text-md xl:text-2xl items-center gap-2">
                            <div className="text-pinkLight text-xl" >
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
                            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 text-sm lg:text-lg xl:text-xl text-[#888888] leading-relaxed">{userLooking.map((item, index) => (
                                <div key={index} className="px-1">
                                    <div >{item}</div>
                                </div>
                            ))}</div>
                        </div>
                        <div className="text-start py-5">
                            <div className="text-md md:text-lg lg:text-xl xl:text-2xl font-bold">Interest</div>
                            <div className="grid grid-cols-2 md:grid-cols-3 text-sm lg:text-lg xl:text-xl text-[#888888] leading-relaxed list-none">
                                {interests != [] &&
                                    <>
                                        {interests.map((item, index) => (
                                            <div key={index} className="px-1">
                                                <div >{item}</div>
                                            </div>
                                        ))}
                                    </>
                                }
                            </div>
                        </div>
                        {goToMessage ?
                            <div className="justify-between grid grid-cols-2 gap-4 pt-5 text-sm md:text-base lg:text-lg xl:text-xl">
                                <div className="justify-center xl:py-3 flex rounded-xl text-white bg-pinkLight items-center gap-2 py-1 lg:py-2 cursor-pointer" onClick={() => likeBtn(id, true)} >
                                    <BsHeartFill />
                                    <div>Like</div>
                                </div>
                                <div className="justify-center items-center border-[#888888] border-[0.1px] rounded-xl gap-2 py-1 lg:py-2 xl:py-3 flex cursor-pointer text-[#888888]" onClick={() => likeBtn(id, false)}>
                                    <AiOutlineClose />
                                    <div>Dislike</div>
                                </div>
                            </div >
                            :
                            <div className="justify-between pt-5 text-sm md:text-base lg:text-lg xl:text-xl">
                                <div className="justify-center xl:py-3 flex rounded-xl text-white bg-pinkLight items-center gap-2 py-1 lg:py-2 cursor-pointer" onClick={() => goToPage("/message")} >
                                    <BsHeartFill />
                                    <div>Send Message</div>
                                </div>
                            </div>
                        }
                    </div >
                </div >
                {
                    loading &&
                    <LoadingModal />
                }
            </div>
            <Footer />
        </>

    )
}