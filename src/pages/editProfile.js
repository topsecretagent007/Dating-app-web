import React, { useEffect, useState, useRef } from "react";
import { AiOutlineDelete, AiOutlinePlus, AiFillEye, AiFillCamera } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { FiImage } from "react-icons/fi"
import ModelLogo from "../assets/Modal-Logo.png"
import ImageUploading from 'react-images-uploading';
import Dropdown from "../component/combox/dropdown";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { sexData, oriData, statusData, lookingForData, showData } from "../config/constant";
import LoadingModal from "../component/loadingPage";
import AddInterested from "../component/other/addinterested";
import Header from "../component/header/index";
import Footer from "../component/footer/index";
import AlertModal from "../component/modal/alertmodal";
import ImageCropper from '../component/imageCropper';
import { uploadImage } from "../config/helpers";
import ImageSaveModal from "../component/modal/imagesave";
import { usePrompt } from '../hooks/useCallbackPrompt'
import WebcamImage from "../component/camera";

export default function EditProfilePage() {
    const [showDialog, setShowDialog] = useState(false);
    const onConfirm = async () => {
        await dataSave();
    }
    usePrompt(showDialog, onConfirm);
    const navigate = useNavigate();
    const { user } = UserAuth();
    const [uploadModal, setUploadModal] = useState(false);
    const [images, setImages] = useState([]);
    const menuDropdown = useRef(null)
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [userSex, setUserSex] = useState("");
    const [userOri, setUserOri] = useState("");
    const [userStatus, setUserStatus] = useState("");
    const [userLooking, setUserLooking] = useState([]);
    const [userShow, setUserShow] = useState([]);
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [interests, setInterests] = useState([]);
    const [alertModal, setAlertModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [imageSave, setImageSave] = useState(false);
    const [currentCroppedImage, setCurrentCroppedImage] = useState(null);
    const [cameraModal, setCameraModal] = useState(false);
    const [imgSaveErr, setImgSaveErr] = useState(false);

    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, { passive: false });

    const maxNumber = 6;
    const numbers = [1, 2, 3, 4, 5, 6];
    const listItems = numbers.map((numbers) =>
        <div key={numbers} className="w-[100px] h-[100px] lg:w-[160px] lg:h-[160px] mx-auto rounded-xl bg-[#888888]"></div>);

    const removeImage = async () => {
        setImageSave(false);
        setImages((previousArr) => (previousArr.slice(0, -1)));
    }

    const cameraOk = async (capturedImage) => {
        const file = new File([capturedImage], "camera-image.jpg", { type: "image/jpeg" });
        setImages((prevImages) => ([...prevImages, { url: capturedImage, file: file }]));
        setImageSave(true);
        setShowDialog(true);
        setCameraModal(false);
    }

    const addInterest = (value) => {
        setInterests([...interests, value]);
        setShowDialog(true);
    }

    const removeInterest = (value) => {
        setInterests(interests.filter((item) => { return item !== value }))
        setShowDialog(true)
    }

    const dataSave = async () => {
        setLoading(true);
        if (images.length !== 0 && description !== "") {
            let pictures = [];
            for (var i = 0; i < images.length; i++) {
                pictures.push({
                    show: true,
                    url: await uploadImage(images[i], "users", user.uid)
                });
            }
            await updateDoc(doc(db, "Users", user.uid), {
                Pictures: pictures,
                editInfo: {
                    showOnProfile: false,
                    university: "",
                    userGender: userSex,
                    about: description
                },
                sexualOrientation: {
                    orientation: userOri,
                    showOnProfile: false
                },
                showGender: userShow,
                desires: userLooking,
                status: userStatus,
                interest: interests
            });
            setLoading(false);
        } else {
            setAlertModal(true);
            if (images.length !== 0) {
                setEditModal(true);
            } else if (description !== "") {
                setEditModal(false);
            }
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
                setUploadModal(false);
                setAlertModal(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuDropdown]);

    useEffect(() => {
        setLoading(true);
        const getUserInfo = async () => {
            const docSnap = await getDoc(doc(db, "Users", user.uid));
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setImages(userData.Pictures)
                setDescription(userData.editInfo?.about)
                setUserSex(userData.editInfo?.userGender)
                setUserOri(userData.sexualOrientation?.orientation);
                setUserStatus(userData.status);
                setUserLooking(userData.desires);
                setUserShow(userData.showGender);
                setInterests(userData.interest);
                setLoading(false);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        if (user && user.uid) {
            getUserInfo();
        }
    }, [user])

    return (
        <div>
            <Header />
            <div className="w-full h-full bg-cover flex bg-[#FFFBFE] justify-center min-h-screen pt-2 pb-12 md:py-12 max-w-screen">
                <div className="w-full md:w-[640px] xl:w-[1250px] 2xl:w-[1790px] md:px-5 mx-auto justify-center xl:flex gap-12">
                    <div className="w-full justify-center xl:px-10 2xl:px-40 pb-20">
                        <div className="w-full lg:flex lg:justify-between items-center">
                            <div className="text-xl xl:text-2xl font-bold text-center lg:text-start text-[#5A5A5A] py-2">Edit Profile</div>
                            <div className="px-12 sm:px-32 md:px-44 lg:px-0">
                                <button onClick={() => navigate("/profilepreview")} className="w-full bg-white xl:text-2xl text-pinkLight border-2 border-pinkLight rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
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
                        <div className="xl:flex xl:gap-20">
                            <div className="PhotoAddMore xl:w-1/2">
                                <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={(imageList) => (setShowDialog(true), setImages(imageList), setImageSave(true), setUploadModal(false))}
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
                                        <div className="upload__image-wrapper">
                                            <div className="w-[336px] h-[215px] lg:w-[512px] lg:h-[344px]  mx-auto p-2 rounded-xl gap-2 grid grid-cols-3">
                                                <div className="absolute z-1 justify-center gap-2 grid grid-cols-3">
                                                    {listItems}
                                                </div>
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="image-item -ml-1">
                                                        <button className='absolute z-10 text-[#888888] border-[#888888] border-full border-2 mt-1 ml-4 lg:ml-11 p-1 text-sm lg:text-lg rounded-full'
                                                            onClick={() => {
                                                                if (imageList.length == 1) { setImgSaveErr(true) } else { onImageRemove(index); setImageSave(false) }
                                                            }}
                                                        >
                                                            <AiOutlineDelete />
                                                        </button>
                                                        <img src={image['url']}
                                                            className="relative z-5 w-[100px] h-[100px] lg:w-[160px] lg:h-[160px] mx-auto object-cover rounded-xl" />
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
                                                            <p className="text-xl lg:text-2xl xl:text-3xl font-bold my-3 text-pinkLight">Add Photos</p>
                                                            <span className="text-sm md:text-base lg:text-lg 2xl:text-xl my-3 lg:leading-relaxed">
                                                                Select source
                                                            </span>
                                                            <div className="justify-center">
                                                                <div className="justify-center md:flex w-full gap-3 md:gap-14 lg:gap-36 cursor-pointer">
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
                                            <div className="px-12 sm:px-32 md:px-44 lg:px-20">
                                                <button className="w-full bg-white xl:text-2xl text-pinkLight border-2 border-pinkLight rounded-xl py-2 mt-10 lg:mt-16 justify-center gap-2 items-center flex hover:bg-pinkLight hover:text-white"
                                                    onClick={() => setUploadModal(!uploadModal)}>
                                                    <AiOutlinePlus />Add Media
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </ImageUploading>
                                <div className="w-full items-center">
                                    <div className="text-lg xl:text-2xl font-bold text-center lg:py-8 text-[#5A5A5A] py-2">Interest</div>
                                    <AddInterested data={interests} onAddInterest={
                                        value => addInterest(value)
                                    }
                                        onRemoveInterest={
                                            value => removeInterest(value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full justify-center md:px-0 xl:w-1/2">
                                <div className="mb-5">
                                    <div className="text-xl xl:text-2xl lg:text-start px-10 sm:px-20">
                                        <div className="mb-5 font-bold text-[#5A5A5A]">About</div>
                                        <div className="text-sm w-full lg:w-3/4 mx-auto md:text-base lg:text-lg 2xl:text-xl mb-8 leading-relaxed">
                                            <textarea
                                                className="border-[#dddddd] border-[0.5px] mx-auto bg-white rounded-xl w-full p-4 md:w-2/3 lg:w-full h-[150px] xl:h-[280px] placeholder:italic placeholder:text-slate-400 block  shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500/80 focus:ring-1 resize-none  shadow-cyan-500/50"
                                                type="text"
                                                name="discription"
                                                placeholder="Write something about yourself."
                                                rows={4}
                                                cols={40}
                                                value={description}
                                                onChange={(e) => (setDescription(e.target.value), setShowDialog(true))}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 md:justify-between md:gap-5 pb-16 justify-center md:px-20">
                                        <Dropdown text="I am a " value={userSex} items={sexData} onHandleChange={e => (setUserSex(e[0]), setShowDialog(true))} />
                                        <Dropdown text="My sexual orientation " value={userOri} items={oriData} onHandleChange={e => (setUserOri(e[0]), setShowDialog(true))} />
                                        <Dropdown text="My Status is " value={userStatus} items={statusData} onHandleChange={e => (setUserStatus(e[0]), setShowDialog(true))} />
                                        <Dropdown text="I am looking for " value={userLooking} items={lookingForData} onHandleChange={e => (setUserLooking(e), setShowDialog(true))} multiple={true} />
                                        <Dropdown text="Show me " value={userShow} items={showData} onHandleChange={e => (setUserShow(e), setShowDialog(true))} multiple={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                alertModal &&
                <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                    <div className="w-full h-screen bg-cover flex px-8  justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-5/6 md:w-3/5 bg-white rounded-xl px-3 relative  py-12">
                            {
                                editModal ?
                                    <AlertModal text="Please tell me about yourself." onCloseModal={() => setAlertModal(false)} />
                                    :
                                    <AlertModal text="Please add your photo at least one." onCloseModal={() => setAlertModal(false)} />
                            }
                        </div>
                    </div >
                </div>
            }
            <Footer />
            {
                loading &&
                <LoadingModal />
            }
            {
                imgSaveErr &&
                <div className={`fixed z-50 top-0 left-0 w-full h-full min-h-screen `}>
                    <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-5/6 md:w-3/5 bg-white rounded-xl px-3 relative  py-12">
                            <AlertModal text="This image can't be deleted. Your profile must contain at least one image." onCloseModal={() => setImgSaveErr(false)} />
                        </div>
                    </div >
                </div>
            }
            {
                imageSave &&
                <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                    <div className="w-full h-screen bg-cover flex md:px-8 md:py-12 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-full bg-white md:rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-12 lg:py-20 h-screen md:h-full overflow-y-auto md:overflow-y-visible">
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
            {
                cameraModal &&
                <div className={`fixed z-50 top-0 left-0 w-full h-full min-h-screen `}>
                    <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-full bg-white md:rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-12 lg:py-20 h-screen md:h-full overflow-y-auto md:overflow-y-visible">
                            <WebcamImage onSaveImage={(img) => cameraOk(img)} onCloseModal={() => setCameraModal(false)} />
                        </div>
                    </div >
                </div>
            }
        </div >
    )
}
