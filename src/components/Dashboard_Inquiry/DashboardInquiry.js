import { Container, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import "./DashboardInquiry.scss"
import { baseUrl, headers, getToken } from '../../Globals'
import { useNavigate } from 'react-router-dom'

import MenuItem from '@mui/material/MenuItem';
import {useSelector, useDispatch} from 'react-redux';
import { addInquiry } from '../../actions/inquiries'


function DashboardInquiry({handleGetInquiries}) {
    const navigate = useNavigate()
    const [contact, setContact] = useState("");
    const currentUser = useSelector(state => state.sessions.currentUser)
    const dispatch = useDispatch()

    const [newInquiry, setNewInquiry] = useState({
      item_id: null,
      product_name: "",
      quantity: null,
      packing: "",
      glaze: "",
      shipment_date: "",
      contact_name: "", 
      user_id: currentUser.id,
      contact_id: null
    })

    const contacts = [
      {value: 1, label: `GI Farms`}, {value: 2, label: `Croix`}, {value: 3, label: `Raadegast`}, {value: 4, label: `Foosa Republic`}
    ];

    function handleFormData(e){
      const name = e.target.name
      const value = e.target.value
      console.log(name, value)
      setNewInquiry({
          ...newInquiry,
          [name] : value
      })
    }

    function handleSubmit(e){
      e.preventDefault();
      
      const strongParams = {
          order_inquiry: {
            item_id: 1,
            product_name: newInquiry.product_name,
            quantity: newInquiry.quantity,
            packing: newInquiry.packing,
            glaze: newInquiry.glaze,
            shipment_date: newInquiry.shipment_date,
            contact_name: newInquiry.contact_name, 
            user_id: currentUser.id,
            contact_id: newInquiry.contact_id
          }
      }

      dispatch(addInquiry(strongParams))

      // fetch(baseUrl + '/order_inquiries',{
      //     method: "POST",
      //     headers: {
      //         ...headers,
      //         ...getToken()
      //     },
      //     body: JSON.stringify(strongParams)
      // })
      // .then(resp => resp.json())
      // .then(data => {
      //     handleGetInquiries(e)
      //     navigate('/inquiries')
      // })

      setNewInquiry({
        item_id: null,
        product_name: "",
        quantity: null,
        packing: "",
        glaze: "",
        shipment_date: "",
        contact_name: "", 
        user_id: currentUser.id,
        contact_id: null
      })
    }

    const handleContactChange = (event) => {
      setContact(event.target.value);
      handleFormData(event)
      };

    const userInputs = [
        {
          id: 1,
          label: "Product",
          name: "product_name",
          type: "text",
          placeholder: "Whole Cleaned Cuttlefish",
        },
        {
          id: 2,
          label: "Quantity",
          name: "quantity",
          type: "text",
          placeholder: "5000 kg",
        },
        {
          id: 3,
          label: "Packing",
          name: "packing",
          type: "mail",
          placeholder: "10x1",
        },
        {
          id: 4,
          label: "Glaze",
          name: "glaze",
          type: "text",
          placeholder: "20%",
        },
        {
          id: 5,
          label: "Shipment Date",
          name: "shipment_date",
          type: "date",
          placeholder: "Date",
        }

          
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
                            <input name={`${userInput.name.toLowerCase()}`} type={userInput.type} placeholder={userInput.placeholder} onChange={handleFormData}/>
                        </div>
                    ))}
                    <div className='formInput'>
                    <label>Contact</label>
                    <TextField className='formInput' id="contact_id" name="contact_id" select  value={contact} onChange={handleContactChange}>
                    
                      {contacts.map((option) => (
                          <MenuItem key={option.value} value={option.value} defaultValue = "">
                          {option.label}
                          </MenuItem>
                      ))}
                    </TextField>
                    </div>

                    <br/>

                    <button className='button-two' onClick = {handleSubmit}>Create without Sharing</button>
                    {/* <button className='button-two'>Create and Share</button> */}
                    {/* <p>Add Search previous inquiries box, size entry field and custom field plus button</p>
                     */}
                    </div>
                </form>
                
            </div>
    </div>
  )
}

export default DashboardInquiry