import { Container, Stack } from '@mui/material'
import React from 'react'
import "./DashboardInquiry.scss"

function DashboardInquiry() {
    const userInputs = [
        {
          id: 1,
          label: "Product",
          type: "text",
          placeholder: "Whole Cleaned Cuttlefish",
        },
        {
          id: 2,
          label: "Quantity",
          type: "text",
          placeholder: "5000 kg",
        },
        {
          id: 3,
          label: "Packing",
          type: "mail",
          placeholder: "10x1",
        },
        {
          id: 4,
          label: "Glaze",
          type: "text",
          placeholder: "20%",
        },
        {
          id: 5,
          label: "Shipment Date",
          type: "date",
          placeholder: "Date",
        },
        {
            id: 6,
            label: "Contact",
            type: "text",
            placeholder: "Mr. Fish",
          },
    ];
  return (
    <div className='inquiry'>
            <div className='top'>
                <h1 className='title'>NEW INQUIRY</h1>
            </div>
            <div className='bottom'>
                
                <form>
                    <div className='formInput'>
                    {userInputs.map((userInput) => (
                        <div className='formInput' key = {userInput.id}>
                            <label>{userInput.label}</label>
                            <input type={userInput.type} placeholder={userInput.placeholder}/>
                        </div>
                    ))}
                    
                    <button>Create without Sharing</button>
                    <button className='button-two'>Create and Share</button>
                    
                    </div>
                </form>
                
            </div>
    </div>
  )
}

export default DashboardInquiry