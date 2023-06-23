import React, { useEffect, useState } from 'react';
import { IoMdAddCircle } from "react-icons/io";

export default function AddInterested( {data, onAddInterest, onRemoveInterest }) {
    const chipStyle = 'w-full items-center flex justify-center text-[#888888] rounded-xl';
    const innerStyle = "w-28 text-white rounded-l-xl py-1 px-2 bg-pinkLight";
    const buttonStyle = "bg-pinkLight text-white rounded-r-xl py-1 px-2";
    const [interests, setInterests] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [value, setValue] = useState('');
    const handleAddInterest = () => {
        if(value=="" || value==undefined) return;
        onAddInterest(value);
        setInputVisible(false);
        setValue("")
    }
    const handleRemoveInterest = (target) => {
        onRemoveInterest(target);
    }

    function handleButtonClick() {
        setInputVisible(true);
    }
    function handleInputChange(event) {
        setValue(event.target.value);
    }

    useEffect(() => {
        if(data) setInterests(data)
    }, [data])

    return (
        <>
            <div id="character-button" className="w-full mx-auto grid grid-cols-2 md:grid-cols-3 md:px-10 gap-4">
                {inputVisible && (
                    <div className='items-center flex '>
                        <input type="text" className='w-full py-1 px-3 border-pinkLight border-2 rounded-l-xl' onChange={handleInputChange} />
                        <button onClick={() => handleAddInterest()} className='py-1 px-2  border-pinkLight border-2 rounded-r-xl bg-pinkLight'>Add</button>
                    </div>
                )}
                <button onClick={() => handleButtonClick()} className='items-center text-3xl mx-auto'>
                    <IoMdAddCircle className="text-pinkLight" />
                </button>
                {interests.map((item, index)=> <div key={index} className={chipStyle}>
                    <div className={innerStyle}>
                        {item}
                    </div>
                    <button className={buttonStyle} onClick={()=> handleRemoveInterest(item)}>X</button>
                </div>)}
            </div>
        </>
    );
}

