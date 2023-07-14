import React from "react";

export default function GoogleMap({lat, long}) {

    return (
        <div className="relative w-full h-72">
            <iframe
                className="absolute top-0 left-0"
                style={{
                    width: "100%",
                    height: "100%",
                    border: "0",
                }}
                src={`https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`}
                allowFullScreen
            ></iframe>
        </div>
    );
}
