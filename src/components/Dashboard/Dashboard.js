import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardCharts from '../Dashboard_Charts/DashboardCharts'
import DashboardFeatureChart from '../Dashboard_Feature_Chart/DashboardFeatureChart'
import DashboardInquiry from '../Dashboard_Inquiry/DashboardInquiry'

import Dashboard_Sidebar from '../Dashboard_Sidebar/Dashboard_Sidebar'
import DashboardTable from '../Dashboard_Table/DashboardTable'
import DashboardTaskTable from '../Dashboard_Tasktable/DashboardTaskTable'
import DashboardWidgets from '../Dashboard_Widgets/DashboardWidgets'
import Footer from '../Footer/Footer'
import "./Dashboard.scss"

function Dashboard({loggedIn, handleGetOrders}) {
    const navigate = useNavigate()

    useEffect(()=> {
        if (!loggedIn){
            navigate("/login")
        }
        }, [loggedIn])
  return (
    <>
    
    <br/>
    <br/>
    
    <div className='home'>
        <Dashboard_Sidebar handleGetOrders={handleGetOrders}/>
            <div className='homeContainer'>
                {/* Ongoing Orders
                    Past Orders AKA Completed Orders (Get People Started)
                    Active Tasks
                    Create New Product 
                    Manage Contacts*/}

                
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
                    <DashboardInquiry/>
                    <DashboardCharts title="Last 6 Months (Revenue)" aspect={2 / 1}/>
                    {/* <div className='listContainer'>
                        <div className='listTitle'>TASKS</div>
                        
                        <DashboardTaskTable/>
                    </div> */}
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

// Check