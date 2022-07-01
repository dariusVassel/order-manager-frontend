import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Dashboard_Sidebar from '../Dashboard_Sidebar/Dashboard_Sidebar'

function Orders({loggedIn, orders, currentUser}) {
  const navigate = useNavigate()

  useEffect(()=> {
    if (!loggedIn){
        navigate("/login")
    }
    }, [loggedIn])
  return (
    <>
    <div>Orders</div>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <Dashboard_Sidebar/>
    <h1>You are logged in</h1>
    </>
  )
}

export default Orders