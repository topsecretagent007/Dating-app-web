import React, { useState } from 'react';
import { IoMdAddCircle } from "react-icons/io";

export default function AddInterested() {
    const [inputVisible, setInputVisible] = useState(false);
    const [value, setValue] = useState('');

    function handleInputChange(event) {
        setValue(event.target.value);
    }

    function handleOkClick() {
        setInputVisible(false);

        // Add the value to the right of the button
        const button = document.getElementById('character-button');
        const div = document.createElement("div");
        div.className = "w-full items-center flex justify-center text-[#888888] rounded-xl";

        const innerDiv = document.createElement("div");
        innerDiv.className = "w-28 text-white rounded-l-xl py-1 px-2 bg-pinkLight";
        innerDiv.innerText = (value.length > 10 ? value.substring(0, 8) + '...' : value);

        const deleteButton = document.createElement("button");
        deleteButton.className = "bg-pinkLight text-white rounded-r-xl py-1 px-2";
        deleteButton.innerText = "X";
        deleteButton.onclick = () => {
            div.remove();
        };

        div.appendChild(innerDiv);
        div.appendChild(deleteButton);
        button.appendChild(div);
    }

    function handleButtonClick() {
        setInputVisible(true);
    }

    return (
        <>
            <div id="character-button" className="w-full mx-auto grid grid-cols-2 md:grid-cols-3 md:px-10 gap-4">
                {inputVisible && (
                    <div className='items-center flex'>
                        <input type="text" className='w-full py-1 px-3 rounded-l-xl' onChange={handleInputChange} />
                        <button onClick={() => handleOkClick()} className='py-1 px-2 rounded-r-xl bg-pinkLight'>Add</button>
                    </div>
                )}
                <button onClick={() => handleButtonClick()} className='items-center text-3xl mx-auto'>
                    <IoMdAddCircle className="text-pinkLight" />
                </button>
            </div>
        </>
    );
}

