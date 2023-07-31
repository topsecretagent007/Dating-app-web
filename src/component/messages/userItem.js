import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import {
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    where,
    or,
    onSnapshot
} from "firebase/firestore";
import LoadingModal from "../../component/loadingPage";

export default function UserMessageItem({ chatter, selected }) {
    const { user } = UserAuth();
    const [loading, setLoading] = useState(false);
    const [lastData, setLastData] = useState({});
    const [msgCollection, setMsgCollection] = useState(null)

    useEffect(() => {
        const getUserChatMsg = async () => {
            setLoading(true);
            let messageCollection;
            const chatDocs = await getDocs(query(collection(db, "chats"),
                or(
                    where("docId", "==", user.uid + "-" + chatter.Matches),
                    where("docId", "==", chatter.Matches + "-" + user.uid)
                )
            ));
            const docs = chatDocs.docs.map(data => data.data());
            messageCollection = collection(
                db,
                "chats",
                docs[0]["docId"],
                "messages"
            );
            setMsgCollection(messageCollection);

            const lastMessageQuery = query(
                messageCollection,
                orderBy("time", "desc"),
                limit(1)
            );

            const lastMessageSnapshot = await getDocs(lastMessageQuery);
            const lastMessage = lastMessageSnapshot.docs[0]?.data();
            setLastData(lastMessage);
            setLoading(false);
        };

        if (chatter) {
            getUserChatMsg();
        }
    }, [chatter]);

    useEffect(() => {
        if (msgCollection) {
            onSnapshot(msgCollection, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        setLastData(change.doc.data());
                    }
                    if (change.type === "modified") {
                        // console.log("Modified city: ", change.doc.data());
                    }
                    if (change.type === "removed") {
                        // console.log("Removed city: ", change.doc.data());
                    }
                });
            })
        }
    }, [msgCollection])

    return (
        <div className="w-full flex">
            <div
                className={`${selected ? "border-l-pinkLight" : "border-l-white"} hover:border-l-pinkLight hover:bg-[#bebebe]  border-l-2 gap-1 hidden md:flex w-full py-3 cursor-pointer md:border-b-[0.1px] md:border-b-black/10 items-center`}
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
                            {lastData?.text}
                        </div>
                    </div>
                    <div className="text-end w-20  max-h-10 overflow-hidden text-sm break-words">
                        {lastData?.time?.toDate().toLocaleString()}
                    </div>
                </div>
            </div>

            <div
                className={`hover:bg-[#bebebe] bg-[#bebebe]/10 rounded-md gap-1 flex w-full py-3 cursor-pointer md:border-b-[0.1px] md:border-b-black/10 items-center md:hidden`}
            >
                <img
                    src={chatter.pictureUrl}
                    alt="avatar"
                    className="w-14 h-14 mx-3 my-auto object-cover rounded-full"
                />
                <div className="w-full text-start  justify-between pr-3 items-center flex ">
                    <div className="">
                        <div className="w-32 truncate text-block font-semibold">{chatter.userName}</div>
                        <div className="w-[70%] truncate">
                            {lastData?.text}
                        </div>
                    </div>
                    <div className="text-end w-20  max-h-10 overflow-hidden text-sm break-words">
                        {lastData?.time?.toDate().toLocaleString()}
                    </div>
                </div>
            </div>
            {loading && <LoadingModal message />}
        </div>
    );
}
