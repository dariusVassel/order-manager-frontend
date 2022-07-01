import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

import Dashboard_Sidebar from '../Dashboard_Sidebar/Dashboard_Sidebar'
import Sidebar from '../Sidebar/Sidebar'

function Dashboard({loggedIn}) {
    const navigate = useNavigate()

    useEffect(()=> {
        if (!loggedIn){
            navigate("/")
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
    <h1>Dashboard</h1>
    
    <Dashboard_Sidebar/>
    <div className='homeContainer'>Container</div>
    </>
  )
}

export default Dashboard

// Check