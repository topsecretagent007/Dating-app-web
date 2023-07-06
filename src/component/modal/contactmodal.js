import React, { useState } from "react";
import ModelLogo from "../../assets/Modal-Logo.png"
import { UserAuth } from "../../context/AuthContext";

export default function ContactModal({ closeModal }) {
    const [modal, setModal] = useState(true);
    const { user } = UserAuth();
    const [support, setSupport] = useState("Support");
    const [sendEmail, setSendEmail] = useState("");

    const [sendText, setSendText] = useState("");



    return (
        <>
            <h2 className="w-16 lg:w-24 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src={ModelLogo} alt="ModelLogo" />
            </h2>
            <p className="text-lg lg:text-xl xl:text-3xl font-bold my-3 text-pinkLight">Information</p>
            {modal ?
                <>

                    <span className="text-sm xl:text-lg 2xl:text-xl my-3 lg:leading-relaxed">
                        Your Profile Already Verified
                    </span>
                    <div className="w-full lg:flex gap-2">
                        <button onClick={() => setModal(false)} className="w-5/6 xl:w-2/3 px-6 py-3 text-pinkLight border-2 border-pinkLight hover:bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3 hover:text-white gap-1">
                            <div className="text-sm xl:text-lg font-bold">Continue</div>
                        </button>
                    </div>
                </>
                :
                <>
                    <div className="w-full border-pinkLight rounded-xl py-2 px-1 md:px-10 border-[0.5px]">
                        <div className="w-full bg-[#888888]/10 border-[0.5px] rounded-md my-2 text-start py-2 px-3 border-pinkLight text-sm truncate">From : {user.email}</div>
                        <div className="w-full bg-[#888888]/10 border-[0.5px] rounded-md my-2 text-start py-2 px-3 border-pinkLight flex gap-2 text-sm truncate">
                            <div className="">To :</div>
                            <input type="text" className="bg-[#f1f1f1] text-start w-full" placeholder="info@unjabbed.app" value={sendEmail} onChange={(e => setSendEmail(e.target.value))} ></input>
                        </div>

                        <input type="text" className="w-full bg-[#888888]/10 border-[0.5px] rounded-md my-2 text-start text-sm py-2 px-3 border-pinkLight" value={support} onChange={(e => setSupport(e.target.value))} ></input>

                        <div className="w-full my-2 text-start  ">
                            <textarea
                                className="bg-[#888888]/10 w-full rounded-md border-pinkLight border-[0.5px] p-2 h-[100px] text-sm placeholder:italic placeholder:text-slate-400 block  shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 resize-none"
                                type="text"
                                name="discription"
                                placeholder="Compose email"
                                rows={4}
                                value={sendText}
                                onChange={(e) => setSendText(e.target.value)}
                            >
                            </textarea>
                        </div>

                    </div>
                    <div className="w-full lg:flex gap-2">
                        <button onClick={() => setModal(false)} className="w-5/6 xl:w-2/3 px-6 py-3 text-pinkLight border-2 border-pinkLight hover:bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3 hover:text-white gap-1">
                            <div className="text-sm xl:text-lg font-bold">send</div>
                        </button>
                        <button onClick={() => closeModal()} className="w-5/6 xl:w-2/3 px-6 py-3 text-pinkLight border-2 border-pinkLight hover:bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3 hover:text-white gap-1">
                            <div className="text-sm xl:text-lg font-bold">Cancel</div>
                        </button>
                    </div>
                </>
            }
        </>
    )
}