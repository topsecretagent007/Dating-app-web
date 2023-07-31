import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploading from 'react-images-uploading';
import Header from "../component/header/index";
import Footer from "../component/footer/index";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import LoadingModal from "../component/loadingPage";
import ImageSaveModal from "../component/modal/imagesave";
import { AiOutlineCheck, AiFillCamera } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import ImageCropper from '../component/imageCropper'
import { uploadImage } from "../config/helpers";
import WebcamImage from "../component/camera";
import { FiImage, FiCamera } from "react-icons/fi"
import PremiumModal from "../component/modal/PremiumModal";
import ModelLogo from "../assets/Modal-Logo.png";
import AlertModal from "../component/modal/alertmodal";

export default function ProfilePage() {
    const navigate = useNavigate();
    const { user } = UserAuth();
    const [name, setName] = useState("");
    const [originalImages, setOriginalImages] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageSave, setImageSave] = useState(false);
    const menuDropdown = useRef(null);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [croppedImage, setCroppedImage] = useState(null);
    const maxNumber = 100;
    const [userVerified, setUserVerified] = useState(false)
    const [cameraModal, setCameraModal] = useState(false);
    const [uploadModal, setUploadModal] = useState(false);
    const [premiumModal, setPremiumModal] = useState(false);
    const [verifyModal, setVerifyModal] = useState(false);

    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, { passive: false });

    const goToPage = (url) => {
        navigate(url);
    }

    const removeImage = async () => {
        setImageSave(false);
        setLoading(true);
        const docSnap = await getDoc(doc(db, "Users", user.uid));
        if (docSnap.exists()) {
            const userData = docSnap.data();
            setOriginalImages(userData.Pictures);
            setImages([userData.Pictures[0]])
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
        setLoading(false);
    }

    const cameraOk = async (capturedImage) => {
        const file = new File([capturedImage], "camera-image.jpg", { type: "image/jpeg" });
        setImages([{ url: capturedImage, file: file }]);
        setImageSave(true);
        setCameraModal(false);
    }

    const updateAvatar = async () => {
        if (croppedImage == null) return;
        setLoading(true);
        const firstNewImage = await uploadImage(croppedImage, "users", user.uid);
        if (firstNewImage != null) {
            const [first, ...rest] = originalImages;
            const pictures = [{ url: firstNewImage, show: true }, ...rest];
            await updateDoc(doc(db, "Users", user.uid), {
                Pictures: pictures
            });
            setLoading(false);
            setImageSave(false);
            setImages([{ url: firstNewImage }]);
        } else {
            console.log("error")
            setLoading(false);
        }
    }

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                setLoading(true);
                const docSnap = await getDoc(doc(db, "Users", user.uid));
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setName(userData.UserName);
                    setOriginalImages(userData.Pictures);
                    if (userData.verified === 3) setUserVerified(true);
                    setImages([userData.Pictures[0]])
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        if (user && user.uid) {
            getUserInfo();
        }
    }, [user]);

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
                setImageSave(false);
                setCameraModal(false);
                setUploadModal(false);
                setPremiumModal(false);
                removeImage();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuDropdown]);

    return (
        <div>
            <Header />
            <div className="w-full h-full bg-cover flex bg-[#FFFBFE] justify-center min-h-[calc(100vh-154px)] pt-2 pb-10 md:py-10" >
                <div className="w-full px-5 xl:px-[24%]">
                    <div className="text-xl xl:text-2xl font-bold justify-start xl:absolute z-10 text-[#5a5a5a]">My Profile</div>
                    <ImageUploading
                        value={images}
                        onChange={(imageList) => (setImages(imageList), setImageSave(true), setUploadModal(false))}
                        maxNumber={maxNumber}
                        dataURLKey="url"
                    >
                        {({
                            onImageUpload,
                            isDragging,
                            dragProps,
                        }) => (
                            <div className="upload__image-wrapper pt-8">
                                <div className="w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] bg-[url('./assets/avatar.png')] mx-auto rounded-full bg-cover bg-pinkLight">
                                    <div className="image-item">
                                        {images[0] && images[0]['url'] !== "" && images[0]['url'] !== null &&
                                            <img style={isDragging ? { color: 'red' } : undefined}
                                                {...dragProps} src={images[0]['url']} alt="Avatar" className="mx-auto rounded-full w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] object-cover" />
                                        }
                                    </div>

                                    <div className="justify-center flex relative z-[7] -mt-20 ml-52 lg:-mt-28 lg:ml-72 ">
                                        <button onClick={() => setUploadModal(!uploadModal)} className="justify-start text-3xl p-2 lg:text-6xl  rounded-full bg-pinkLight  text-white border-4 border-white hover:text-pinkLight hover:border-pinkLight hover:bg-white"
                                        >
                                            <AiFillCamera />
                                        </button>
                                    </div>
                                    {uploadModal &&
                                        <div className="z-[99] top-0 fixed left-0 w-full h-full min-h-screen">
                                            <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                                                <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                                                    <h2 className="w-16 lg:w-24 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                        <img src={ModelLogo} alt="ModelLogo" />
                                                    </h2>
                                                    <div onClick={() => setUploadModal(!uploadModal)} className="text-xl lg:text-3xl text-pinkLight cursor-pointer ml-[90%] -mt-3 lg:ml-[100%]">
                                                        <IoMdClose />
                                                    </div>
                                                    <p className="text-xl lg:text-2xl xl:text-3xl font-bold my-3 text-pinkLight">Update profile picture</p>
                                                    <span className="text-sm md:text-base lg:text-lg 2xl:text-xl font-medium my-3 lg:leading-relaxed">
                                                        Select source
                                                    </span>
                                                    <div className="justify-center">
                                                        <div className="justify-center md:flex w-full gap-10 lg:gap-36 cursor-pointer">
                                                            <div onClick={() => (setCameraModal(true), setUploadModal(!uploadModal))} className="flex py-3 justify-center items-center text-pinkLight gap-2 cursor-pointer">
                                                                <button className="justify-start text-xl lg:text-4xl p-2 rounded-full bg-white  border-4 border-pinkLight/70 hover:bg-pinkLight hover:text-white hover:border-white"
                                                                >
                                                                    <AiFillCamera />
                                                                </button>
                                                                <div className="text-xl lg:text-2xl">Camera</div>
                                                            </div>
                                                            <div onClick={onImageUpload} className="flex py-3 justify-center items-center text-pinkLight gap-2 cursor-pointer">
                                                                <button className="justify-start text-xl lg:text-4xl p-2  rounded-full bg-white text-pinkLight border-4 border-pinkLight/70 hover:bg-pinkLight hover:text-white hover:border-white"
                                                                    style={isDragging ? { color: 'red' } : undefined}
                                                                    {...dragProps}
                                                                >
                                                                    <FiImage />
                                                                </button>
                                                                <div className="text-xl lg:text-2xl">Gallery</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div >
                                        </div>
                                    }
                                </div>
                            </div>
                        )}
                    </ImageUploading>
                    <div className="text-xl xl:text-2xl font-bold pt-6 xl:pt-10">{name}</div>
                    <div className="justify-center flex mx-auto gap-40 xl:gap-52 ">
                        <div onClick={() => goToPage("/settings")} >
                            <button className="justify-start cursor-pointer text-[#888888] text-xl lg:text-4xl p-3 rounded-full border-2 xl:border-4 border-[#888888]/20"
                            >
                                <IoMdSettings />
                            </button>
                            <div className="block xl:text-xl text-[#888888]">Setting</div>
                        </div>
                        <div onClick={() => goToPage("/editprofile")}>
                            <button className="justify-start cursor-pointer text-[#888888] text-xl lg:text-4xl p-3 rounded-full border-2 xl:border-4 border-[#888888]/20"
                            >
                                <BsFillPencilFill />
                            </button>
                            <div className="block xl:text-xl text-[#888888]">Edit Info</div>
                        </div>
                    </div>
                    <div className="justify-center flex mx-auto -mt-6 xl:-mt-12">
                        {
                            !userVerified ?
                                <div onClick={() => goToPage("/verifyprofile")} >
                                    <button className="justify-start cursor-pointer bg-red-600 text-white text-xl lg:text-4xl p-3 rounded-full border-2 xl:border-4 border-[#888888]/20"
                                    >
                                        <IoMdClose />
                                    </button>
                                    <div className="block xl:text-xl text-[#888888] xl:mt-2">Not verified</div>
                                </div>
                                :
                                <div onClick={() => setVerifyModal(true)}>
                                    <button className="justify-start text-xl text-white bg-green-500 lg:text-4xl p-3 rounded-full border-2 xl:border-4"
                                    >
                                        <AiOutlineCheck />
                                    </button>
                                    <div className="block xl:text-xl text-[#888888] xl:mt-2">verified</div>
                                </div>
                        }
                    </div>
                    <div className="text-pinkLight text-lg xl:text-xl py-2 mt-5">Subsribe now</div>
                    <div className="xl:text-xl pb-12">
                        for unlimited matches and contacts
                    </div>
                    <div className="pb-20">
                        <button onClick={() => setPremiumModal(true)} className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-8 xl:py-4 xl:px-32">Subscribe now</button>
                    </div>
                </div>
            </div>
            <Footer />
            {
                loading &&
                <LoadingModal />
            }
            {
                imageSave &&
                <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                    <div className="w-full h-screen bg-cover flex md:px-8 md:py-12 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-full bg-white md:rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-12 lg:py-20 h-screen md:h-full overflow-y-auto md:overflow-y-visible">
                            <ImageCropper
                                imageToCrop={images[0]["url"]}
                                onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
                            />
                            <ImageSaveModal onSaveImage={updateAvatar} onCloseImage={() => removeImage()} />
                        </div>
                    </div >
                </div>
            }
            {
                cameraModal &&
                <div className={`fixed z-50 top-0 left-0 w-full h-full min-h-screen `}>
                    <div className="w-full h-screen bg-cover flex md:px-8 md:py-20 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-full bg-white md:rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-12 lg:py-20 h-screen md:h-full overflow-y-auto md:overflow-y-visible">
                            <WebcamImage onSaveImage={(img) => cameraOk(img)} onCloseModal={() => setCameraModal(false)} />
                        </div>
                    </div >
                </div>
            }
            {
                premiumModal &&
                <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                    <div className="w-full h-screen bg-cover flex md:px-8 md:py-20 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-full bg-white md:rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-12 lg:py-20 h-screen md:h-full overflow-y-auto md:overflow-y-visible">
                            <PremiumModal closeModal={() => setPremiumModal(false)} />
                        </div>
                    </div >
                </div>
            }
            {
                verifyModal &&
                <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                    <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-5/6 bg-white rounded-xl px-8 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-10">
                            <AlertModal text="Your account has already been authorized." onCloseModal={() => setVerifyModal(false)} />
                        </div>
                    </div >
                </div>
            }
        </div >
    )
}