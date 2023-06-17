import React, { useState, useEffect } from "react";

import Avatar from "../../assets/istockphoto-1167582073-612x6121.png"


export default function MessageUsers() {
    const numbers = [1, 2, 3];
    const listItems = numbers.map((numbers) =>
        <div key={numbers} className="w-full flex">
            <div className="hover:border-l-pinkLight hover:bg-[#bebebe] border-l-white border-l-2 px-1 flex py-3 lg:px-7 items-center justify-center w-full">
                <img src={Avatar} className="w-10 h-10 my-1 mx-2 object-cover rounded-full" />
                <div className="w-full justify-between px-1 py-1 text-sm xl:text-lg sm:py-2 sm:px-2 sm:flex border-b-[0.1px] border-b-black/10 ">
                    <div className=" truncate">John Eard likes you.</div>
                    <div className="justify-end text-[#888888] ">Time</div>
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