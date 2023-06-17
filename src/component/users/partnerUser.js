import React, { useState, useEffect } from "react";

import Avatar from "../../assets/istockphoto-1167582073-612x6121.png"


export default function PartnerUser() {
    const numbers = [1];
    const listItems = numbers.map((numbers) =>
        <div key={numbers} className="w-full flex">
            <div className="flex items-center justify-center w-full">
                <img src={Avatar} className="w-10 h-10 my-1 mx-2 object-cover rounded-full" />
                <div className="w-full text-start px-3 py-1 text-sm xl:text-lg sm:py-2 sm:pr-16 lg:gap-8">
                    <div className="w-full truncate">Name</div>
                    <div className="w-full text-[#888888] ">Location</div>
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