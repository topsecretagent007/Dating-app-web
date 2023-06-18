import React, { useState, useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import DeleteNotificationMessage from "../modal/deletemessage";

export default function Matches() {
    const [deleteMessage, setDeleteMessage] = useState(false);
    const [visible, setVisible] = useState(true);
    const menuDropdown = useRef(null);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    const deleteAlertMessage = () => {
        setDeleteMessage(false);
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
                setDeleteMessage(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuDropdown]);

    return (
        <div>
            <div className="w-full flex px-[10%] py-5">
                <div className="bg-[#FAD7F0] p-6 text-black rounded-xl">
                    <div className="w-full md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl flex justify-between items-center">
                        <div className="font-bold text-start">Welcome Message</div>
                        <MdDelete onClick={() => setDeleteMessage(!deleteMessage)} className="text-end" />
                    </div>
                    <div className="py-2 text-sm md:text-base text-start">
                        Welcome to Unjabbed! As a new member, you'ra now part of a unique community of like-minded individuals. As a growing startup, we're constantly working to enhance your experience and expand our member base. If you improvement, don't hesitate to reach out to us at info@unjabbed.app. Help us grow by spreading the word to other unvaccinated individuals about our platform. Together, we can build a vibrant, supportive community. Enjoy connecting!
                    </div>
                    <div className="text-sm xl:text-base text-end">Date</div>
                </div>
            </div>
            {
                deleteMessage &&
                <div className={`fixed z-50 top-0 left-0 w-full h-full min-h-screen `}>
                    <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                            <DeleteNotificationMessage deleteMessageModal={() => deleteAlertMessage()} />
                        </div>
                    </div >
                </div>
            }
        </div>
    )
}