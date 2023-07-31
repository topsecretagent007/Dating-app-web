import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import LoadingModal from "../../component/loadingPage";
import { AiFillHeart } from "react-icons/ai";

export default function LikedBy(likeState) {
    const navigate = useNavigate();
    const { user } = UserAuth();
    const [numbers, setNumbers] = useState();
    const [likedUserAvatar, setLikedUserAvatar] = useState();
    const [likedTime, setLikedTime] = useState();
    const [likedUserName, setLikedUserName] = useState();
    const [loading, setLoading] = useState(false);

    const Lookingprofile = async (userId) => {
        navigate(`/likedUsers/${userId}`)
    }

    useEffect(() => {
        const getUserInfo = async () => {
            setLoading(true);
            const likedUserid = [];
            const likedUserImage = [];
            const likedUserTime = [];
            const likedUserNames = [];
            const checkedUserid = [];
            const checkedUserImage = [];
            const checkedUserTime = [];
            const checkedUserName = [];
            const matchedUserid = [];
            const docUserMatch = await getDocs(collection(db, "Users", user.uid, "Matches"));
            docUserMatch.forEach((doc) => {
                matchedUserid.push(doc.id)
            })
            const querySnapshot = await getDocs(collection(db, "Users", user.uid, "LikedBy"));
            querySnapshot.forEach((doc) => {
                if (matchedUserid.includes(doc.id)) {
                    return;
                } else {
                    likedUserid.push(doc.id)
                    if (doc.data().pictureUrl) {
                        likedUserImage.push(doc.data().pictureUrl)
                    } else {
                        console.error("Missing pictureUrl for doc:", doc.id);
                    }
                    if (doc.data().timestamp) {
                        likedUserTime.push(doc.data().timestamp)
                    } else {
                        console.error("Missing timestamp for doc:", doc.id);
                    }
                    if (doc.data().userName) {
                        likedUserNames.push(doc.data().userName)
                    } else {
                        console.error("Missing userName for doc:", doc.id);
                    }
                }
            });

            const queryUserSnapshot = await getDocs(collection(db, "Users", user.uid, "CheckedUser"));
            queryUserSnapshot.forEach((doc) => {
                if (matchedUserid.includes(doc.id) && doc.data().DislikedUser != null || doc.data().DislikedUser != undefined) {
                    return;
                } else {
                    checkedUserid.push(doc.id)
                    if (doc.data().pictureUrl) {
                        checkedUserImage.push(doc.data().pictureUrl)
                    } else {
                        console.error("Missing pictureUrl for doc:", doc.id);
                    }
                    if (doc.data().timestamp) {
                        checkedUserTime.push(doc.data().timestamp)
                    } else {
                        console.error("Missing timestamp for doc:", doc.id);
                    }
                    if (doc.data().userName) {
                        checkedUserName.push(doc.data().userName)
                    } else {
                        console.error("Missing userName for doc:", doc.id);
                    }
                }
            });
            if (likeState.likeState) {
                setNumbers(likedUserid);
                setLikedUserAvatar(likedUserImage);
                setLikedTime(likedUserTime);
                setLikedUserName(likedUserNames);
            } else {
                setNumbers(checkedUserid);
                setLikedUserAvatar(checkedUserImage);
                setLikedTime(checkedUserTime);
                setLikedUserName(checkedUserName);
            }
            setLoading(false);
        }
        if (user && likeState) {
            getUserInfo();
        }
    }, [likeState]);

    const listItems = numbers && numbers.length > 0 ? numbers.map((numbers, index) =>
        <div key={index} className="w-full flex cursor-pointer mb-2" onClick={() => Lookingprofile(numbers)}>
            <div className="md:hover:border-l-pinkLight md:hover:bg-[#bebebe] md:border-l-white md:border-l-2 gap-5 flex w-full px-5 py-3 cursor-pointer md:border-b-[0.1px] md:border-b-black/10 items-center bg-[#5a5a5a]/10 rounded-lg md:rounded-none md:bg-none">
                <img src={likedUserAvatar[index]} alt="avatar" className="w-12 h-12 mx-1 my-auto object-cover rounded-full" />
                <div className="w-full text-block text-start px-1 text-base justify-between sm:flex">
                    {
                        likeState.likeState ?
                            <div className="w-[75%] md:w-48  truncate">You are liked by {likedUserName[index]}</div>
                            :
                            <div className="w-[75%] md:w-48  truncate">You liked {likedUserName[index]}</div>
                    }
                    <div className=" text-sm">{likedTime[index].toDate().toLocaleString()}</div>
                </div>
            </div>
        </div>
    ) :
        <div className="text-[#5a5a5a] text-lg pt-4 font-mono justify-center">
            <p>No users are connected.</p>
        </div>;

    return (
        <div>
            <div className="flex py-3 gap-[8%] md:gap-[20%] md:px-[10%] justify-center" >
                <button onClick={() => navigate("/notification/likes/like")} className={`${likeState.likeState ? "bg-pinkLight text-white border-none" : "text-pinkLight bg-white border-[0.5px]"} py-2 text-base border-pinkLight rounded-lg w-full hover:bg-pinkLight hover:text-white`}>
                    <div className="flex items-center gap-2 justify-center">
                        <AiFillHeart />
                        Likes
                    </div>
                </button>
                <button onClick={() => navigate("/notification/likes/dislike")} className={`${likeState.likeState ? "text-pinkLight bg-white border-[0.5px]" : "bg-pinkLight text-white border-none"} py-2 text-base  border-pinkLight rounded-lg w-full hover:bg-pinkLight hover:text-white`}>
                    <div className="flex items-center gap-2 justify-center ">
                        <AiFillHeart />
                        My Likes
                    </div>
                </button>
            </div>
            <div>
                {listItems}
            </div>

            {loading && <LoadingModal />}
        </div>
    );
}