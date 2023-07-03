import React, { useState, useEffect } from "react";
import Search from "../component/other/search";
import PrevUser from "../component/other/prevuser";
import NextUser from "../component/other/nextuser";
import Header from "../component/header/index";
import Footer from "../component/footer/index";
import LoadingModal from "../component/loadingPage";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, collection, getDocs, where, query } from "firebase/firestore";

import UserBrowser from "../component/UserBrowser";

export default function FindPage() {
    const { user } = UserAuth();
    const [loading, setLoading] = useState(false);
    const [searchedUsers, setSearchUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const prevPage = () => {
        if (currentPage === 0) {
            setCurrentPage(searchedUsers.length - 1);
        } else {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if (currentPage === searchedUsers.length - 1) {
            setCurrentPage(0);
        } else {
            setCurrentPage(currentPage + 1);
        }
    }

    useEffect(() => {
        setLoading(true);
        const getUserInfo = async () => {
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
            console.log(reportUserId, "dfgsdf")

            if (docSnap.exists()) {
                const querySnapshot = await getDocs(
                    query(
                        collection(db, "Users"),
                        where("age", ">=", userData.age_range?.min),
                        where("age", "<=", userData.age_range?.max),
                        where("editInfo.userGender", "in", userData.showGender),
                    )
                );
                const result = querySnapshot.docs.map(doc => doc.data())
                    .filter(data => data.userId !== user.uid)
                    .filter(data => checkedUserid.includes(data.userId) === false && matchedUserid.includes(data.userId) === false && reportUserId.includes(data.userId) === false);
                setSearchUsers(result);
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
                {searchedUsers.length > 1 &&
                    <button onClick={() => prevPage()} type="button" className="fixed top-0 -left-2 md:left-0 z-9 flex items-center justify-center h-full px-3 cursor-pointer group focus:outline-none" data-carousel-prev>
                        <PrevUser />
                    </button>
                }
                <div>
                    <Search />
                    {searchedUsers.length > 0 ?
                        <UserBrowser userData={searchedUsers[currentPage]} onNextUser={() => nextPage()} matched={false} />
                        :
                        <p className="text-lg xl:text-xl font-bold items-center pt-10 text-[#5A5A5A]">No search results were found.</p>
                    }
                </div>
                {searchedUsers.length > 1 &&
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