import './App.css';
import { BrowserRouter as Router, Routes, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import React, { useState, useEffect } from 'react';

import UserContext from './context/userContext';
import { AuthContextProvider, UserAuth } from "./context/AuthContext"
import Home from "./pages/home";
import FindPage from './pages/find';
import ProfileSetting from './pages/profile';
import Notification from './pages/notification';
import Message from './pages/messagepage';
import Setting from './pages/settings';
import Tutorial from './pages/tutorial';
import EditProfile from './pages/editProfile';
import Verify from './pages/verify';
import ProfilePreview from './pages/profilepreview';
import LikedUserProfile from './pages/likedUserProfile';

import WelcomePage from "./pages/login/welcomePage";
import PhoneNumberPage from "./pages/login/phoneNumberPage";
import Age from "./pages/profile/age";
import FriendShip from "./pages/profile/friendship";
import ProfileData from "./pages/profile/profileData";
import Location from "./pages/profile/location";
import PhotoUpload from "./pages/profile/photoupload";
import PhotoAddMore from "./pages/profile/photoAddMore";
import Description from "./pages/profile/description";
import Protected from './component/Protected';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home /></Protected>
  },
  {
    path: "/login",
    element: <WelcomePage />
  },
  {
    path: "/login/phoneinput",
    element: <PhoneNumberPage />
  },
  {
    path: "/profile/age",
    element: <Protected><Age /></Protected>
  },
  {
    path: "/profile/friendship",
    element: <Protected><FriendShip /></Protected>
  },
  {
    path: "/profile/profiledata",
    element: <Protected><ProfileData /></Protected>
  },
  {
    path: "/profile/location",
    element: <Protected><Location /></Protected>
  },
  {
    path: "/profile/photoupload",
    element: <Protected><PhotoUpload /></Protected>
  },
  {
    path: "/profile/photoaddmore",
    element: <Protected><PhotoAddMore /></Protected>
  },
  {
    path: "/profile/description",
    element: <Protected><Description /></Protected>
  },
  {
    path: "/find",
    element: <Protected><FindPage /></Protected>
  },
  {
    path: "/notification",
    element: <Protected><Notification /></Protected>
  },  
  {
    path: "/message",
    element: <Protected><Message /></Protected>
  },
  {
    path: "/message/:id",
    element: <Protected><Message /></Protected>
  },
  {
    path: "/profile",
    element: <Protected><ProfileSetting /></Protected>
  },
  {
    path: "/settings",
    element: <Protected><Setting /></Protected>
  },
  {
    path: "/tutorial",
    element: <Protected><Tutorial /></Protected>
  },
  {
    path: "/editprofile",
    element: <Protected><EditProfile /></Protected>,
  },
  {
    path: "/verifyprofile",
    element: <Protected><Verify /></Protected>,
  },
  {
    path: "/profilepreview",
    element: <Protected><ProfilePreview /></Protected>,
  },
  {
    path: "/likedUsers/:id",
    element: <Protected><LikedUserProfile /></Protected>,
  },
])

function App() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userAvatar, setUserAvatar] = useState([]);
  const [userName, setUserName] = useState("");
  const [userfirstAge, setUserFirstAge] = useState(18);
  const [userLastAge, setUserLastAge] = useState(99);
  const [userShowGender, setUserShowGender] = useState([]);



  return (
    <AuthContextProvider>
      <UserContext.Provider value={{ phoneNumber, setPhoneNumber, userAvatar, setUserAvatar, userName, setUserName, userfirstAge, setUserFirstAge, userLastAge, setUserLastAge, userShowGender, setUserShowGender }}>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </UserContext.Provider>
    </AuthContextProvider>
  );
}

export default App;
