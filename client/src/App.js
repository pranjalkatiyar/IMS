
import './App.css';
import Category from './components/Category';
import Products from './components/Products';
import NavBar from './components/NavBar';
import {Routes,Route} from 'react-router-dom';
import {useState} from 'react';

function App() {

  const [loginUser,setLoginUser]=useState({});
  return (
    <>
    <div className="App">
    <NavBar/>
     </div>
     </>
  );
}

export default App;
