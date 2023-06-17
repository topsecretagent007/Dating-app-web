import React, { useState, useEffect } from "react";

import Avatar from "../../assets/istockphoto-1167582073-612x6121.png"


export default function Matches() {

    return (
        <div>
            <div className="w-full flex px-[10%] py-5">
                <div className="bg-pinkLight p-6 text-black rounded-xl">
                    <div className="md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-start">Welcome Message</div>
                    <div className="py-2 text-sm md:text-base text-start">
                        Welcome to Unjabbed! As a new member, you'ra now part of a unique community of like-minded individuals. As a growing startup, we're constantly working to enhance your experience and expand our member base. If you improvement, don't hesitate to reach out to us at info@unjabbed.app. Help us grow by spreading the word to other unvaccinated individuals about our platform. Together, we can build a vibrant, supportive community. Enjoy connecting!
                    </div>
                    <div className="text-sm xl:text-base text-end">Date</div>
                </div>
            </div>
        </div>
    )
}