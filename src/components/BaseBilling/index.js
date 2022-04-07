import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DenseAppBar from '../headerComponent/DenseAppBar'
import Pagination from '@mui/material/Pagination';
import EditIcon from '@mui/icons-material/Edit';
import { useState,useEffect } from 'react';
import BillingForm from '../FormComponent/BillingForm/BillingForm'
import { getAllTimesheet, getBilling,getAllProjects } from '../Service/service';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';



const BaseBilling = () => {
  const [billingData,setBillingData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentpage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState({})
  const [formType,setFormType]=useState('');
  const [isReload,setReload]=useState(false);
  const [projectList,setProjectList]=useState([]);
  const [currentProject,setCurrentProject]=useState('ALL PROJECTS');
  useEffect(async () => {
    console.log('getting here after selecting')
    setReload(false);
    const data= await getBilling()
    console.log('data billing is',data)
    setBillingData(data);
    console.log('current billing data',billingData[0])
    setCurrentRow(billingData[0])
    setTotalPages(Math.ceil(billingData.length / rowsPerPage));
  },[isReload,currentpage,currentProject]);
  useEffect(() => { }, [])
  const onChangeHandler = (
    event
  ) => {
    setCurrentPage(event.target.value);
  };
  const handleEditClick = (data) => {
    setCurrentRow(data)
    setFormType('edit');
    setOpen(true);

  }
  const handleAdd=()=>{
    setFormType('add');
    setOpen(true);
  }
  const handleReload=()=>{
    setReload(true);
  }
  useEffect(async()=>{
    const responseProject= await getAllProjects();                                                                                                                                                                                  
    setProjectList(responseProject);
    console.log('project list is',projectList)                                                                                                                                                                        
  },[])
  const handleProject=async(e)=>{
    setCurrentProject(e.target.value)

  }
  console.log('billing data line 79',billingData?.message)


  return (<div style={{width:'80%'}}>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Billing
        </Typography>
        <Stack direction="row"  style={{backgroundColor:'#1976d2',width:'70%',marginLeft:'40%',alignItems:'right',justifyContent:'center'} }>
          <Button variant="outlined" style={{color:'#1976d2',backgroundColor:'white',display:'flex'}} onClick={handleAdd}>Add Entry <AddIcon/></Button>
        </Stack>
      </Toolbar>

    </AppBar>

  </Box>
  {billingData && billingData?.message!=='No Items Found' &&(<TableContainer component={Paper}>
      <Table sx={{ minWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {billingData.map((row) => (
            
            <>
              <TableRow key={row?.id}>
                <TableCell component="th" scope="row" style={{ paddingBottom: '1%' }}>
                  {row?.projectName}
                </TableCell>
                <TableCell align="center" style={{ paddingBottom: '1%' }}>{row?.role}</TableCell>
                <TableCell align="center"  component="th" scope="row" style={{ paddingBottom: '1%' }}>
                  {row?.amount}
                </TableCell>
                <TableCell align="center" style={{ paddingBottom: '1%' }}><EditIcon onClick={(e) => handleEditClick(row)} /></TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
      {/* <Pagination count={10}
        page={currentpage}
        onChange={(e) => { setCurrentPage(e.target.value) }} /> */}
    </TableContainer>)}
    {!billingData&&(<>
    <div style={{width:'100%',height:'100%',backgroundColor:'white',color:'red',textAlign:'center',justifyContent:'center'}}><h2 style={{color:'red'}}>No Entries Found, Please add Entries</h2>
    </div>

    </>)    }

  
    <BillingForm formType={formType} setFormType={setFormType} row={currentRow} open={open} setOpen={setOpen} handleReload={handleReload}/>

  </div>)
}

export default BaseBilling;

