import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import LoadingModal from '../../component/loadingPage';
import Logo from "../../assets/Logo1.svg";
import Image3 from "../../assets/image-3.png"
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, updateDoc, GeoPoint } from "firebase/firestore";
import ngeohash from 'ngeohash';
import geolocator from 'geolocator';
geolocator.config({
    language: "en",
    google: {
        version: "3",
        key: "AIzaSyC5bHiW99yF2oAPsaqNHeZZc5AlrgDdFd8"
    }
});

export default function Location() {
    const { user } = UserAuth();
    const navigate = useNavigate();
    const [userLatitude, setUserLatitude] = useState(null);
    const [userLongitude, setUserLongitude] = useState(null);
    const [country, setCountry] = useState(null);
    const [countryCode, setCountryCode] = useState(null);
    const [userHash, setUserHash] = useState(null);
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);


    const updataLocation = async () => {
        if (userLatitude !== null && userLongitude !== null) {
            setLoading(true);
            await updateDoc(doc(db, "Users", user.uid), {
                currentPoint: {
                    geohash: userHash,
                    geopoint: new GeoPoint(userLatitude, userLongitude)
                },
                location: {
                    address: address,
                    countryID: countryCode,
                    countryName: country,
                    latitude: userLatitude,
                    longitude: userLongitude
                },
                point: {
                    geohash: userHash,
                    geopoint: new GeoPoint(userLatitude, userLongitude)
                },
                Pictures: [{
                    show: "true",
                    url: ""
                },]
            });
            setLoading(false);
            navigate("/profile/photoupload");
        }
    }


    useEffect(() => {
        const goToLocation = async () => {
            setLoading(true);
            var options = {
                enableHighAccuracy: true,
                desiredAccuracy: 30,
                timeout: 1000,
                maximumWait: 10000,
                maximumAge: 0,
                addressLookup: true,
                timezone: true,
                fallbackToIP: true,
                staticMap: false
            };

            const address = await new Promise((resolve, reject) => {
                geolocator.locate(options, function (err, location) {
                    if (err) return reject(err);
                    console.log(location);
                    return resolve(location);

                });
            })

            const encodedGeohash = ngeohash.encode(address.coords.latitude, address.coords.longitude);
            setUserHash(encodedGeohash);

            setUserLatitude(address.coords?.latitude);
            setUserLongitude(address.coords?.longitude);
            setAddress(address.address?.route)
            setCountry(address.address?.country)
            setCountryCode(address.address?.countryCode)
            setLoading(false);
        }
        if (user) {
            goToLocation();
        }
    }, [user]);

    return (
        <div className="bg-[#FFFBFE] w-full min-h-screen h-full flex pt-10 pb-20">
            <div className="pt-20 pl-2 md:pl-5 xl:pl-20 2xl:pl-40">
                <Link to='/profile/profiledata' className="">
                    <FiArrowLeft className="text-pinkLight text-xl lg:text-2xl xl:text-4xl my-3" />
                </Link>
            </div>
            <div className="w-full">
                <div className="w-40 md:w-60 mx-auto pt-4 pb-10 justify-center items-center">
                    <img src={Logo} alt="Logo" className="mx-auto" />
                </div>
                <div className="w-full">
                    <img src={Image3} alt="Image3" className="w-60 md:w-80 xl:w-96 2xl:w-[750px] mx-auto" />
                    <div className="text-sm xl:text-2xl font-bold py-10 xl:leading-loose">
                        You’ll need to provide a location in order to search users around you.
                    </div>
                    <button onClick={() => updataLocation()} className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-10 xl:py-4 xl:px-20">Allow Location</button>
                </div>
            </div>
            <div className="pt-20 pr-2 md:pr-5 xl:pr-20 2xl:pr-40">
            </div>


            {
                loading &&
                <LoadingModal />
            }
        </div>
    )
}