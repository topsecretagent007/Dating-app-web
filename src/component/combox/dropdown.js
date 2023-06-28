import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
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
            <div className="text-lg w-full text-start mx-auto">
                <div className="pt-4 pb-6 font-bold w-full text-[#5A5A5A] text-xl xl:text-2xl">{text}</div>
                <FormControl className='w-full max-w-xs' sx={{ m: 1, }}>
                    <InputLabel id="demo-multiple-checkbox-label">Please Select</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple={multiple}
                        value={data}
                        onChange={(event) => handleChange(event)}
                        input={<OutlinedInput label="Please Select" />}
                        renderValue={(selected) => {
                            return multiple == true ? selected.join(", ") : items.find((value) => value == selected);
                        }}
                        MenuProps={MenuProps}
                    >

                        {items.map((item) => (
                            <MenuItem key={item} value={item}>
                                {multiple && <Checkbox checked={data.includes(item)} />}
                                {!multiple && <Checkbox checked={data == item} />}
                                <ListItemText primary={item} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}