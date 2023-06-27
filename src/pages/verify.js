import React, { useEffect, useState, useRef } from "react";
import ImageUploading from 'react-images-uploading';
import { FiImage, FiCamera } from "react-icons/fi"
import { useNavigate } from "react-router-dom";
import SimpleImg from "../assets/image4.png"
import Header from "../component/header/index";
import Footer from "../component/footer/index";
import GenerateRandomNumber from "../component/other/randomnumber"
import LoadingModal from '../component/loadingPage';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import AlertModal from "../component/modal/alertmodal";
import { uploadImage } from "../config/helpers";



export default function Verify() {

    const { user } = UserAuth();
    const navigate = useNavigate();
    const [verifycationCode, setVeryficationCode] = useState(false);
    const [alretUploadPhoto, setAlretUploadPhoto] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState();
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [verifyCode, setVerifyCode] = useState(0);
    const [name, setName] = useState("");
    const [images, setImages] = React.useState([]);
    const [alertModal, setAlertModal] = useState(false);
    const menuDropdown = useRef(null);
    const [isCameraConnected, setIsCameraConnected] = useState(false);
    const [cameraConnected, setCameraConnected] = useState(false);
    const maxNumber = 100;

    const handleConnectCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ viedo: true });
            setIsCameraConnected(true);
            navigate("/camera");
            // Do something with the stream, like display it in a video element
        } catch (error) {
            console.error(error);
            setCameraConnected(true);
            // alert('Please connect the camera');
        }
    };

    const modalClose = () => {
        setCameraConnected(false);
        setAlertModal(false);
        setAlretUploadPhoto(false);
    }

    const uploadPhote = async () => {
        setLoading(true);
        if(images[0].file==null || images[0].file==undefined) return;
        const codeImageUrl = await uploadImage(images[0].file);
        if (codeImageUrl == "" || codeImageUrl == null) {
            setLoading(false);
            setAlertModal(true);
        } else {
            await setDoc(doc(db, "Verify", user.uid), {
                code: verifyCode,
                date_updated: new Date(),
                idUser: user.uid,
                imageUrl: codeImageUrl,
                name: name,
                reason_verified: "",
                verified: 2,
                phoneNumber : ""
            });
            setLoading(false);
            setAlretUploadPhoto(true);
        }

    }

    useEffect(() => {
        setVeryficationCode(false);
    }, [])


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
                setAlertModal(false)
                setIsCameraConnected(false)
                setCameraConnected(false)
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
                setName(userData.UserName);
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
            <div className="w-full h-full min-h-screen bg-cover justify-center px-[10%] py-14 bg-[#FFFBFE]" >
                <div className="w-full xl:flex">
                    <div className="w-full xl:w-2/5">
                        <img src={SimpleImg} alt="FindImage" className="w-60 sm:w-[500px] lg:w-[700px] xl:w-full mx-auto" />
                    </div>
                    <div className="w-full pt-5 xl:pt-0 justify-center xl:w-3/5 md:px-16">
                        <div className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold">Account Verification
                        </div>
                        {verifycationCode ?
                            <div>
                                <GenerateRandomNumber generate={setVerifyCode} />

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
                                                // write your building UI

                                                <div className="upload__image-wrapper">
                                                    <div className="w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] bg-[url('./assets/avatar.png')] mx-auto rounded-3xl bg-cover">
                                                        {imageList.map((image, index) => (
                                                            <div key={index} className="image-item">
                                                                <img src={image['url']} alt="" className="mx-auto rounded-3xl w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] object-cover" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="justify-center mt-[-30px] lg:mt-[-70px] ">
                                                        <div className="justify-center flex mx-auto gap-48 lg:gap-80">


                                                            <button onClick={() => handleConnectCamera()} className="justify-start text-2xl p-2 lg:text-5xl lg:p-5 rounded-full bg-white text-pinkLight border-8 border-pinkLight/70 hover:bg-pinkLight hover:text-white hover:border-white"
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
                                    <div ref={menuDropdown} className="w-3/5 bg-white rounded-xl px-3 relative  py-6">
                                        <AlertModal text="Thanks for submitting your photo! Please allow up to 24 hours for our staff to manually verify your profile." onCloseModal={() => modalClose()} />
                                    </div>
                                </div >
                            </div>
                        }
                        {
                            alertModal &&
                            <div className={`fixed z-50 top-0 left-0 w-full h-full min-h-screen `}>
                                <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                                    <div ref={menuDropdown} className="w-3/5 bg-white rounded-xl px-3 relative  py-6">
                                        <AlertModal text="Please agree to our terms of use and privacy policy by checking the box below." onCloseModal={() => modalClose()} />
                                    </div>
                                </div >
                            </div>
                        }
                        {
                            isCameraConnected && <p>Camera connected successfully!</p>
                        }
                        {cameraConnected &&
                            <div className={`fixed z-50 top-0 left-0 w-full h-full min-h-screen `}>
                                <div className="w-full h-screen bg-cover flex px-8 py-20 justify-center items-center bg-black/90" >
                                    <div ref={menuDropdown} className="w-80 bg-white rounded-xl px-3 relative  py-6">
                                        <AlertModal text="Please connect the camera." onCloseModal={() => modalClose()} />
                                    </div>
                                </div >
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Footer />
            {
                loading &&
                <LoadingModal />
            }

        </div >
    )
}