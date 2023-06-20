import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiTwotoneFlag, AiOutlineClose } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { BsHeartFill } from "react-icons/bs";
import ImageSlider from "../other/imageslider"
import Search from "../other/search";
import ReporteModal from "../modal/reportemodal";
import ReportUserModal from "../modal/reportusermodal";

export default function Find() {
    const [reporteModal, setReportoModal] = useState(false);
    const [reportUser, setReportUser] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const menuDropdown = useRef(null);

    const openUserModal = () => {
        setReportUser(false);
        setReportoModal(true);
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
                setReportoModal(false);
                setReportUser(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuDropdown]);

    return (
        <>
            <div className="w-full h-full min-h-screen bg-cover justify-center px-[13%] pt-28 xl:pt-36 bg-[#f1f1f1] py-48" >
                <button type="button" className="fixed top-0 -left-2 md:left-0 z-9 flex items-center justify-center h-full px-3 cursor-pointer group focus:outline-none" data-carousel-prev>
                    <span className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border-[#888888] border-2 ">
                        <svg aria-hidden="true" className="w-6 h-6 font-bold text-[#888888] dark:text-gray-800 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15 19l-7-7 7-7"></path></svg>
                        <span className=" sr-only">Previous</span>
                    </span>
                </button>
                <div>
                    <Search />
                    <div className="w-full xl:flex gap-14">
                        <div className="w-full">
                            <ImageSlider />
                        </div>
                        <div className="w-full pt-5 xl:pt-0 xl:w-2/5">
                            <div className="justify-between flex">
                                <div className="text-start">
                                    <div className="text-lg md:text-xl xl:text-2xl font-bold">Name</div>
                                    <div className="text-sm md:text-md lg:text-lg xl:text-xl text-[#888888]">Address </div>
                                </div>
                                <button onClick={() => setReportUser(!reportUser)} className="text-sm md:text-lg lg:text-xl xl:text-2xl my-auto text-red-600 justify-end p-2 xl:p-4 border-2 border-[#888888] bg-white rounded-full">
                                    <AiTwotoneFlag />
                                </button>
                            </div>
                            <div className="flex text-md xl:text-2xl items-center gap-2">
                                <div className="text-pinkLight text-2xl" >
                                    <MdOutlineLocationOn />
                                </div>
                                <div>
                                    Location
                                </div>
                            </div>
                            <div className="text-start py-5">
                                <div className="text-md md:text-lg lg:text-xl xl:text-2xl">About me</div>
                                <div className="text-sm lg:text-lg xl:text-xl text-[#888888] leading-relaxed">
                                    Single, no kids, always looking forward to life, searching for covid unvaxed soul mate, I have a good job, great house and I am looking for someone to share my life with 3 let me know if you might be interested.
                                </div>
                            </div>
                            <div className="text-start py-5">
                                <div className="text-md md:text-lg lg:text-xl xl:text-2xl">Desires</div>
                                <div className="text-sm lg:text-lg xl:text-xl text-[#888888] leading-relaxed">Relationship</div>
                            </div>
                            <div className="text-start py-5">
                                <div className="text-md md:text-lg lg:text-xl xl:text-2xl">Interest</div>
                                <div className="text-sm lg:text-lg xl:text-xl text-[#888888] leading-relaxed">Smart girl</div>
                            </div>
                            <div className="justify-between grid grid-cols-2 gap-4 pt-10 text-sm md:text-base lg:text-lg xl:text-xl">
                                <Link className="justify-center xl:py-3 xl:px-10 flex rounded-xl text-white bg-pinkLight items-center xl:gap-5 gap-2 md:gap-3 lg:gap-4 py-1 lg:py-2">
                                    <BsHeartFill />
                                    <div>Like</div>
                                </Link>
                                <Link to="" className="justify-center items-center border-[#888888] border-[0.1px] rounded-xl gap-2 md:gap-3 lg:gap-4 xl:gap-5 py-1 lg:py-2 xl:py-3 xl:px-10 flex text-[#888888]">
                                    <AiOutlineClose />
                                    <div>Dislike</div>
                                </Link>
                            </div>

                        </div>
                    </div >
                </div>
                <button type="button" className="fixed top-0 -right-2 md:right-0 z-9 flex items-center justify-center h-full px-3 cursor-pointer group focus:outline-none" data-carousel-next>
                    <span className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border-[#888888] border-2">
                        <svg aria-hidden="true" className="w-6 h-6 text-[#888888] dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9 5l7 7-7 7"></path></svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
                {
                    reporteModal &&
                    <div className={`fixed z-50 top-0 left-0 w-full h-full min-h-screen `}>
                        <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                            <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                                <ReporteModal
                                    closeModal={() => setReportoModal(false)}
                                />
                            </div>
                        </div >
                    </div>
                }
                {
                    reportUser &&
                    <div className={`fixed z-50 top-0 left-0 w-full h-full min-h-screen `}>
                        <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                            <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                                <ReportUserModal
                                    openModal={() => openUserModal()}
                                />
                            </div>
                        </div >
                    </div>
                }
            </div>
        </>
    )
}