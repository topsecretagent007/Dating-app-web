import React, { useEffect, useState, useRef } from "react";
import { AiOutlineDelete, AiOutlinePlus, AiFillEye } from 'react-icons/ai';
import { useNavigate, useLocation } from "react-router-dom";
import { FiImage, FiCamera } from "react-icons/fi"
import ModelLogo from "../assets/Modal-Logo.png"
import ImageUploading from 'react-images-uploading';
import Dropdown from "../component/combox/dropdown";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { sexData, oriData, statusData, lookingForData, showData } from "../config/constant";
import LoadingModal from "../component/loadingPage";
import AddInterested from "../component/other/addinterested";
import { storage } from "../firebase";
import Header from "../component/header/index";
import Footer from "../component/footer/index";
import AlertModal from "../component/modal/alertmodal";

import ImageCropper from '../component/imageCropper';
import { uploadImage } from "../config/helpers";
import ImageSaveModal from "../component/modal/imagesave";

export default function EditProfilePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = UserAuth();
    const [uploadModal, setUploadModal] = useState(false);
    const [images, setImages] = useState([]);
    const menuDropdown = useRef(null)
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
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

    const maxNumber = 6;
    const numbers = [1, 2, 3, 4, 5, 6];
    const listItems = numbers.map((numbers) =>
        <div key={numbers} className="w-[75px] h-[75px] lg:w-[160px] lg:h-[160px] mx-auto rounded-xl bg-[#888888]"></div>);

    const removeImage = async () => {
        setImageSave(false);
        setImages((previousArr) => (previousArr.slice(0, -1)));
    }

    const modalClose = () => {
        setAlertModal(false);
    }

    const addInterest = (value) => {
        setInterests([...interests, value]);
    }

    const removeInterest = (value) => {
        setInterests(interests.filter((item) => { return item !== value }))
    }

    const myPreview = async () => {
        await dataSave();
        goToPage("/profilepreview");
    }

    const goToPage = (url) => {
        navigate(url);
    }
    const dataSave = async () => {
        //console.log(interests); return;
        setLoading(true);
        if (images.length != 0 && description != "") {
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
                currentPoint: {
                    geohash: "",
                    geopoint: [0, 0]
                },
                interest: interests
            });
            console.log("update finished...")
            setLoading(false);
        } else {
            setAlertModal(true);
            if (images.length != 0) {
                setEditModal(true);
            } else if (description != "") {
                setEditModal(false);
            }
            setLoading(false);
        }
    }

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
                setAlertModal(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuDropdown]);

    const onChange = (imageList) => {
        // data for submit
        setImages(imageList);
        setUploadModal(false);
        setAlertModal(false);
    };

    const uploadImage = async (image) => {
        if (!image) {
            return null;
        }
        if (image.url.includes("https://")) return image.url;

        const filename = `${Date.now()}-${image.file.name}`;
        const storageRef = ref(storage, `users/${user.uid}/${filename}`);

        return new Promise((resolve, reject) => {
            const uploadTask = uploadBytesResumable(storageRef, image.file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (err) => console.log(err),
                async () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        return resolve(url);
                    }).catch((e) => reject(e));
                }
            );
        });

    }

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
            <div className="w-full h-full bg-cover flex bg-[#FFFBFE] justify-center min-h-screen py-12">
                <div className="w-[340px] md:w-[640px] xl:w-[1250px] 2xl:w-[1790px] px-5 mx-auto  xl:flex gap-12">
                    <div className="w-full xl:px-10 2xl:px-40 pb-20">
                        <div className="w-full lg:flex lg:justify-between items-center">
                            <div className="text-xl xl:text-2xl font-bold text-center lg:text-start text-[#5A5A5A]">Edit Profile</div>
                            <div className="px-8 md:px-44 lg:px-0">
                                <button onClick={() => myPreview()} className="w-full bg-white xl:text-2xl text-pinkLight border-2 border-pinkLight rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
                                    <div className="w-40 lg:px-3 xl:w-60 items-center flex">
                                        <div className="w-1/6">
                                            <AiFillEye />
                                        </div>
                                        <div onClick={() => myPreview()} className="w-5/6">
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
                                    onChange={(imageList) => (setImages(imageList), setImageSave(true), setUploadModal(false))}
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
                                            <div className="w-[256px] h-[175px] lg:w-[512px] lg:h-[344px]  mx-auto p-2 rounded-xl gap-2 grid grid-cols-3">
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
                                                    </div >
                                                </div>
                                            }

                                            <div className="px-8 md:px-44 lg:px-20">
                                                <button className="w-full bg-white xl:text-2xl text-pinkLight border-2 border-pinkLight rounded-xl py-2 mt-10 lg:mt-16 justify-center gap-2 items-center flex hover:bg-pinkLight hover:text-white"
                                                    onClick={() => setUploadModal(!uploadModal)}>
                                                    <AiOutlinePlus />Add Media
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </ImageUploading>
                                <div className="w-full items-center">
                                    <div className="text-lg xl:text-2xl font-bold text-center lg:py-8 text-[#5A5A5A]">Interest</div>
                                    <AddInterested data={interests} onAddInterest={
                                        value => addInterest(value)
                                    }
                                        onRemoveInterest={
                                            value => removeInterest(value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-full xl:w-1/2">
                                <div className="mb-5">
                                    <div className="text-xl xl:text-2xl lg:text-start">
                                        <div className="mb-5 font-bold text-[#5A5A5A]">About</div>
                                        <div className="text-sm w-full lg:w-3/4 mx-auto md:text-base lg:text-lg 2xl:text-xl mb-8 leading-relaxed">
                                            <textarea
                                                className="border-[#dddddd] border-[0.5px] mx-auto bg-white rounded-xl w-full p-4 md:w-2/3 lg:w-full h-[200px] xl:h-[400px] placeholder:italic placeholder:text-slate-400 block  shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500/80 focus:ring-1 resize-none  shadow-cyan-500/50"
                                                type="text"
                                                name="discription"
                                                placeholder="Write something about yourself."
                                                rows={4}
                                                cols={40}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 md:justify-between gap-5 pb-16">
                                        <Dropdown text="I am a " value={userSex} items={sexData} onHandleChange={e => setUserSex(e[0])} />
                                        <Dropdown text="My sexual orientation " value={userOri} items={oriData} onHandleChange={e => setUserOri(e[0])} />
                                        <Dropdown text="My Status is " value={userStatus} items={statusData} onHandleChange={e => setUserStatus(e[0])} />
                                        <Dropdown text="I am looking for " value={userLooking} items={lookingForData} onHandleChange={e => setUserLooking(e)} multiple={true} />
                                        <Dropdown text="Show me " value={userShow} items={showData} onHandleChange={e => setUserShow(e)} multiple={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => dataSave()} className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">Save</button>
                    </div>
                </div>
            </div>
            {
                alertModal &&
                <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                    <div className="w-full h-screen bg-cover flex px-8  justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-3 relative  py-6">
                            {
                                editModal ?
                                    <AlertModal text="Please tell me about yourself." onCloseModal={() => modalClose()} />
                                    :
                                    <AlertModal text="Please add your photo at least one." onCloseModal={() => modalClose()} />
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
        </div >
    )
}
