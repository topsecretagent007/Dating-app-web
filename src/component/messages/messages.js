import React, { useState, useEffect, useRef } from "react";
import { BsFillSendFill, BsEmojiSmile } from "react-icons/bs";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc, getDocs, collection, addDoc, onSnapshot } from "firebase/firestore";
import LoadingModal from "../../component/loadingPage";


export default function Messages({ currentUser, lastMessage }) {
    const { user } = UserAuth();
    const [loading, setLoading] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [myAvatar, setMyAvatar] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [messageText, setMessageText] = useState("");
    const [chats, setChats] = useState();

    const renderMessage = ({ id, sender_id, text, time }) => (
        <div
            key={id}
            onClick={() => console.log(id)}
        >
            {sender_id === user.uid ?
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

    const sendMessage = async () => {
        if (messageText === "") return;
        addDoc(chats, {
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
            setUserAvatar(currentUser?.pictureUrl);
            let messageCollection; // Declare the variable here
            const chatCollection = await getDocs(collection(db, "chats"));
            const filteredSnapshot = await chatCollection.docs.filter(doc => doc.data().docId === `${user.uid}-${currentUser?.Matches}`);
            if (filteredSnapshot.length != 0) {
                messageCollection = collection(db, "chats", `${user.uid}-${currentUser?.Matches}`, "messages")
            } else {
                messageCollection = collection(db, "chats", `${currentUser?.Matches}-${user.uid}`, "messages")
            }
            setChats(messageCollection);
            setChatMessages([]);
            setLoading(false)
        };

        if (currentUser && user.uid) {
            goToGetAvatar();
            console.log(currentUser)
        }
    }, [user, currentUser])

    useEffect(() => {
        if (chats) {
            setLoading(true)
            onSnapshot(chats, (snapshot) => {
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
                            lastMessage(updatedMessages[updatedMessages.length - 1])
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
    }, [chats]);

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
            <div className="hidden w-2/3 px-5 lg:flex flex-col justify-between">
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
            {loading && <LoadingModal message />}
        </>
    )
}