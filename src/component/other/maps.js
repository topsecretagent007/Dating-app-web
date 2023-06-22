import React from "react";

export default function googleMap() {

    return (
        <div className="relative w-full h-72">
            <iframe className="absolute top-0 left-0 w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12080.73732861526!2d-74.0059418!3d40.7127847!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMDA2JzEwLjAiTiA3NMKwMjUnMzcuNyJX!5e0!3m2!1sen!2sus!4v1648482801994!5m2!1sen!2sus"
                 style={{border: "0"}}>
            </iframe>
        </div>
    )
}