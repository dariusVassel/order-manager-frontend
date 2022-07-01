import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

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
    <h1>You are logged in</h1>
    </>
  )
}

export default Orders