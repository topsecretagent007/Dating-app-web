import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import ModelLogo from "../../assets/Modal-Logo.png"
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { doc, updateDoc } from "firebase/firestore";
import LoadingModal from "../../component/loadingPage";
import { db } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";

export default function NotificationModal({ mNtificationSetting, cNtificationSetting, lNtificationSetting, closeModal }) {
    const { user } = UserAuth();
    const [loading, setLoading] = useState(false);
    const [matches, setMatches] = useState(mNtificationSetting);
    const [like, setLike] = useState(lNtificationSetting);
    const [alert, setAlert] = useState(cNtificationSetting);

    const saveNotification = async () => {
        setLoading(true);
        await updateDoc(doc(db, "Users", user.uid), {
            matchesNotification: matches,
            likesNotification: like,
            chatNotification: alert
        });
        setLoading(false);
        closeModal();
    }


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

    return (
        <>
            <h2 className="w-16 lg:w-24 absolute justify-center flex top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img src={ModelLogo} alt="ModelLogo" />
            </h2>
            <p className="text-lg lg:text-xl xl:text-3xl font-bold my-3 text-pinkLight">Notificatiom Setting</p>

            <div className="w-full md:w-[360px] mx-auto px-10 py-16">
                <div className="w-full grid py-2 grid-cols-2">
                    <div className="text-xl text-pinkLight text-start">Matches</div>
                    <div className="text-end">
                        <FormControlLabel
                            control={<IOSSwitch defaultChecked checked={matches} onClick={() => { setMatches(!matches) }}
                            />}
                        />
                    </div>
                </div>
                <div className="w-full grid py-2 grid-cols-2">
                    <div className="text-xl text-pinkLight text-start">Like</div>
                    <div className="text-end">
                        <FormControlLabel
                            control={<IOSSwitch defaultChecked checked={like} onClick={() => { setLike(!like) }}
                            />}
                        />
                    </div>
                </div>
                <div className="w-full grid py-2 grid-cols-2 ">
                    <div className="text-xl text-pinkLight text-start">Alert</div>
                    <div className="text-end">
                        <FormControlLabel
                            control={<IOSSwitch defaultChecked checked={alert} onClick={() => { setAlert(!alert) }}
                            />}
                        />
                    </div>
                </div>
            </div>

            <div className="w-full">
                <button onClick={() => saveNotification()} className="w-5/6 xl:w-2/3 px-6 py-3 text-pinkLight border-2 border-pinkLight hover:bg-pinkLight rounded-xl  mx-auto flex justify-center items-center my-3 hover:text-white gap-1">
                    <div className="text-sm xl:text-lg font-bold">Save</div>
                </button>
            </div>

            {
                loading &&
                <LoadingModal />
            }
        </>
    )
}