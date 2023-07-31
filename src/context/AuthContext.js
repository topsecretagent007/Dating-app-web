import { useContext, createContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    PhoneAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    linkWithCredential
} from "firebase/auth"
import { auth } from "../firebase"

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    const logOut = () => {
        signOut(auth);
    }

    const setUpRecaptcha = (number) => {
        const recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {},
            auth
        );
        recaptchaVerifier.render();
        return signInWithPhoneNumber(auth, number, recaptchaVerifier);
    }

    const verifyPhoneNumber = (number) => {
        const recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {},
            auth
        );
        recaptchaVerifier.render();
        const provider = new PhoneAuthProvider(auth);
        const verificationId = provider.verifyPhoneNumber(number, recaptchaVerifier);
        console.log(verificationId);
        return verificationId;
    }

    const linkPhoneNumber = (verificationId, code) => {
        var credential = PhoneAuthProvider.credential(verificationId, code);
        console.log(credential); 
        return linkWithCredential(user, credential);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <AuthContext.Provider value={{googleSignIn, logOut, user, setUpRecaptcha, linkPhoneNumber, verifyPhoneNumber }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}