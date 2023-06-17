import React, { useState } from "react";
import { BsFillSendFill, BsEmojiSmile } from "react-icons/bs";


import Avatar from "../../assets/istockphoto-1167582073-612x6121.png";


export default function Messages() {

    const [width, setWidth] = useState();

    const sendMessage = () => {

    }
    return (

        <div className="hidden w-2/3 px-5 lg:flex flex-col justify-between">
            <div className="flex flex-col mt-5 overflow-y-auto px-4 h-[500px]">
                <div className="flex justify-end mb-4">
                    <div
                        className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                        Welcome to group everyone !
                    </div>
                    <img
                        src={Avatar}
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                    />
                </div>
                <div className="flex justify-end mb-4">
                    <div
                        className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                        Welcome to group everyone !
                    </div>
                    <img
                        src={Avatar}
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                    />
                </div>
                <div className="flex justify-end mb-4">
                    <div
                        className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                        Welcome to group everyone !
                    </div>
                    <img
                        src={Avatar}
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                    />
                </div>
                <div className="flex justify-end mb-4">
                    <div
                        className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                        Welcome to group everyone !
                    </div>
                    <img
                        src={Avatar}
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                    />
                </div>
                <div className="flex justify-end mb-4">
                    <div
                        className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                        Welcome to group everyone !
                    </div>
                    <img
                        src={Avatar}
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                    />
                </div>
                <div className="flex justify-end mb-4">
                    <div
                        className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                        Welcome to group everyone !
                    </div>
                    <img
                        src={Avatar}
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                    />
                </div>
                <div className="flex justify-end mb-4">
                    <div
                        className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                        Welcome to group everyone !
                    </div>
                    <img
                        src={Avatar}
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                    />
                </div>
                <div className="flex justify-end mb-4">
                    <div
                        className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                    >
                        Welcome to group everyone !
                    </div>
                    <img
                        src={Avatar}
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                    />
                </div>

                <div className="flex justify-start mb-4">
                    <img
                        src={Avatar}
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                    />
                    <div
                        className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                        at praesentium, aut ullam delectus odio error sit rem. Architecto
                        nulla doloribus laborum illo rem enim dolor odio saepe,
                        consequatur quas?
                    </div>
                </div>
                <div className="flex justify-end mb-4">
                    <div>
                        <div
                            className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                        >
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Magnam, repudiandae.
                        </div>

                        <div
                            className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Debitis, reiciendis!
                        </div>
                    </div>
                    <img
                        src={Avatar}
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                    />
                </div>
                <div className="flex justify-start mb-4">
                    <img
                        src={Avatar}
                        className="object-cover h-8 w-8 rounded-full"
                        alt=""
                    />
                    <div
                        className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                    >
                        happy holiday guys!
                    </div>
                </div>
            </div>
            <div className="flex bg-gray-300 rounded-xl items-center mb-5">
                <div className='text-2xl px-5 hover:text-pinkLight border-r-[0.5px] border-black/20'>
                    <BsEmojiSmile />
                </div>
                <input
                    className="w-full py-5 px-3  bg-gray-300 rounded-l-xl"
                    type="text"
                    placeholder="type your message here..."
                />
                <div onClick={() => sendMessage()} className='text-2xl px-5 hover:text-pinkLight border-l-[0.5px] border-black/20'>
                    <BsFillSendFill />
                </div>
            </div>
        </div>
    )
}