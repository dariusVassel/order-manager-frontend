import React from 'react'
import './DashboardWidgets.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SetMealIcon from '@mui/icons-material/SetMeal';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import SummarizeIcon from '@mui/icons-material/Summarize';


function DashboardWidgets({type}) {
    let data;

  //temporary
  
  const diff = 20;

  switch (type) {
    case "product":
      data = {
        title: "PRODUCTS",
        isMoney: false,
        link: "See my products",
        amount: 17,
        icon: (
          <SetMealIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View ongoing orders",
        amount: 89,
        icon: (
          <SummarizeIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        amount: 17,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        amount: 17,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
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
            <span className = 'link '>{data.link}</span>
        </div>
        <div className = 'right'>
            <div className = 'percentage positive'>
                <KeyboardArrowUpIcon/>
                {diff} %
            </div>
            {data.icon}
        </div>
    </div>
  )
}

export default DashboardWidgets