import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import { baseUrl, headers, getToken } from './Globals' 
import Navbar from './components/Navigation/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Static/Home';
import Sidebar from './components/Sidebar/Sidebar';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] =useState(false);
  const [isOpen, setIsOpen] = useState(false)


  function logOutUser(){
    setCurrentUser({})
    setLoggedIn(false)
    localStorage.removeItem('jwt')
  }

  function loginUser(user){
    setCurrentUser(user)
    setLoggedIn(true)
  }

  function toggleSideBar(e){
    setIsOpen(!isOpen)
  }

  function handleGetOrders(e){
    fetch(baseUrl + '/orders', {
      headers: {
        ...headers,
        ...getToken()
      }
    })
    .then(resp => resp.json())
    .then(data => {
      // console.log(data)
      setOrders(data)
  })}
  
  return (
    <div className="App">
      <Router>
        <Sidebar isOpen={isOpen} toggleSideBar={toggleSideBar} loggedIn ={loggedIn} logOutUser={logOutUser} currentUser={currentUser}/>
        <Navbar toggleSideBar={toggleSideBar} loggedIn ={loggedIn} logOutUser={logOutUser} currentUser={currentUser} />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup loginUser= {loginUser} loggedIn = {loggedIn} handleGetOrders={handleGetOrders}/>}/>
          <Route path="/login" element={<Login loginUser= {loginUser} loggedIn = {loggedIn} handleGetOrders={handleGetOrders}/>}/>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
