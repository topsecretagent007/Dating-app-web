import React, { useState, useEffect } from "react";
import MatchesPage from "../component/notificationalert/matches";
import AlertsPage from "../component/notificationalert/alrets";
import LikesPage from "../component/notificationalert/likes";
import Header from "../component/header/index";
import Footer from "../component/footer/index";
import { BsHeartFill } from "react-icons/bs";
import { FaBell, FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function NotificationPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = UserAuth();
    const [page, setPage] = useState("");
    const [like, setLike] = useState(null);

    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, { passive: false });

    useEffect(() => {
        const goToPage = () => {
            if (location.pathname === "/notification/matches") { setPage("matches") }
            else if (location.pathname === "/notification/likes/like") { setPage("likes"); setLike(true) }
            else if (location.pathname === "/notification/likes/dislike") { setPage("likes"); setLike(false) }
            else if (location.pathname === "/notification/alerts") { setPage("alerts") }
        }
        if (user && location) {
            goToPage();
        }
    }, [user, user.uid, location])

    return (
        <div>
            <Header />
            <div className="w-full h-full min-h-[calc(100vh-154px)] bg-cover px-3 pt-2 pb-12 md:py-12 md:px-[18%] lg:px-[24%] xl:px-[30%] bg-[#FFFBFE]" >
                <div className="md:bg-white md:border-[0.1px] md:border-b-black/10 rounded-xl">
                    <div className="hidden md:block border-b-black/10 border-b-[0.1px] px-3 xl:px-8 py-5">
                        <div className="text-lg xl:text-2xl pb-4 text-start font-bold text-[#5a5a5a]">Notification</div>
                        <div className="grid grid-cols-3 md:grid-cols-4  xl:grid-cols-4 gap-1 md:gap-3 xl:gap-5">
                            <button onClick={() => navigate("/notification/matches")} className={`${page === "matches" ? "bg-pinkLight border-pinkLight text-white" : ""} xl:px-3 xl:py-2 md:text-lg xl:text-xl text-[#888888] border-[#888888] hover:border-0 focus:border-0 rounded-xl hover:bg-pinkLight hover:text-white border-[0.5px] `}>Matches</button>
                            <button onClick={() => navigate("/notification/likes/like")} className={`${page === "likes" ? "bg-pinkLight border-pinkLight text-white" : ""} xl:px-3 xl:py-2 md:text-lg xl:text-xl text-[#888888] border-[#888888] hover:border-0 focus:border-0 rounded-xl hover:bg-pinkLight hover:text-white border-[0.5px] `}>Likes</button>
                            <button onClick={() => navigate("/notification/alerts")} className={`${page === "alerts" ? "bg-pinkLight border-pinkLight text-white" : ""} xl:px-3 xl:py-2 md:text-lg xl:text-xl text-[#888888] border-[#888888] hover:border-0 focus:border-0 rounded-xl hover:bg-pinkLight hover:text-white border-[0.5px] `}>Alerts</button>
                        </div>
                    </div>
                    <div className="md:hidden my-4 p-1 rounded-full bg-white border-[0.1px] border-[#888888]/20 shadow-xl shadow-slate-200">
                        <div className="grid grid-cols-3 gap-2">
                            <button onClick={() => navigate("/notification/matches")} className={`${page === "matches" ? "bg-pinkLight border-pinkLight text-white" : ""} w-full py-2 justify-center text-[#888888] rounded-full hover:bg-pinkLight hover:text-white flex items-center gap-1 mx-auto`}> <FaBell /> Matches</button>
                            <button onClick={() => navigate("/notification/likes/like")} className={`${page === "likes" ? "bg-pinkLight border-pinkLight text-white" : ""} w-full py-2 justify-center text-[#888888] rounded-full hover:bg-pinkLight hover:text-white flex items-center gap-1 mx-auto`}> <BsHeartFill /> Likes</button>
                            <button onClick={() => navigate("/notification/alerts")} className={`${page === "alerts" ? "bg-pinkLight border-pinkLight text-white" : ""} w-full py-2 justify-center text-[#888888] rounded-full hover:bg-pinkLight hover:text-white flex items-center gap-1 mx-auto`}> <FaUser /> Alerts</button>
                        </div>
                    </div>
                    <div className="h-full min-h-[560px]">
                        {page === "matches" &&
                            < MatchesPage />
                        }
                        {page === "alerts" &&
                            < AlertsPage />
                        }
                        {page === "likes" &&
                            < LikesPage likeState={like} />
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}