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
import EditForm from '../FormComponent/EditForm'
import { getAllTimesheet } from '../Service/service';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const BillingBase = () => {
  const [billingData,setBillingData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentpage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState({})
  const [formType,setFormType]=useState('');
  const [isReload,setReload]=useState(false)
  useEffect(async () => {
    setReload(false);
    const data= await getAllTimesheet();
    console.log('data billing is',data)
    setBillingData(data);
    console.log('current billing data',billingData[0])
    setCurrentRow(billingData[0])
    setTotalPages(Math.ceil(billingData.length / rowsPerPage));
  },[isReload,currentpage]);
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


  return (<div style={{width:'80%'}}>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Time Sheet
        </Typography>
        <Button variant="outlined"style={{color:'#0d6efd',backgroundColor:'white',marginLeft:'60%'}} onClick={handleAdd}>Add Entry <AddIcon/></Button>
      </Toolbar>

    </AppBar>
  </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Employee ID</TableCell>
            <TableCell>Project Name</TableCell>
            <TableCell align="right">Month & Year</TableCell>
            <TableCell align="right">Planned Working Days</TableCell>
            <TableCell align="right">Actual Working Days</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {billingData.map((row) => (
            
            <>
              <TableRow key={row?.id}>
                <TableCell component="th" scope="row" style={{ paddingBottom: '1%' }}>
                  {row?.empNo}
                </TableCell>
                <TableCell align="right" style={{ paddingBottom: '1%' }}>{row.projectName}</TableCell>
                <TableCell align="right" style={{ paddingBottom: '1%' }}>{row.month}</TableCell>
                <TableCell component="th" scope="row" style={{ paddingBottom: '1%' }}>
                  {row.plannedWrkDys}
                </TableCell>
                <TableCell align="right" style={{ paddingBottom: '1%' }}>{row.actualWrkDys}</TableCell>
                <TableCell align="right" style={{ paddingBottom: '1%' }}>{row.amount}</TableCell>
                <TableCell align="right" style={{ paddingBottom: '1%' }}><EditIcon onClick={(e) => handleEditClick(row)} /></TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
      {/* <Pagination count={10}
        page={currentpage}
        onChange={(e) => { setCurrentPage(e.target.value) }} /> */}
    </TableContainer>
    <EditForm formType={formType} currentRow={currentRow} open={open} setOpen={setOpen} handleReload={handleReload}/>

  </div>)
}

export default BillingBase;

