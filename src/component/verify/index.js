import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ImageUploading from 'react-images-uploading';
import { FcCamera, FcPicture } from "react-icons/fc";

import SimpleImg from "../../assets/image4.png"
import ModelLogo from "../../assets/Modal-Logo.png"

export default function VerifyProfile() {
    const [verifycationCode, setVeryficationCode] = useState(false);
    const [alretUploadPhoto, setAlretUploadPhoto] = useState(false);

    const [prevScrollPos, setPrevScrollPos] = useState();
    const [visible, setVisible] = useState(true);

    const [images, setImages] = React.useState([]);
    const maxNumber = 100;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const uploadPhote = () => {
        setAlretUploadPhoto(true);

    }

    useEffect(() => {
        setVeryficationCode(false);
    }, [])

    const menuDropdown = useRef(null)

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
                setAlretUploadPhoto(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuDropdown]);

    return (
        <div className="w-full h-full bg-cover justify-center px-[10%] pt-28 xl:pt-36 bg-[#f1f1f1] pb-20" >
            <div className="w-full xl:flex">
                <div className="w-full xl:w-2/5">
                    <img src={SimpleImg} alt="FindImage" className="w-60 sm:w-[500px] lg:w-[700px] xl:w-full mx-auto" />
                </div>
                <div className="w-full pt-5 xl:pt-0 justify-center xl:w-3/5 md:px-16">
                    <div className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold">Account Verification
                    </div>
                    {verifycationCode ?
                        <div>
                            <div className="text-sm lg:text-lg xl:text-xl 2xl:text-2xl py-3">
                                Your verification code
                                <br />
                                <div className="font-bold">
                                    35713
                                </div>
                            </div>

                            <div className="flex justify-center bg-[#f1f1f1]">
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
                                                <div className="w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] bg-[url('./assets/avatar.png')] mx-auto rounded-3xl bg-cover">
                                                    {imageList.map((image, index) => (
                                                        <div key={index} className="image-item">
                                                            <img src={image['data_url']} alt="" className="mx-auto rounded-3xl w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] object-cover" />
                                                        </div>
                                                    ))}
                                                </div>
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
                                        )}
                                    </ImageUploading>
                                </div>
                            </div>

                            <div onClick={() => uploadPhote()} className="justify-between pt-8 md:px-10 xl:pt-10 2xl:pt-40 2xl:px-60">
                                <button className="w-full justify-center py-3 xl:px-10 flex rounded-xl text-white bg-pinkLight items-center text-sm md:text-xl lg:text-2xl 2xl:text-3xl">
                                    Upload Photo
                                </button>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="text-sm lg:text-lg xl:text-xl 2xl:text-2xl py-10">
                                To get verified we will generate a unique code which you will need to write down on a A4 sheet.
                                <br />
                                <br />
                                Please make sure that the numbers are written in large font and can easily be seen.
                                <br />
                                <br />
                                You will then take a selfie displaying your face alongside the sheet of paper.
                            </div>
                            <div className="justify-between pt-8 md:px-10 xl:pt-32 2xl:pt-80 2xl:px-24">
                                <button onClick={() => setVeryficationCode(true)} className="w-full justify-center py-3 xl:px-10 flex rounded-xl text-white bg-pinkLight items-center text-sm md:text-xl lg:text-2xl 2xl:text-3xl">
                                    Show me my verification code
                                </button>
                            </div>
                        </div>
                    }
                    {alretUploadPhoto &&
                        <div className={`fixed z-50 top-0 left-0 w-full h-full min-h-screen `}>
                            <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                                <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                                    <h2 className="w-16 lg:w-24 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <img src={ModelLogo} alt="ModelLogo" />
                                    </h2>
                                    <p className="text-lg lg:text-xl xl:text-3xl font-bold my-3 text-pinkLight">Information</p>
                                    <span className="text-sm xl:text-lg 2xl:text-xl my-3 lg:leading-relaxed">
                                        Thanks for submitting your photo! Please allow up to 24 hours for our staff to manually verify your profile.                            </span>
                                </div>
                            </div >
                        </div>
                    }
                </div>

            </div>



        </div>
    )
}