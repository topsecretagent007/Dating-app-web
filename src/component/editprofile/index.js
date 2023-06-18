import React, { useEffect, useState, useRef, Fragment } from "react";
import { AiOutlineDelete, AiOutlinePlus, AiFillEye, AiOutlineClose } from 'react-icons/ai';
import { Link } from "react-router-dom";
import { FcCamera, FcPicture } from "react-icons/fc";
import ModelLogo from "../../assets/Modal-Logo.png"
import ImageUploading from 'react-images-uploading';

import MeDropdown from "../combox/medropdown";
import SexualDropdown from "../combox/sexualdropdown";
import StatusDropdown from "../combox/statusdropdown";
import LookDropdown from "../combox/lookingdropdown";
import ShowDropdown from "../combox/showdropdown";
import AddInterested from "../other/addinterested";


export default function EditProfile() {
    const [uploadModal, setUploadModal] = useState(false);
    const [images, setImages] = React.useState([]);
    const menuDropdown = useRef(null)
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        function handleScroll() {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuDropdown.current && !menuDropdown.current.contains(event.target)) {
                setUploadModal(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuDropdown]);


    const maxNumber = 99;
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const listItems = numbers.map((numbers) =>
        <div key={numbers} className="w-[75px] h-[75px] lg:w-[160px] lg:h-[160px] mx-auto rounded-xl bg-[#888888]"></div>);

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        setUploadModal(false);

    };


    return (
        <div className="w-full h-full bg-cover flex bg-[#f1f1f1] justify-center min-h-screen pb-10">
            <div className="w-[300px] md:w-[600px] xl:w-[1100px] 2xl:w-[1750px] px-5 pt-[103px] mx-auto xl:pt-32 xl:flex gap-12">
                <div className="w-full xl:px-10 2xl:px-40 pb-20">
                    <div className="w-full lg:flex lg:justify-between items-center">
                        <div className="text-lg font-bold text-center lg:text-start xl:text-3xl">Edit Profile</div>
                        <div className="px-8 md:px-44 lg:px-0">
                            <button className="w-full bg-white xl:text-2xl text-pinkLight border-2 border-pinkLight rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                                <div className="w-40 lg:px-3 xl:w-60 items-center flex">
                                    <div className="w-1/6">
                                        <AiFillEye />
                                    </div>
                                    <div className="w-5/6">
                                        Preview Profile
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="xl:flex gap-20">
                        <div className="PhotoAddMore xl:w-1/2">
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

                                        {uploadModal &&
                                            <div className="z-[99] top-0 fixed left-0 w-full h-full min-h-screen">
                                                <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                                                    <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                                                        <h2 className="w-16 lg:w-24 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                            <img src={ModelLogo} alt="ModelLogo" />
                                                        </h2>
                                                        <p className="text-lg lg:text-xl xl:text-3xl font-bold my-3 text-pinkLight">Add Photos</p>
                                                        <span className="text-sm xl:text-lg 2xl:text-xl my-3 lg:leading-relaxed">
                                                            Select source
                                                        </span>
                                                        <div className="justify-center mt-[-30px] lg:mt-[-70px] ">
                                                            <div className="justify-center flex mx-auto gap-48 lg:gap-80">
                                                                <button className="justify-start text-2xl p-2 lg:text-5xl lg:p-5 rounded-full bg-pinkLight border-8 border-white"
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
                                                </div >
                                            </div>
                                        }

                                        <div className="px-8 md:px-44 lg:px-20">
                                            <button className="w-full bg-white xl:text-2xl text-pinkLight border-2 border-pinkLight rounded-xl py-2 mt-32 lg:mt-48 justify-center gap-2 items-center flex hover:bg-pinkLight hover:text-white"
                                                onClick={() => setUploadModal(!uploadModal)}>
                                                <AiOutlinePlus />Add Media
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </ImageUploading>
                            <div className="w-full items-center">
                                <div className="text-lg font-bold text-center xl:text-2xl lg:py-8">Interest</div>
                                <AddInterested />
                            </div>
                        </div>
                        <div className="w-full xl:w-1/2">
                            <div className="mb-5">
                                <div className="text-lg xl:text-xl 2xl:text-3xl xl:text-start">
                                    <div className="mb-5 font-bold">About</div>
                                    <div className="text-sm md:text-base lg:text-lg 2xl:text-xl mb-20 leading-relaxed">
                                        <textarea
                                            className="border-[#dddddd] border-[0.5px] mx-auto bg-white rounded-xl w-full p-4 md:w-2/3 lg:w-full h-[200px] xl:h-[400px] placeholder:italic placeholder:text-slate-400 block  shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500/80 focus:ring-1 resize-none  shadow-cyan-500/50"
                                            type="text"
                                            name="discription"
                                            placeholder="Write something about yourself."
                                            rows={4}
                                            cols={40}
                                        >
                                        </textarea>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 md:justify-between gap-5 pb-56">
                                    <MeDropdown />
                                    <SexualDropdown />
                                    <StatusDropdown />
                                    <LookDropdown />
                                    <ShowDropdown />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="/profile/friendship" className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">I'm 18+</Link>
                </div>
            </div>
        </div>
    )
}