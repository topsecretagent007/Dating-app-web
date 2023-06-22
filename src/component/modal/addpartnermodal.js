import React from "react";
import Users from "../users/partnerUser";

export default function AddPartnerModal() {

    return (
        <div className="p-3 rounded-xl border-2 border-pinkLight">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                    type="search"
                    className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out 
                        "
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon1" />
                {/* <!--Search button--> */}
                <button
                    className="relative z-[2] flex items-center rounded-r bg-pinkLight px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md "
                    type="button"
                    id="button-addon1"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        />
                    </svg>
                </button>
            </div>
            <Users />
            <Users />

        </div>
    )
}