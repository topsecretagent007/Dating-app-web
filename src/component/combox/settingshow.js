import * as React from 'react';
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


export default function MultipleSelectCheckmarks() {

    const names = [
        "MAN",
        "WOMAN",
        "MAN + WOMAN COUPLE",
        "MAN + MAN COUPLE",
        "WOMAN + WOMAN COUPLE",
        "GENDER FLUID",
        "GENDER NON CONFORMING",
        "GENDER QUEER",
        "AGENDER",
        "ANDROGYNOUS",
        "GENDER QUESTIONING",
        "INTERSEX",
        "NON-BINARY",
        "PANGENDER",
        "TRANS HUMAN",
        "TRANS MAN",
        "TRANS WOMAN",
        "TRANSFEMINIME",
        "TRANSMASCULINE",
        "TWO-SPIRIT",
    ];

    const [showMe, setShowMe] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setShowMe(
            // On autofill we get a stringified value..substring(0, 8)
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <div className="text-lg xl:text-xl w-full 2xl:text-3xl text-start ">
                <FormControl variant="standard" className='w-full' sx={{ my: 2 }}>
                    <div className='absolute z-50 left-5 text-lg '>show me</div>

                    <Select
                        label="Age"
                        multiple
                        value={showMe}
                        onChange={(event) => handleChange(event)}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        className='pl-[40%] bg-white pb-3 text-[#888888] max-w-2xl'
                    >
                        {names.map((name) => (
                            <MenuItem key={name} value={name}  >
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