import React, { useEffect, useState } from 'react';
import { IoMdAddCircle, IoMdCloseCircle } from "react-icons/io";

export default function AddInterested({ data, onAddInterest, onRemoveInterest }) {
    const chipStyle = 'w-full items-center flex justify-center text-[#888888] rounded-xl truncate';
    const innerStyle = "w-28 text-white rounded-l-xl py-2 px-3 bg-pinkLight  ";
    const buttonStyle = "bg-pinkLight text-white rounded-r-xl py-2 px-3";
    const [interests, setInterests] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [value, setValue] = useState('');
    const handleAddInterest = () => {
        if (value === "" || value === undefined) return;
        onAddInterest(value);
        setInputVisible(false);
        setValue("")
    }
    const handleRemoveInterest = (target) => {
        onRemoveInterest(target);
    }

    function handleButtonClick() {
        if (inputVisible === true) setInputVisible(false);
        else setInputVisible(true);
    }
    function handleInputChange(event) {
        setValue(event.target.value);
    }

    useEffect(() => {
        if (data) setInterests(data)
    }, [data])

    return (
        <>
            <div id="character-button" className="w-full mx-auto grid grid-cols-2 md:grid-cols-3 md:px-10 gap-4">
                {interests.map((item, index) => <div key={index} className={chipStyle}>
                    <div className={innerStyle}>
                        {item}
                    </div>
                    <button className={buttonStyle} onClick={() => handleRemoveInterest(item)}>X</button>
                </div>)}
            </div>
            <div className='flex px-10 py-4'>
                {inputVisible && (
                    <div className='items-center flex '>
                        <input type="text" className='w-full py-2 px-3 border-pinkLight border-2 rounded-l-xl' onChange={handleInputChange} />
                        <button onClick={() => handleAddInterest()} className='py-2 px-1 text-white border-pinkLight border-2 rounded-r-xl bg-pinkLight'>Add</button>
                    </div>
                )}
                <button onClick={() => handleButtonClick()} className='items-center text-3xl ml-12 py-2'>
                    {
                        inputVisible ?
                            <IoMdCloseCircle className="text-pinkLight" />
                            :
                            <IoMdAddCircle className="text-pinkLight" />
                    }
                </button>
            </div>
        </>
    );
}

