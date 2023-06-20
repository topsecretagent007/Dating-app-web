import React, { useContext, useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import UserContext from '../../context/userContext';

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
const names = [
    "STRAIGHT",
    "GAY",
    "LESBIAN",
    "BISEXUAL",
    "ANDROGYNOUS",
    "BIGENDER",
    "BI-CURIOUS",
    "PANSEXUAL",
    "POLYSEXUAL",
    "QUEER",
    "ANDROGYNOBEXUAL",
    "ASEXUAL",
    "AUTOSEXUAL",
    "DEMISEXUAL",
    "GRAY A",
    "GYNOSEXUAL",
    "HETEROFLEXIBLE",
    "HOMOFLEXIBLE",
    "OBJECTUMSEXUAL",
    "OMNISEXUAL",
    "SKOLIOSEXUAL",
];

export default function MultipleSelectCheckmarks() {
    const [showMe, setShowMe] = useState("");
    const { userSexual, setUserSexual } = useContext(UserContext);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setShowMe(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        setUserSexual(showMe);
    }, [showMe]);

    return (
        <div>
            <div className="text-lg w-full 2xl:text-2xl text-start mx-auto">
                <div className="py-2 font-bold w-full">My sexual orientation</div>
                <FormControl className='w-full' sx={{ m: 1, }}>
                    <InputLabel id="demo-multiple-checkbox-label">Please Select</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        value={showMe}
                        onChange={(event) => handleChange(event)}
                        input={<OutlinedInput label="Please Select" />}
                        renderValue={(selected) => selected.join()}
                        MenuProps={MenuProps}
                    >
                        {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={showMe.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}