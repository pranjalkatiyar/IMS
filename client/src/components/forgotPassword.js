import React,{useState , useContext} from 'react';
import {FirebaseContext} from '../context/firebase.js';
import {useNavigate} from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label, NavLink } from "reactstrap";

export default function ForgotPassword(){

    const[forgetPassword,setforgetPassword]=useState('');
    const history=useNavigate();
    const {firebase}=useContext(FirebaseContext);

    const isInvalid=forgetPassword==='';

    const handleForgotPassword=(event)=>{
        event.preventDefault();
        firebase.auth().sendPasswordResetEmail(forgetPassword)
        .then((userCredentials)=>{
            firebase.auth().signOut();
            alert("Password reset email sent");
            history("/login");
        })
        .catch((error)=>{
            alert(error.message);
        })
    }

    return(
        <>
            <Form onSubmit={handleForgotPassword}>
                <FormGroup className="mt-5">
                <Label style={{textTransform:"uppercase",textAlign:"center"}}>

                    <h3 >Forgot Password</h3>
                </Label>
                </FormGroup>
                <FormGroup>
                    <Input
                    tabIndex={1}
                    type="email"
                    name="forgotPassword"
                    id="forgotPassword"
                    value={forgetPassword}
                    onChange={(e) => setforgetPassword(e.target.value)}
                    />
                </FormGroup>
                <Button disabled={isInvalid} type="submit" className="btn btn-primary btn-block">
                    Reset Password
                </Button>
            </Form>
        </>
    )
}

