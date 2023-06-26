import React, { useState, useEffect, useRef } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import LoadingModal from "../../component/loadingPage";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const arrowStyles = {
    position: 'absolute',
    zIndex: 2,
    right: '15px',
    width: 30,
    height: 30,
    cursor: 'pointer',
};

const prevArrow = (onClickHandler, hasPrev, label) => {
    if (hasPrev) return <span onClick={onClickHandler} title={label} style={{ ...arrowStyles, top: 'calc(50% - 20px)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_0_3)">
                <path d="M11.5 22C11.5 22.8284 12.1716 23.5 13 23.5C13.8284 23.5 14.5 22.8284 14.5 22H11.5ZM14.0607 0.93934C13.4749 0.353553 12.5251 0.353553 11.9393 0.93934L2.3934 10.4853C1.80761 11.0711 1.80761 12.0208 2.3934 12.6066C2.97918 13.1924 3.92893 13.1924 4.51472 12.6066L13 4.12132L21.4853 12.6066C22.0711 13.1924 23.0208 13.1924 23.6066 12.6066C24.1924 12.0208 24.1924 11.0711 23.6066 10.4853L14.0607 0.93934ZM14.5 22L14.5 2H11.5L11.5 22H14.5Z" fill="white" fill-opacity="0.6" />
            </g>
            <defs>
                <clipPath id="clip0_0_3">
                    <rect width="24" height="24" fill="white" transform="matrix(0 1 -1 0 24 0)" />
                </clipPath>
            </defs>
        </svg>
    </span>
}

const nextArrow = (onClickHandler, hasNext, label) => {
    if (hasNext) return <span onClick={onClickHandler} title={label} style={{ ...arrowStyles, top: 'calc(50% + 20px)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_0_3)">
                <path d="M11.9393 23.0607C12.5251 23.6464 13.4749 23.6464 14.0607 23.0607L23.6066 13.5147C24.1924 12.9289 24.1924 11.9792 23.6066 11.3934C23.0208 10.8076 22.0711 10.8076 21.4853 11.3934L13 19.8787L4.51472 11.3934C3.92893 10.8076 2.97918 10.8076 2.3934 11.3934C1.80761 11.9792 1.80761 12.9289 2.3934 13.5147L11.9393 23.0607ZM14.5 2C14.5 1.17157 13.8284 0.5 13 0.5C12.1716 0.5 11.5 1.17157 11.5 2H14.5ZM14.5 22L14.5 2H11.5L11.5 22H14.5Z" fill="white" fill-opacity="0.6" />
            </g>
            <defs>
                <clipPath id="clip0_0_3">
                    <rect width="24" height="24" fill="white" transform="matrix(0 1 -1 0 24 0)" />
                </clipPath>
            </defs>
        </svg>
    </span>
}

export default function MyCarousel() {
    const { user } = UserAuth();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const carouselElement = useRef(null);

    useEffect(() => {
        const getUserInfo = async () => {
            setLoading(true);
            const docSnap = await getDoc(doc(db, "Users", user.uid));
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setImages(userData.Pictures)
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
            if (!carouselElement) {
                carouselElement.current.moveTo(0);
            }
            setLoading(false);

        }
        if (user && user.uid) {
            getUserInfo();
        }
    }, [user])

    return (
        <>
            <>
                {
                    images.length > 0 &&
                    <Carousel
                        ref={carouselElement}

                        showArrows={true}
                        showThumbs={false}
                        axis='vertical'
                        infiniteLoop={true}
                        dynamicHeight
                        renderArrowPrev={prevArrow}
                        renderArrowNext={nextArrow}
                    >
                        {images.map((image, index) => (
                            <div key={index} style={{ height: "720px", width: '100%' }}>
                                <img src={image.url} alt={`image-${index}`} className="rounded-xl w-full h-full" />
                            </div>
                        ))}
                    </Carousel>
                }
            </>
            {
                loading &&
                <LoadingModal />
            }
        </>
    );
}