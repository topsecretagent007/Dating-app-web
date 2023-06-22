import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const ITEM_HEIGHT = 35;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
            width: 100,
        },
    },
};

export default function DistanceSlider({ frist, last, onFristAge, onLastAge }) {
    const [listAge, setListAge] = useState([]);
    const [fristAge, setFristAge] = useState(frist);
    const [lastAge, setLastAge] = useState(last);



    const fristAgeSelect = listAge.map((listAge, index) => (
        <MenuItem key={listAge} value={listAge} className="text-pinkLight ageSelect">
            <em className="ml-auto text-pinkLight font-bold">{listAge}</em>
        </MenuItem>
    ))

    const fristAgeChange = (event) => {
        if (event.target.value > lastAge) {
            setFristAge(lastAge - 1);
            onFristAge(lastAge - 1);
        } else {
            setFristAge(event.target.value);
            onFristAge(event.target.value);
        }

    };

    const lastAgeChange = (event) => {
        if (event.target.value < fristAge) {
            setLastAge(fristAge + 1);
            onLastAge(fristAge + 1);

        } else {
            setLastAge(event.target.value);
            onLastAge(event.target.value);
        }

    }


    useEffect(() => {
        const allAge = [];
        for (let i = 18; i <= 99; i++) {
            allAge.push(i);
        }
        setListAge(allAge);
    }, []);

    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: 36,
        height: 20,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#E50AAC',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#E50AAC',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 16,
            height: 16,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));

    useEffect(() => {
        setFristAge(frist);
        setLastAge(last);
    }, [frist, last])

    return (
        <div className="justify-start grid md:grid-cols-2 gap-4 items-center py-3">
            <div className="text-sm flex items-center">
                <div className="text-start py-2 absolute z-10 pl-4 font-semibold">
                    From
                </div>
                <FormControl sx={{ m: 1, minWidth: 120 }} className="bg-white text-end" >
                    <Select
                        value={fristAge}
                        onChange={(e) => fristAgeChange(e)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        MenuProps={MenuProps}
                        className="outline-none"
                    >
                        {fristAgeSelect}
                    </Select>
                </FormControl>
            </div>
            <div className="text-sm flex items-center">
                <div className="text-start py-2 absolute z-10 pl-4 font-semibold">
                    To
                </div>
                <FormControl sx={{ m: 1, minWidth: 120, }} className="bg-white text-end" >
                    <Select
                        value={lastAge}
                        onChange={(e) => lastAgeChange(e)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        MenuProps={MenuProps}
                        className="outline-none"
                    >
                        {fristAgeSelect}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}