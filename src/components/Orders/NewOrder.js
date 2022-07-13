import React, { useState } from 'react'

import TextField from '@mui/material/TextField';
import { Paper, Container, Box, Grid } from '@mui/material'
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import { baseUrl, headers, getToken } from '../../Globals'
import { useNavigate } from 'react-router-dom'
import Footer from '../../Footer/Footer';






export default function NewOrder({currentUser, handleGetOrders}) {
    // When back create new order form 
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate()


    const [packing, setPacking] = useState("");
    const [payment, setPayment] = useState("");
    const [product, setProduct] = useState("");
    const [catchType, setCatchType] = useState("");
    const [freezeType, setFreezeType] = useState("");
    const [contact, setContact] = useState("");

    const [newOrder, setNewOrder] = useState({
        PO: null,
        cases: null,
        kilos: null,
        price_kg: null,
        price_total: null,
        product_id: null,
        contact_id: null,
        user_id: null,
        payment_id: null,
        packing_id: null,
        port_from: "",
        port_to: "",
        selected_size: "",
        selected_freeze: "",
        selected_glaze: "",
        catching_method: "",
        shipment_date: "",
        PO_date: "",
        order_ref_number: null,
        order_status: "New Order",
        shipment_date: "",
        total_kilos: null,
        specification: "",
        user_id: currentUser.id
    })

    const packings = [
        {value: 243, label: `10x1Kg`}, {value: 244, label: `6x1Kg`}, {value: 245, label: `12x1Kg`}, {value: 246, label: `6x2Kg`}, {value: 247, label: `5x4Kg`},
        {value: 248, label: `1x6Kg`}, {value: 249,label: `1x10Kg`}, {value: 250, label: `1x12Kg`}, {value: 251, label: `10x1Kg`}, {value: 252, label: `6x1Kg`},
        {value: 253, label: `12x1Kg`}
      ];
    
    const products = [
        {value: 49, label: `Cuttlefish Whole Cleaned`}, {value: 50, label: `Baby Squid`}, {value: 51, label: `Squid Whole`}, {value: 52, label: `Vannamei HOSO Cooking Quality`}, {value: 53, label: `Black Tiger`},
        {value: 54, label: `Clams`}, {value: 55,label: `Tuna`}, {value: 56, label: `Salmon`}, {value: 57, label: `Squid Whole Cleaned`}, {value: 58, label: `Cuttlefish Roe`},
        {value: 59, label: `Vannamei HOSO Retail Quality`}, {value: 60,label: `Vannamei PDTO Raw`}, {value: 61, label: `Vannamei PUD Raw`}, {value: 62, label: `Vannamei PUD Blanched`}, {value: 63, label: `Vannamei PDTO Blanched`},
        {value: 64, label: `Cut Squid`}
      ];
    
    const payments = [
        {value: 89, label: `LC`}, {value: 90, label: `Sight DP`}, {value: 91, label: `CAD`}, {value: 92, label: `Sight DA`}
      ];
    
    const catchings = [
        {value: `trawler`, label: `Trawler`}, {value: `farmed`, label: `Farmed`}, {value: `one_day_hook`, label: `One Day Hook Catch`}
      ];
    
    const freezings = [
        {value: `IQF`, label: `IQF`}, {value: `blocks`, label: `Blocks`}, {value: `jumble_blocks`, label: `Jumble Blocks`}, {value: `finger_laid`, label: `Finger Laid`}, {value: `tray_pack`, label: `Tray Pack`},
        {value: `semi_iqf`, label: `Semi IQF`}
      ];

    const contacts = [
        {value: 915, label: `Silver`}, {value: 916, label: `KR Seafoods`}, {value: 917, label: `Arsha`}, {value: 918, label: `Premier`}, {value: 919, label: `ABAD`},
        {value: 920, label: `Raunaq/JJ`}
      ];

    const handleChange = (event) => {
        setPacking(event.target.value);
        handleFormData(event)
      };

    const handleChangePayment = (event) => {
        setPayment(event.target.value);
        handleFormData(event)
      };
    
    const handleChangeProduct = (event) => {
    setProduct(event.target.value);
    handleFormData(event)
    };

    const handleChangeCatchType = (event) => {
        setCatchType(event.target.value);
        handleFormData(event)
        };

    const handleChangeFreezeType = (event) => {
        setFreezeType(event.target.value);
        handleFormData(event)
        };

    const handleContactChange = (event) => {
        setContact(event.target.value);
        handleFormData(event)
        };

    function handleFormData(e){
        const name = e.target.name
        const value = e.target.value
    
        setNewOrder({
            ...newOrder,
            [name] : value
        })
      }

    function handleUserData(){
        console.log('HI')
    }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     const formData = {
    //       name,
    //       age: Number(age),
    //     };
    //     fetch("/campers", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(formData),
    //     }).then((r) => {
    //       if (r.ok) {
    //         r.json().then((camper) => {
    //           setName("");
    //           setAge("");
    //           setErrors([]);
    //           onAddCamper(camper);
    //         });
    //       } else {
    //         r.json().then((err) => setErrors(err.errors));
    //       }
    //     });
    // }

    // function handleGetContacts(e){
    //     fetch(baseUrl + '/contacts', {
    //       headers: {
    //         ...headers,
    //         ...getToken()
    //       }
    //     })
    //     .then(resp => resp.json())
    //     .then(data => {
    //       // console.log(data)
    //       setContacts(data)
    //   })}

    function handleSubmit(e){
        e.preventDefault();
        
        const strongParams = {
            order: {
                PO: newOrder.PO,
                cases: newOrder.cases,
                kilos: newOrder.kilos,
                price_kg: newOrder.price_kg,
                price_total: newOrder.price_total,
                product_id: newOrder.product_id,
                contact_id: newOrder.contact_id,
                payment_id: newOrder.payment_id,
                packing_id: newOrder.packing_id,
                port_from: newOrder.port_from,
                port_to: newOrder.port_to,
                selected_size: newOrder.selected_size,
                selected_freeze: newOrder.selected_freeze,
                selected_glaze: newOrder.selected_glaze,
                shipment_date: newOrder.shipment_date,
                catching_method: newOrder.catching_method,
                total_kilos: newOrder.total_kilos,
                order_status: newOrder.order_status,
                order_ref_number: newOrder.order_ref_number,
                PO_date: newOrder.PO_date,
                user_id: currentUser.id
            }
        }

        fetch(baseUrl + '/orders',{
            method: "POST",
            headers: {
                ...headers,
                ...getToken()
            },
            body: JSON.stringify(strongParams)
        })
        .then(resp => resp.json())
        .then(data => {
            handleGetOrders(e)
            navigate('/orders')
        })

        setNewOrder({
            PO: null,
            cases: null,
            kilos: null,
            price_kg: null,
            price_total: null,
            product_id: null,
            contact_id: null,
            user_id: null,
            payment_id: null,
            packing_id: null,
            port_from: "",
            port_to: "",
            selected_size: "",
            selected_freeze: "",
            selected_glaze: "",
            catching_method: "",
            shipment_date: "",
            PO_date: "",
            order_ref_number: null,
            order_status: "New Order",
            shipment_date: "",
            total_kilos: null,
            specification: "",
            user_id: currentUser.id
        })
    }

    // .then((response) => {
    //     if (response.ok) {
    //       response.json().then((newMovie) => console.log(newMovie));
    //     } else {
    //       response.json().then((errorData) => setErrors(errorData.errors));
    //     }
    //   })
    // function handleSubmit(){
    //     console.log(newOrder)
    //     console.log(currentUser.id)
    // }
  
    return (
    <>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Container>
            <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation = {4}  padding = {4}>
                
                <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate autoComplete="off">
                    <h3>  Order Details</h3>
                    

                    <TextField id="PO" label="PO#" type="number" name="PO" onChange={handleFormData}/>
                    <TextField id="contact_id" name="contact_id" select label="Seller" value={contact} onChange={handleContactChange}>
                    {contacts.map((option) => (
                        <MenuItem key={option.value} value={option.value} defaultValue = "">
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                    <TextField id="PO_date" name="PO_date" label="PO Date" type="date" defaultValue="2022-01-01" sx={{ width: 220 }} InputLabelProps={{
                    shrink: true,
                    }} onChange={handleFormData}/>
                    <TextField id="cases" name="cases" label="Cartons" type="number"  onChange={handleFormData}/>
                    <TextField id="packing_id" name="packing_id" select label="Packing Type" value={packing} onChange={handleChange}>
                    {packings.map((option) => (
                        <MenuItem key={option.value} value={option.value} defaultValue = "">
                        {option.label}
                        </MenuItem>
                    ))}
                    </TextField>
                    <TextField id="kilos" name="kilos" label="Kilos/Carton"  type="number" onChange={handleFormData}/>
                    <TextField id="price_kg" name="price_kg" label="Price per kgs"  type="number" onChange={handleFormData}/>
                    <TextField id="total_kilos" name="total_kilos" label="Total Kilos" type="search" onChange={handleFormData}/>
                    <TextField id="order_ref_number" name="order_ref_number"  label="Order Ref#" type="search" onChange={handleFormData}/>
                </Box>
            </Paper>
            <br/>
            <br/>
            <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation = {4}  padding = {4}>
                
                <Box component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate autoComplete="off">
                <h3>Product Details</h3>
                <TextField id="product_id" name="product_id" select label="Product Type" value={product} onChange={handleChangeProduct}>
                    {products.map((option) => (
                        <MenuItem key={option.value} value={option.value} defaultValue = "">
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField id="selected_size" name="selected_size" label="Size" type="search" onChange={handleFormData}/>
                <TextField id="selected_freeze" name="selected_freeze" select label="Freeze" value={freezeType} onChange={handleChangeFreezeType}>
                    {freezings.map((option) => (
                        <MenuItem key={option.value} value={option.value} defaultValue = "">
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                
                <TextField id="selected_glaze" name="selected_glaze" label="Glaze" type="search" onChange={handleFormData}/>
                <TextField id="catching_method" name="catching_method" select label="Catching Method" value={catchType} onChange={handleChangeCatchType}>
                    {catchings.map((option) => (
                        <MenuItem key={option.value} value={option.value} defaultValue = 'trawler'>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField id="specifications" name="specifications" label="Specification" type="search" onChange={handleFormData}/>
            </Box>
        </Paper>
        <br/>
        <br/>
        <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation = {4}  padding = {4}>
            
            <Box component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate autoComplete="off">
                <h3>Shipping and Payment</h3>
                <TextField id="port_from" name="port_from" label="Port (from)" type="search" onChange={handleFormData}/>
                <TextField id="port_to" name="port_to" label="Port (to)" type="search" onChange={handleFormData}/>
                <TextField id="payment_id" name="payment_id" select label="Payment Type" value={payment} onChange={handleChangePayment}>
                {payments.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
                <TextField id="shipping_date" name="shipping_date" label="Shipping Date" type="date" defaultValue="2022-01-01" sx={{ width: 220 }} InputLabelProps={{
                    shrink: true,
                    }} onChange={handleFormData}/>

                {/* {errors.length > 0 && (
                    <ul style={{ color: "red" }}>
                    {errors.map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                    </ul>
                )} */}
            </Box>
        </Paper>
        <br/>
        <br/>
        <Button onClick = {handleSubmit} variant="outlined">Create Order</Button>
        {/* <Button onClick = {()=>console.log(newOrder)} variant="outlined">Create Order</Button> */}
        </Container>
        <br/>
        <br/>
        <Footer/>
    </>
    
  )
}
