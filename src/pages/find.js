import React, { useState, useEffect } from "react";
import Search from "../component/other/search";
import PrevUser from "../component/other/prevuser";
import NextUser from "../component/other/nextuser";
import Header from "../component/header/index";
import Footer from "../component/footer/index";
import LoadingModal from "../component/loadingPage";
import FindUser from "../component/findUser";

import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, collection, getDocs, where, query } from "firebase/firestore";

export default function FindPage() {
    const { user } = UserAuth();
    const [loading, setLoading] = useState(false);
    const [otherUserId, setOtherUserId] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [usersData, setUsersData] = useState(false);
    const [SearchUsers, setSearchUsers] = useState(false);

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
            const userData = await docSnap.data();
            const searchedUserId = [];
            if (docSnap.exists()) {
                const querySnapshot = await getDocs(
                    query(
                        collection(db, "Users"),
                        where("age", ">=", userData.age_range?.min),
                        where("age", "<=", userData.age_range?.max),
                        where("editInfo.userGender", "in", userData.showGender)
                    )
                );
                const filteredSnapshot = querySnapshot.docs.filter(doc => doc.data().userId !== user.uid);
                filteredSnapshot.forEach((doc) => {
                    searchedUserId.push(doc.data().userId);
                });
                setOtherUserId(searchedUserId);
                if (searchedUserId.length < 2) setUsersData(false);
                else setUsersData(true);
                if (searchedUserId == [""] || searchedUserId == undefined || searchedUserId.length == 0) setSearchUsers(false);
                else setSearchUsers(true);
            } else {
                console.log("No such document!");
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
            <div className="w-full h-full min-h-screen bg-cover justify-center px-[13%] py-14  bg-[#FFFBFE]" >
                {usersData &&
                    <button onClick={() => prevPage()} type="button" className="fixed top-0 -left-2 md:left-0 z-9 flex items-center justify-center h-full px-3 cursor-pointer group focus:outline-none" data-carousel-prev>
                        <PrevUser />
                    </button>
                }
                <div>
                    <Search />
                    {SearchUsers ?
                        <FindUser usersId={otherUserId[currentPage]} />
                        :
                        <p className="text-lg xl:text-xl font-bold items-center pt-10 text-[#5A5A5A]">No search results were found.</p>
                    }
                </div>
                {usersData &&
                    <button onClick={() => nextPage()} type="button" className="fixed top-0 -right-2 md:right-0 z-9 flex items-center justify-center h-full px-3 cursor-pointer group focus:outline-none" data-carousel-next>
                        <NextUser />
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