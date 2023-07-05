import React, { useState, useEffect } from 'react'
import Messages from "../component/messages/messages";
// import SmallMessages from "../component/messages/SmallMessage";
import Header from "../component/header/index";
import Footer from "../component/footer/index";
import LoadingModal from "../component/loadingPage";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import UserMessageItem from '../component/messages/userItem';

export default function MessagePage() {
    const [loading, setLoading] = useState(false);
    const { user } = UserAuth();
    const [matches, setMatches] = useState([]);
    const [currentChatUser, setCurrentChatUser] = useState();

    useEffect(() => {
        const getMatches = async () => {
            setLoading(true);
            console.log("user:", user);
            if (user) {
                const querySnapshot = await getDocs(
                    collection(db, "Users", user.uid, "Matches")
                );
                const data = querySnapshot.docs.map((doc) => doc.data());
                console.log(data.Matches, "data")
                setMatches(data);
            }
            setLoading(false);
        };
        if (user && user.uid) {
            getMatches();
        }
    }, [user]);

    return (
        <div>
            <Header />
            <div className='w-full h-full min-h-[calc(100vh-186px)] bg-cover px-5 py-14 bg-[#FFFBFE]'>
                <div className='w-full md:w-[500px] lg:w-[900px] mx-auto xl:h-[720px] bg-white rounded-xl border-[0.5px] border-black/20 '>
                    <div className='w-full lg:flex border-black/10'>
                        <div className='w-full lg:w-1/3 p-5 text-start text-3xl text-[#5a5a5a] font-bold border-b-[0.1px] lg:border-r-[0.1px] border-black/10'>Messages</div>
                        <div className='hidden py-5 lg:block lg:w-2/3 pl-4 text-start text-[#5a5a5a] font-bold border-b-[0.1px] border-black/10'>
                            <div className='text-lg'>{currentChatUser?.userName}</div>
                        </div>
                    </div>
                    <div className='w-full lg:flex text-start'>
                        <div className='w-full lg:w-1/3 overflow-y-auto lg:h-[643px] border-r-[0.1px] border-black/10'>
                            {matches.map((item, index) => (
                                <UserMessageItem key={index} user={item} onClickUser={(e) => setCurrentChatUser(e)} selected={ currentChatUser && item && item.Matches === currentChatUser.Matches }

                                />
                            ))}
                        </div>
                        <Messages currentUser={currentChatUser} />
                        {/* <SmallMessages currentUser={currentChatUser?.Matches} /> */}

                    </div>
                </div>
            </div>
            <Footer />
            {
                loading &&
                <LoadingModal />
            }
        </div >
    )
}