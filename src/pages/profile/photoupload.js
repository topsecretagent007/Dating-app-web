import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploading from 'react-images-uploading';
import { FcCamera, FcPicture } from "react-icons/fc";
import Logo from "../../assets/Logo1.svg";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject, getStorage } from "firebase/storage";
import { storage } from "../../firebase";  // Import the firebase storage object
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import LoadingModal from "../../component/loadingPage";
import AlertModal from "../../component/modal/alertmodal";

export default function PhotoUpload() {
    const navigate = useNavigate();
    const { user } = UserAuth();
    const [originalImages, setOriginalImages] = useState([]);
    const [images, setImages] = useState([]);
    const maxNumber = 100;
    const [loading, setLoading] = useState(false);
    const [alertModal, setAlertModal] = useState(false);
    const [visible, setVisible] = useState(true);
    const menuDropdown = useRef(null);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isCameraConnected, setIsCameraConnected] = useState(false);
    const [cameraConnected, setCameraConnected] = useState(false);
    const [imagePath, setImagePath] = useState('');

    const modalClose = () => {
        setAlertModal(false);
    }
    
    const handleTakePhoto = async () => {
        try {
            const mediaDevices = navigator.mediaDevices;
            if (!mediaDevices || !mediaDevices.getUserMedia) {
                return alert('Camera not available on this device');
            }

            const stream = await mediaDevices.getUserMedia({ video: true });
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();

            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

            const dataUrl = canvas.toDataURL('image/png');
            setImagePath(dataUrl);

            // Here you can save the image using the imagePath
            // For example:
            // fetch('/api/save-image', {
            //   method: 'POST',
            //   body: JSON.stringify({
            //     imagePath,
            //   }),
            // });
            console.log(dataUrl, "image url >>>>>>>>>>>>>>>>>")

            stream.getTracks().forEach((track) => track.stop());
        } catch (error) {
            console.error(error);
        }
    };

    // const handleConnectCamera = async () => {
    //     try {
    //         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    //         setIsCameraConnected(true);
    //         // Do something with the stream, like display it in a video element
    //     } catch (error) {
    //         console.error(error);
    //         setCameraConnected(true);
    //         // alert('Please connect the camera');
    //     }
    // };

    const uploadImage = async (image) => {
        if (!image) {
            return null;
        }
        if (image.url.includes("https://")) return image.url;
        if (image.file == null) return null;
        console.log("here")
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

    const updateAvatar = async () => {
        setLoading(true);
        const firstNewImage = await uploadImage(images[0]);
        if (firstNewImage != null) {
            const [first, ...rest] = originalImages;
            const pictures = [{ url: firstNewImage, show: true }, ...rest];
            await updateDoc(doc(db, "Users", user.uid), {
                Pictures: pictures
            });
            setLoading(false);
            navigate("/profile/photoaddmore");
        } else {
            setAlertModal(true);
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
                setAlertModal(false);
                setIsCameraConnected(false);
                setCameraConnected(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuDropdown]);

    return (
        <div className="bg-[#FFFBFE] min-h-screen justify-center rounded-xl w-full h-full flex pt-10 pb-32">
            <div className="w-4/5">
                <div className="w-full p-8 items-center">
                    <img src={Logo} alt="Logo" className="mx-auto" />
                </div>
                <div className="justify-center">
                    <div className="flex justify-center bg-[#FFFBFE]">
                        <div className="PhotoUpload">
                            <ImageUploading
                                value={images}
                                onChange={(imageList) => setImages(imageList)}
                                maxNumber={maxNumber}
                                dataURLKey="url"
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    isDragging,
                                    dragProps,
                                }) => (
                                    <div className="upload__image-wrapper">
                                        <div className="w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] bg-[url('./assets/avatar1.png')] mx-auto rounded-3xl bg-cover">
                                            <div className="image-item">
                                                {images[0] && images[0]['url'] != "" && images[0]['url'] != null && <img src={images[0]['url']} alt="Avatar" className="mx-auto rounded-3xl w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] object-cover" />}
                                            </div>

                                        </div>
                                        <div className="justify-center mt-[-30px] lg:mt-[-70px] ">
                                            <div className="justify-center flex mx-auto gap-48 lg:gap-80">
                                                <button onClick={handleTakePhoto} className="justify-start text-2xl p-2 lg:text-5xl lg:p-5 rounded-full bg-pinkLight border-8 border-white"
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
                    <div className="text-xl lg:text-2xl font-bold">Add profile photo</div>
                    <div className="text-sm lg:text-xl py-10 xl:leading-loose">
                        You need to upload at least one image as part of the registration process. <br />
                        Once you have completed the registration you will be able to add more <br />
                        photos to your profile.
                        <br />
                        <br />
                        Your profile image must not contain any nudity and be only of yourself.
                    </div>

                    <button onClick={() => updateAvatar()} className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">Continue</button>

                </div>
            </div>
            {
                loading &&
                <LoadingModal />
            }
            {
                alertModal &&
                <div className={`fixed z-50 w-full h-full min-h-screen top-0 `}>
                    <div className="w-full h-screen bg-cover flex px-8  justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-3 relative  py-6">
                            <AlertModal text="Please select your avatar." onCloseModal={() => modalClose()}/>
                        </div>
                    </div >
                </div>
            }
            {
                isCameraConnected &&
                <div className={`fixed z-50 top-0 left-0 w-full h-full min-h-screen `}>
                    <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-3 relative  py-6">
                            <AlertModal text="Camera connected successfully!" onCloseModal={() => modalClose()}/>
                        </div>
                    </div >
                </div>
            }
            {
                cameraConnected &&
                <div className={`fixed z-50 top-0 left-0 w-full h-full min-h-screen `}>
                    <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                        <div ref={menuDropdown} className="w-64 bg-white rounded-xl px-3 relative  py-6">
                            <AlertModal text="Please connect the camera." onCloseModal={() => modalClose()} />
                        </div>
                    </div >
                </div>
            }
            {imagePath && <img src={imagePath} />}
        </div>
    )
}