import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { firebase } from './context/firebase.prod';
import {FirebaseContext} from './context/firebase';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseContext.Provider value={{firebase}}>
  <BrowserRouter>
   <App/>
   </BrowserRouter>
   </FirebaseContext.Provider>

);

