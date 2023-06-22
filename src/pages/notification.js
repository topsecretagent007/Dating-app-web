import React, { useState } from "react";

import MatchesPage from "../component/notificationalert/matches";
import AlertsPage from "../component/notificationalert/alrets";
import LikesPage from "../component/notificationalert/likes";

import Header from "../component/header/index";
import Footer from "../component/footer/index";


export default function NotificationPage() {
    const [page, setPage] = useState("matches");
    return (
        <div>
            <Header />
            <div className="w-full h-full min-h-screen bg-cover px-5 pt-28 sm:px-[10%] md:px-[18%] lg:px-[24%] xl:px-[30%] xl:pt-40 bg-[#FFFBFE] py-48" >
                <div className="bg-white border-2 border-[#888888] rounded-xl">
                    <div className="border-b-[#888888] border-b-[1px] px-3 xl:px-8 py-5">
                        <div className="text-lg xl:text-2xl pb-4 text-start font-bold">Notification</div>
                        <div className="grid grid-cols-3 md:grid-cols-4  xl:grid-cols-4 gap-1 md:gap-3 xl:gap-5">
                            <button onClick={() => setPage("matches")} className={`${page === "matches" ? "bg-pinkLight text-white" : ""} xl:px-3 xl:py-2 md:text-lg xl:text-xl text-[#888888] border-[#888888] hover:border-0 focus:border-0 rounded-xl hover:bg-pinkLight hover:text-white border-[0.5px] `}>Matches</button>
                            <button onClick={() => setPage("likes")} className={`${page === "likes" ? "bg-pinkLight text-white" : ""} xl:px-3 xl:py-2 md:text-lg xl:text-xl text-[#888888] border-[#888888] hover:border-0 focus:border-0 rounded-xl hover:bg-pinkLight hover:text-white border-[0.5px] `}>Likes</button>
                            <button onClick={() => setPage("alerts")} className={`${page === "alerts" ? "bg-pinkLight text-white" : ""} xl:px-3 xl:py-2 md:text-lg xl:text-xl text-[#888888] border-[#888888] hover:border-0 focus:border-0 rounded-xl hover:bg-pinkLight hover:text-white border-[0.5px] `}>Alerts</button>
                        </div>
                    </div>
                    <div className="py-3 h-[600px]">
                        {page == "matches" &&
                            < MatchesPage />
                        }
                        {page == "alerts" &&
                            < AlertsPage />
                        }
                        {page == "likes" &&
                            < LikesPage />
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}