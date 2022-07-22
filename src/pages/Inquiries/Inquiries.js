import React, {useEffect, useState} from 'react';
import Dashboard_Sidebar from '../../components/Dashboard_Sidebar/Dashboard_Sidebar'
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
import ScrollToTop from '../../components/ScrollToTop'

import {Link} from 'react-router-dom'
import Footer from '../../components/Footer/Footer';

import IconButton from '@mui/material/IconButton';

import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import {useSelector, useDispatch} from 'react-redux';
import {loadInquiries} from "../../actions/inquiries"

function Inquiries({handleGetOrders, handleDeleteInquiry}) {
  const createData = (name, calories, fat, carbs, protein) => ({
    id: name.replace(" ", "_"),
    name,
    calories,
    fat,
    carbs,
    protein,
    isEditMode: false
  });  

  const loggedIn = useSelector(state => state.sessions.loggedIn)
  const inquiries = useSelector(state => state.inquiries)
  const requesting = useSelector(state=>state.requesting)

  useEffect(()=> {
    if (!loggedIn){
        navigate("/login")
    }
    }, [loggedIn])
  

  const dispatch = useDispatch()
  // useEffect(()=> {
  //   if (!loggedIn){
  //       navigate("/login")
  //   } else {
  //     dispatch(loadInquiries())
  //   }
  //   }, [loggedIn])
  
  
    const [previous, setPrevious] = React.useState({});
    const [searchTerm, setSearchTerm] = useState('')  
    const [rows, setRows] = React.useState([
      createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
      createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
      createData("Eclair", 262, 16.0, 24, 6.0)
    ]);

    const [editMode, setEditMode] = useState(false)
    const [updatedInquiries, setUpdatedInquiries] = useState([])
    
    

    

    const navigate = useNavigate()

    const onToggleEditMode = id => {
      setRows(state => {
        return rows.map(row => {
          if (row.id === id) {
            return { ...row, isEditMode: !row.isEditMode };
          }
          return row;
        });
      });
    };

    function onToggleEditMode2(id){
      setEditMode(!editMode)
    }

    const onChange = (e, inquiry) => {
      if (!previous[inquiry.id]) {
        setPrevious(state => ({ ...state, [inquiry.id]: inquiry }));
      }
      const value = e.target.value;
      const name = e.target.name;
      const { id } = inquiry;
      const newInquiries = inquiries.map(inquiry => {
        if (inquiry.id === id) {
          return { ...inquiry, [name]: value };
        }
        return inquiry;
      });
      setUpdatedInquiries(newInquiries);
    };

    const onRevert = id => {
      const newRows = rows.map(row => {
        if (row.id === id) {
          return previous[id] ? previous[id] : row;
        }
        return row;
      });
      setRows(newRows);
      setPrevious(state => {
        delete state[id];
        return state;
      });
      onToggleEditMode(id);
    };

    

    function handleDelete(order_id){
        handleDeleteInquiry(order_id)
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

      function handleGetInq(){
          console.log(inquiries, "thef")
      }

      // const useStyles = makeStyles(theme => ({
      //   root: {
      //     width: "100%",
      //     marginTop: theme.spacing(3),
      //     overflowX: "auto"
      //   },
      //   table: {
      //     minWidth: 650
      //   },
      //   selectTableCell: {
      //     width: 60
      //   },
      //   tableCell: {
      //     width: 130,
      //     height: 40
      //   },
      //   input: {
      //     width: 130,
      //     height: 40
      //   }
      // }));

      const CustomTableCell = ({ row, name, onChange }) => {
        const { isEditMode } = row;

      
        return (
          <TableCell align="left" className="tableCell">
            {isEditMode ? (
              <TextField
                value={row[name]}
                name={name}
                onChange={e => onChange(e, row)}
                className="input"
              />
            ) : (
              row[name]
            )}
          </TableCell>
        );
      };

      function CustomTableCell2({inquiry, name, onChange}){
        return(
        <TableCell align="center" className="tableCell">
          { editMode ? (<TextField value={inquiry[name]} name={name} onChange={e => onChange(e, inquiry)} className="input"/>) : (inquiry[name])}
        </TableCell>
        );
      };

      

    const columns = [
        { id: 'product', label: 'Product', minWidth: 170 },
        {
            id: 'contact',
            label: 'Contact',
            minWidth: 130,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'packing',
            label: 'Packing',
            minWidth: 130,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'glaze',
            label: 'Glaze',
            minWidth: 130,
            align: 'center',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'shipment_date',
            label: 'Shipped By',
            minWidth: 130,
            align: 'center',
            format: (value) => value.toFixed(2),
        },
        ];

  if (requesting){
    //create loading component here
    return <h1> Loading.... </h1>
  }

  return (
    <>
    <ScrollToTop/>
    <Dashboard_Sidebar handleGetOrders={handleGetOrders}/>
    <Container style={{ minHeight: '100vh' }}>
      <Box sx={{alignItems: 'center', display: 'flex', justifyContent: 'space-between',flexWrap: 'wrap',m: -1}}>
        <Typography sx={{ m: 1 }} variant="h4">Inquiries</Typography>
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
                placeholder="Search inquiry"
                variant="outlined"
                onChange={event => setSearchTerm(event.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <br/>

      <Paper className="root">
      <Table className="table" aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
              {columns.map((column) => (
              <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>{column.label}</TableCell>
              ))}
          </TableRow>
        </TableHead>

        <TableBody>
        {/* {updatedInquiries ? (console.log("HEY")) : (null)} */}
          {updatedInquiries ? (
          
          inquiries.map((inquiry) => (
          <TableRow key={inquiry.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
            {editMode ? (
                  <>
                    <IconButton
                      aria-label="done"
                      onClick={() => onToggleEditMode2(inquiry.id)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => onRevert(inquiry.id)}
                    >
                      <CancelIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton aria-label="delete" onClick={() => onToggleEditMode2(inquiry.id)}>
                    <EditIcon />
                  </IconButton>
                )}
                
            <CustomTableCell2 {...{inquiry, name: "product_name", onChange}} />
            <CustomTableCell2 {...{inquiry, name: "contact_name", onChange}} />
            <CustomTableCell2 {...{inquiry, name: "packing", onChange}} />
            <CustomTableCell2 {...{inquiry, name: "glaze", onChange}} />
            <CustomTableCell2 {...{inquiry, name: "shipment_date", onChange}} />
            <TableCell align="center">
              <Link  onClick = {()=> handleClick(inquiry.id)} variant="outlined" style={{paddingLeft: 13, textDecoration: 'none'}} to={`/orders/${inquiry.id}`}><Button variant="outlined" >View</Button></Link>
            </TableCell>
            <TableCell align="center">
              <Link  onClick = {()=> handleClick(inquiry.id)} variant="outlined" style={{paddingLeft: 13, textDecoration: 'none'}} to={`/orders/${inquiry.id}`}><Button variant="outlined" >Send</Button></Link>
            </TableCell>
            <TableCell align="center" onClick = {()=> handleDelete(inquiry.id)}><Button onClick = {()=> console.log(inquiries)} variant="outlined" color="error">Delete</Button></TableCell>
          </TableRow>
          )) ) : (null)}
        </TableBody>
      </Table>
    </Paper>
    </Container>  

    <br/>
    <Footer/>
    </>
  )
}

export default Inquiries