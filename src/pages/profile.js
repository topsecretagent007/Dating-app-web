import React from "react";
import { Link } from "react-router-dom";
import { FcCamera, FcPicture, FcSettings, FcSupport } from "react-icons/fc";
import { GoAlert } from "react-icons/go";
import ImageUploading from 'react-images-uploading';

import MyAvatar from "../assets/istockphoto-1167582073-612x6121.png"

import Header from "../component/header/index";
import Footer from "../component/footer/index";


export default function ProfilePage() {
    const [images, setImages] = React.useState([MyAvatar]);
    const maxNumber = 100;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    return (
        <div>
            <Header />
            <div className="w-full h-full bg-cover flex bg-[#FFFBFE] justify-center min-h-screen pt-10 pb-28" >
                <div className="w-full px-5 pt-[103px] xl:px-[24%] xl:pt-32">
                    <div className="text-2xl font-bold justify-start xl:absolute z-10">My Profile</div>
                    <div className="flex justify-center">
                        <div className="PhotoUpload">
                            <ImageUploading
                                value={images}
                                onChange={onChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    isDragging,
                                    dragProps,
                                }) => (
                                    // write your building UI

                                    <div className="upload__image-wrapper">
                                        <div className="w-60 h-60 xl:w-[400px] xl:h-[400px] bg-[url('./assets/istockphoto-1167582073-612x6121.png')] mx-auto rounded-full bg-cover">
                                            {imageList.map((image, index) => (
                                                <div key={index} className="image-item">
                                                    <img src={image['data_url']} alt="" className="mx-auto w-60 h-60 xl:w-[400px] xl:h-[400px] rounded-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="justify-center">
                                            <div className="justify-center flex mx-auto gap-44 xl:gap-72 -mt-20 xl:-mt-32">
                                                <button className="justify-start text-2xl xl:text-5xl p-2 rounded-full bg-pinkLight border-4 xl:border-8 border-white"
                                                >
                                                    <FcCamera />
                                                </button>
                                                <button className="justify-start text-2xl xl:text-5xl p-2 rounded-full bg-pinkLight border-4 xl:border-8 border-white"
                                                    style={isDragging ? { color: 'red' } : undefined}
                                                    onClick={onImageUpload}
                                                    {...dragProps}
                                                >
                                                    <FcPicture />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </ImageUploading>
                        </div>
                    </div>

                    <div className="text-xl xl:text-2xl font-bold pt-12 xl:pt-16">Name</div>
                    <div className="justify-center flex mx-auto gap-24 xl:gap-52 -mt-10">
                        <a href="/settings" >
                            <button className="justify-start cursor-pointer text-xl xl:text-5xl p-2 rounded-full bg-blueLight border-4 xl:border-8 border-white"
                            >
                                <FcSettings />
                            </button>
                            <div className="block xl:text-xl text-[#888888]">Setting</div>
                        </a>
                        <a href="/editprofile">
                            <button className="justify-start text-xl xl:text-5xl p-2 rounded-full bg-green-600 border-4 xl:border-8 border-white"
                            >
                                <FcSupport />
                            </button>
                            <div className="block xl:text-xl text-[#888888]">Edit Info</div>
                        </a>
                    </div>
                    <div className="justify-center flex mx-auto -mt-6 xl:-mt-12">
                        <div >
                            <a href="/verifyprofile">
                                <button className="justify-start text-xl xl:text-5xl p-2 rounded-full text-yellow-500 bg-red-600 border-4 xl:border-8 border-white"
                                >
                                    <GoAlert />
                                </button>
                                <div className="block xl:text-xl text-[#888888] xl:mt-2">Not verified</div>
                            </a>
                        </div>
                    </div>
                    <div className="text-pinkLight text-lg xl:text-xl py-2 mt-5">Subsribe now</div>
                    <div className="xl:text-xl pb-12">
                        for unlimited matches and contacts
                    </div>
                    <div className="pb-20">
                        <Link to="" className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-8 xl:py-4 xl:px-32">Subscribe now</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}