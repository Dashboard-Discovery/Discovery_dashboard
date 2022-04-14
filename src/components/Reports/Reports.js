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
import { getResourceBetweenMonth } from '../Service/service';
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
// import './BillingBase.css';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import FilterListIcon from '@mui/icons-material/FilterList';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import ResourceReport from './ResourceReport';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const Reports=()=>{ 

const [currentReport,setCurrentReport]=useState('Resource');
const [fromMonth,setFromMonth]=useState('03');
const [toMonth,setToMonth]=useState('03');
const[fromYear,setFromYear]=useState('2022');
const [toYear,setToYear]=useState('2022');
const [isReload,setIsReload]=useState(false);
const monthData=[{'key':'01','value':'Jan'},{'key':'02','value':'Feb'},{'key':'03','value':'Mar'},{'key':'04','value':'Apr'},{'key':'05','value':'May'},{'key':'06','value':'Jun'},{'key':'07','value':'Jul'},{'key':'08','value':'Aug'},{'key':'09','value':'Sep'},{'key':'10','value':'Oct'},{'key':'11','value':'Nov'},{'key':'12','value':'Dec'}];


function converter(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}
function addMonths(date, months) {
  date.setMonth(date.getMonth() + months);
  return date;
}

const handleChangeFromMonth=(e)=>{
  setFromMonth(e.target.value);
}
const handleChangeFromYear=(e)=>{
  setFromYear(e.target.value);
}
const handleChangeToMonth=(e)=>{
  setToMonth(e.target.value);
}
const handleChangeToYear=(e)=>{
  setToYear(e.target.value);
}
const handleApplyFilters=()=>{
setIsReload(!isReload);
}
useEffect(()=>{
  if(currentReport==='Resource'){
    let currentDate=new Date();
    let currentMonth=converter(currentDate.getMonth());
    let currentYear=currentDate.getFullYear();
    setToMonth(currentMonth);
    setToYear(currentYear);
    let fromDate=addMonths(new Date(),-1);
    let fromMonth=converter(fromDate.getMonth());
    let fromYear=fromDate.getFullYear();
    setFromMonth(fromMonth);
    setFromYear(fromYear);
    const monthData=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    console.log('current dates',currentDate,currentMonth,currentYear,toMonth,toYear,fromDate,fromYear,fromMonth)
  
  }

},[]);


 const handleChangeReport=(e)=>{
   setCurrentReport(e.target.value);
 }
return(
    <div style={{width:'80%'}}>
       <Box sx={{ flexGrow: 1 }}>
       <Select
        value={currentReport}
        onChange={(e)=>{handleChangeReport(e)}}
        style={{marginRight:'20%',width:'40%',color:'black',backgroundColor:'white'}}
      ><MenuItem value={'Resource'}>Resource Report</MenuItem>
      <MenuItem value={'Project'}>Project Report</MenuItem>
      </Select>
    <AppBar position="static">
      <Toolbar variant="dense" className='toolbar-align'>
        <Stack direction="column">
        <Typography variant="h6" color="inherit" component="div">
          Reports
        </Typography>
        </Stack>
        <Stack direction="row" className='stack-box' >
          <Button variant="outlined" >
                            <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="30px" height="30px"><path d="M 28.8125 0.03125 L 0.8125 5.34375 C 0.339844 5.433594 0 5.863281 0 6.34375 L 0 43.65625 C 0 44.136719 0.339844 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 28.875 49.980469 28.9375 50 29 50 C 29.230469 50 29.445313 49.929688 29.625 49.78125 C 29.855469 49.589844 30 49.296875 30 49 L 30 1 C 30 0.703125 29.855469 0.410156 29.625 0.21875 C 29.394531 0.0273438 29.105469 -0.0234375 28.8125 0.03125 Z M 32 6 L 32 13 L 34 13 L 34 15 L 32 15 L 32 20 L 34 20 L 34 22 L 32 22 L 32 27 L 34 27 L 34 29 L 32 29 L 32 35 L 34 35 L 34 37 L 32 37 L 32 44 L 47 44 C 48.101563 44 49 43.101563 49 42 L 49 8 C 49 6.898438 48.101563 6 47 6 Z M 36 13 L 44 13 L 44 15 L 36 15 Z M 6.6875 15.6875 L 11.8125 15.6875 L 14.5 21.28125 C 14.710938 21.722656 14.898438 22.265625 15.0625 22.875 L 15.09375 22.875 C 15.199219 22.511719 15.402344 21.941406 15.6875 21.21875 L 18.65625 15.6875 L 23.34375 15.6875 L 17.75 24.9375 L 23.5 34.375 L 18.53125 34.375 L 15.28125 28.28125 C 15.160156 28.054688 15.035156 27.636719 14.90625 27.03125 L 14.875 27.03125 C 14.8125 27.316406 14.664063 27.761719 14.4375 28.34375 L 11.1875 34.375 L 6.1875 34.375 L 12.15625 25.03125 Z M 36 20 L 44 20 L 44 22 L 36 22 Z M 36 27 L 44 27 L 44 29 L 36 29 Z M 36 35 L 44 35 L 44 37 L 36 37 Z"/></svg>
             </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  </Box>
  <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<FilterListIcon/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filter Items</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Grid container spacing={2}>
  <Grid item xs={4}>
    <p>From</p>
    <Select value={fromMonth} onChange={(e)=>{handleChangeFromMonth(e)}}> {monthData.map((monthObj)=>{
      return <MenuItem value={monthObj.key}>{monthObj.value}</MenuItem>
    })} 
   </Select>
   <Select value={fromYear} onChange={(e)=>{handleChangeFromYear(e)}}> 
     <MenuItem value={'2019'}>2019</MenuItem>
     <MenuItem value={'2020'}>2020</MenuItem>
     <MenuItem value={'2021'}>2021</MenuItem>
     <MenuItem value={'2022'}>2022</MenuItem>
     <MenuItem value={'2023'}>2023</MenuItem>
     <MenuItem value={'2024'}>2024</MenuItem>
     <MenuItem value={'2025'}>2025</MenuItem>
   </Select>
  </Grid>
  <Grid item xs={4}>
    <p>To</p>
    <Select value={toMonth}onChange={(e)=>{handleChangeToMonth(e)}}> {monthData.map((monthObj)=>{
      return <MenuItem value={monthObj.key}>{monthObj.value}</MenuItem>
    })} 
   </Select>
   <Select value={toYear} onChange={(e)=>{handleChangeToYear(e)}}> 
     <MenuItem value={'2019'}>2019</MenuItem>
     <MenuItem value={'2020'}>2020</MenuItem>
     <MenuItem value={'2021'}>2021</MenuItem>
     <MenuItem value={'2022'}>2022</MenuItem>
     <MenuItem value={'2023'}>2023</MenuItem>
     <MenuItem value={'2024'}>2024</MenuItem>
     <MenuItem value={'2025'}>2025</MenuItem>
   </Select>
  </Grid>
  <Grid item xs={2}>
<span><Button variant='outlined'>Reset Filters</Button></span>
  </Grid>
  <Grid item xs={2}>
<span><Button variant='outlined' onClick={handleApplyFilters}>Apply Filters</Button></span>
  </Grid>
</Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  {currentReport==='Resource' &&(<ResourceReport fromMonth={fromMonth} fromYear={fromYear} toMonth={toMonth} toYear={toYear} setFromMonth={setFromMonth} setToMonth={setToMonth} setToYear={setToYear} setFromYear={setFromYear} isReload={isReload} setIsReload={setIsReload}/>)}
    </div>)
   

}
export default Reports;