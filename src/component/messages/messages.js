import React, { useState, useEffect } from "react";
import { BsFillSendFill, BsEmojiSmile } from "react-icons/bs";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc, setDoc, deleteDoc, getDocs, collection, addDoc, where, query } from "firebase/firestore";
import LoadingModal from "../../component/loadingPage";


export default function Messages({ currentUser }) {
    const { user } = UserAuth();
    const [loading, setLoading] = useState(false);
    const [chatMessags, setChatMessages] = useState([]);
    const [myAvatar, setMyAvatar] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [messageText, setMessageText] = useState("");
    const [chats, setChats] = useState();
    // const messageCollection = collection(db, "chats", (currentUser + "-" + user.uid), "messages");

    const sendMessage = async () => {
        await addDoc(chats, {
            receiver_id: currentUser,
            sender_id: user.uid,
            image_url: "",
            isRead: true,
            text: messageText,
            time: new Date(),
            type: "Msg"
        });
        setMessageText("");
        goToUserInfo()
    }

    const goToUserInfo = async () => {
        setLoading(true);
        try {
            const docSnapShot = await getDocs(chats);
            const messages = docSnapShot.docs.map((doc) => {
                const { sender_id, isRead, text, time } = doc.data();
                return {
                    id: doc.id,
                    sender_id,
                    isRead,
                    text,
                    time
                };
            });
            messages.sort((a, b) => a.time - b.time);
            setChatMessages(messages);
        } catch (error) {
            console.error("Error fetching matches: ", error);
        }
        setLoading(false);
    }


    useEffect(() => {
        const goToGetAvatar = async () => {
            const myQuerySnapshot = await getDoc(doc(db, "Users", user.uid));
            if (myQuerySnapshot.exists()) {
                const userData = myQuerySnapshot.data();
                setMyAvatar(userData.Pictures[0]?.url);
            } else {
                console.log("No such document!");
            }

            const querySnapshot = await getDoc(doc(db, "Users", currentUser));
            if (querySnapshot.exists()) {
                const userData = querySnapshot.data();
                setUserAvatar(userData.Pictures[0]?.url);
            } else {
                console.log("No such document!");
            }

            let messageCollection; // Declare the variable here

            const chatCollection = await query(collection(db, "cities"),
                where("docId", "==", (user.uid + "-" + currentUser))
            )
            console.log(chatCollection.length)
            if (chatCollection.length == 0) {
                messageCollection = collection(db, "chats", (user.uid + "-" + currentUser), "messages")
            } else {
                messageCollection = collection(db, "chats", (currentUser + "-" + user.uid), "messages")
            }
            setChats(messageCollection);
        };
        if (currentUser && user.uid) {
            goToGetAvatar();
        }
    }, [user, currentUser])

    const renderMessage = ({ id, sender_id, text, time }) => (
        <div
            key={id}
            onClick={() => console.log(id)}
        >
            {sender_id == user.uid ?
                <div className="flex justify-end mb-4">
                    <div
                        className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                        {text}
                        <br />
                        {time?.toDate().toLocaleString()}
                    </div>
                    <img
                        src={myAvatar}
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                    />
                </div>
                :
                <div className="flex justify-start mb-4">
                    <img
                        src={userAvatar}
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                    />
                    <div
                        className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                    >
                        {text}
                        <br />
                        {time?.toDate().toLocaleString()}
                    </div>
                </div>
            }
        </div>
    );

    const renderEmptyState = () => (
        <div className="text-[#5a5a5a] w-full mx-auto text-lg pt-4 font-mono justify-center">
            <p className="text-center">There is no message</p>
        </div>
    );

    return (
        <>
            <div className="hidden w-2/3 px-5 lg:flex flex-col justify-between">
                <div className="flex flex-col mt-5 overflow-y-auto px-4 h-[500px]">
                    {chatMessags.length > 0
                        ? chatMessags.map(renderMessage)
                        : renderEmptyState()}
                </div>
                <div className="flex bg-gray-300 rounded-xl items-center mb-5">
                    <div className='text-2xl px-5 hover:text-pinkLight border-r-[0.5px] border-black/20'>
                        <BsEmojiSmile />
                    </div>
                    <input
                        className="w-full py-5 px-3  bg-gray-300 rounded-l-xl"
                        type="text"
                        placeholder="type your message here..."
                        value={messageText}
                        onChange={(e) => { if (currentUser) setMessageText(e.target.value) }}
                    />
                    <div onClick={() => { if (currentUser) sendMessage() }} className='text-2xl px-5 hover:text-pinkLight border-l-[0.5px] border-black/20'>
                        <BsFillSendFill />
                    </div>
                </div>
            </div>
            {loading && <LoadingModal />}
        </>
    )
}