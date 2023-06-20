import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageUploading from 'react-images-uploading';
import { FcCamera, FcPicture } from "react-icons/fc";
import UserContext from "../../context/userContext";
import Logo from "../../assets/Logo1.svg";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject, getStorage } from "firebase/storage"
import { storage } from "../services/firebase.config";  // Import the firebase storage object

export default function PhotoUpload() {
    const [images, setImages] = useState([]);
    const maxNumber = 5;
    const [inputImage, setInputIamge] = useState(false);
    const { userImages, setUserImages } = useContext(UserContext);
    const { userId } = useContext(UserContext);



    const uploadImage = async (image) => {

        if (!image) {
            alert("Please choose a image first!")
        }

        // Create a unique filename for the image
        const filename = `${Date.now()}-${image.file.name}`;

        if (userImages == "") {
            // Create a reference to the image in Firebase Storage
            const storageRef = ref(storage, `users/${userId}/${filename}`);

            return new Promise((resolve, reject) => {
                const uploadTask = uploadBytesResumable(storageRef, image.file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const percent = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );

                        console.log(percent, "percent")
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
        } else {
            const storageImage = getStorage();
            const deleteDate = ref(storageImage, `users/${userId}`);
            deleteObject(deleteDate).then(() => {
                // File deleted successfully
            }).catch((error) => {
                // Uh-oh, an error occurred!
            });
            // Create a reference to the image in Firebase Storage
            const storageRef = ref(storage, `users/${userId}/${filename}`);

            return new Promise((resolve, reject) => {
                const uploadTask = uploadBytesResumable(storageRef, image.file);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const percent = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );

                        console.log(percent, "percent")
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

        // Create a reference to the image in Firebase Storage
        const storageRef = ref(storage, `users/${userId}/${filename}`);

        return new Promise((resolve, reject) => {
            const uploadTask = uploadBytesResumable(storageRef, image.file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );

                    console.log(percent, "percent")
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

    const onChange = async (imageList) => {
        console.log(imageList);
        try {
            // Upload the first image in the list and set its download URL as the value for the "images" state
            const downloadURL = await uploadImage(imageList[0]);
            setInputIamge(true);
            setUserImages(downloadURL);
            console.log(downloadURL, "downloadURL");
        } catch (e) {
            console.log("Image upload Error: ", e);
        }
        setImages(imageList);
    };

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
                    <div className="text-xl lg:text-2xl font-bold">Add profile photo</div>
                    <div className="text-sm lg:text-xl py-10 xl:leading-loose">
                        You need to upload at least one image as part of the registration process. <br />
                        Once you have completed the registration you will be able to add more <br />
                        photos to your profile.
                        <br />
                        <br />
                        Your profile image must not contain any nudity and be only of yourself.
                    </div>
                    {
                        inputImage ?
                            <Link to="/profile/photoaddmore" className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">Continue</Link>
                            :
                            <Link to="" className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">Continue</Link>
                    }
                </div>
            </div>
        </div>
    )
}