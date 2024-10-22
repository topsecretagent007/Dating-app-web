import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import PrevUser from "../component/other/prevuser";
import NextUser from "../component/other/nextuser";
import Header from "../component/header/index";
import Footer from "../component/footer/index";
import LoadingModal from "../component/loadingPage";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import UserBrowser from "../component/UserBrowser";
import { useNavigate } from "react-router-dom";
import geolocator from 'geolocator';
import { AiOutlineClose } from "react-icons/ai";
import { BsHeartFill } from "react-icons/bs";
import { Navigation, Pagination } from 'swiper/modules';

geolocator.config({
    language: "en",
    google: {
        version: "3",
        key: "AIzaSyC5bHiW99yF2oAPsaqNHeZZc5AlrgDdFd8"
    }
});

export default function FindPage() {
    const { user } = UserAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userDistance, setUserDistance] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchUserDistance, setSearchUserDistance] = useState(true);
    const [likeAction, setLikeAction] = useState(null);
    const [likeId, setLikeId] = useState(null);
    const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, { passive: false });

    const removeUser = (currentPage) => {
        setUserDistance([...userDistance.slice(0, currentPage), ...userDistance.slice(currentPage + 1)]);
        if (currentPage == userDistance.length - 1) {
            setCurrentPage(0)
        }
    }

    const prevPage = () => {
        if (currentPage === 0) {
            setCurrentPage(0);
        } else {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if (currentPage === userDistance.length) {
            return;
        } else {
            setCurrentPage(currentPage + 1);
        }
    }

    useEffect(() => {
        const getUserInfo = async () => {
            setLoading(true);
            const checkedUserid = [];
            const matchedUserid = [];
            const reportUserId = [];
            const docSnap = await getDoc(doc(db, "Users", user.uid));
            const userData = await docSnap.data();
            const docUserLikeBy = await getDocs(collection(db, "Users", user.uid, "CheckedUser"));
            docUserLikeBy.forEach((doc) => {
                checkedUserid.push(doc.id)
            })
            const docUserMatch = await getDocs(collection(db, "Users", user.uid, "Matches"));
            docUserMatch.forEach((doc) => {
                matchedUserid.push(doc.id)
            })
            const docUserReport = await getDocs(collection(db, "Reports"));
            docUserReport.forEach((doc) => {
                reportUserId.push(doc.data().victim_id);
            })
            for (let i = 0; i < userData.showGender.length; i++) {
                if (userData.showGender[i] === "MEN") {
                    userData.showGender[i] = "MAN";
                }
                if (userData.showGender[i] === "WOMEN") {
                    userData.showGender[i] = "WOMAN";
                }
            }

            if (docSnap.exists()) {
                const querySnapshot = await getDocs(
                    query(
                        collection(db, "Users"),
                        where("age", ">=", userData.age_range?.min),
                        where("age", "<=", userData.age_range?.max),
                        where("editInfo.userGender", "in", userData.showGender)
                    )
                );

                const result = querySnapshot.docs.map(doc => doc.data())
                    .filter(data => data.userId !== user.uid)
                    .filter(data => data.verified !== undefined)
                    .filter(data => checkedUserid.includes(data.userId) === false && matchedUserid.includes(data.userId) === false && reportUserId.includes(data.userId) === false);
                const updatedSearchedUsers = await Promise.all(result.map(async (item) => {
                    var options = {
                        from: {
                            latitude: parseFloat(userData.point?.geopoint._lat),
                            longitude: parseFloat(userData.point?.geopoint._long)
                        },
                        to: {
                            latitude: parseFloat(item.currentPoint?.geopoint._lat),
                            longitude: parseFloat(item.currentPoint?.geopoint._long)
                        },
                        formula: "HAVERSINE",
                        unitSystem: 1
                    };

                    const distance = await new Promise((resolve) => {
                        const result = geolocator.calcDistance(options);
                        resolve(result);
                    });
                    item.distance = distance;
                    return item;
                }));

                updatedSearchedUsers.sort((a, b) => a.distance - b.distance);
                const filteredData = updatedSearchedUsers.filter(item => item.distance <= "10000");
                const distanceinUser = filteredData.filter(item => item.distance <= userData.maximum_distance);
                if (searchUserDistance == true) {
                    setUserDistance(distanceinUser)
                } else {
                    setUserDistance(filteredData)
                }

                setLoading(false);
            }
        }
        if (user && user.uid) {
            getUserInfo();
        }
    }, [user, searchUserDistance])



    return (
        <div>
            <Header />
            <div className="w-full h-full min-h-[calc(100vh-154px)] bg-cover justify-center md:px-[13%] pb-36 md:py-14 bg-[#FFFBFE]" >
                {currentPage > 0 &&
                    <button type="button" className="hidden md:fixed top-0 -left-2 md:left-0 z-9 md:flex items-center justify-center h-full px-3 cursor-pointer group focus:outline-none" data-carousel-prev>
                        <PrevUser onPrevUser={() => prevPage()} />
                    </button>
                }
                <div className="md:block hidden">
                    {userDistance.length > 0 && currentPage < userDistance.length ?
                        <UserBrowser userData={userDistance[currentPage]} matched={false} onRemoveUser={() => removeUser(currentPage)} />
                        :
                        <div className="justify-center py-5">
                            <p className="text-lg xl:text-xl font-bold items-center pt-10 text-[#5A5A5A]">Regrettably, our current user base does not extend further within your specified distance parameters.
                                <br />
                                <br />
                                To explore potential matches beyond your preferred radius, please select the 'Continue' option below. Alternatively, should you wish to alter your geographical search parameters, you may do so by accessing the 'Settings' tab and updating your current location.</p>
                            <div className="md:flex py-10 justify-center max-w-lg mx-auto">
                                {
                                    searchUserDistance ?
                                        <button onClick={() => setSearchUserDistance(false)} className="w-32 justify-center py-3 mx-auto flex rounded-xl text-white bg-pinkLight items-center my-5 gap-2  cursor-pointer">Continue</button>
                                        :
                                        <button className="w-32 justify-center py-3 mx-auto flex rounded-xl text-white bg-pink-900 items-center my-5 gap-2">Continue</button>
                                }
                                <button onClick={() => navigate('/settings')} className="w-32 justify-center py-3 mx-auto flex rounded-xl text-white bg-pinkLight items-center my-5 gap-2 cursor-pointer">Settings</button>
                            </div>
                        </div>
                    }
                </div>
                <div className="md:hidden">
                    {userDistance.length > 0 && currentPage < userDistance.length ?
                        <Swiper
                            navigation={true}
                            autoplay={{ delay: 5000 }}
                            modules={[Navigation, Pagination]}
                            followFinger={true}
                            touchAngle={"45"}
                            speed={"100"}
                            className="userSlider overflow-x-clip flex"
                            stretch={0}
                            onSlideChange={(e) => setCurrentSlideIdx(e.activeIndex)}
                        >
                            {
                                userDistance.map((item, index) => {
                                    return (
                                        <SwiperSlide key={index}  >
                                            <UserBrowser userData={(userDistance[index])} matched={false} onRemoveUser={() => removeUser(index)} likeBtn={likeAction} likeUid={likeId} />
                                        </SwiperSlide>
                                    )
                                })
                            }
                            <SwiperSlide>
                                <div className="justify-center py-5 px-2">
                                    <p className="text-lg xl:text-xl font-bold items-center pt-10 text-[#5A5A5A]">Regrettably, our current user base does not extend further within your specified distance parameters.
                                        <br />
                                        <br />
                                        To explore potential matches beyond your preferred radius, please select the 'Continue' option below. Alternatively, should you wish to alter your geographical search parameters, you may do so by accessing the 'Settings' tab and updating your current location.</p>
                                    <div className="msm:flex py-10 justify-center max-w-lg mx-auto">
                                        {
                                            searchUserDistance ?
                                                <button onClick={() => setSearchUserDistance(false)} className="w-32 justify-center py-3 mx-auto flex rounded-xl text-white bg-pinkLight items-center my-5 gap-2  cursor-pointer">Continue</button>
                                                :
                                                <button className="w-32 justify-center py-3 mx-auto flex rounded-xl text-white bg-pink-900 items-center my-5 gap-2">Continue</button>
                                        }
                                        <button onClick={() => navigate('/settings')} className="w-32 justify-center py-3 mx-auto flex rounded-xl text-white bg-pinkLight items-center my-5 gap-2 cursor-pointer">Settings</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        :
                        <div className="justify-center py-5 px-3">
                            <p className="text-lg xl:text-xl font-bold items-center pt-10 text-[#5A5A5A]">Regrettably, our current user base does not extend further within your specified distance parameters.
                                <br />
                                <br />
                                To explore potential matches beyond your preferred radius, please select the 'Continue' option below. Alternatively, should you wish to alter your geographical search parameters, you may do so by accessing the 'Settings' tab and updating your current location.</p>
                            <div className="msm:flex py-10 justify-center max-w-lg mx-auto">
                                {
                                    searchUserDistance ?
                                        <button onClick={() => setSearchUserDistance(false)} className="w-32 justify-center py-3 mx-auto flex rounded-xl text-white bg-pinkLight items-center my-5 gap-2  cursor-pointer">Continue</button>
                                        :
                                        <button className="w-32 justify-center py-3 mx-auto flex rounded-xl text-white bg-pink-900 items-center my-5 gap-2">Continue</button>
                                }
                                <button onClick={() => navigate('/settings')} className="w-32 justify-center py-3 mx-auto flex rounded-xl text-white bg-pinkLight items-center my-5 gap-2 cursor-pointer">Settings</button>
                            </div>

                        </div>
                    }
                </div>
                {
                    userDistance.length > 0 && currentPage < userDistance.length && currentSlideIdx != userDistance.length &&
                    <div className="w-screen max-h-max  px-16 justify-between flex fixed bottom-28 md:hidden swiper-style">
                        <div onClick={() => (setLikeAction(false), setLikeId(userDistance[currentSlideIdx].userId))} className="justify-center w-14 h-14 items-center border-[#888888] border-[0.1px] rounded-full flex cursor-pointer text-red-600 bg-white float-right" >
                            <AiOutlineClose />
                        </div>
                        <div onClick={() => (setLikeAction(true), setLikeId(userDistance[currentSlideIdx].userId))} className="justify-center w-14 h-14 flex rounded-full text-pinkLight border-[#888888] border-[0.1px] bg-white items-center cursor-pointer float-left"  >
                            <BsHeartFill />
                        </div>
                    </div>
                }
                {currentPage < userDistance.length &&
                    <button type="button" className="hidden md:fixed top-0 -right-2 md:right-0 z-9 md:flex items-center justify-center h-full px-3 cursor-pointer group focus:outline-none" data-carousel-next>
                        <NextUser onNextUser={() => nextPage()} />
                    </button>
                }
                {
                    loading &&
                    < LoadingModal />
                }
            </div>
            <Footer />
        </div >
    )

}