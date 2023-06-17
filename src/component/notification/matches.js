import React, { useState, useEffect } from "react";

import Avatar from "../../assets/istockphoto-1167582073-612x6121.png"


export default function Matches() {
    const numbers = [1, 2, 3];
    const listItems = numbers.map((numbers) =>
        <div key={numbers} className="w-full flex">
            <div className="hover:border-l-pinkLight hover:bg-[#bebebe] border-l-white border-l-2 sm:pl-10 px-1 gap-8 flex w-full">
                <img src={Avatar} className="w-14 h-14 my-1 xl:my-auto object-cover rounded-full" />
                <div className="w-full text-start px-3 py-1 text-sm sm:text-lg sm:py-7 justify-between sm:pr-16 sm:flex border-b-[0.1px] border-b-black/10">
                    <div className="w-32 md:w-48  truncate h-10">John Edwdfgdfgdfgfard likes you.</div>
                    <div className="text-#[888888]">Time</div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {listItems}
        </div>
    )
}