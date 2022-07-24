import React, {useEffect, useState} from 'react'

//Material UI Icons//
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';

//Material UI Components//
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, Container, Box } from '@mui/material'
import {Button,Card,CardContent,TextField,InputAdornment,SvgIcon, Typography} from '@mui/material';
import Stack from '@mui/material/Stack';

//Components//
import Footer from '../../Footer/Footer'
import Dashboard_Sidebar from '../../components/Dashboard_Sidebar/Dashboard_Sidebar'

//React Router//
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//Redux//
import {useSelector, useDispatch} from 'react-redux';
import {loadOrders, deleteOrder} from "../../actions/orders"


function OrdersList({ handleGetOrder}) {
   //Local States
  const [status, setStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('')  

  //Redux States
  const loggedIn = useSelector(state => state.sessions.loggedIn)
  const orders = useSelector(state => state.orders)

  const dispatch = useDispatch()

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

  //React and React-Router
  const navigate = useNavigate()

  useEffect(() => {
    if(loggedIn) {
      dispatch(loadOrders())
    } else {
      navigate("/login")
    }
  }, [loggedIn])


  function handleSingleOrderClick(order_id){
    handleGetOrder(order_id)  
  }

  function handleDelete(order_id){
    // console.log(inquiry_id)
    dispatch(deleteOrder(navigate, order_id))
  }



  return (
    <>
    <Dashboard_Sidebar/>
    <Container style={{ minHeight: '100vh' }}>
      <br/>
      <br/>
      
      <Box sx={{alignItems: 'center', display: 'flex', justifyContent: 'space-between',flexWrap: 'wrap',m: -1}}>
        <Typography sx={{ m: 1 }} variant="h4">Orders</Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={(<UploadIcon fontSize="small" />)} sx={{ mr: 1 }}>Import</Button>
          <Button startIcon={(<DownloadIcon fontSize="small" />)} sx={{ mr: 1 }} >Export</Button>
          <Button color="primary" variant="contained" onClick = {()=> navigate(`/new_order`)}>New Order</Button>
          <Button color="primary" variant="contained" onClick = {()=> navigate(`/new_order`)}>New Inquiry</Button>
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
                <br/>
                <Box sx={{ minWidth: 120 }}>
                  
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
                    <TableCell component="th" scope="row" >{order.po_number}</TableCell>
                    <TableCell align="center" >{order.PO_date}</TableCell>
                    <TableCell align="center" >{order.cartons}</TableCell>
                    <TableCell align="center" >{order.cartons}</TableCell>
                    <TableCell align="center" >{order.cartons}</TableCell>
                    <TableCell align="center">
                      <Link  to={`/orders/${order.id}`} onClick = {() => handleSingleOrderClick(order.id)} variant="outlined" style={{paddingLeft: 13, textDecoration: 'none'}} ><Button variant="outlined" >View</Button></Link>
                    </TableCell>
                    <TableCell align="center" onClick = {()=> handleDelete(order.id)}><Button onClick = {()=> console.log(orders)} variant="outlined" color="error">Delete</Button></TableCell>
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

export default OrdersList