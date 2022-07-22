import React from 'react'
import Dashboard_Sidebar from '../../components/Dashboard_Sidebar/Dashboard_Sidebar'
import "./SingleOrder.scss"
import List from '../../components/List/List'
import DashboardCharts from '../../components/Dashboard_Charts/DashboardCharts'
import SetMealIcon from '@mui/icons-material/SetMeal';
import Footer from '../../Footer/Footer'

function SingleOrder({order}) {
  return (
    <>
    <br/>
    <br/>
    <br/>
    <div className="single">
        
    <Dashboard_Sidebar/>
    <div className="singleContainer">
    <div className="top">
        <div className="left">
        <div className="editButton">Edit</div>
        <h1 className="title">Information</h1>
        <div className="item">
            <img
            src="https://medifactia.com/wp-content/uploads/2018/01/placeholder.png"
            alt=""
            className="itemImg"
            />
            <div className="details">
            <h1 className="itemTitle">Order Details</h1>
            <div className="detailItem">
                <span className="itemKey">Status:</span>
                <span className="itemValue">{order.order_status}</span>
            </div>
            <div className="detailItem">
                <span className="itemKey">PO Number:</span>
                <span className="itemValue">{order.po_number}</span>
            </div>
            <div className="detailItem">
                <span className="itemKey">Total Kilos:</span>
                <span className="itemValue">
                {order.total_kilos}
                </span>
            </div>
            <div className="detailItem">
                <span className="itemKey">Total:</span>
                <span className="itemValue">${order.order_total}</span>
            </div>
            <div className="detailItem">
                <span className="itemKey">Port from:</span>
                <span className="itemValue">{order.port_from}</span>
            </div>
            <div className="detailItem">
                <span className="itemKey">Port to:</span>
                <span className="itemValue">{order.port_to}</span>
            </div>
            <div className="detailItem">
                <span className="itemKey">Country:</span>
                <span className="itemValue">USA</span>
            </div>
            </div>
        </div>
        </div>
        <div className="right">
        <DashboardCharts aspect={3 / 1} title="ORDER-STATUS------PLACEHOLDER WINDOW" />
        </div>
    </div>
    <div className="bottom">
    <h1 className="title">Tasks</h1>
        <List/>
    </div>
    </div>
    </div>
    <br/>
    <Footer/>
    </>
  )
}

export default SingleOrder