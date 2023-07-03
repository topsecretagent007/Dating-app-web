import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function DropDown({ text, value, items, onHandleChange, multiple = false }) {
    const [data, setData] = useState([]);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setData(typeof value === 'string' ? value.split(',') : value);
        onHandleChange(typeof value === 'string' ? value.split(',') : value)
    };

    useEffect(() => {
        setData(value)
    }, [value])

    return (
        <div>
            <div className="text-lg xl:text-xl w-full 2xl:text-3xl text-start ">
                <FormControl variant="standard" className='w-full' sx={{ my: 2 }}>
                    <div className='absolute z-50 left-1 md:left-5 text-base '>{text}</div>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple={multiple}
                        value={data}
                        onChange={(event) => handleChange(event)}
                        className='pl-[30%] max-w-2xl text-end'
                        renderValue={(selected) => {
                            return multiple === true ? selected.join(", ") : items.find((value) => value === selected);
                        }}
                        MenuProps={MenuProps}
                    >

                        {items.map((item) => (
                            <MenuItem key={item} value={item}>
                                {multiple && <Checkbox checked={data.includes(item)} />}
                                {!multiple && <Checkbox checked={data === item} />}
                                <ListItemText primary={item} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}