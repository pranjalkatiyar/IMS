import React from 'react'
import { Routes,Route } from 'react-router'
import Home from './Home'
import Products from './Products'
import Category from './Category'
import Update from './Update'
import Login from './Login'
import Signup from './SignUp'
import ForgotPassword from './forgotPassword'

export default function NavBar(){
  return (
    <>
    <Home/>
  <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="category" element={<Category/>}></Route>
    <Route path="products" element={<Products/>}></Route>
    <Route  path="products/update/:id" element={<Update/>}></Route>
    <Route  path="login" element={<Login/>}></Route>
    <Route path="signup" element={<Signup/>}></Route>
    <Route path="/forgotPassword" element={<ForgotPassword/>}></Route>
  </Routes>
  </>
  )
}
