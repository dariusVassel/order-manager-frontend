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
import Inquiries from './components/Inquiries/Inquiries';
import Dashboard_Sidebar from './components/Dashboard_Sidebar/Dashboard_Sidebar';
import SingleOrder from './components/Orders/SingleOrder';
import NewOrder from "./components/Orders/NewOrder"

function App() {
  // const [currentUser, setCurrentUser] = useState({});
  // const [loggedIn, setLoggedIn] =useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [orders, setOrders] = useState([])
  const [order, setOrder] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [items, setItems] = useState([])

  
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

  function handleDeleteOrder(id) {
    console.log(id)
    fetch(baseUrl + `/orders/${id}`, {
      method: "DELETE",
      headers: {
        ...headers,
        ...getToken()
      }
    }).then((r) => {
      if (r.ok) {
          setOrders((orders) =>
          orders.filter((order) => order.id !== id)
        );
      }
    });
  }

  function handleGetInquiries(e){
    fetch(baseUrl + '/order_inquiries', {
      headers: {
        ...headers,
        ...getToken()
      }
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      setInquiries(data)
    })
  }

  function handleGetOrder(order_id){
    fetch(baseUrl + `/orders/${order_id}`, {
      headers: {
        ...headers,
        ...getToken()
      }
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      setOrder(data)     
  })}

  function handleDeleteInquiry(id) {
    console.log(id)
    fetch(baseUrl + `/order_inquiries/${id}`, {
      method: "DELETE",
      headers: {
        ...headers,
        ...getToken()
      }
    }).then((r) => {
      if (r.ok) {
          setInquiries((inquiries) =>
          inquiries.filter((inquiry) => inquiry.id !== id)
        );
      }
    });
  }

function handleGetProducts(e){
  console.log("APPP")
  fetch(baseUrl + '/items', {
    headers: {
      ...headers,
      ...getToken()
    }
  })
  .then(resp => resp.json())
  .then(data => {
    console.log(data)
    setItems(data)
})
}

  function handleSignOut(e){
    setCurrentUser({});
    document.getElementById("signInDiv").hidden = false
  }

  
  
  return (
    <div className="App">
      
      <Router>
        <Sidebar isOpen={isOpen} toggleSideBar={toggleSideBar} loggedIn ={loggedIn} logOutUser={logOutUser} currentUser={currentUser}/>
        <Navbar toggleSideBar={toggleSideBar} loggedIn ={loggedIn} logOutUser={logOutUser} currentUser={currentUser} />
        {/* {loggedIn? <Dashboard_Sidebar/>: null} */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup loginUser= {loginUser} loggedIn = {loggedIn} handleGetOrders={handleGetOrders}/>}/>
          <Route path="/login" element={<Login loginUser= {loginUser} handleSignout = {handleSignOut} currentUser= {currentUser} loggedIn = {loggedIn} handleGetOrders={handleGetOrders}/>}/>
          <Route path="/orders" element={<OrdersList  loggedIn = {loggedIn} order={order} handleGetOrder={handleGetOrder} orders={orders} handleDeleteOrder={handleDeleteOrder} currentUser ={currentUser} handleGetOrders={handleGetOrders}/>} />
          <Route path="/dashboard" element={<Dashboard  loggedIn = {loggedIn} handleGetProducts={handleGetProducts} handleGetInquiries={handleGetInquiries} orders={orders}  currentUser ={currentUser} handleGetOrders={handleGetOrders}/>}  />
          <Route path="/contacts" element={<List  loggedIn = {loggedIn} orders={orders}  currentUser ={currentUser}/>} />
          <Route path="/items" element={<Product  handleGetOrders={handleGetOrders} loggedIn = {loggedIn} orders={orders}  currentUser ={currentUser} items={items}/>} />
          <Route path="/inquiries" element={<Inquiries  loggedIn = {loggedIn} orders={orders} inquiries={inquiries} currentUser ={currentUser} handleGetOrders={handleGetOrders} handleGetInquiries={handleGetInquiries} handleDeleteInquiry={handleDeleteInquiry}/>} />
          <Route path="/orders/:id" element={<SingleOrder  loggedIn = {loggedIn} order={order} inquiries={inquiries} currentUser ={currentUser} handleGetOrders={handleGetOrders} handleGetInquiries={handleGetInquiries} handleDeleteInquiry={handleDeleteInquiry}/>} />
          <Route path="new_order" element={<NewOrder  loggedIn = {loggedIn} orders={orders} inquiries={inquiries} currentUser ={currentUser} handleGetOrders={handleGetOrders} handleGetInquiries={handleGetInquiries} handleDeleteInquiry={handleDeleteInquiry}/>} />
        </Routes>
        
      </Router>
    </div>
  );
}


export default App;
