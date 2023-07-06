import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    limit,
} from "firebase/firestore";
import LoadingModal from "../../component/loadingPage";

export default function UserMessageItem({ chatter, selected }) {
    const { user } = UserAuth();
    const [loading, setLoading] = useState(false);
    const [laseData, setLastData] = useState();


    useEffect(() => {
        const getUserChatMsg = async () => {
            setLoading(true);
            let messageCollection;
            const chatCollection = await getDocs(collection(db, "chats"));
            const filteredSnapshot = chatCollection.docs.filter(
                (doc) =>
                    doc.data().docId === `${user.uid}-${chatter?.Matches}` ||
                    doc.data().docId === `${chatter?.Matches}-${user.uid}`
            );

            if (filteredSnapshot.length !== 0) {
                messageCollection = collection(
                    db,
                    "chats",
                    `${user.uid}-${chatter?.Matches}`,
                    "messages"
                );
            } else {
                messageCollection = collection(
                    db,
                    "chats",
                    `${chatter?.Matches}-${user.uid}`,
                    "messages"
                );
            }

            console.log(messageCollection, "messageCollection");

            const lastMessageQuery = query(
                messageCollection,
                orderBy("time", "desc"),
                limit(1)
            );

            const lastMessageSnapshot = await getDocs(lastMessageQuery);

            if (!lastMessageSnapshot.empty) {
                const lastMessage = lastMessageSnapshot.docs[0].data();
                setLastData(lastMessage);
                console.log(lastMessage, "lastMessage");
                // Do something with the last message
            }

            setLoading(false);
        };

        if (chatter) {
            getUserChatMsg();
        }
    }, [chatter, user.uid]);

    return (
        <div className="w-full flex">
            <div
                className={`${selected ? "border-l-pinkLight" : "border-l-white"} hover:border-l-pinkLight hover:bg-[#bebebe]  border-l-2 gap-1 flex w-full py-3 cursor-pointer border-b-[0.1px] border-b-black/10 items-center`}
            >
                <img
                    src={chatter.pictureUrl}
                    alt="avatar"
                    className="w-10 h-10 ml-1 mr-2 my-auto object-cover rounded-full"
                />
                <div className="w-full text-[#888888] text-start pl-1 text-sm justify-between pr-3 sm:flex ">
                    <div className="">
                        <div className="w-32 truncate">{chatter.userName}</div>
                        <div className="w-32 truncate">
                            {laseData?.text}
                        </div>
                    </div>
                    <div className="lg:text-end lg:w-20 text-sm">
                        {laseData?.time?.toDate().toLocaleString()}
                    </div>
                </div>
            </div>
            {loading && <LoadingModal message />}
        </div>
    );
}
