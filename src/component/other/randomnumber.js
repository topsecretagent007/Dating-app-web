import React, { useState } from 'react';
import { useEffect } from 'react';

function RandomNumber({ generate }) {
    const [number, setNumber] = useState(null);

    useEffect(() => {
        const min = 10000;
        const max = 99999;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        setNumber(randomNumber);
        generate(randomNumber)
    }, [])

    return (
        <div className="text-sm lg:text-lg xl:text-xl 2xl:text-2xl py-3">
            Your verification code
            <br />
            <div className="font-bold">
                {number}
            </div>
        </div>
    );
}

export default RandomNumber;