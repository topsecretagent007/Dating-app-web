import React, { useState, Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Combobox, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi"
import Logo from "../../assets/Logo1.svg";
import { Checkbox } from "@material-tailwind/react";



export default function ProfileData() {
    const [name, setName] = useState();
    const [brithday, setBrithday] = useState();

    const [selectedOptions, setSelectedOptions] = useState(null);

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
        <div className="bg-[#FFFBFE] bg-cover rounded-xl w-full h-full min-h-screen flex">
            <div className="pt-20 pl-[8%]">
                <Link to='/profile/friendship' className="">
                    <FiArrowLeft className="text-pinkLight text-4xl my-3" />
                </Link>
            </div>
            <div className="w-full">
                <div className="w-full px-10 pt-20 pb-10 items-center">
                    <img src={Logo} alt="Logo" className="mx-auto" />
                </div>
                <div className="py-18 text-3xl text-start mb-20">
                    <div className="w-full md:grid-cols-2 grid md:justify-between md:gap-20 lg:grid-cols-3">
                        <div className="text-lg xl:text-xl w-full 2xl:text-3xl text-start mx-auto">
                            <div className="py-2 font-bold w-full">User Name</div>
                            <input className="border-2 border-black bg-white rounded-xl w-full 2xl:text-2xl py-2 px-3 text-black text-base" placeholder="Your Name" />
                        </div>
                        <div className="text-lg xl:text-xl w-full 2xl:text-3xl text-start mx-auto">
                            <div className="py-2 font-bold w-full">Brithday</div>
                            <input type="date" className="border-2 border-black bg-white rounded-xl w-full 2xl:text-2xl py-2 px-3 text-black text-base" />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:justify-between md:gap-20 lg:grid-cols-3">
                        <div className="text-lg xl:text-xl w-full 2xl:text-3xl text-start mx-auto">
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
                                        <Combobox.Options className="absolute mt-1 h-full w-full rounded-md bg-white py-1  shadow-lg focus:outline-none text-sm md:text-base xl:text-lg">
                                            {my.length === 0 && query !== "" ? (
                                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                    Nothing found.
                                                </div>
                                            ) : (
                                                my.map((person) => (
                                                    <Combobox.Option
                                                        key={person.id}
                                                        className={({ active }) =>
                                                            `relative  cursor-default bg-white select-none py-2 pl-1 pr-4 ${active ? "hover:bg-pinkLight hover:text-white" : "text-[#888888]"
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
                        <div className="text-lg xl:text-xl w-full 2xl:text-3xl text-start mx-auto">
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
                                        <Combobox.Options className="absolute mt-1 h-full w-full rounded-md bg-white py-1  shadow-lg focus:outline-none text-sm md:text-base xl:text-lg">
                                            {mysexual.length === 0 && sexQuery !== "" ? (
                                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                    Nothing found.
                                                </div>
                                            ) : (
                                                mysexual.map((person) => (
                                                    <Combobox.Option
                                                        key={person.id}
                                                        className={({ active }) =>
                                                            `relative  cursor-default bg-white select-none py-2 pl-1 pr-4 ${active ? "hover:bg-pinkLight hover:text-white" : "text-[#888888]"
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
                        <div className="text-lg xl:text-xl w-full 2xl:text-3xl text-start mx-auto">
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
                                        <Combobox.Options className="absolute mt-1 h-full w-full rounded-md bg-white py-1  shadow-lg focus:outline-none text-sm md:text-base xl:text-lg">
                                            {mystate.length === 0 && query !== "" ? (
                                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                    Nothing found.
                                                </div>
                                            ) : (
                                                mystate.map((person) => (
                                                    <Combobox.Option
                                                        key={person.id}
                                                        className={({ active }) =>
                                                            `relative  cursor-default bg-white select-none py-2 pl-1 pr-4 ${active ? "hover:bg-pinkLight hover:text-white" : "text-[#888888]"
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
                        <div className="text-lg xl:text-xl w-full 2xl:text-3xl text-start mx-auto">
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
                                        <Combobox.Options className="absolute mt-1 h-full w-full rounded-md bg-white py-1  shadow-lg focus:outline-none text-sm md:text-base xl:text-lg">
                                            {mylook.length === 0 && query !== "" ? (
                                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                    Nothing found.
                                                </div>
                                            ) : (
                                                mylook.map((person) => (
                                                    <Combobox.Option
                                                        key={person.id}
                                                        className={({ active }) =>
                                                            `relative  cursor-default bg-white select-none py-2 pl-1 pr-4 ${active ? "hover:bg-pinkLight hover:text-white" : "text-[#888888]"
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
                        <div className="text-lg xl:text-xl w-full 2xl:text-3xl text-start mx-auto">
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
                                        <Combobox.Options className="absolute mt-1 h-full w-full rounded-md bg-white py-1  shadow-lg focus:outline-none text-sm md:text-base xl:text-lg">
                                            {myshow.length === 0 && query !== "" ? (
                                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                    Nothing found.
                                                </div>
                                            ) : (
                                                myshow.map((person) => (
                                                    <Combobox.Option
                                                        key={person.id}
                                                        className={({ active }) =>
                                                            `relative  cursor-default bg-white select-none py-2 pl-1 pr-4 ${active ? "hover:bg-pinkLight hover:text-white" : "text-[#888888]"
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
                <Link to="/profile/location" className="bg-pinkLight justify-center xl:text-2xl text-white rounded-xl py-2 px-8 xl:py-4 xl:px-32">Got it</Link>
            </div>
            <div className="pt-20 pl-20">
            </div>
        </div>
    )
}