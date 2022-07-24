import React, {useEffect, useState} from 'react';

//Material UI Icons//
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';

//Material UI Components//
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, Container, Box } from '@mui/material'
import {Button,Card,CardContent,TextField,InputAdornment,SvgIcon, Typography} from '@mui/material';

//React Router//
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//Components//
import ScrollToTop from '../../components/ScrollToTop'
import Footer from '../../components/Footer/Footer';
import Dashboard_Sidebar from '../../components/Dashboard_Sidebar/Dashboard_Sidebar'

//Redux//
import {useSelector, useDispatch} from 'react-redux';
import {deleteInquiry, loadInquiries} from "../../actions/inquiries"

function Inquiries({handleDeleteInquiry}) {
 
  //Redux States
  const loggedIn = useSelector(state => state.sessions.loggedIn)
  const inquiries = useSelector(state => state.inquiries)
  const requesting = useSelector(state=>state.requesting)

  const dispatch = useDispatch()

  //Local States
  const [previous, setPrevious] = React.useState({});
  const [searchTerm, setSearchTerm] = useState('')  
  const [editMode, setEditMode] = useState(false)
  const [updatedInquiries, setUpdatedInquiries] = useState([])

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

  
  //React and React-Router
  const navigate = useNavigate()
  
  useEffect(() => {
    if(loggedIn) {
      dispatch(loadInquiries())
    } else {
      navigate("/login")
    }
  }, [loggedIn])
  

  //Page Action Functions
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

  function handleDelete(inquiry_id){
    // console.log(inquiry_id)
    dispatch(deleteInquiry(navigate, inquiry_id))
  }

  function CustomTableCell({inquiry, name, onChange}){
    return(
    <TableCell align="center" className="tableCell">
      { editMode ? (<TextField value={inquiry[name]} name={name} onChange={e => onChange(e, inquiry)} className="input"/>) : (inquiry[name])}
    </TableCell>
    );
  };

      

    
  if (requesting){
    //create loading component here
    return <h1> Loading.... </h1>
  }

  return (
    <>
    <ScrollToTop/>
    <Dashboard_Sidebar/>
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
                      onClick={() => console.log(inquiry.id)}
                    >
                      <CancelIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton aria-label="delete" onClick={() => onToggleEditMode2(inquiry.id)}>
                    <EditIcon />
                  </IconButton>
                )}
                
            <CustomTableCell {...{inquiry, name: "product_name", onChange}} />
            <CustomTableCell {...{inquiry, name: "contact_name", onChange}} />
            <CustomTableCell {...{inquiry, name: "packing", onChange}} />
            <CustomTableCell {...{inquiry, name: "glaze", onChange}} />
            <CustomTableCell {...{inquiry, name: "shipment_date", onChange}} />
            {/* <TableCell align="center">
              <Link  onClick = {()=> console.log(inquiry.id)} variant="outlined" style={{paddingLeft: 13, textDecoration: 'none'}} to={`/orders/${inquiry.id}`}><Button variant="outlined" >View</Button></Link>
            </TableCell> */}
            <TableCell align="center">
              <Link  onClick = {()=> console.log(inquiry.id)} variant="outlined" style={{paddingLeft: 13, textDecoration: 'none'}} to={`/orders/${inquiry.id}`}><Button variant="outlined" >Send</Button></Link>
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