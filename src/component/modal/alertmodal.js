import React from "react";
import ModelLogo from "../../assets/Modal-Logo.png"


export default function ContactModal({ text }) {

    return (
        <>
            <h2 className="w-16 lg:w-24 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src={ModelLogo} alt="ModelLogo" />
            </h2>
            <span className="text-sm xl:text-lg 2xl:text-xl lg:leading-relaxed">
                {text}
            </span>
        </>
    )
}