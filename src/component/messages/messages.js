import React, { useState, useEffect, useRef } from "react";
import { BsFillSendFill, BsEmojiSmile } from "react-icons/bs";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc, getDocs, collection, addDoc, onSnapshot, query, or, where } from "firebase/firestore";
import LoadingModal from "../../component/loadingPage";
import { FiArrowLeft } from "react-icons/fi";

export default function Messages({ currentUser, prevUsers }) {
    const { user } = UserAuth();
    const [loading, setLoading] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [myAvatar, setMyAvatar] = useState("");
    const [messageText, setMessageText] = useState("");
    const [msgCollection, setMsgCollection] = useState(null);
    const [lastMessage, setLastMessage] = useState(null);


    const renderMessage = ({ id, sender_id, text, time }) => (
        <div
            key={id}
            onClick={() => console.log(id)}
        >
            {sender_id === user.uid ?
                <div className="flex justify-end mb-4">
                    <div
                        className="max-w-[80%] lg:max-w-[70%] mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white break-words"
                    >
                        {text}
                        <br />
                        <div className="text-sm">
                            {time?.toDate().toLocaleString()}
                        </div>
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
                        src={currentUser?.pictureUrl}
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                    />
                    <div
                        className="max-w-[80%] lg:max-w-[70%] ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white break-words"
                    >
                        {text}
                        <br />
                        <div className="text-sm">
                            {time?.toDate().toLocaleString()}
                        </div>
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

    const sendMessage = async () => {
        if (messageText === "") return;
        addDoc(msgCollection, {
            receiver_id: currentUser?.Matches,
            sender_id: user.uid,
            image_url: "",
            isRead: true,
            text: messageText,
            time: new Date(),
            type: "Msg"
        });
        setMessageText("");

    }

    useEffect(() => {
        const goToGetAvatar = async () => {
            setLoading(true)
            const myQuerySnapshot = await getDoc(doc(db, "Users", user.uid));
            if (myQuerySnapshot.exists()) {
                const userData = myQuerySnapshot.data();
                setMyAvatar(userData.Pictures[0]?.url);
            } else {
                console.log("No such document!");
            }
            const chatDocs = await getDocs(query(collection(db, "chats"),
                or(
                    where("docId", "==", user.uid + "-" + currentUser.Matches),
                    where("docId", "==", currentUser.Matches + "-" + user.uid)
                )
            ));
            const docs = chatDocs.docs.map(data => data.data());
            setMsgCollection(collection(db, "chats", docs[0]["docId"], "messages"));
            setChatMessages([]);
            setLoading(false)
        };

        if (currentUser && user.uid) {
            goToGetAvatar();
        }
    }, [user, currentUser])

    useEffect(() => {
        if (msgCollection) {
            setLoading(true)
            onSnapshot(msgCollection, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        const message = {
                            id: change.doc.id,
                            sender_id: change.doc.data().sender_id,
                            isRead: change.doc.data().isRead,
                            text: change.doc.data().text,
                            time: change.doc.data().time
                        };
                        setChatMessages((prevMessages) => {
                            const updatedMessages = [...prevMessages, message];
                            updatedMessages.sort((a, b) => a.time - b.time);
                            setLastMessage(updatedMessages[updatedMessages.length - 1])
                            return updatedMessages;
                        });
                    }
                    if (change.type === "modified") {
                        // console.log("Modified city: ", change.doc.data());
                    }
                    if (change.type === "removed") {
                        // console.log("Removed city: ", change.doc.data());
                    }
                });
            });
            setLoading(false)
        }
    }, [msgCollection]);

    const handleKeyDown = (event) => {
        if (event && event.key === 'Enter') {
            sendMessage();
        }
    };
    const divRef = useRef(null);
    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    });

    return (
        <>
            <div className="lg:w-2/3 lg:flex flex-col justify-between">
                <div className="lg:hidden items-center gap-6 flex border-b-[0.5px] border-black/10 py-2 px-4">
                    <div onClick={() => prevUsers()} className=" cursor-pointer text-xl text-pinkLight mt-2">
                        <FiArrowLeft />
                    </div>
                    <img
                        src={currentUser?.pictureUrl}
                        className="object-cover h-10 w-10 rounded-full"
                        alt=""
                    />
                    <div className="text-sm">
                        <div className="w-32 truncate">{currentUser?.userName}</div>
                        <div className="w-32 truncate">
                            {lastMessage?.text}
                        </div>
                    </div>
                </div>
                <div className="px-5">
                    <div className="flex flex-col mt-5 overflow-y-auto px-4 h-[500px]">
                        {chatMessages.length > 0
                            ? chatMessages.map((message) => renderMessage(message))
                            : renderEmptyState()}
                        <div ref={divRef} />
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
                            onChange={(e) => { if (currentUser?.Matches) setMessageText(e.target.value) }}
                            onKeyDown={(e) => handleKeyDown(e)}
                        />
                        <div onClick={() => { if (currentUser) sendMessage() }} className='text-2xl px-5 hover:text-pinkLight border-l-[0.5px] border-black/20'>
                            <BsFillSendFill />
                        </div>
                    </div>
                </div>
            </div>
            {loading && <LoadingModal message />}
        </>
    )
}