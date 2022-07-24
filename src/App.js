import './App.css';
import React, {useEffect, useState} from 'react';

//React Router//
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

//Redux//
import {useSelector, useDispatch} from 'react-redux'
import { getCurrentUser } from './actions/sessions';

//Components//
import Navbar from './components/Navigation/Navbar';
import Home from './components/Static/Home';
import Sidebar from './components/Sidebar/Sidebar';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import OrdersList from './pages/Orders/OrdersList';
import Dashboard from './pages/Dashboard/Dashboard';
import List from './components/List/List';
import Product from './components/Products/Product';
import Inquiries from './pages/Inquiries/Inquiries';
import SingleOrder from './pages/Orders/SingleOrder';
import NewOrder from "./pages/Orders/NewOrder"
import { baseUrl, headers, getToken } from './Globals' 


function App() {
  //Local States
  const [isOpen, setIsOpen] = useState(false)
  const [order, setOrder] = useState([])
  const [items, setItems] = useState([])
  
  //Redux
  const loggedIn = useSelector(state => state.sessions.loggedIn)
  const requesting = useSelector(state=>state.requesting)
  const dispatch = useDispatch()

  //Redux States
  useEffect(()=>{
    dispatch(getCurrentUser())
  },[loggedIn])

  function toggleSideBar(e){
    setIsOpen(!isOpen)
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

  function handleGetProducts(e){
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

  return (
    <div className="App">
      <Router>
        <Sidebar isOpen={isOpen} toggleSideBar={toggleSideBar} />
        <Navbar toggleSideBar={toggleSideBar}  />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login  />}/>
          <Route path="/orders" element={<OrdersList   order={order} handleGetOrder={handleGetOrder} />} />
          <Route path="/dashboard" element={<Dashboard   handleGetProducts={handleGetProducts} />}  />
          <Route path="/contacts" element={<List/>} />
          <Route path="/items" element={<Product  items={items}/>} />
          <Route path="/inquiries" element={<Inquiries  />} />
          <Route path="/orders/:id" element={<SingleOrder  order={order}  />} />
          <Route path="new_order" element={<NewOrder/>} />
        </Routes>   
      </Router>
    </div>
  );
}


export default App;
