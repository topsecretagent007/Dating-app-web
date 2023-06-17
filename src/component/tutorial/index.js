import React, { useEffect, useState, useRef } from "react";


export default function Tutorial() {
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
        <div key={number} className="w-full h-[100%]">
            <iframe class="w-full h-[100%] aspect-video" src="https://www.awesomescreenshot.com/video/18356179?key=411a453e58aeaf97ca42d7430371a548" ></iframe>
        </div>

    );

    return (
        <div className="w-full h-full bg-cover flex bg-[#f1f1f1] justify-center min-h-screen">
            <div className="w-[300px] md:w-[600px] xl:w-[1000px] 2xl:w-[1750px] px-5 pt-[103px] mx-auto xl:pt-32 xl:flex gap-12">
                <div className="w-full h-[100%] grid md:grid-cols-2 xl:grid-cols-3 gap-3 pb-10 object-cover">
                    {listItems}
                </div>
            </div>
        </div>
    )
}