import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import LoadingModal from "../component/loadingPage";
import Header from "../component/header/index";
import Footer from "../component/footer/index";

import UserBrowser from "../component/UserBrowser";

export default function PreviewProfile() {
    const { user } = UserAuth();
    const { id } = useParams();
    const [data, setData] = useState();
    const [state, setState] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUserInfo = async () => {
            setLoading(true);
            const docUserMatches = await getDocs(collection(db, "Users", user.uid, "Matches"))
            docUserMatches.forEach((doc) => {
                if (doc.id === id) setState(true);
                else setState(false);
            })
            const docSnap = await getDoc(doc(db, "Users", id));
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setData(userData);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }

            setLoading(false);
        }
        if (id) {
            getUserInfo();
        }
    }, [id, user])

    return (

        <>
            <Header />
            <div className="w-full h-full min-h-screen bg-cover px-[13%] bg-[#FFFBFE] py-14">
                {data &&
                    <UserBrowser userData={data} matched={state} onRemoveUser />
                }
                {
                    loading &&
                    <LoadingModal />
                }
            </div>
            <Footer />
        </>

    )
}