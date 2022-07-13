import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import OrderCard from './OrderCard'
import { baseUrl, headers, getToken } from '../../Globals'
import Stack from '@mui/material/Stack';
import { Paper, Container, Box, Grid } from '@mui/material'

import {Button,Card,CardContent,TextField,InputAdornment,SvgIcon, Typography} from '@mui/material';
import Fade from '@mui/material/Fade';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';


import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


import {Link} from 'react-router-dom'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Footer from '../../Footer/Footer'










export default function OrdersList({loggedIn, orders, handleDeleteOrder, handleGetOrder, navigateOrder, handleSearchOrder }) {
  const [status, setStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('')  
  const navigate = useNavigate()
    useEffect(()=> {
        if (!loggedIn){
            navigate("/login")
        }
        }, [loggedIn])

        const columns = [
          { id: 'PO', label: 'PO#', minWidth: 170 },
          {
            id: 'date',
            label: 'Date',
            minWidth: 130,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
          },
          {
            id: 'product',
            label: 'Product',
            minWidth: 130,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
          },
          {
            id: 'cartons',
            label: 'Cartons',
            minWidth: 130,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
          },
          {
            id: 'seller',
            label: 'Seller',
            minWidth: 130,
            align: 'center',
            format: (value) => value.toFixed(2),
          },
        ];
    const ordersCards = orders.filter((order) => {
      if (searchTerm == ""){
        return order
      } else if (order.product.name.toLowerCase().includes(searchTerm.toLowerCase())){
        return order
      }
    }).map(order => <OrderCard key={order.id} order={order} handleDeleteOrder={handleDeleteOrder} handleGetOrder={handleGetOrder}/>)
    
    function handleClick(order_id){
      fetch(baseUrl + `/orders/${order_id}`, {
        headers: {
          ...headers,
          ...getToken()
        }
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        handleGetOrder(data)  
        navigate(`/orders/${order_id}`)
    })
    }

    function handleDelete(order_id){
      handleDeleteOrder(order_id)
    }

    const handleChange = (event) => {
      setStatus(event.target.value);
    };

    function handleSearch(e){
      handleSearchOrder(e)
    }

    const options = [
      'None',
      'Atria',
      'Callisto',
      'Dione',
      'Ganymede',
      'Hangouts Call',
      'Luna',
      'Oberon',
      'Phobos',
      'Pyxis',
      'Sedna',
      'Titania',
      'Triton',
      'Umbriel',
    ];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickDots = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const ITEM_HEIGHT = 48;




  return (
    <>
    <Container style={{ minHeight: '100vh' }}>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      
      
      <Box sx={{alignItems: 'center', display: 'flex', justifyContent: 'space-between',flexWrap: 'wrap',m: -1}}>
        <Typography sx={{ m: 1 }} variant="h4">Orders</Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={(<UploadIcon fontSize="small" />)} sx={{ mr: 1 }}>Import</Button>
          <Button startIcon={(<DownloadIcon fontSize="small" />)} sx={{ mr: 1 }} >Export</Button>
          <Button color="primary" variant="contained" onClick = {()=> navigate(`/new_order`)}>New Order</Button>
        </Box>
      </Box>


      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        color="action"
                        fontSize="small"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search product"
                variant="outlined"
                onChange={event => setSearchTerm(event.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <br/>
      
  
           
            
      <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation = {2}  padding = {4}>
            <TableContainer sx={{ maxHeight: 1000 }}>
              <Stack>
                {/* <TextField id="filled-search" label="Search Product" type="search" variant="filled" colSpan={2} onChange={event => setSearchTerm(event.target.value)}/> */}
                <br/>
                <Box sx={{ minWidth: 120 }}>
                  {/* <FormControl style={{m: 1,minWidth: 120}}>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={status} label="Status" onChange={handleChange}>
                      <MenuItem value={"All"}>All</MenuItem>
                      <MenuItem value={"New Order"}>New Order</MenuItem>
                      <MenuItem value={"Complete"}>Complete</MenuItem>
                    </Select>
                  </FormControl> */}
                </Box>
              </Stack>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.filter((order) => {
                    if (searchTerm == ""){
                      return order
                    } else if (order.product.name.toLowerCase().includes(searchTerm.toLowerCase())){
                      return order
                    }
                  })
                  .map((order) => (
                  <TableRow key={order.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
                    <TableCell component="th" scope="row" >{order.PO}</TableCell>
                    <TableCell align="center" >{order.PO_date}</TableCell>
                    <TableCell align="center" >{order.product.name}</TableCell>
                    <TableCell align="center" >{order.cases}</TableCell>
                    <TableCell align="center" >{order.contact.company}</TableCell>
                    
                    <TableCell align="center">
                      {/* <Button onClick = {()=> handleClick(order.id)} variant="outlined" color="error">View2</Button> */}
                      <Link  onClick = {()=> handleClick(order.id)} variant="outlined" style={{paddingLeft: 13, textDecoration: 'none'}} to={`/orders/${order.id}`}><Button variant="outlined" >View</Button></Link>
                    </TableCell>
                    <TableCell align="center" onClick = {()=> handleDelete(order.id)}><Button onClick = {()=> console.log(orders)} variant="outlined" color="error">Delete</Button></TableCell>
                    {/* <TableCell align="center">
                      <Button id="fade-button" aria-controls={open ? 'fade-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClickDots}>More</Button>
                      <Menu id="fade-menu" MenuListProps={{'aria-labelledby': 'fade-button',}} anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
                        <MenuItem onClick = {()=> handleClick(order.id)}>View</MenuItem>
                        <MenuItem onClick={handleClose}>Edit</MenuItem>
                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                      </Menu>
                    </TableCell> */}
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
      </Paper>
    </Container>
    <br/>
      <br/>
      <br/>
      
    <Footer/>
    </>
  )
}