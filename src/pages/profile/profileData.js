import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Logo from "../../assets/Logo1.svg";
import Dropdown from "../../component/combox/dropdown";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { sexData, oriData, statusData, lookingForData, showData } from "../../config/constant";
import LoadingModal from "../../component/loadingPage";
import AlertModal from "../../component/modal/alertmodal";

export default function ProfileData() {
    const navigate = useNavigate();
    const { user } = UserAuth();
    const [name, setName] = useState("");
    const [brithday, setBrithday] = useState("");
    const [nextPage, setNextPage] = useState(false);
    const [userAge, setUserAge] = useState(0);
    const [userSex, setUserSex] = useState("");
    const [userOri, setUserOri] = useState("");
    const [userStatus, setUserStatus] = useState("");
    const [userLooking, setUserLooking] = useState([]);
    const [userShow, setUserShow] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alertModal, setAlertModal] = useState(false);
    const [visible, setVisible] = useState(true);
    const menuDropdown = useRef(null);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    const nameChange = (event) => {
        setName(event.target.value);
    }

    const modalClose = () => {
        setAlertModal(false);
    }
    
    const brithdayChange = (event) => {
        setBrithday(event.target.value);
        const today = new Date();
        const birthDate = new Date(event.target.value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        setUserAge(age);
        event.preventDefault();
    }

    useEffect(() => {
        function handleScroll() {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuDropdown.current && !menuDropdown.current.contains(event.target)) {
                setAlertModal(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuDropdown]);

    const updateProfileData = async () => {
        if (nextPage) {
            if (name !== "" && brithday !== "" && userSex !== "" && userOri !== "" && userStatus !== "" && userLooking !== [] && userShow !== []) {
                setLoading(true);
                await updateDoc(doc(db, "Users", user.uid), {
                    UserName: name,
                    user_DOB: brithday,
                    age: userAge,
                    editInfo: {
                        showOnProfile: false,
                        university: "",
                        userGender: userSex
                    },
                    sexualOrientation: {
                        orientation: userOri,
                        showOnProfile: false
                    },
                    showGender: userShow,
                    desires: userLooking,
                    status: userStatus,
                    currentPoint: {
                        geohash: "",
                        geopoint: [0, 0]
                    },
                    geoHash: "",
                    geoLocation: [0, 0],
                    location: {
                        address: "",
                        countryID: "",
                        countryName: "",
                        latitude: 0,
                        longitude: 0
                    },
                    point: {
                        geohash: "",
                        geopoint: [0, 0]
                    },
                    interest: "",
                    phoneNumber: ""
                });
                setLoading(false);
                navigate("/profile/location");
            }
        } else {
            setAlertModal(true);
        }
    }

    useEffect(() => {
        if (name !== "" && brithday !== "" && userSex !== "" && userOri !== "" && userStatus !== "" && userLooking !== [] && userShow !== []) {
            console.log(userLooking)
            setNextPage(true);
        } else {
            setNextPage(false);
        }
    }, [name, brithday, userSex, userOri, userStatus, userLooking, userShow])

    useEffect(() => {
        setLoading(true);
        const getUserInfo = async () => {
            const docSnap = await getDoc(doc(db, "Users", user.uid));
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setName(userData.UserName);
                setBrithday(userData.user_DOB);
                setUserSex(userData.editInfo?.userGender)
                setUserOri(userData.sexualOrientation?.orientation);
                setUserStatus(userData.status);
                setUserLooking(userData.desires);
                setUserShow(userData.showGender);
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
        <div className="bg-[#FFFBFE] bg-cover rounded-xl w-full h-full min-h-screen flex">
            <div className="pt-20 pl-[8%]">
                <Link to='/profile/friendship' className="">
                    <FiArrowLeft className="text-pinkLight text-4xl my-3" />
                </Link>
            </div>
            <div className="w-full">
                <div className="w-full px-10 pt-20 pb-10 items-center">
                    <img src={Logo} alt="Logo" className="mx-auto" />
                </div>
                <div className=" text-3xl text-start">
                    <div className="w-full md:grid-cols-2 grid md:justify-between md:gap-20 lg:grid-cols-3 pb-10">
                        <div className="text-lg xl:text-xl w-full 2xl:text-3xl text-start mx-auto">
                            <div className="py-2 font-bold w-full text-[#5a5a5a]">User Name</div>
                            <input className="border-[0.5px] border-[#5a5a5a]/40 bg-white rounded-[5px] w-full 2xl:text-2xl py-4 px-3 text-black text-base" placeholder="Your Name" value={name} onChange={(event) => nameChange(event)} />
                        </div>
                        <div className="text-lg xl:text-xl w-full 2xl:text-3xl text-start mx-auto">
                            <div className="py-2 font-bold w-full text-[#5a5a5a]">Brithday</div>
                            <input type="date" className="border-[0.5px] border-[#5a5a5a]/40 bg-white rounded-[5px] w-full 2xl:text-2xl py-4 px-3 text-black text-base" value={brithday} onChange={(event) => brithdayChange(event)} />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:justify-between md:gap-20 lg:grid-cols-3 pb-40">
                        <Dropdown text="I am a " value={userSex} items={sexData} onHandleChange={e => setUserSex(e[0])} />
                        <Dropdown text="My sexual orientation " value={userOri} items={oriData} onHandleChange={e => setUserOri(e[0])} />
                        <Dropdown text="My Status is " value={userStatus} items={statusData} onHandleChange={e => setUserStatus(e[0])} />
                        <Dropdown text="I am looking for " value={userLooking} items={lookingForData} onHandleChange={e => setUserLooking(e)} multiple={true} />
                        <Dropdown text="Show me " value={userShow} items={showData} onHandleChange={e => setUserShow(e)} multiple={true} />
                    </div>
                </div>
                <button onClick={() => updateProfileData()} className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-8 xl:py-4 xl:px-32 mb-10">Continue</button>
            </div>
            <div className=" pt-20 pl-[8%]">
            </div>
            {
                loading &&
                <LoadingModal />
            }
            {
                alertModal &&
                <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                    <div className="w-full h-screen bg-cover flex px-8  justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-3/5 bg-white rounded-xl px-3 relative  py-12">
                            <AlertModal text="Please fill all the fields." onCloseModal={() => modalClose()}/>
                        </div>
                    </div >
                </div>
            }
        </div>
    )
}