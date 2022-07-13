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
import OrdersList from './components/Orders/OrdersList';


import jwt_decode from "jwt-decode"
import Dashboard from './components/Dashboard/Dashboard';
import { DashboardNavbar } from './components/Dashboard_Navbar/DashboardNavbar';
import Datatable from './components/Datatable/Datatable';
import List from './components/List/List';
import Product from './components/Products/Product';


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] =useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [orders, setOrders] = useState([])

  
  useEffect(()=> {
    const token = localStorage.getItem('jwt')
    
    if (token && !loggedIn){
      fetch(baseUrl + '/get-current-user', {
        method: "GET",
        headers: {
          ...headers,
          ...getToken()
        }
      })
        .then(resp => resp.json())
        .then(user => {
          loginUser(user)
          setCurrentUser(user)
        })

        if (!loggedIn){
          fetch(baseUrl + '/orders', {
            headers: {
              ...headers,
              ...getToken()
            }
          })
          .then(resp => resp.json())
          .then(data => {
            setOrders(data)
        })
        }
    }
  }, [loggedIn])

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
      console.log(data)
      setOrders(data)
  })}

  function handleSignOut(e){
    setCurrentUser({});
    document.getElementById("signInDiv").hidden = false


  }
  
  return (
    <div className="App">
      
      <Router>
        <Sidebar isOpen={isOpen} toggleSideBar={toggleSideBar} loggedIn ={loggedIn} logOutUser={logOutUser} currentUser={currentUser}/>
        <Navbar toggleSideBar={toggleSideBar} loggedIn ={loggedIn} logOutUser={logOutUser} currentUser={currentUser} />
        {/* <DashboardNavbar/> */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup loginUser= {loginUser} loggedIn = {loggedIn} handleGetOrders={handleGetOrders}/>}/>
          <Route path="/login" element={<Login loginUser= {loginUser} handleSignout = {handleSignOut} currentUser= {currentUser} loggedIn = {loggedIn} handleGetOrders={handleGetOrders}/>}/>
          <Route path="/orders" element={<OrdersList  loggedIn = {loggedIn} orders={orders}  currentUser ={currentUser} handleGetOrders={handleGetOrders}/>} />
          <Route path="/dashboard" element={<Dashboard  loggedIn = {loggedIn} orders={orders}  currentUser ={currentUser} handleGetOrders={handleGetOrders}/>} />
          <Route path="/contacts" element={<List  loggedIn = {loggedIn} orders={orders}  currentUser ={currentUser}/>} />
          <Route path="/products" element={<Product  loggedIn = {loggedIn} orders={orders}  currentUser ={currentUser}/>} />
        </Routes>
        
      </Router>
    </div>
  );
}


export default App;
