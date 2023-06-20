import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { AiOutlineDelete } from 'react-icons/ai'


import ImageUploading from 'react-images-uploading';
import { FcCamera, FcPicture } from "react-icons/fc";
import Logo from "../../assets/Logo1.svg";



export default function PhotoAddMore() {
    const [images, setImages] = React.useState([]);
    const maxNumber = 6;
    const numbers = [1, 2, 3, 4, 5, 6];
    const listItems = numbers.map((numbers) =>
        <div key={numbers} className="w-[75px] h-[75px] lg:w-[160px] lg:h-[160px] mx-auto rounded-xl bg-[#888888]"></div>);

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    return (
        <div className="bg-[#FFFBFE] justify-center rounded-xl w-full h-full min-h-screen flex pt-10 pb-20">
            <div className="pt-20 pl-2 md:pl-5 xl:pl-20 2xl:pl-40">
                <Link to='/profile/photoupload' className="">
                    <FiArrowLeft className="text-pinkLight text-xl lg:text-2xl xl:text-4xl my-3" />
                </Link>
            </div>
            <div className="w-4/5">
                <div className="w-40 md:w-60 mx-auto pt-12 pb-10 justify-center items-center">
                    <img src={Logo} alt="Logo" className="mx-auto" />
                </div>
                <div className="justify-center">
                    <div className="flex justify-center bg-[#FFFBFE]">
                        <div className="PhotoAddMore">
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={onChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageRemove,
                                    isDragging,
                                    dragProps,
                                }) => (
                                    // write your building UI
                                    <div className="upload__image-wrapper">
                                        <div className="w-[256px] h-[175px] lg:w-[512px] lg:h-[344px] justify-center mx-auto p-2 rounded-xl gap-2 grid grid-cols-3">
                                            <div className="absolute z-1 justify-center gap-2 grid grid-cols-3">
                                                {listItems}
                                            </div>
                                            {imageList.map((image, index) => (
                                                <div key={index} className="image-item">
                                                    <button className='absolute z-10 text-[#888888] border-[#888888] border-full border-2 mt-1 ml-2 lg:ml-11 p-1 text-sm lg:text-lg rounded-full  ' onClick={() => onImageRemove(index)}>
                                                        <AiOutlineDelete />
                                                    </button>

                                                    <img src={image['data_url']}
                                                        className="absolute z-5 w-[75px] h-[75px] lg:w-[160px] lg:h-[160px] mx-auto object-cover rounded-xl" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="justify-center -ml-3 lg:-ml-11 mt-[-32px] lg:mt-[-52px] ">
                                            <div className="absolute z-20 justify-center flex  gap-44 lg:gap-96">
                                                <button className=" justify-start text-2xl p-2 lg:text-5xl lg:p-5 rounded-full bg-pinkLight border-8 border-white"
                                                >
                                                    <FcCamera />
                                                </button>
                                                <button className="justify-start text-2xl p-2 lg:text-5xl lg:p-5 rounded-full bg-pinkLight border-8 border-white"
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
                    <div className="mt-10 lg:mt-20 text-xl lg:text-2xl font-bold">Add more images</div>
                    <div className="text-sm lg:text-xl py-10 xl:leading-loose">
                        Would you like to upload more images of yourself?<br />
                        The more images you show other members the greater your chances are of <br />
                        matching with them.
                    </div>
                    <Link to="/profile/description" className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">Continue</Link>
                </div>
            </div>
            <div className="pt-20 pr-2 md:pr-5 xl:pr-20 2xl:pr-40">
            </div>
        </div>
    )
}