import React, { useState, useRef, useEffect } from "react";
import Search from "../component/other/search";
import PrevUser from "../component/other/prevuser";
import NextUser from "../component/other/nextuser";
import Header from "../component/header/index";
import Footer from "../component/footer/index";
import LoadingModal from "../component/loadingPage";
import FindUser from "../component/findUser";

import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export default function FindPage() {
    const { user } = UserAuth();
    const [loading, setLoading] = useState(false);
    const [userLooking, setUserLooking] = useState([]);
    const [userShow, setUserShow] = useState([]);
    const [firstAge, setFirstAge] = useState("");
    const [lastAge, setlastAge] = useState("");
    const [otherUserId, setOtherUserId] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const prevPage = () => {
        if (currentPage == 0) {
            setCurrentPage(otherUserId.length - 1);
        } else {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if (currentPage == otherUserId.length - 1) {
            setCurrentPage(0);
        } else {
            setCurrentPage(currentPage + 1);
        }
    }

    useEffect(() => {
        setLoading(true);
        const getUserInfo = async () => {
            const docSnap = await getDoc(doc(db, "Users", user.uid));
            const querySnapshot = await getDocs(collection(db, "Users"));
            const userData = await docSnap.data();
            const otherUser = [];
            const searchedUserId = [];

            if (docSnap.exists()) {
                setUserLooking(userData.desires);
                setUserShow(userData.showGender);
                setFirstAge(userData.age_range?.min)
                setlastAge(userData.age_range?.max)
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
            querySnapshot.forEach((doc) => {
                if (doc.id != user.uid) otherUser.push(doc.id);
            });
            console.log(otherUser);
            for (let i = 0; i < otherUser.length; i++) {
                const docOtherSnap = await getDoc(doc(db, "Users", otherUser[i]));
                const otherUserData = docOtherSnap.data();
                console.log(userData.showGender.includes(otherUserData.editInfo?.userGender))
                if (userData.showGender.includes(otherUserData.editInfo?.userGender) && firstAge <= otherUserData.age && otherUserData.age <= lastAge) {
                    searchedUserId.push(otherUserData.userId);
                    setOtherUserId(searchedUserId);
                    console.log(searchedUserId)
                }
            }
            setLoading(false);
        }
        if (user && user.uid) {
            getUserInfo();
        }
    }, [user])

    return (
        <div>
            <Header />
            <div className="w-full h-full min-h-screen bg-cover justify-center px-[13%] pt-28 xl:pt-36 bg-[#FFFBFE] py-48" >
                <button onClick={() => prevPage()} type="button" className="fixed top-0 -left-2 md:left-0 z-9 flex items-center justify-center h-full px-3 cursor-pointer group focus:outline-none" data-carousel-prev>
                    <PrevUser />
                </button>
                <div>
                    <Search />
                    <FindUser usersId={otherUserId[currentPage]} />
                </div>
                <button onClick={() => nextPage()} type="button" className="fixed top-0 -right-2 md:right-0 z-9 flex items-center justify-center h-full px-3 cursor-pointer group focus:outline-none" data-carousel-next>
                    <NextUser />
                </button>
                {
                    loading &&
                    < LoadingModal />
                }
            </div>
            <Footer />
        </div >
    )
}