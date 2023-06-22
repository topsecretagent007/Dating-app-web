import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Logo from "../../assets/Logo1.svg";
import { db } from '../../firebase';
import LoadingModal from "../../component/loadingPage";
import { UserAuth } from "../../context/AuthContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export default function ProfileDescription() {
    const navigate = useNavigate();
    const { user } = UserAuth();
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [originalEditInfo, setOriginalEditInfo] = useState(null);

    const updataProfileData = async () => {
        setLoading(true);
        const { about:_, ...temp } = originalEditInfo;
        const newEditInfo = {about: description, ...temp};
        try {
            await updateDoc(doc(db, "Users", user.uid), {
                editInfo: newEditInfo,
                listSwipedUser: [],
                age_range: {
                    max: "99",
                    min: "18"
                },
                maximum_distance: 400,
                miles: true,

            });
            setLoading(false);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setLoading(true);
        const getUserInfo = async () => {
            const docSnap = await getDoc(doc(db, "Users", user.uid));
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setOriginalEditInfo(userData.editInfo);
                setDescription(userData.editInfo?.about);
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
        <div className="bg-[#FFFBFE] rounded-xl w-full h-full min-h-screen justify-center pt-10 pb-20">
            <div className="flex">
                <div className="pt-20 pl-2 md:pl-5 xl:pl-20 2xl:pl-40">
                    <Link to='/profile/photoaddmore'>
                        <FiArrowLeft className="text-pinkLight text-xl lg:text-2xl xl:text-4xl my-3" />
                    </Link>
                </div>
                <div className="w-full">
                    <div className="w-full p-8 items-center">
                        <img src={Logo} alt="Logo" className="mx-auto" />
                    </div>
                    <div className="text-2xl font-bold">Description</div>
                    <div className="text-sm xl:text-2xl font-bold py-4 xl:leading-loose">
                        Please write something about yourself and let other members know why <br />
                        you’re here. You can skip this section for now and complete this later in your <br />
                        settings under Edit info.
                    </div>
                    <div className="mt-10 text-sm lg:text-xl mb-20 leading-relaxed">
                        <textarea
                            className="border-[#888888] border-2 mx-auto bg-white rounded-xl w-full p-4 md:w-1/2 xl:w-1/3 h-[400px] placeholder:italic placeholder:text-slate-400 block  shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 resize-none"
                            type="text"
                            name="discription"
                            placeholder="Write something about yourself."
                            rows={4}
                            cols={40}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </textarea>
                    </div>
                    <button onClick={() => updataProfileData()} className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">Continue</button>
                </div>
                <div className="pt-20 pr-2 md:pr-5 xl:pr-20 2xl:pr-40">
                </div>
            </div>
            {
                loading &&
                <LoadingModal />
            }
        </div>
    )
}