import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploading from 'react-images-uploading';
import { FcSettings, FcSupport } from "react-icons/fc";
import { GoAlert } from "react-icons/go";
import Header from "../component/header/index";
import Footer from "../component/footer/index";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import LoadingModal from "../component/loadingPage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";  // Import the firebase storage object
import ImageSaveModal from "../component/modal/imagesave"


export default function ProfilePage() {
    const navigate = useNavigate();
    const { user } = UserAuth();
    const [name, setName] = useState("");
    const [originalImages, setOriginalImages] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageSave, setImageSave] = useState(false);
    const [visible, setVisible] = useState(true);
    const menuDropdown = useRef(null);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const maxNumber = 100;


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

    const uploadImage = async (image) => {
        if (!image) {
            return null;
        }
        if (image.url.includes("https://")) return image.url;

        const filename = `${Date.now()}-${image.file.name}`;
        const storageRef = ref(storage, `verify/${user.uid}/${filename}`);

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

    const updateAvatar = async () => {
        console.log("upload", uploadImage(images[0]))
        setLoading(true);
        const firstNewImage = await uploadImage(images[0]);
        if (firstNewImage != null) {
            const [first, ...rest] = originalImages;
            const pictures = [{ url: firstNewImage, show: true }, ...rest];
            await updateDoc(doc(db, "Users", user.uid), {
                Pictures: pictures
            });
            setLoading(false);
            setImageSave(false);
        } else {
            console.log("error")
            setLoading(false);
        }

    }

    useEffect(() => {
        setLoading(true);
        const getUserInfo = async () => {
            const docSnap = await getDoc(doc(db, "Users", user.uid));
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setName(userData.UserName);
                setOriginalImages(userData.Pictures);
                setImages([userData.Pictures[0]])
                setLoading(false);
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        if (user && user.uid) {
            getUserInfo();
        }
    }, [user]);

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
                setImageSave(false);
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
            <div className="w-full h-full bg-cover flex bg-[#FFFBFE] justify-center min-h-screen pt-10 pb-28" >
                <div className="w-full px-5 pt-20 xl:px-[24%] xl:pt-32">
                    <div className="text-2xl font-bold justify-start xl:absolute z-10">My Profile</div>
                    <ImageUploading
                        value={images}
                        onChange={(imageList) => (setImages(imageList), setImageSave(true))}
                        maxNumber={maxNumber}
                        dataURLKey="url"
                    >
                        {({
                            onImageUpload,
                            isDragging,
                            dragProps,
                        }) => (
                            <div className="upload__image-wrapper ">
                                <div className="w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] bg-[url('./assets/avatar.png')] mx-auto rounded-full bg-cover">
                                    <div className="image-item">
                                        {images[0] && images[0]['url'] != "" && images[0]['url'] != null &&
                                            <img style={isDragging ? { color: 'red' } : undefined}
                                                onClick={onImageUpload}
                                                {...dragProps} src={images[0]['url']} alt="Avatar" className="mx-auto rounded-full w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] object-cover cursor-pointer" />
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                    </ImageUploading>
                    <div className="text-xl xl:text-2xl font-bold pt-6 xl:pt-10">{name}</div>
                    <div className="justify-center flex mx-auto gap-44 xl:gap-52 -mt-10">
                        <div onClick={() => goToPage("/settings")} >
                            <button className="justify-start cursor-pointer text-xl xl:text-5xl p-2 rounded-full bg-blueLight border-4 xl:border-8 border-white"
                            >
                                <FcSettings />
                            </button>
                            <div className="block xl:text-xl text-[#888888]">Setting</div>
                        </div>
                        <div onClick={() => goToPage("/editprofile")}>
                            <button className="justify-start text-xl xl:text-5xl p-2 rounded-full bg-green-600 border-4 xl:border-8 border-white"
                            >
                                <FcSupport />
                            </button>
                            <div className="block xl:text-xl text-[#888888]">Edit Info</div>
                        </div>
                    </div>
                    <div className="justify-center flex mx-auto -mt-6 xl:-mt-12">
                        <div onClick={() => goToPage("/verifyprofile")}>
                            <button className="justify-start text-xl xl:text-5xl p-2 rounded-full text-yellow-500 bg-red-600 border-4 xl:border-8 border-white"
                            >
                                <GoAlert />
                            </button>
                            <div className="block xl:text-xl text-[#888888] xl:mt-2">Not verified</div>
                        </div>
                    </div>
                    <div className="text-pinkLight text-lg xl:text-xl py-2 mt-5">Subsribe now</div>
                    <div className="xl:text-xl pb-12">
                        for unlimited matches and contacts
                    </div>
                    <div className="pb-20">
                        <button className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-8 xl:py-4 xl:px-32">Subscribe now</button>
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
                    <div className="w-full h-screen bg-cover flex px-8  justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-2 lg:px-16 xl:px-20 2xl:px-40 md:w-1/2 relative 2xl:w-[950px] py-12 lg:py-20">
                            <ImageSaveModal onSaveImage={updateAvatar} onCloseImage={() => removeImage()} />
                        </div>
                    </div >
                </div>
            }
        </div >
    )
}