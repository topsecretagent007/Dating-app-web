import React from 'react';
export default function PrevUser({ onPrevUser }) {
    return (
        <span onClick={() => onPrevUser()} className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border-[#888888] border-2 ">
            <svg aria-hidden="true" className="w-6 h-6 font-bold text-[#888888] dark:text-gray-800 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15 19l-7-7 7-7"></path></svg>
            <span className=" sr-only">Previous</span>
        </span>
    );
}