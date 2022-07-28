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
import Modal from '@mui/material/Modal';


//React Router//
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//Components//
import ScrollToTop from '../../components/ScrollToTop'
import Footer from '../../components/Footer/Footer';
import Dashboard_Sidebar from '../../components/Dashboard_Sidebar/Dashboard_Sidebar'
import "./Inquiries.scss"


//Redux//
import {useSelector, useDispatch} from 'react-redux';
import {deleteInquiry, loadInquiries, sendInquiry, editInquiry} from "../../actions/inquiries"

function Inquiries() {
 
  //Redux States
  const loggedIn = useSelector(state => state.sessions.loggedIn)
  const currentUser = useSelector(state => state.sessions.currentUser)

  const inquiries = useSelector(state => state.inquiries)
  const requesting = useSelector(state=>state.requesting)

  const dispatch = useDispatch()

  //Local States
  const [previous, setPrevious] = React.useState({});
  const [searchTerm, setSearchTerm] = useState('')  
  const [editMode, setEditMode] = useState(false)
  const [updatedInquiries, setUpdatedInquiries] = useState([])
  const [open, setOpen] = React.useState(false);
  const [inquiryModal, setInquiryModal] = useState({})
  const [localInquiry, setLocalInquiry] = useState(inquiries)

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
    {
      id: 'status',
      label: 'Status',
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

  function onConfirmEditMode(inquiry){
    setEditMode(!editMode)

    const id = inquiry.id

       console.log(inquiry)
    
      const strongParams = {
        order_inquiry: {
        item_id: inquiry.item_id,
        product_name: inquiry.product_name,
        quantity: inquiry.quantity,
        packing: inquiry.packing,
        glaze: inquiry.glaze,
        shipment_date: inquiry.shipment_date,
        contact_name: inquiry.contact_name, 
        user_id: currentUser.id,
        contact_id: inquiry.contact_id,
        status: "EDITED"
        }
      }
      console.log(strongParams)
      dispatch(editInquiry(navigate, strongParams, id))
  }

  const handleOpen = (inquiryModal) => {
    setInquiryModal(inquiryModal)
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  function onChange(e, inquiry){
    console.log(inquiry.id)
    const name = e.target.name
      const value = e.target.value

      const newArr = localInquiry.map(obj => {
        if (obj.id === inquiry.id) {
          return {...obj, [name] : value};
        }
      
        return obj;
      });

      console.log(newArr)

      setLocalInquiry(newArr)
      
  //     const updated = {
  //       ...localInquiry,
  //       [name] : value
  //   }
  //   console.log(updated)

  //   var myData = Object.keys(updated).map(key => {
  //     return updated[key];
  // })

  // console.log(myData)

      // setLocalInquiry({
      //     ...localInquiry,
      //     [name] : value
      // })
  }

  function handleDelete(inquiry){
    const id = inquiry.id 
    const updatedInquiryList= [...localInquiry.filter((inquiryF) => inquiryF.id !== id)]
    setLocalInquiry(updatedInquiryList)
    dispatch(deleteInquiry(navigate, inquiry.id))
  }

  function handleSendInquiry(inquiryModal){

    const id = inquiryModal.inquiryModal.id
    const strongParams = {
      order_inquiry: {
      item_id: inquiryModal.inquiryModal.item_id,
      product_name: inquiryModal.inquiryModal.product_name,
      quantity: inquiryModal.inquiryModal.quantity,
      packing: inquiryModal.inquiryModal.packing,
      glaze: inquiryModal.inquiryModal.glaze,
      shipment_date: inquiryModal.inquiryModal.shipment_date,
      contact_name: inquiryModal.inquiryModal.contact_name, 
      user_id: currentUser.id,
      contact_id: inquiryModal.inquiryModal.contact_id,
      status: "SENT"
      }
    }

    dispatch(sendInquiry(navigate, strongParams, id))
  }

  function CustomTableCell({inquiry, name, onChange}){
    return(
    <TableCell align="center" className="tableCell">
      { editMode ? (<TextField value={inquiry[name]} name={name} onChange={e => onChange(e, inquiry)} className="input"/>) : (inquiry[name])}
    </TableCell>
    );
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid grey',
    boxShadow: 24,
    p: 4,
  };


  if (requesting){
    //create loading component here
    return <h1> Loading.... </h1>
  }

  function ChildModal(inquiryModal) {
    const [open, setOpen] = React.useState(false);
    const handleSend = () => {
      handleSendInquiry(inquiryModal)
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <React.Fragment>
        <Button onClick={handleSend}  variant="outlined" style={{paddingLeft: 13, textDecoration: 'none'}}>Send Now</Button>
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 800, height: 500 }}>
            <h1 id="child-modal-title">Your inquiry has been shared.</h1>
            
            <Button onClick={handleClose} variant="outlined" style={{paddingLeft: 13, textDecoration: 'none'}}>Return</Button>
          </Box>
        </Modal>
      </React.Fragment>
    );
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
          
          localInquiry.map((inquiry) => (
          <TableRow key={inquiry.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
            {editMode ? (
                  <>
                    <IconButton aria-label="done" onClick={() => onConfirmEditMode(inquiry)} >
                      <DoneIcon />
                    </IconButton>
                    <IconButton aria-label="revert" onClick={() => onToggleEditMode2(inquiry.id)} >
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
            <TableCell className="tableCell">
              <span className={`status ${inquiry.status}`}>{inquiry.status}</span>
            </TableCell>
            {/* <TableCell align="center">
              <Link  onClick = {()=> console.log(inquiry.id)} variant="outlined" style={{paddingLeft: 13, textDecoration: 'none'}} to={`/orders/${inquiry.id}`}><Button variant="outlined" >View</Button></Link>
            </TableCell> */}
            <TableCell align="center">
              <Button  onClick={()=> handleOpen(inquiry)} variant="outlined" style={{paddingLeft: 13, textDecoration: 'none'}}>Send</Button>
            </TableCell>
            <TableCell align="center" onClick = {()=> handleDelete(inquiry)}><Button variant="outlined" color="error">Delete</Button></TableCell>
          </TableRow>
          )) ) : (null)}
        </TableBody>
      </Table>
    </Paper>
    </Container>  
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h5" component="h1">Inquiry Preview </Typography>
        <br/>
        {/* <Typography id="modal-modal-title" variant="p" component="p">Company: {inquiryModal.contact.company}</Typography> */}
        {/* <Typography id="modal-modal-title" variant="p" component="p">Email: {inquiryModal.contact.email}</Typography> */}
        <br/>
        <Typography id="modal-modal-title" variant="p" component="p">Product: {inquiryModal.product_name} </Typography>
        <Typography id="modal-modal-title" variant="p" component="p">Packing: {inquiryModal.packing} </Typography>
        <Typography id="modal-modal-title" variant="p" component="p">Size: U/3	- 2900 kgs @ 7.90 usd/kg </Typography>
        <Typography id="modal-modal-title" variant="p" component="p">Size: 3/6	- 2160 kgs @. 7.20 usd/kg</Typography>
        <Typography id="modal-modal-title" variant="p" component="p">Size: 6/10	- 1280 kgs @. 6.25 usd/kg</Typography>
        <br/>
        <Typography id="modal-modal-title" variant="p" component="p">From</Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}> {currentUser.username} </Typography>
        <br/>
        {/* <Button  variant="outlined" style={{paddingLeft: 13, textDecoration: 'none'}}>Send Now</Button> */}
        <ChildModal inquiryModal={inquiryModal}/>
      </Box>
    </Modal>
    <br/>
    <Footer/>
    </>
  )
}

export default Inquiries 