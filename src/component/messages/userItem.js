import React from "react";

export default function UserMessageItem({ user, lastMessage }) {
    return (
        <div
            className="w-full flex"
        >
            <div className="hover:border-l-pinkLight hover:bg-[#bebebe] border-l-white border-l-2 gap-1 flex w-full py-3 cursor-pointer border-b-[0.1px] border-b-black/10 items-center">
                <img
                    src={user.pictureUrl}
                    alt="avatar"
                    className="w-10 h-10 ml-1 mr-2 my-auto object-cover rounded-full"
                />
                <div className="w-full text-[#888888] text-start pl-1 text-sm justify-between pr-3 sm:flex ">
                    <div className="">
                        <div className="w-32 truncate">{user.userName}</div>
                        <div className="w-32 truncate">Hello</div>
                    </div>
                    <div className="lg:text-end lg:w-20">
                        {/* {lastMessage.time?.toDate().toLocaleString()} */}
                    </div>
                </div>
            </div>
        </div>
    );
}