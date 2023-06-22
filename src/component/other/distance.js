import React, { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Slider } from "@material-tailwind/react";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

export default function DistanceSlider({ distance, miles, onMiles, onDistance }) {
    const [unit, setUnit] = useState(miles);
    const [length, setLength] = useState(distance);
    const [valueLength, setValueLangth] = useState();

    const selectLength = (e) => {
        e.preventDefault();
        const totalLength = (e.target.value);
        if (unit === false) {
            setLength(parseInt(totalLength * 4));
            onDistance(parseInt(totalLength * 4));
        } else {
            setLength(parseInt(totalLength * 2.48));
            onDistance(parseInt(totalLength * 2.48));
        }
    };
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
        onMiles(unit);
        if (unit === false) {
            setLength(parseInt(length * 4 / 2.48));
            onDistance(parseInt(length * 4 / 2.48));
        } else {
            setLength(parseInt(length * 2.48 / 4));
            onDistance(parseInt(length * 2.48 / 4));
        }
    }, [unit]);

    useEffect(() => {
        const distanceValue = () => {
            if (unit) {
                setValueLangth(distance / 2.48)
            } else {
                setValueLangth(distance / 4)
            }
        }
        if (distance && miles) {
            distanceValue();
        }
    }, []);

    useEffect(() => {
        if (miles == true && distance > 248) {
            setLength(248);
        } else if (miles == false && distance > 400) {
            setLength(400);
        } else {
            setLength(distance);
        }
    }, [distance])

    return (
        <div className="p-3">
            <div className="justify-start">{length}{unit ? "Mile" : "Km"}</div>
            <Slider size="sm" defaultValue={valueLength} onChange={(e) => selectLength(e)} />
            <div className="justify-start flex gap-4 items-center mt-5">
                <div>Miles</div>
                <div className="relative inline-flex items-center cursor-pointer">
                    <FormControlLabel
                        control={<IOSSwitch sx={{ m: 1 }} defaultChecked checked={unit} onClick={() => { setUnit(!unit) }}
                        />}
                    />
                </div>
            </div>
        </div>
    );
}