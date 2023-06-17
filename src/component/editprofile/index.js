import React, { useEffect, useState, useRef, Fragment } from "react";
import { AiOutlineDelete, AiOutlinePlus, AiFillEye, AiOutlineClose } from 'react-icons/ai';
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { FcCamera, FcPicture } from "react-icons/fc";
import { Combobox, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi"
import { Checkbox } from "@material-tailwind/react";
import ModelLogo from "../../assets/Modal-Logo.png"
import ImageUploading from 'react-images-uploading';


export default function EditProfile() {
    const [uploadModal, setUploadModal] = useState(false);
    const [images, setImages] = React.useState([]);
    const menuDropdown = useRef(null)
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

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
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuDropdown]);


    const maxNumber = 99;
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const listItems = numbers.map((numbers) =>
        <div key={numbers} className="w-[75px] h-[75px] lg:w-[160px] lg:h-[160px] mx-auto rounded-xl bg-[#888888]"></div>);

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        setUploadModal(false);

    };



    const me = [
        { id: 1, name: "MAN" },
        { id: 2, name: "WOMAN" },
        { id: 3, name: "OTHER" },
        { id: 4, name: "AGENDER" },
        { id: 5, name: "ANDROGYNOUS" },
        { id: 6, name: "BIGENDER" },
        { id: 7, name: "GENDER FLUID" },
        { id: 8, name: "GENDER NON CONFORMING" },
        { id: 9, name: "GENDER QUEER" },
        { id: 10, name: "GENDER QUESTIONING" },
        { id: 11, name: "INTERSEX" },
        { id: 12, name: "NON-BINARY" },
        { id: 13, name: "PANGENDER" },
        { id: 14, name: "TRANS HUMAN" },
        { id: 15, name: "TRANS MAN" },
        { id: 16, name: "TRANS WOMAN" },
        { id: 17, name: "TRANSFEMINIME" },
        { id: 18, name: "TRANSMASCULINE" },
        { id: 19, name: "TWO-SPIRIT" },
    ];

    const sexual = [
        { id: 1, name: "STRAIGHT" },
        { id: 2, name: "GAY" },
        { id: 3, name: "LESBIAN" },
        { id: 4, name: "BISEXUAL" },
        { id: 5, name: "ANDROGYNOUS" },
        { id: 6, name: "BIGENDER" },
        { id: 7, name: "BI-CURIOUS" },
        { id: 8, name: "PANSEXUAL" },
        { id: 9, name: "POLYSEXUAL" },
        { id: 10, name: "QUEER" },
        { id: 11, name: "ANDROGYNOBEXUAL" },
        { id: 12, name: "ASEXUAL" },
        { id: 13, name: "AUTOSEXUAL" },
        { id: 14, name: "DEMISEXUAL" },
        { id: 15, name: "GRAY A" },
        { id: 16, name: "GYNOSEXUAL" },
        { id: 17, name: "HETEROFLEXIBLE" },
        { id: 18, name: "HOMOFLEXIBLE" },
        { id: 19, name: "OBJECTUMSEXUAL" },
        { id: 20, name: "OMNISEXUAL" },
        { id: 21, name: "SKOLIOSEXUAL" },
    ];

    const show = [
        { id: 1, name: "MAN" },
        { id: 2, name: "WOMAN" },
        { id: 3, name: "MAN + WOMAN COUPLE" },
        { id: 4, name: "MAN + MAN COUPLE" },
        { id: 5, name: "WOMAN + WOMAN COUPLE" },
        { id: 6, name: "GENDER FLUID" },
        { id: 7, name: "GENDER NON CONFORMING" },
        { id: 8, name: "GENDER QUEER" },
        { id: 9, name: "AGENDER" },
        { id: 10, name: "ANDROGYNOUS" },
        { id: 11, name: "GENDER QUESTIONING" },
        { id: 12, name: "INTERSEX" },
        { id: 13, name: "NON-BINARY" },
        { id: 14, name: "PANGENDER" },
        { id: 15, name: "TRANS HUMAN" },
        { id: 16, name: "TRANS MAN" },
        { id: 17, name: "TRANS WOMAN" },
        { id: 18, name: "TRANSFEMINIME" },
        { id: 19, name: "TRANSMASCULINE" },
        { id: 20, name: "TWO-SPIRIT" },
    ];


    const mestate = [
        { id: 1, name: "SINGLE" },
        { id: 2, name: "MAN + WOMAN COUPLE" },
        { id: 3, name: "MAN + MAN COUPLE" },
        { id: 4, name: "WOMAN + WOMAN COUPLE" },
    ];


    const look = [
        { id: 1, name: "RELATIONSHIP" },
        { id: 2, name: "FRIENDSHIP" },
        { id: 3, name: "CASUAL" },
        { id: 4, name: "FWB" },
        { id: 5, name: "FUN" },
        { id: 6, name: "DATES" },
        { id: 7, name: "TEXTING" },
        { id: 8, name: "THREESOME" },
    ];


    const [selectedPeople, setSelectedPeople] = useState([]);
    const [selectedMe, setSelectedMe] = useState([]);
    const [selectedShow, setSelectedShow] = useState([]);
    const [selectedMyState, setSelectedMyState] = useState([]);
    const [selectedLook, setSelectedLook] = useState([]);

    const [query, setQuery] = useState("");
    const [sexQuery, setSexQuery] = useState("");
    const [showQuery, setShowQuery] = useState("");
    const [stateQuery, setStateQuery] = useState("");
    const [lookQuery, setLookQuery] = useState("");

    const mylook =
        lookQuery === ""
            ? look
            : look.filter((person) =>
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(lookQuery.toLowerCase().replace(/\s+/g, ""))
            );

    const mystate =
        stateQuery === ""
            ? mestate
            : mestate.filter((person) =>
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(stateQuery.toLowerCase().replace(/\s+/g, ""))
            );

    const myshow =
        showQuery === ""
            ? show
            : show.filter((person) =>
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(showQuery.toLowerCase().replace(/\s+/g, ""))
            );

    const my =
        query === ""
            ? me
            : me.filter((person) =>
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(query.toLowerCase().replace(/\s+/g, ""))
            );

    const mysexual =
        sexQuery === ""
            ? sexual
            : sexual.filter((person) =>
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes(sexQuery.toLowerCase().replace(/\s+/g, ""))
            );



    return (
        <div className="w-full h-full bg-cover flex bg-[#f1f1f1] justify-center min-h-screen pb-10">
            <div className="w-[300px] md:w-[600px] xl:w-[1100px] 2xl:w-[1750px] px-5 pt-[103px] mx-auto xl:pt-32 xl:flex gap-12">
                <div className="w-full xl:px-10 2xl:px-40 pb-10">
                    <div className="w-full lg:flex lg:justify-between items-center">
                        <div className="text-lg font-bold text-center lg:text-start xl:text-3xl">Edit Profile</div>
                        <div className="px-8 md:px-44 lg:px-0">
                            <button className="w-full bg-white xl:text-2xl text-pinkLight border-2 border-pinkLight rounded-xl py-2 mb-5 justify-center gap-4 items-center flex hover:bg-pinkLight hover:text-white">
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
                    <div className="xl:flex gap-20">
                        <div className="PhotoAddMore xl:w-1/2">
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={onChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
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
                                        <div className="w-[256px] h-[175px] lg:w-[512px] lg:h-[344px] justify-center mx-auto p-2 rounded-xl gap-2 grid grid-cols-3">
                                            <div className="absolute z-1 justify-center gap-2 grid grid-cols-3">
                                                {listItems}
                                            </div>
                                            {imageList.map((image, index) => (
                                                <div key={index} className="image-item">
                                                    <button className='absolute z-10 text-[#888888] border-[#888888] border-full border-2 mt-1 ml-2 lg:ml-11 p-1 text-sm lg:text-lg rounded-full  ' onClick={() => onImageRemove(index)}>
                                                        <AiOutlineDelete />
                                                    </button>

                                                    <img src={image['data_url']}
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
                                                </div >
                                            </div>
                                        }

                                        <div className="px-8 md:px-44 lg:px-20">
                                            <button className="w-full bg-white xl:text-2xl text-pinkLight border-2 border-pinkLight rounded-xl py-2 mt-32 lg:mt-48 justify-center gap-2 items-center flex hover:bg-pinkLight hover:text-white"
                                                onClick={() => setUploadModal(!uploadModal)}>
                                                <AiOutlinePlus />Add Media
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </ImageUploading>
                            <div className="w-full items-center">
                                <div className="text-lg font-bold text-center xl:text-2xl lg:py-8">Interest</div>
                                <div className="w-full mx-auto grid grid-cols-2 md:grid-cols-3 md:px-10 gap-4">
                                    <div className="w-full items-center flex justify-center gap-1 border-[#888888] border-[0.5px] text-[#888888] rounded-xl py-2 px-4">
                                        <div className="">
                                            Piano
                                        </div>
                                        <AiOutlineClose className="" />
                                    </div>
                                    <div className="w-full items-center flex justify-center gap-1 border-[#888888] border-[0.5px] text-[#888888] rounded-xl py-2 px-4">
                                        <div className="">
                                            Piano
                                        </div>
                                        <AiOutlineClose className="" />
                                    </div>
                                    <div className="w-full items-center flex justify-center gap-1 border-[#888888] border-[0.5px] text-[#888888] rounded-xl py-2 px-4">
                                        <div className="">
                                            Piano
                                        </div>
                                        <AiOutlineClose className="" />
                                    </div>
                                    <div className="w-full items-center flex justify-center gap-1 border-[#888888] border-[0.5px] text-[#888888] rounded-xl py-2 px-4">
                                        <div className="">
                                            Piano
                                        </div>
                                        <AiOutlineClose className="" />
                                    </div>
                                    <div className="w-full items-center flex justify-center gap-1 border-[#888888] border-[0.5px] text-[#888888] rounded-xl py-2 px-4">
                                        <div className="">
                                            Piano
                                        </div>
                                        <AiOutlineClose className="" />
                                    </div>
                                    <div className="w-full items-center text-4xl flex justify-center">
                                        <IoMdAddCircle className="text-pinkLight" />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="w-full xl:w-1/2">
                            <div className="mb-5">
                                <div className="text-lg xl:text-xl 2xl:text-3xl xl:text-start">
                                    <div className="mb-5 font-bold">About</div>
                                    <div className="text-sm md:text-base lg:text-lg 2xl:text-xl mb-20 leading-relaxed">
                                        <textarea
                                            className="border-[#dddddd] border-[0.5px] mx-auto bg-white rounded-xl w-full p-4 md:w-2/3 lg:w-full h-[200px] xl:h-[400px] placeholder:italic placeholder:text-slate-400 block  shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500/80 focus:ring-1 resize-none  shadow-cyan-500/50"
                                            type="text"
                                            name="discription"
                                            placeholder="Write something about yourself."
                                            rows={4}
                                            cols={40}
                                        >
                                        </textarea>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 md:justify-between gap-5">
                                    <div className="text-lg w-full 2xl:text-3xl text-start mx-auto">
                                        <div className="py-2 font-bold w-full">I am a</div>
                                        <Combobox value={selectedPeople} onChange={setSelectedPeople} multiple>
                                            <div className="relative mt-1 z-50">
                                                <div className="relative w-full cursor-default overflow-hidden text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm border-[0.5px] border-[#888888] bg-white rounded-xl 2xl:text-2xl py-2 px-3 text-[#888888] text-base ">
                                                    <Combobox.Input
                                                        className="w-full border-none py-1 pr-10 text-lg leading-5 text-[#888888] focus:ring-0"
                                                        displayValue={(people) =>
                                                            people.map((person) => person.name).join(", ")
                                                        }
                                                    />
                                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                        <BiChevronDown
                                                            className="w-6 h-6 lg:w-10 lg:h-10 text-pinkLight"
                                                            aria-hidden="true"
                                                        />
                                                    </Combobox.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                    afterLeave={() => setQuery("")}
                                                >
                                                    <Combobox.Options className="absolute h-full w-full rounded-md bg-white py-1  shadow-lg focus:outline-none text-sm md:text-base ">
                                                        {my.length === 0 && query !== "" ? (
                                                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                                Nothing found.
                                                            </div>
                                                        ) : (
                                                            my.map((person) => (
                                                                <Combobox.Option
                                                                    key={person.id}
                                                                    className={({ active }) =>
                                                                        `relative  cursor-default bg-white select-none pl-1 pr-4 ${active ? "hover:bg-pinkLight hover:text-white" : "text-[#888888]"
                                                                        } `
                                                                    }
                                                                    value={person}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <div className="flex items-center justify-between w-full px-2">
                                                                            <span
                                                                                className={`block truncate ${selected ? "font-medium" : "font-normal"
                                                                                    }`}
                                                                            >
                                                                                {person.name}
                                                                            </span>
                                                                            <Checkbox className="justify-end" />
                                                                        </div>
                                                                    )}
                                                                </Combobox.Option>
                                                            ))
                                                        )}
                                                    </Combobox.Options>
                                                </Transition>
                                            </div>
                                        </Combobox>
                                    </div>
                                    <div className="text-lg w-full 2xl:text-3xl text-start mx-auto">
                                        <div className="py-2 font-bold w-full">My sexual orientation</div>
                                        <Combobox value={selectedMe} onChange={setSelectedMe} multiple>
                                            <div className="relative mt-1 z-40">
                                                <div className="relative w-full cursor-default overflow-hidden text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm border-[0.5px] border-[#888888] bg-white rounded-xl 2xl:text-2xl py-2 px-3 text-[#888888] text-base ">
                                                    <Combobox.Input
                                                        className="w-full border-none py-1 pr-10 text-lg leading-5 text-[#888888] focus:ring-0"
                                                        displayValue={(people) =>
                                                            people.map((person) => person.name).join(", ")
                                                        }
                                                    />
                                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                        <BiChevronDown
                                                            className="w-6 h-6 lg:w-10 lg:h-10 text-pinkLight"
                                                            aria-hidden="true"
                                                        />
                                                    </Combobox.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                    afterLeave={() => setSexQuery("")}
                                                >
                                                    <Combobox.Options className="absolute h-full w-full rounded-md bg-white py-1  shadow-lg focus:outline-none text-sm md:text-base ">
                                                        {mysexual.length === 0 && sexQuery !== "" ? (
                                                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                                Nothing found.
                                                            </div>
                                                        ) : (
                                                            mysexual.map((person) => (
                                                                <Combobox.Option
                                                                    key={person.id}
                                                                    className={({ active }) =>
                                                                        `relative  cursor-default bg-white select-none pl-1 pr-4 ${active ? "hover:bg-pinkLight hover:text-white" : "text-[#888888]"
                                                                        } `
                                                                    }
                                                                    value={person}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <div className="flex items-center justify-between w-full px-2">
                                                                            <span
                                                                                className={`block truncate ${selected ? "font-medium" : "font-normal"
                                                                                    }`}
                                                                            >
                                                                                {person.name}
                                                                            </span>
                                                                            <Checkbox className="justify-end" />
                                                                        </div>
                                                                    )}
                                                                </Combobox.Option>
                                                            ))
                                                        )}
                                                    </Combobox.Options>
                                                </Transition>
                                            </div>
                                        </Combobox>
                                    </div>
                                    <div className="text-lg w-full 2xl:text-3xl text-start mx-auto">
                                        <div className="py-2 font-bold w-full">My status is</div>
                                        <Combobox value={selectedMyState} onChange={setSelectedMyState} multiple>
                                            <div className="relative mt-1 z-30">
                                                <div className="relative w-full cursor-default overflow-hidden text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm border-[0.5px] border-[#888888] bg-white rounded-xl 2xl:text-2xl py-2 px-3 text-[#888888] text-base ">
                                                    <Combobox.Input
                                                        className="w-full border-none py-1 pr-10 text-lg leading-5 text-[#888888] focus:ring-0"
                                                        displayValue={(people) =>
                                                            people.map((person) => person.name).join(", ")
                                                        }
                                                    />
                                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                        <BiChevronDown
                                                            className="w-6 h-6 lg:w-10 lg:h-10 text-pinkLight"
                                                            aria-hidden="true"
                                                        />
                                                    </Combobox.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                    afterLeave={() => setStateQuery("")}
                                                >
                                                    <Combobox.Options className="absolute h-full w-full rounded-md bg-white py-1  shadow-lg focus:outline-none text-sm md:text-base ">
                                                        {mystate.length === 0 && query !== "" ? (
                                                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                                Nothing found.
                                                            </div>
                                                        ) : (
                                                            mystate.map((person) => (
                                                                <Combobox.Option
                                                                    key={person.id}
                                                                    className={({ active }) =>
                                                                        `relative  cursor-default bg-white select-none pl-1 pr-4 ${active ? "hover:bg-pinkLight hover:text-white" : "text-[#888888]"
                                                                        } `
                                                                    }
                                                                    value={person}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <div className="flex items-center justify-between w-full px-2">
                                                                            <span
                                                                                className={`block truncate ${selected ? "font-medium" : "font-normal"
                                                                                    }`}
                                                                            >
                                                                                {person.name}
                                                                            </span>
                                                                            <Checkbox className="justify-end" />
                                                                        </div>
                                                                    )}
                                                                </Combobox.Option>
                                                            ))
                                                        )}
                                                    </Combobox.Options>
                                                </Transition>
                                            </div>
                                        </Combobox>
                                    </div>
                                    <div className="text-lg w-full 2xl:text-3xl text-start mx-auto">
                                        <div className="py-2 font-bold w-full">I am looking for</div>
                                        <Combobox value={selectedLook} onChange={setSelectedLook} multiple>
                                            <div className="relative mt-1 z-20">
                                                <div className="relative w-full cursor-default overflow-hidden text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm border-[0.5px] border-[#888888] bg-white rounded-xl 2xl:text-2xl py-2 px-3 text-[#888888] text-base ">
                                                    <Combobox.Input
                                                        className="w-full border-none py-1 pr-10 text-lg leading-5 text-[#888888] focus:ring-0"
                                                        displayValue={(people) =>
                                                            people.map((person) => person.name).join(", ")
                                                        }
                                                    />
                                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                        <BiChevronDown
                                                            className="w-6 h-6 lg:w-10 lg:h-10 text-pinkLight"
                                                            aria-hidden="true"
                                                        />
                                                    </Combobox.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                    afterLeave={() => setLookQuery("")}
                                                >
                                                    <Combobox.Options className="absolute h-full w-full rounded-md bg-white py-1  shadow-lg focus:outline-none text-sm md:text-base ">
                                                        {mylook.length === 0 && query !== "" ? (
                                                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                                Nothing found.
                                                            </div>
                                                        ) : (
                                                            mylook.map((person) => (
                                                                <Combobox.Option
                                                                    key={person.id}
                                                                    className={({ active }) =>
                                                                        `relative  cursor-default bg-white select-none pl-1 pr-4 ${active ? "hover:bg-pinkLight hover:text-white" : "text-[#888888]"
                                                                        } `
                                                                    }
                                                                    value={person}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <div className="flex items-center justify-between w-full px-2">
                                                                            <span
                                                                                className={`block truncate ${selected ? "font-medium" : "font-normal"
                                                                                    }`}
                                                                            >
                                                                                {person.name}
                                                                            </span>
                                                                            <Checkbox className="justify-end" />
                                                                        </div>
                                                                    )}
                                                                </Combobox.Option>
                                                            ))
                                                        )}
                                                    </Combobox.Options>
                                                </Transition>
                                            </div>
                                        </Combobox>
                                    </div>
                                    <div className="text-lg w-full 2xl:text-3xl text-start mx-auto">
                                        <div className="py-2 font-bold w-full">Show me</div>
                                        <Combobox value={selectedShow} onChange={setSelectedShow} multiple>
                                            <div className="relative mt-1 z-10">
                                                <div className="relative w-full cursor-default overflow-hidden text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm border-[0.5px] border-[#888888] bg-white rounded-xl 2xl:text-2xl py-2 px-3 text-[#888888] text-base ">
                                                    <Combobox.Input
                                                        className="w-full border-none py-1 pr-10 text-lg leading-5 text-[#888888] focus:ring-0"
                                                        displayValue={(people) =>
                                                            people.map((person) => person.name).join(", ")
                                                        }
                                                    />
                                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                        <BiChevronDown
                                                            className="w-6 h-6 lg:w-10 lg:h-10 text-pinkLight"
                                                            aria-hidden="true"
                                                        />
                                                    </Combobox.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    leave="transition ease-in duration-100"
                                                    leaveFrom="opacity-100"
                                                    leaveTo="opacity-0"
                                                    afterLeave={() => setShowQuery("")}
                                                >
                                                    <Combobox.Options className="absolute h-full w-full rounded-md bg-white py-1  shadow-lg focus:outline-none text-sm md:text-base ">
                                                        {myshow.length === 0 && query !== "" ? (
                                                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                                Nothing found.
                                                            </div>
                                                        ) : (
                                                            myshow.map((person) => (
                                                                <Combobox.Option
                                                                    key={person.id}
                                                                    className={({ active }) =>
                                                                        `relative  cursor-default bg-white select-none pl-1 pr-4 ${active ? "hover:bg-pinkLight hover:text-white" : "text-[#888888]"
                                                                        } `
                                                                    }
                                                                    value={person}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <div className="flex items-center justify-between w-full px-2">
                                                                            <span
                                                                                className={`block truncate ${selected ? "font-medium" : "font-normal"
                                                                                    }`}
                                                                            >
                                                                                {person.name}
                                                                            </span>
                                                                            <Checkbox className="justify-end" />
                                                                        </div>
                                                                    )}
                                                                </Combobox.Option>
                                                            ))
                                                        )}
                                                    </Combobox.Options>
                                                </Transition>
                                            </div>
                                        </Combobox>
                                    </div>
                                </div>
                            </div>
                            <div className=""></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}