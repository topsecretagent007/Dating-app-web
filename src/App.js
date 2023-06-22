import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

import WelcomePage from "./pages/login/welcomePage";
import PhoneNumberPage from "./pages/login/phoneNumberPage";
import EnterCode from "./pages/login/enterCode";
import Age from "./pages/profile/age";
import FriendShip from "./pages/profile/friendship";
import ProfileData from "./pages/profile/profileData";
import Location from "./pages/profile/location";
import PhotoUpload from "./pages/profile/photoupload";
import PhotoAddMore from "./pages/profile/photoAddMore";
import Description from "./pages/profile/description";
import Protected from './component/Protected';

function App() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [userAvatar, setUserAvatar] = useState();

  return (
    <AuthContextProvider>
      <UserContext.Provider value={{ phoneNumber, setPhoneNumber, userAvatar, setUserAvatar }}>
        <div className="App">
          <Router >
            <Routes>
              <Route exact path="/" element={<Protected><Home /></Protected>} />
              <Route exact path="/login" element={<WelcomePage />} />
              <Route exact path="/login/phoneinput" element={<PhoneNumberPage />} />
              <Route exact path="/login/enter" element={<EnterCode />} />

              <Route exact path="/profile/age" element={<Protected><Age /></Protected>} />
              <Route exact path="/profile/friendship" element={<Protected><FriendShip /></Protected>} />
              <Route exact path="/profile/profiledata" element={<Protected><ProfileData /></Protected>} />
              <Route exact path="/profile/location" element={<Protected><Location /></Protected>} />
              <Route exact path="/profile/photoupload" element={<Protected><PhotoUpload /></Protected>} />
              <Route exact path="/profile/photoaddmore" element={<Protected><PhotoAddMore /></Protected>} />
              <Route exact path="/profile/description" element={<Protected><Description /></Protected>} />

              <Route exact path="/find" element={<Protected><FindPage /></Protected>} />

              <Route exact path="/notification" element={<Protected><Notification /></Protected>} />

              <Route exact path="/message" element={<Protected><Message /></Protected>} />

              <Route exact path="/profile" element={<Protected><ProfileSetting /></Protected>} />

              <Route exact path="/settings" element={<Protected><Setting /></Protected>} />
              <Route exact path="/tutorial" element={<Protected><Tutorial /></Protected>} />
              <Route exact path="/editprofile" element={<Protected><EditProfile /></Protected>} />

              <Route exact path="/verifyprofile" element={<Protected><Verify /></Protected>} />


            </Routes>
          </Router>
        </div>
      </UserContext.Provider>
    </AuthContextProvider>
  );
}

export default App;
