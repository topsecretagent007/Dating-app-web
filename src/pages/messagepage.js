import React, { useState, useEffect } from 'react'
import Messages from "../component/messages/messages";
import { useParams } from "react-router-dom";
import Header from "../component/header/index";
import Footer from "../component/footer/index";
import LoadingModal from "../component/loadingPage";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import UserMessageItem from '../component/messages/userItem';

export default function MessagePage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const { user } = UserAuth();
    const [matches, setMatches] = useState([]);
    const [currentChatUser, setCurrentChatUser] = useState();

    useEffect(() => {
        const getMatches = async () => {
            setLoading(true);
            const querySnapshot = await getDocs(
                collection(db, "Users", user.uid, "Matches")
            );
            const data = querySnapshot.docs.map((doc) => doc.data());
            setMatches(data);
            setCurrentChatUser(data.find((item) => item.Matches == id));
            setLoading(false);
        };

        const getChats = async () => {
            setLoading(true);
            const querySnapshot = await getDocs(
                query(
                    collection(db, "chats"),
                    where('docId', '>=', user.uid),
                    where('docId', '<=', user.uid + '\uf8ff')
                )
            );
            const result = querySnapshot.docs.map(doc => doc.data());
            setLoading(false);
        }

        if (user && user.uid) {
            getMatches();
            getChats();
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
                    <div className=''>
                        <div className='w-full hidden lg:flex text-start'>
                            <div className='w-full lg:w-1/3 overflow-y-auto min-h-[640px] border-r-[0.1px] border-black/10'>
                                {matches.map((item, index) => (
                                    <div key={index} onClick={() => setCurrentChatUser(item)}>
                                        <UserMessageItem chatter={item} selected={currentChatUser && item.Matches === currentChatUser.Matches} />
                                    </ div>
                                ))}
                            </div>
                            <Messages currentUser={currentChatUser} />
                        </div>
                        <div className='w-full lg:hidden text-start'>

                            {
                                currentChatUser == null || currentChatUser == undefined ?
                                    <div className='w-full lg:w-1/3 overflow-y-auto min-h-[640px] border-r-[0.1px] border-black/10'>
                                        {matches.map((item, index) => (
                                            <div key={index} onClick={() => setCurrentChatUser(item)}>
                                                <UserMessageItem chatter={item} selected={currentChatUser && item.Matches === currentChatUser.Matches} />
                                            </ div>
                                        ))}
                                    </div>
                                    :
                                    <Messages currentUser={currentChatUser} prevUsers={() => setCurrentChatUser()} />

                            }
                        </div>
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