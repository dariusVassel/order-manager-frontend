import React, {useEffect, useState} from 'react';
import Dashboard_Sidebar from '../Dashboard_Sidebar/Dashboard_Sidebar'
import { useNavigate } from 'react-router-dom'

import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { baseUrl, headers, getToken } from '../../Globals'
import Stack from '@mui/material/Stack';
import { Paper, Container, Box } from '@mui/material'

import {Button,Card,CardContent,TextField,InputAdornment,SvgIcon, Typography} from '@mui/material';


import {Link} from 'react-router-dom'
import Footer from '../Footer/Footer';

function Product({items, handleGetOrders}) {
  const [searchTerm, setSearchTerm] = useState('')  

  const navigate = useNavigate()

  const columns = [
    { id: 'species', label: 'Species', minWidth: 170 },
    {
        id: 'scientific_name',
        label: 'Scientific Name',
        minWidth: 130,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'color',
        label: 'Color',
        minWidth: 130,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'na',
        label: 'NA',
        minWidth: 130,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'na2',
        label: 'NA',
        minWidth: 130,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    ];
    function handleDelete(order_id){
      // handleDeleteOrder(order_id)
      console.log('hey')
    }

    function handleClick(order_id){
      //   fetch(baseUrl + `/orders/${order_id}`, {
      //     headers: {
      //       ...headers,
      //       ...getToken()
      //     }
      //   })
      //   .then(resp => resp.json())
      //   .then(data => {
      //     console.log(data)
      //     handleGetOrder(data)  
      //     navigate(`/orders/${order_id}`)
      // })
    
      console.log('hey')
      }
  
  return (
    (
      <>
      <Dashboard_Sidebar handleGetOrders={handleGetOrders}/>
      <Container style={{ minHeight: '100vh' }}>
        <Box sx={{alignItems: 'center', display: 'flex', justifyContent: 'space-between',flexWrap: 'wrap',m: -1}}>
          <Typography sx={{ m: 1 }} variant="h4">My Products</Typography>
          <Box sx={{ m: 1 }}>
            <Button startIcon={(<UploadIcon fontSize="small" />)} sx={{ mr: 1 }}>Import</Button>
            <Button startIcon={(<DownloadIcon fontSize="small" />)} sx={{ mr: 1 }} >Export</Button>
            <Button color="primary" variant="contained" onClick = {()=> navigate(`/new_order`)}>New Order</Button>
            <Button color="primary" variant="contained" onClick = {()=> navigate(`/new_order`)}>New item</Button>
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
                    {items
                    .map((item) => (
                    <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
                      <TableCell component="th" scope="row" >{item.species_name}</TableCell>
                      <TableCell align="center" >{item.scientific_name}</TableCell>
                      <TableCell align="center" >{item.color}</TableCell>
                      <TableCell align="center" >{item.species_name}</TableCell>
                      <TableCell align="center" >{item.species_name}</TableCell>
                      <TableCell align="center">
                        <Link  onClick = {()=> handleClick(item.id)} variant="outlined" style={{paddingLeft: 13, textDecoration: 'none'}} to={`/orders/${item.id}`}><Button variant="outlined" >View</Button></Link>
                      </TableCell>
                      <TableCell align="center" onClick = {()=> handleDelete(item.id)}><Button onClick = {()=> console.log(items)} variant="outlined" color="error">Delete</Button></TableCell>
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
  )
}

export default Product