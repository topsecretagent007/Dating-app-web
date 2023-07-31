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
    const [mSG, setMSG] = useState(false);

    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, { passive: false });

    useEffect(() => {
        const getMatches = async () => {
            setLoading(true);
            const querySnapshot = await getDocs(
                collection(db, "Users", user.uid, "Matches")
            );
            const data = querySnapshot.docs.map((doc) => doc.data());
            setMatches(data);
            setCurrentChatUser(data.find((item) => item.Matches == id));
            setMSG(true);

            if (id === "" || id === undefined) {
                setMSG(false);
            }
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
    }, [user, id]);

    return (
        <div>
            <div className='hidden md:block'>
                <Header />
            </div>
            {
                !mSG &&
                <div className='block md:hidden'>
                    <Header />
                </div>
            }
            <div className={`${mSG ? "min-h-[calc(100vh-54px)]" : "px-5 pt-8 pb-24"} w-full md:h-full min-h-[calc(100vh-154px)] bg-cover   md:py-14 bg-[#FFFBFE]`}>
                <div className='hidden md:block md:w-[500px] lg:w-[900px] mx-auto h-[670px] bg-white rounded-xl border-[0.5px] border-black/20 '>
                    <div className='w-full lg:flex border-black/10'>
                        <div className='w-full lg:w-1/3 p-5 text-start text-3xl text-[#5a5a5a] font-bold border-b-[0.1px] lg:border-r-[0.1px] border-black/10'>Messages</div>
                        <div className='hidden py-5 lg:block lg:w-2/3 pl-4 text-start text-[#5a5a5a] font-bold border-b-[0.1px] border-black/10'>
                            <div className='text-lg'>{currentChatUser?.userName}</div>
                        </div>
                    </div>
                    <div className=''>
                        <div className='w-full hidden lg:flex text-start'>
                            <div className='w-full lg:w-1/3 overflow-y-auto min-h-[510px] border-r-[0.1px] border-black/10'>
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
                                    <div className='w-full lg:w-1/3 overflow-y-auto min-h-[600px] border-black/10'>
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
                <div className='w-full md:hidden  bg-[#FFFBFE]'>
                    {
                        !mSG ?
                            <>
                                <div className='text-lg text-pinkLight font-semibold text-start'> New Matches</div>
                                <div className='gap-3 text-start flex'>
                                    {matches.map((item, index) => (
                                        <div key={index}>
                                            <div className='m-2 text-center'>
                                                <img src={item?.pictureUrl} alt='Image' className='w-24 h-24 rounded-lg' />
                                                <div className='text-base font-semibold text-[#5a5a5a]'>{item?.userName.split(' ').slice(0, -1).join(' ')}</div>
                                            </div>
                                        </ div>
                                    ))}
                                </div>
                                <div className='w-full lg:flex border-black/10'>
                                    <div className='text-lg text-pinkLight font-semibold text-start'> Recent messages</div>
                                </div>

                                <div className='w-full lg:hidden text-start py-3'>
                                    <div className='w-full lg:w-1/3 overflow-y-auto min-h-[600px] border-black/10'>
                                        {matches.map((item, index) => (
                                            <div key={index} onClick={() => (setCurrentChatUser(item), setMSG(!mSG), console.log("lll"))}>
                                                <UserMessageItem chatter={item} selected={currentChatUser && item.Matches === currentChatUser.Matches} />
                                            </ div>
                                        ))}
                                    </div>
                                </div>
                            </>
                            :
                            <Messages currentUser={currentChatUser} prevUsers={() => (setCurrentChatUser(), setMSG(!mSG))} />
                    }
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