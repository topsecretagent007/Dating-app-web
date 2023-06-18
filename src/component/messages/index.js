import React, { useState, Component } from 'react'

import { BsFillSendFill, BsEmojiSmile } from "react-icons/bs";
import MessageUsers from "../users/users";
import Messages from "./messages.js";

import Avatar from "../../assets/istockphoto-1167582073-612x6121.png";

export default function MessagePage() {


    return (
        <div className='w-full h-full min-h-screen bg-cover px-5 pt-28 xl:pt-32 2xl:pt-40 bg-[#f1f1f1] pb-48 md:pb-36 lg:pb-32 xl:pb-28'>
            <div className='w-full md:w-[500px] lg:w-[900px] mx-auto xl:h-[720px] bg-white rounded-xl border-[0.5px] border-black/20'>
                <div className='w-full lg:flex border-black/10'>
                    <div className='w-full lg:w-1/3 p-5 text-start text-3xl font-bold border-b-[0.1px] lg:border-r-[0.1px] border-black/10'>Messages</div>
                    <div className='hidden lg:block lg:w-2/3 p-2 text-start text-3xl font-bold border-b-[0.1px] border-black/10'>
                        <div className='text-lg'>Name</div>
                        <div className='text-lg text-[#888888]'>User data</div>
                    </div>
                </div>
                <div className='w-full lg:flex text-start'>
                    <div className='py-2 w-full lg:w-1/3 overflow-y-auto h-[643px] border-r-[0.1px] border-black/10'>
                        <MessageUsers />
                        <MessageUsers />
                    </div>
                    
                    <Messages />

                </div>
            </div>
        </div>
    )
}
