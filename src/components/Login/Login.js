import React, { useContext } from 'react';
import './../../App.css';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';



const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const app = initializeApp(firebaseConfig);
    const provider = new GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const {displayName, email} = result.user;
            const signedInUSer = {name: displayName, email};
            setLoggedInUser(signedInUSer);
            history.replace(from);
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
          });
    }
    return (
        <div className='App'>
            <h1>Google Sign In</h1>
            <button onClick={handleGoogleSignIn} style={{color:'white', backgroundColor:'blue', borderRadius:'5px', padding:'5px'}}>Sign In With Google</button>
        </div>
    );
};

export default Login;