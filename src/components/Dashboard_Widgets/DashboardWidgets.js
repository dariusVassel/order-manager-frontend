import React from 'react'
import './DashboardWidgets.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SetMealIcon from '@mui/icons-material/SetMeal';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SummarizeIcon from '@mui/icons-material/Summarize';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { Link } from 'react-router-dom';


function DashboardWidgets({type}) {
    let data;

  //temporary
  
  const diff = 20;

  switch (type) {
    case "product":
      data = {
        title: "PRODUCTS",
        isMoney: false,
        link: "View Products",
        amount: 17,
        icon: (
          <SetMealIcon
            className="icon"
            style={{
              color: "#026BFB",
              backgroundColor: "rgba(235, 234, 234, 0.75)",
            }}
          />
        ),
      };
      break;
    case "order_active":
      data = {
        title: "ACTIVE ORDERS",
        isMoney: false,
        link: "View ongoing orders",
        amount: 24,
        icon: (
          <SummarizeIcon
            className="icon"
            style={{
              backgroundColor: "rgba(235, 234, 234,  0.75)",
              color: "#026BFB",
            }}
          />
        ),
      };
      break;
    case "order_complete":
      data = {
        title: "COMPLETED ORDERS",
        isMoney: false,
        link: "View completed orders",
        amount: 87,
        icon: (
          <SummarizeIcon
            className="icon"
            style={{ backgroundColor: "rgba(235, 234, 234,  0.75)", color: "#026BFB" }}
          />
        ),
      };
      break;
    case "contact":
      data = {
        title: "CONTACTS",
        isMoney: false,
        link: "View Contacts",
        amount: 103,
        icon: (
          <ContactPageIcon
            className="icon"
            style={{
              backgroundColor: "rgba(235, 234, 234,  0.75)",
              color: "#026BFB",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className='widget'>
        <div className = 'left'>
            <span className = 'title'>{data.title}</span>
            <span className = 'counter '>{data.isMoney && "$"} {data.amount}</span>
            <Link to={`/${data.title.toLowerCase()}`} style={{ textDecoration: "none" }}><span className = 'link ' style={{ textDecoration: "none" }}>{data.link}</span></Link>
        </div>
        <div className = 'right'>
            {/* <div className = 'percentage positive'>
                <KeyboardArrowUpIcon/>
                {diff} %
            </div> */}
            {data.icon}
        </div>
    </div>
  )
}

export default DashboardWidgets