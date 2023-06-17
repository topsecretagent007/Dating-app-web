import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';

import UserContext from './context/userContext';
import Landing from "./pages/landing";
import FindPage from './pages/find';
import ProfileSetting from './pages/profile';
import Notification from './pages/notification';
import Message from './pages/messagepage';
import Setting from './pages/settings';
import Tutorial from './pages/tutorial';
import EditProfile from './pages/editProfile';
import Verify from './pages/verify';


import Login from "./pages/login";

import WelcomePage from "./component/login/welcomePage";
import PhoneNumberPage from "./component/login/phoneNumberPage";
import EnterCode from "./component/login/enterCode";
import Age from "./component/profile/age";
import FriendShip from "./component/profile/friendship";
import ProfileData from "./component/profile/profileData";
import Location from "./component/profile/location";
import PhotoUpload from "./component/profile/photoupload";
import PhotoAddMore from "./component/profile/photoAddMore";
import Description from "./component/profile/description";



function App() {
  const [phoneNumber, setPhoneNumber] = useState();

  return (
    <UserContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      <div className="App">
        <Router >
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/login" element={<WelcomePage />} />
            <Route exact path="/login/phoneinput" element={<PhoneNumberPage />} />
            <Route exact path="/login/enter" element={<EnterCode />} />

            <Route exact path="/profile/age" element={<Age />} />
            <Route exact path="/profile/friendship" element={<FriendShip />} />
            <Route exact path="/profile/profiledata" element={<ProfileData />} />
            <Route exact path="/profile/location" element={<Location />} />
            <Route exact path="/profile/photoupload" element={<PhotoUpload />} />
            <Route exact path="/profile/photoaddmore" element={<PhotoAddMore />} />
            <Route exact path="/profile/description" element={<Description />} />

            <Route exact path="/find" element={<FindPage />} />

            <Route exact path="/notification" element={<Notification />} />

            <Route exact path="/message" element={<Message />} />

            <Route exact path="/profile" element={<ProfileSetting />} />

            <Route exact path="/settings" element={<Setting />} />
            <Route exact path="/tutorial" element={<Tutorial />} />
            <Route exact path="/editprofile" element={<EditProfile />} />

            <Route exact path="/verifyprofile" element={<Verify />} />


          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
