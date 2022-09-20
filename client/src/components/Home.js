import React from 'react'
import './Home.css'
import { useContext,useEffect } from 'react'
import {  useNavigate } from 'react-router'
import { FirebaseContext } from '../context/firebase'
import {Button} from 'reactstrap'
import {Route, Link, Routes, useLocation} from 'react-router-dom';
export default function Home(){

  const {firebase}=useContext(FirebaseContext);
  const [checkUser,setCheckuser]=React.useState();
  const history=useNavigate();
      useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      const url = window.location.href;
      
      if(!user){
        setCheckuser(); 
        if(url!== "http://localhost:3000/forgotPassword" && url!== "http://localhost:3000/signup" )
        history("/login");
      }
      else{
        setCheckuser(user);
      }
    });
  }, []);

  const handleSignOut=(event)=>{
    event.preventDefault();
    firebase.auth().signOut().then(()=>{
        alert("User Signed Out");
        history("/login");
    }).catch((error)=>{
        alert(error.message);
    });
  }

  return (
    <div>
        
        <nav>
        <ul className='navbarDecoration'>
        <li><h1><a href="/">IMS</a></h1></li>
        <div className='navBarContent'>
        <li><a href="/category">Category</a></li>
        <li><a href="/products">Products</a></li>
        {!checkUser && <li><a href="/login">Login/Signup</a></li> }
        {checkUser && <li><Button onClick={handleSignOut}>Logout</Button></li>}
        </div>
        </ul>
        </nav>
    </div>
  )
}
