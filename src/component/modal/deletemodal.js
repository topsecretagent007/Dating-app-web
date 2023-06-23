import React, { useState, useEffect } from "react";
import ModelLogo from "../../assets/Modal-Logo.png"
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import LoadingModal from "../../component/loadingPage";

export default function DeleteModal() {
    const { user } = UserAuth();
    const [loading, setLoading] = useState(false);

    const [userId, setUserId] = useState();

    const deleteAccount = () => {
        // let user = Auth.auth().userId

        // user?.delete 
        
        }

        useEffect(() => {
            setLoading(true);
            const getUserInfo = async () => {
                const docSnap = await getDoc(doc(db, "Users", user.uid));
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUserId(userData.userId);
                    setLoading(false);
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
            if (user && user.uid) {
                getUserInfo();
            }
        }, [user])

        return (
            <>
                <h2 className="w-16 lg:w-24 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={ModelLogo} alt="ModelLogo" />
                </h2>
                <p className="text-lg lg:text-xl xl:text-3xl font-bold my-3 text-pinkLight">Information</p>
                <span className="text-sm xl:text-lg 2xl:text-xl my-3 lg:leading-relaxed">
                    You are about to permanently delete your account. Are you sure you want to do this?
                </span>

                <div className="w-full lg:flex gap-2">
                    <button onClick={() => deleteAccount()} className="w-5/6 xl:w-2/3 px-6 py-3 text-pinkLight border-2 border-pinkLight hover:bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3 hover:text-white gap-1">
                        <div className="text-sm xl:text-lg font-bold">Delete</div>
                    </button>
                    <button to="" className="w-5/6 xl:w-2/3 px-6 py-3 text-pinkLight border-2 border-pinkLight hover:bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3 hover:text-white gap-1">
                        <div className="text-sm xl:text-lg font-bold">Cancel</div>
                    </button>
                </div>
                {
                    loading &&
                    <LoadingModal />
                }
            </>
        )
    }