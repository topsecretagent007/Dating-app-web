import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import LoadingModal from "../../component/loadingPage";

export default function Matches({ onClickUser }) {
    const { user } = UserAuth();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getMatches = async () => {
            try {
                setLoading(true);
                const querySnapshot = await getDocs(
                    collection(db, "Users", user.uid, "Matches")
                );
                const matches = querySnapshot.docs.map((doc) => {
                    const { pictureUrl, timestamp, userName } = doc.data();
                    return {
                        id: doc.id,
                        pictureUrl,
                        timestamp,
                        userName,
                    };
                });
                setMatches(matches);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching matches: ", error);
                setLoading(false);

            }
        };
        if (user && user.uid) getMatches();
    }, []);

    const renderMatch = ({ id, pictureUrl, timestamp, userName }) => (
        <div
            key={id}
            className="w-full flex"
            onClick={() => onClickUser(id)}
        >
            <div className="hover:border-l-pinkLight hover:bg-[#bebebe] border-l-white border-l-2 gap-1 flex w-full pt-1 cursor-pointer border-b-[0.5px] border-b-black/10 py-3">
                <img
                    src={pictureUrl}
                    className="w-10 h-10 ml-1 mr-2 my-auto object-cover rounded-full"
                />
                <div className="w-full text-[#888888] text-start pl-1  text-sm justify-between pr-3 sm:flex ">
                    <div className="w-32 truncate">{userName}</div>
                    <div className="lg:text-end lg:w-20">
                        {timestamp?.toDate().toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderEmptyState = () => (
        <div className="text-[#5a5a5a] w-full mx-auto text-lg pt-4 font-mono justify-center">
            <p className="text-center">No users are connected.</p>
        </div>
    );

    return (
        <>
            <div>
                {matches.length > 0
                    ? matches.map(renderMatch)
                    : renderEmptyState()}
            </div>
            {loading && <LoadingModal />}
        </>
    );
}