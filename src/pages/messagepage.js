import React, { useState, useEffect } from 'react'
// import MessageUsers from "../component/users/users";
import Messages from "../component/messages/messages";
import Header from "../component/header/index";
import Footer from "../component/footer/index";
import LoadingModal from "../component/loadingPage";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import UserMessageItem from '../component/messages/userItem';

export default function MessagePage() {
    const [loading, setLoading] = useState(false);
    const { user } = UserAuth();
    const [matches, setMatches] = useState([]);
    const [currentChatUser, setCurrentChatUser] = useState("");
    const [currentUserName, serCurrentUserName] = useState("");


    

    // const getChatUsers = async () => {

    // }

    useEffect(() => {
        const getMatches = async () => {
            const querySnapshot = await getDocs(
                collection(db, "Users", user.uid, "Matches")
            );
            const data = querySnapshot.docs.map((doc) => {
                return doc.data();
            });
            setMatches(data);
        }

        if(user) {
            getMatches();
        }
    }, [user])

    useEffect(() => {
        const goToInfo = async () => {
            setLoading(true);
            const querySnapshot = await getDoc(doc(db, "Users", currentChatUser));
            if (querySnapshot.exists()) {
                const userData = querySnapshot.data();
                serCurrentUserName(userData.UserName);
            } else {
                console.log("No such document!");
            }
            setLoading(false);
        }
        if (currentChatUser) {
            goToInfo();
        }
    }, [user, currentChatUser])

    return (
        <div>
            <Header />
            <div className='w-full h-full min-h-screen bg-cover px-5 py-14 bg-[#FFFBFE]'>
                <div className='w-full md:w-[500px] lg:w-[900px] mx-auto xl:h-[720px] bg-white rounded-xl border-[0.5px] border-black/20 '>
                    <div className='w-full lg:flex border-black/10'>
                        <div className='w-full lg:w-1/3 p-5 text-start text-3xl font-bold border-b-[0.1px] lg:border-r-[0.1px] border-black/10'>Messages</div>
                        <div className='hidden lg:block lg:w-2/3 p-2 text-start text-3xl font-bold border-b-[0.1px] border-black/10'>
                            <div className='text-lg'>{currentUserName}</div>
                        </div>
                    </div>
                    <div className='w-full lg:flex text-start'>
                        <div className='w-full lg:w-1/3 overflow-y-auto h-[643px] border-r-[0.1px] border-black/10'>
                            {matches.map((item, index) => (
                                <UserMessageItem key={index} user={item} />
                            ))}
                            {/* <MessageUsers onClickUser={(e) => setCurrentChatUser(e)} /> */}
                        </div>
                        <Messages currentUser={currentChatUser} />
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