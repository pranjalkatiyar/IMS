import "bootstrap/dist/css/bootstrap.min.css";
import React,{useState , useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { getAuth, signInWithPopup, 
    GoogleAuthProvider } from "firebase/auth";
    import { FirebaseContext } from "../context/firebase";
import { FormControl } from "@mui/material";
import './LoginSignup.css'

const SignIn = () => {

   const {firebase}=useContext(FirebaseContext);
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const history=useNavigate();
    const [error,setError]=useState('');
    
    const handleSignin=(event)=>{
        

        firebase
        .auth()
        .signInWithEmailAndPassword(email , password)
        .then(()=>{
            alert("Login Successfull");
      history("/category");
        })
        .catch((error)=>{
            alert(error.message);
          setEmail(' ');
          setPassword();
          setError(error.message);
          history("/login");
        })
        event.preventDefault();
      }
      
  return (
    <>
    <div className="loginPageAlignment">
    <h1 className="loginForm"> LOGIN</h1>
        <FormControl>
            <label htmlFor="Login"></label>
            <input className="loginForm" type="email" id="Login" placeholder="Email Address" onChange={(e)=>{
                setEmail(e.target.value);
            }} />
            <input className="loginForm" type="password" id="Login" placeholder="Password"
            onChange={(e)=>{
                setPassword(e.target.value);
            }} />
            <button className="loginForm submitButton" type="submit" onClick={handleSignin}>Login</button>
        </FormControl>
        <a className="loginForm anchorHref" href="/forgotPassword">Forgot Password?</a>
        <a className="loginForm anchorHref" href="/signup">Signup</a>
    </div>
    </>
  )
}

export default SignIn