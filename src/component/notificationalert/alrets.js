import React, { useState, useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import LoadingModal from "../../component/loadingPage";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import ModelLogo from "../../assets/Modal-Logo.png"

export default function Matches() {
    const [deleteMessage, setDeleteMessage] = useState(false);
    const menuDropdown = useRef(null);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [loading, setLoading] = useState(false);
    const { user } = UserAuth();
    const [numbers, setNumbers] = useState([]);
    const [title, setTitle] = useState([])
    const [textBody, setTextBody] = useState([]);
    const [time, setTime] = useState([]);
    const [deleteNotification, setDeleteNotification] = useState();

    const openDeleteModal = (id) => {
        setDeleteNotification(id);
        setDeleteMessage(true);
    }

    const messageDelete = async (id) => {
        setLoading(true);
        await deleteDoc(doc(db, "Users", user.uid, "notification", id));
        goToUserInfo();
        setDeleteMessage(false);
        setLoading(false);
    }

    useEffect(() => {
        function handleScroll() {
            const currentScrollPos = window.pageYOffset;
            setPrevScrollPos(currentScrollPos);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuDropdown.current && !menuDropdown.current.contains(event.target)) {
                setDeleteMessage(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuDropdown]);

    const goToUserInfo = async () => {
        setLoading(true);
        const alertNotification = [];
        const alertBody = [];
        const alertTitle = [];
        const alertTime = [];
        const matchesSnapshot = await getDocs(collection(db, "Users", user.uid, "notification"));
        matchesSnapshot.forEach((doc) => {
            alertNotification.push(doc.id);

            if (doc.data().body) {
                alertBody.push(doc.data().body)
            } else {
                console.error("Missing body for doc:", doc.id);
            }
            if (doc.data().title) {
                alertTitle.push(doc.data().title)
            } else {
                console.error("Missing title for doc:", doc.id);
            }
            if (doc.data().time) {
                alertTime.push(doc.data().time)
            } else {
                console.error("Missing time for doc:", doc.id);
            }
        });
        setNumbers(alertNotification);
        setTitle(alertTitle);
        setTextBody(alertBody);
        setTime(alertTime);
        setLoading(false);
    }

    useEffect(() => {
        if (user && user.uid) {
            goToUserInfo();
        }
    }, [user]);

    const listItems =
        numbers && numbers.length > 0 ? (
            numbers.map((number, index) => (
                <div key={index} className="w-full flex px-[6%] py-5">
                    <div className="bg-[#FAD7F0] p-6 text-black rounded-xl">
                        <div className="w-full lg:text-lg xl:text-xl flex justify-between items-center">
                            <div className="font-bold text-start w-full">{title[index]}</div>
                            <MdDelete
                                onClick={() => openDeleteModal(number)}
                                className="text-end cursor-pointer"
                            />
                        </div>
                        <div className="py-1 pl-2 text-sm md:text-base text-start">
                            {textBody[index]}
                        </div>
                        <div className="text-sm xl:text-base text-end">
                            {time[index]?.toDate().toLocaleString()}
                        </div>
                    </div>
                </div>
            ))
        ) :
            <div className="text-[#5a5a5a] text-lg pt-4 font-mono justify-center">
                <p>No notifications.</p>
            </div>;
    return (
        <div>
            {listItems}
            {
                deleteMessage &&
                <div className={`fixed z-50 top-0 left-0 w-full h-full min-h-screen `}>
                    <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                            <h2 className="w-16 lg:w-24 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <img src={ModelLogo} alt="ModelLogo" />
                            </h2>
                            <p className="text-lg lg:text-xl xl:text-3xl font-bold my-3 text-pinkLight">Delete Message</p>
                            <span className="text-sm xl:text-lg 2xl:text-xl my-3 lg:leading-relaxed">
                                You are about to delete a message. Are you sure you want to do this?
                            </span>
                            <div className="w-full lg:flex gap-2">
                                <button onClick={() => messageDelete(deleteNotification)} className="w-5/6 xl:w-2/3 px-6 py-3 text-pinkLight border-2 border-pinkLight hover:bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3 hover:text-white gap-1">
                                    <div className="text-sm xl:text-lg font-bold">Delete</div>
                                </button>
                                <button onClick={() => setDeleteMessage(false)} className="w-5/6 xl:w-2/3 px-6 py-3 text-pinkLight border-2 border-pinkLight hover:bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3 hover:text-white gap-1">
                                    <div className="text-sm xl:text-lg font-bold">Cancel</div>
                                </button>
                            </div>
                        </div>
                    </div >
                </div>
            }
            {loading && <LoadingModal />}

        </div>
    )
}