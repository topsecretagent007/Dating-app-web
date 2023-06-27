import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import LoadingModal from '../../component/loadingPage';
import Logo from "../../assets/Logo1.svg";
import Image3 from "../../assets/image-3.png"
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import axios from 'axios';

export default function Location() {
    const { user } = UserAuth();
    const navigate = useNavigate();
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [country, setCountry] = useState(null);
    const [countryCode, setCountryCode] = useState(null);
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);


    const updataLocation = async () => {
        if (latitude !== "" && longitude !== "") {
            setLoading(true);
            await updateDoc(doc(db, "Users", user.uid), {
                currentPoint: {
                    geohash: "",
                    geopoint: [latitude +","+ longitude]
                },
                geoHash: "",
                geoLocation: [latitude +","+ longitude],
                location: {
                    address: "",
                    countryID: "",
                    countryName: "",
                    latitude: latitude,
                    longitude: longitude
                },
                point: {
                    geohash: "",
                    geopoint: [latitude +","+ longitude]
                },
                Pictures:[{
                    show : "true",
                    url : ""
                }, ]
            });
            setLoading(false);
            navigate("/profile/photoupload");
        }
    }

    useEffect(() => {
        setLoading(true);
        // Get user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                error => {
                    console.error(error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            // Get country and address using geocoding API
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`)
                .then(response => {
                    const results = response.data.results;
                    if (results.length > 0) {
                        for (let i = 0; i < results[0].address_components.length; i++) {
                            const addressComponent = results[0].address_components[i];
                            if (addressComponent.types.includes('country')) {
                                setCountry(addressComponent.long_name);
                                setCountryCode(addressComponent.short_name);
                            }
                        }
                        setAddress(results[0].formatted_address);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
        setLoading(false);

    }, [latitude, longitude]);

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