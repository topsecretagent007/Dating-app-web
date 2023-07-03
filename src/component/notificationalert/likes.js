import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import LoadingModal from "../../component/loadingPage";


export default function LikedBy() {
    const navigate = useNavigate();
    const { user } = UserAuth();
    const [numbers, setNumbers] = useState();
    const [likedUserAvatar, setLikedUserAvatar] = useState();
    const [likedTime, setLikedTime] = useState();
    const [likedUserName, setLikedUserName] = useState();
    const [loading, setLoading] = useState(false);
    const [userLikes, setUserLikes] = useState(true);


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
                if (matchedUserid.includes(doc.id) || doc.DislikedUser != null) {
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

            if (userLikes === true) {
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
        if (user && user.uid) {
            getUserInfo();
        }
    }, [user, userLikes]);

    const listItems = numbers && numbers.length > 0 ? numbers.map((numbers, index) =>
        <div key={index} className="w-full flex cursor-pointer" onClick={() => Lookingprofile(numbers)}>
            <div className="hover:border-l-pinkLight hover:bg-[#bebebe] border-l-white items-center border-l-2 gap-5 flex w-full py-3 border-b-[0.1px] border-b-black/10">
                <img src={likedUserAvatar[index]} alt="avatar" className="w-12 h-12 ml-2 mr-1 my-auto object-cover rounded-full " />
                <div className="w-full text-[#888888] text-start pl-1 text-base justify-between pr-3 sm:flex ">
                    <div className="w-40 sm:w-52 truncate">You are liked by {likedUserName[index]}</div>
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
            <div className="grid grid-cols-2 gap-2 py-3 border-b-[0.5px] border-b-[#888888]">
                <button onClick={() => setUserLikes(true)} className={`${userLikes ? "bg-pinkLight text-white" : "text-pinkLight bg-white"} md:py-1 xl:py-2 text-base mx-auto  border-[0.5px] border-pinkLight rounded-full w-24 hover:bg-pinkLight hover:text-white`}>Likes</button>
                <button onClick={() => setUserLikes(false)} className={`${userLikes ? "text-pinkLight bg-white" : "bg-pinkLight text-white"} md:py-1 xl:py-2 text-base mx-auto border-[0.5px] border-pinkLight rounded-full w-24 hover:bg-pinkLight hover:text-white`}>My Likes</button>
            </div>
            <div>
                {listItems}
            </div>

            {loading && <LoadingModal />}
        </div>
    );
}