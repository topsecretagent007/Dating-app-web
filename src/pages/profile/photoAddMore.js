import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { AiOutlineDelete } from 'react-icons/ai'
import ImageUploading from 'react-images-uploading';
import { FiImage, FiCamera } from "react-icons/fi"
import Logo from "../../assets/Logo1.svg";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import LoadingModal from "../../component/loadingPage";
import AlertModal from "../../component/modal/alertmodal";
import ImageCropper from '../../component/imageCropper';
import { uploadImage } from "../../config/helpers";
import ImageSaveModal from "../../component/modal/imagesave";

const maxNumber = 6;
const numbers = [1, 2, 3, 4, 5, 6];
const listItems = numbers.map((numbers) =>
    <div key={numbers} className="w-[75px] h-[75px] lg:w-[160px] lg:h-[160px] mx-auto rounded-xl bg-[#888888]"></div>);

export default function PhotoAddMore() {
    const navigate = useNavigate();
    const { user } = UserAuth();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alertModal, setAlertModal] = useState(false);
    const menuDropdown = useRef(null);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [imageSave, setImageSave] = useState(false);
    const [currentCroppedImage, setCurrentCroppedImage] = useState(null);

    const removeImage = async () => {
        setImageSave(false);
        setImages((previousArr) => (previousArr.slice(0, -1)));
    }

    useEffect(() => {
        setLoading(true);
        const getUserInfo = async () => {
            const docSnap = await getDoc(doc(db, "Users", user.uid));
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setImages(userData.Pictures)
                setLoading(false);
            } else {
                console.log("No such document!");
            }
        }
        if (user && user.uid) {
            getUserInfo();
        }
    }, [user])

    const addUpdateImageList = async () => {
        setLoading(true);
        let pictures = [];
        for (var i = 0; i < images.length; i++) {
            pictures.push({
                show: true,
                url: await uploadImage(images[i], "users", user.uid)
            });
        }
        if (pictures[0]?.url != null && pictures[0]?.url != "") {
            await updateDoc(doc(db, "Users", user.uid), {
                Pictures: pictures
            });
            setLoading(false);
            navigate('/profile/description')
        } else {
            setAlertModal(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        function handleScroll() {
            const currentScrollPos = window.pageYOffset;
            setPrevScrollPos(currentScrollPos);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuDropdown.current && !menuDropdown.current.contains(event.target)) {
                setAlertModal(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuDropdown]);

    return (
        <div className="bg-[#FFFBFE] justify-center rounded-xl w-full h-full min-h-screen flex pt-10 pb-20">
            <div className="pt-20 pl-2 md:pl-5 xl:pl-20 2xl:pl-40">
                <Link to='/profile/photoupload' className="">
                    <FiArrowLeft className="text-pinkLight text-xl lg:text-2xl xl:text-4xl my-3" />
                </Link>
            </div>
            <div className="w-4/5">
                <div className="w-40 md:w-60 mx-auto pt-6 pb-10 justify-center items-center">
                    <img src={Logo} alt="Logo" className="mx-auto" />
                </div>
                <div className="justify-center">
                    <div className="flex justify-center bg-[#FFFBFE]">
                        <div className="PhotoAddMore">
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={(imageList) => (setImages(imageList), setImageSave(true))}
                                maxNumber={maxNumber}
                                dataURLKey="url"
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
                                                    <button className='absolute z-10 text-[#888888] border-[#888888] border-full border-2 mt-1 ml-2 lg:ml-11 p-1 text-sm lg:text-lg rounded-full  ' onClick={() => { onImageRemove(index); setImageSave(false) }}>
                                                        <AiOutlineDelete />
                                                    </button>

                                                    <img src={image['url']}
                                                        className="absolute z-5 w-[75px] h-[75px] lg:w-[160px] lg:h-[160px] mx-auto object-cover rounded-xl" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="justify-center -ml-3 lg:-ml-11 mt-[-32px] lg:mt-[-52px] ">
                                            <div className="absolute z-20 justify-center flex  gap-44 lg:gap-96">
                                                <button className="justify-start text-2xl p-2 lg:text-5xl lg:p-5 rounded-full bg-white text-pinkLight border-8 border-pinkLight/70 hover:bg-pinkLight hover:text-white hover:border-white"
                                                >
                                                    <FiCamera />
                                                </button>
                                                <button className="justify-start text-2xl p-2 lg:text-5xl lg:p-5 rounded-full bg-white text-pinkLight border-8 border-pinkLight/70 hover:bg-pinkLight hover:text-white hover:border-white"
                                                    style={isDragging ? { color: 'red' } : undefined}
                                                    onClick={onImageUpload}
                                                    {...dragProps}
                                                >
                                                    <FiImage />
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
                    <button onClick={() => addUpdateImageList()} className={`${images.length != 0 ? "bg-pinkLight" : "bg-pink-950"} justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20`}>Continue</button>
                </div>
            </div>
            <div className="pt-20 pr-2 md:pr-5 xl:pr-20 2xl:pr-40">
            </div>
            {
                loading &&
                <LoadingModal />
            }
            {
                alertModal &&
                <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                    <div className="w-full h-screen bg-cover flex px-8  justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-2/5 bg-white rounded-xl px-3 relative  py-12">
                            <AlertModal text="Please add your photo at lease one." onCloseModal={() => setAlertModal(false)} />
                        </div>
                    </div >
                </div>
            }
            {
                imageSave &&
                <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                    <div className="w-full h-screen bg-cover flex px-8 py-12 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-12 lg:py-20">
                            <ImageCropper
                                imageToCrop={images[images.length - 1]["url"]}
                                onImageCropped={(image) => setCurrentCroppedImage(image)}
                            />
                            <ImageSaveModal
                                onSaveImage={() => {
                                    setImages((prevImages) => ([...prevImages.slice(0, -1), currentCroppedImage]));
                                    setImageSave(false)
                                }}
                                onCloseImage={() => removeImage()}
                            />
                        </div>
                    </div >
                </div>
            }
        </div>
    )
}