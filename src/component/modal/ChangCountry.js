import React, { useState, useEffect } from "react";
import { MdLocationSearching } from "react-icons/md";
import { useFormik } from "formik";
import Select from "react-select";
import csc from "country-state-city";
import { UserAuth } from "../../context/AuthContext";
import modelLogo from "../../assets/Modal-Logo.png";
import LoadingModal from '../../component/loadingPage';
import ngeohash from 'ngeohash';
import { doc, updateDoc, GeoPoint } from "firebase/firestore";
import { db } from "../../firebase";
import { FiChevronLeft } from "react-icons/fi";

export default function CountryChangeModal({ onChangeLat, onChangeLong, closeModal, onChangeAddress, onChangeCountry, onChangeCountryId }) {
    const { user } = UserAuth();
    const [changeCountry, setChangeCountry] = useState("");
    const [changeCountryId, setChangeCountryId] = useState("");
    const [changeState, setChangeState] = useState("");
    const [changeCity, setChangeCity] = useState("");
    const [loading, setLoading] = useState(false);
    const countries = csc.getAllCountries();

    const addressFromik = useFormik({
        initialValues: {
            country: null,
            state: null,
            city: null
        },
        onSubmit: (values) => console.log(JSON.stringify(values))
    });

    const updatedCountries = countries.map((country) => ({
        label: country.name,
        value: country.id,
        ...country
    }));
    const updatedStates = (countryId) =>
        csc
            .getStatesOfCountry(countryId)
            .map((state) => ({ label: state.name, value: state.id, ...state }));
    const updatedCities = (stateId) =>
        csc
            .getCitiesOfState(stateId)
            .map((city) => ({ label: city.name, value: city.id, ...city }));

    const { values, handleSubmit, setFieldValue, setValues } = addressFromik;

    const changeLocation = async () => {
        setLoading(true);
        if (values.country?.name === undefined && values.state?.name === undefined && values.city?.name === undefined) {
            console.log("err")
        } else {
            if (values.country?.name === undefined) {
                const countryName = updatedCountries[values.state?.country_id - 1].name;
                const countryId = updatedCountries[values.state?.country_id - 1].sortname;
                setChangeCountry(countryName);
                setChangeCountryId(countryId);
            } else {
                const countryName = values.country?.name;
                setChangeCountry(countryName);
            }

            if (values.state?.name === undefined) return;
            else {
                const stateName = values.state?.name;
                setChangeState(stateName);
            }

            if (values.city?.name === undefined) return;
            else {
                const cityName = values.city?.name;
                setChangeCity(cityName);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        const fetchLocation = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?address=${changeCountry},${changeState}, ${changeCity}&key=AIzaSyC5bHiW99yF2oAPsaqNHeZZc5AlrgDdFd8`
                );
                const data = await response.json();
                if (data.results.length > 0) {
                    const { lat, lng } = data.results[0].geometry.location;

                    const encodedGeohash = ngeohash.encode(lat, lng);

                    await updateDoc(doc(db, "Users", user.uid), {
                        point: {
                            geohash: encodedGeohash,
                            geopoint: new GeoPoint(lat, lng)
                        }
                    });
                    await onChangeLat(lat);
                    await onChangeLong(lng);
                }

            } catch (error) {
                console.error('Error fetching location:', error);
            }
            onChangeAddress(changeCity)
            onChangeCountry(changeCountry)
            onChangeCountryId(changeCountryId)
            closeModal();
            setLoading(false);
        };
        if (changeCountry && user) {
            fetchLocation();
        }
    }, [changeCountry, changeState, changeCity, user]);

    return (
        <>
            <h2 className="hidden w-16 lg:w-24 absolute justify-center md:flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src={modelLogo} alt="ModelLogo" />
            </h2>
            <div onClick={() => closeModal()} className="text-pinkLight text-xl md:hidden">
                <FiChevronLeft />
            </div>
            <p className="text-lg lg:text-xl xl:text-3xl font-bold my-3 text-pinkLight">Change Location</p>
            <p className="text-sm lg:text-lg xl:text-xl text-[#5a5a5a] text-center py-5">Are you sure you want to change location?</p>
            <div className="mx-[3%] my-5 justify-center gap-2 items-center border-pinkLight border-[0.1px] py-2 px-5 rounded-xl">
                <form onSubmit={handleSubmit}>
                    <div className="xl:flex py-2 items-center w-full gap-3">
                        <div className="flex items-center xl:w-1/3  gap-2 text-pinkLight text-xl pr-2 py-2">
                            <MdLocationSearching /> Country
                        </div>
                        <Select
                            className="w-full md:w-56 lg:w-72 xl:w-80 2xl:w-[420px] text-start"
                            id="country"
                            name="country"
                            label="country"
                            options={updatedCountries}
                            value={values.country}
                            onChange={(value) => {
                                setValues({ country: value, state: null, city: null }, false);
                            }}
                        />
                    </div>
                    <div className="xl:flex py-2 items-center w-full gap-3">
                        <div className="flex items-center xl:w-1/3 gap-2 text-pinkLight text-xl pr-2 py-2">
                            <MdLocationSearching /> State
                        </div>
                        <Select
                            className="w-full md:w-56 lg:w-72 xl:w-80 2xl:w-[420px] text-start"
                            id="state"
                            name="state"
                            options={updatedStates(values.country ? values.country.value : null)}
                            value={values.state}
                            onChange={(value) => {
                                setValues({ state: value, city: null }, false);
                            }}
                        />
                    </div>
                    <div className="xl:flex py-2 items-center w-full gap-3">
                        <div className="flex items-center xl:w-1/3 gap-2 text-pinkLight text-xl pr-2 py-2">
                            <MdLocationSearching /> City
                        </div>
                        <Select
                            className="w-full md:w-56 lg:w-72 xl:w-80 2xl:w-[420px] text-start"
                            id="city"
                            name="city"
                            options={updatedCities(values.state ? values.state.value : null)}
                            value={values.city}
                            onChange={(value) => setFieldValue("city", value)}
                        />
                    </div>
                    <div className="w-full lg:flex gap-2">
                        <button onClick={() => changeLocation()} className="w-5/6 xl:w-2/3 px-6 py-3 text-pinkLight border-2 border-pinkLight hover:bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3 hover:text-white gap-1" type="submit">Yes</button>
                        <button onClick={() => closeModal()} className="w-5/6 xl:w-2/3 px-6 py-3 text-pinkLight border-2 border-pinkLight hover:bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3 hover:text-white gap-1">
                            <div className="text-sm xl:text-lg font-bold">No</div>
                        </button>
                    </div>

                    {
                        loading &&
                        <LoadingModal />
                    }
                </form>
            </div>

        </>
    )
}