//Components Imports
import DashboardCharts from '../../components/Dashboard_Charts/DashboardCharts'
import DashboardInquiry from '../../components/Dashboard_Inquiry/DashboardInquiry'
import Dashboard_Sidebar from '../../components/Dashboard_Sidebar/Dashboard_Sidebar'
import DashboardTable from '../../components/Dashboard_Table/DashboardTable'
import DashboardWidgets from '../../components/Dashboard_Widgets/DashboardWidgets'
import Footer from '../../components/Footer/Footer'
import "./Dashboard.scss"

//Redux Imports
import {useSelector, useDispatch} from 'react-redux';
import {loadInquiries} from "../../actions/inquiries"
import { getCurrentUser } from '../../actions/sessions';

//React and Router-Dom Imports
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'



function Dashboard({ handleGetOrders, handleGetProducts}) {
    const navigate = useNavigate()
    const loggedIn = useSelector(state => state.sessions.loggedIn)
    const dispatch = useDispatch()
    const requesting = useSelector(state => state.requesting);

    

    useEffect(()=> {
        dispatch(getCurrentUser())
        if(loggedIn){
            dispatch(loadInquiries(localStorage.getItem('jwt')))
        }
        else {
            navigate("/login")
        }
        }, [loggedIn])

    if(requesting) {
        return (<h1>Loading...</h1>)
        }

  return (
    <>
        <br/>
        <br/>
        <div className='home'>
            <Dashboard_Sidebar handleGetOrders={handleGetOrders} handleGetProducts={handleGetProducts}/>
                <div className='homeContainer'>

                    <div className='widgets'>
                        <DashboardWidgets type = "order_active"/>
                        <DashboardWidgets type = "order_complete"/>
                        <DashboardWidgets type = "contact"/>
                        <DashboardWidgets type = "product"/>
                    </div>

                    <div className='listContainer'>
                        <div className='listTitle'>TASKS</div>
                        <DashboardTable/>
                    </div>
    
                    <div className='charts'>
                        <DashboardInquiry />
                        <DashboardCharts title="Last 6 Months (Revenue)" aspect={2 / 1}/>
                    </div>
                </div>
        </div>
        <br/>
        <br/>
        <br/>
        <Footer/>
    </>
  )
}

export default Dashboard