import React, { useEffect, useState,useContext } from "react";
import { Button, Form, FormGroup, Input, Label, NavLink } from "reactstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {FirebaseContext} from '../context/firebase';
import { useNavigate } from "react-router-dom";


const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState('');
  const {firebase}=useContext(FirebaseContext);
  const history=useNavigate();

  const isInvalid = firstName === "" || lastName === "" || userName === "" || email === "" || password === "";

  const handleSignup = (event) => {
    event.preventDefault();
    return firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      result.user.sendEmailVerification();})
      .then(()  =>{
        history("/login");
        alert("Please verify your email address");
      })
      .catch((error) => {
        setEmail("");
        setPassword("");
        setError(error.message);
      });
    }      
  

  return (
    <div className="col-md-6 col-sm-12 container">
      <Form onSubmit={handleSignup}>
        <FormGroup className="mt-5">
          <Label style={{textTransform:"uppercase",textAlign:"center"}}>
            <h3 >Register here!</h3>
          </Label>
        </FormGroup>
        <div className="text-left">
          <FormGroup>
            <Label for="registerFirstName">First name</Label>
            <Input
              tabIndex={1}
              type="text"
              name="firstName"
              id="registerFirstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="registerLastName">Last Name</Label>
            <Input
              tabIndex={2}
              type="text"
              name="lastName"
              id="registerLastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="registerEmail">Email</Label>
            <Input
              tabIndex={4}
              type="email"
              name="email"
              id="registerEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="registerUserNmae">Username</Label>
            <Input
              tabIndex={4}
              type="text"
              name="userName"
              id="registerUserName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="registerPassword">Password</Label>
            <Input
              tabIndex={5}
              type="password"
              name="password"
              id="registerPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="text-center">
          </FormGroup>
          <FormGroup className="text-center col-12 d-flex flex flex-column align-items-center">
            <Button
            id="submitButton"
              tabIndex={6}
              color="primary"
              className="col-md-6 col-sm-12 mt-3"
              onClick={handleSignup}
            
            >
              REGISTER
            </Button>
            <div id="loginSignupLink">
              <a href="/login">Click Login</a>
            </div>
          </FormGroup>
        </div>
      </Form>
    </div>
  );

}
 
export default RegisterForm;
