import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardCharts from '../Dashboard_Charts/DashboardCharts'
import DashboardFeatureChart from '../Dashboard_Feature_Chart/DashboardFeatureChart'

import Dashboard_Sidebar from '../Dashboard_Sidebar/Dashboard_Sidebar'
import DashboardTable from '../Dashboard_Table/DashboardTable'
import DashboardWidgets from '../Dashboard_Widgets/DashboardWidgets'
import "./Dashboard.scss"

function Dashboard({loggedIn}) {
    const navigate = useNavigate()

    useEffect(()=> {
        if (!loggedIn){
            navigate("/")
        }
        }, [loggedIn])
  return (
    <>
    
    <br/>
    <br/>
    <br/>
    <div className='home'>
        <Dashboard_Sidebar/>
            <div className='homeContainer'>
                {/* Ongoing Orders
                    Past Orders AKA Completed Orders (Get People Started)
                    Active Tasks
                    Create New Product 
                    Manage Contacts*/}
                <div className='widgets'>
                    <DashboardWidgets type = "product"/>
                    <DashboardWidgets type = "order"/>
                    <DashboardWidgets type = "earning"/>
                    <DashboardWidgets type = "balance"/>
                </div>
                
                <div className='charts'>
                    <DashboardFeatureChart/>
                    <DashboardCharts title="Last 6 Months (Revenue)" aspect={2 / 1}/>
                </div>

                <div className='listContainer'>
                    <div className='listTitle'>Latest Transactions</div>
                    <DashboardTable/>
                </div>
            </div>
    </div>
    </>
  )
}

export default Dashboard

// Check