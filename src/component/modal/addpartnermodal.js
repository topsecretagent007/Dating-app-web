import React, { useEffect, useState } from "react";
import ModelLogo from "../../assets/Modal-Logo.png";
import { UserAuth } from "../../context/AuthContext";
import { IoMdClose } from "react-icons/io";
import { doc, setDoc } from "firebase/firestore";
import LoadingModal from "../../component/loadingPage";
import { db } from "../../firebase";

export default function AddPartnerModal({ matchesUser, myImage, myName, onPartnerAdd, closeModal }) {
    const { user } = UserAuth();
    const [modal, setModal] = useState(true);
    const [currentId, setCurrentId] = useState(true);
    const [loading, setLoading] = useState(false);

    const addPartner = async (addUser) => {
        setLoading(true);
        await setDoc(doc(db, "Relationship", user.uid), {
            isRelationship: false,
            partner: {
                partnerId: "",
                partnerImage: "",
                partnerName: ""
            },
            pendingAcc: {
                0: {
                    createdAt: new Date(),
                    imageUrl: addUser.pictureUrl,
                    reqUid: addUser.Matches,
                    userName: addUser.userName
                }
            },
            updataAt: new Date(),
            userId: user.uid
        });
        await setDoc(doc(db, "Relationship", addUser.Matches), {
            isRelationship: false,
            partner: {
                partnerId: "",
                partnerImage: "",
                partnerName: ""
            },
            pendingReq: {
                0: {
                    createdAt: new Date(),
                    imageUrl: myImage,
                    reqUid: user.uid,
                    userName: myName
                }
            },
            updataAt: new Date(),
            userId: addUser.Matches
        });
        setLoading(false);
        onPartnerAdd();
        closeModal();
    }



    const listItems = matchesUser && matchesUser.length > 0 ? matchesUser.map((matchesUser, index) =>
        <div key={index} className="w-full flex" onClick={() => (setCurrentId(index), setModal(false))}>
            <div className="hover:border-l-pinkLight hover:bg-[#bebebe] border-l-white border-l-2 gap-5 flex w-full px-5 py-3 cursor-pointer border-b-[0.1px] border-b-black/10 items-center">
                <img src={matchesUser?.pictureUrl} alt="avatar" className="w-12 h-12 ml-1 mr-2 my-auto object-cover rounded-full" />
                <div className="w-full text-[#888888] text-start pl-1 text-base justify-between pr-3 sm:flex">
                    <div className="w-32 md:w-48  truncate font-bold">{matchesUser?.userName}</div>
                </div>
            </div>
        </div>
    ) :
        <div className="text-[#5a5a5a] text-lg pt-4 font-mono justify-center">
            <p>No users are connected.</p>
        </div>;

    return (
        <>
            <h2 className="w-16 lg:w-24 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src={ModelLogo} alt="ModelLogo" />
            </h2>
            <div className="p-2 rounded-full text-pinkLight text-xl absolute justify-center flex top-1 right-1 transform translate-x-1/2 -translate-y-1/2 cursor-pointer bg-white">
                <IoMdClose onClick={() => closeModal()} />
            </div>
            <p className="text-lg lg:text-xl xl:text-3xl font-bold my-3 text-pinkLight">{modal ? "Add Partner" : "Information"}</p>
            {
                modal ?
                    <>
                        <div className="p-3 rounded-x h-[580px] rounded-xl full border-2 border-pinkLight">
                            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                                <input
                                    type="search"
                                    className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out 
                        "
                                    placeholder="Search"
                                    aria-label="Search"
                                    aria-describedby="button-addon1" />
                                <button
                                    className="relative z-[2] flex items-center rounded-r bg-pinkLight px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md "
                                    type="button"
                                    id="button-addon1"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-5 w-5">
                                        <path
                                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="py-2 h-[490px] rounded-xl border-[0.1px] border-black/20">
                                {listItems}
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="p-3 rounded-x h-[500px] rounded-xl full border-2 border-pinkLight">
                            <p className="w-full text-lg xl-text-xl font-semibold pt-2">
                                Would you like to add {matchesUser[currentId]?.userName} as your Partner?
                            </p>
                            <img src={matchesUser[currentId]?.pictureUrl} alt="avatar" className="w-[400px] h-[400px] mx-auto my-6 object-cover rounded-xl" />
                        </div>
                        <div className="w-full lg:flex gap-2">
                            <button onClick={() => addPartner(matchesUser[currentId])} className="w-5/6 xl:w-2/3 px-6 py-3 text-pinkLight border-2 border-pinkLight hover:bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3 hover:text-white gap-1">
                                <div className="text-sm xl:text-lg font-bold">Yes</div>
                            </button>
                            <button onClick={() => setModal(true)} className="w-5/6 xl:w-2/3 px-6 py-3 text-pinkLight border-2 border-pinkLight hover:bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3 hover:text-white gap-1">
                                <div className="text-sm xl:text-lg font-bold">No</div>
                            </button>
                        </div>
                    </>
            }
            {
                loading &&
                <LoadingModal />
            }
        </>
    )
}