import React, { useEffect, useState, useRef } from "react";


export default function Tutorial() {
    return (
        <div className="w-full h-full bg-cover flex bg-[#f1f1f1] justify-center min-h-screen py-10">
            <div className="w-[300px] md:w-[600px] xl:w-[1000px] 2xl:w-[1750px] px-5 pt-[103px] mx-auto xl:pt-32 xl:flex gap-12">
                <div className="w-full grid md:grid-cols-2 gap-3 pb-10 overflow-y-hidden">
                    <iframe class="w-full aspect-video" src="https://www.youtube.com/watch?v=8nPs61YalRY" ></iframe>
                    <iframe class="w-full aspect-video" src="https://www.youtube.com/shorts/C22HoOmm0V4" ></iframe>
                </div>
            </div>
        </div>
    )
}
