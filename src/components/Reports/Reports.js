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
import { getAllTimesheet,timeSheetDelete } from '../Service/service';
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
import * as XLSX from 'xlsx';;


const Reports=()=>{ 
 const [fromMonth,setFromMonth]=useState('03');
 const [toMonth,setToMonth]=useState('03');
 const monthData=[{'01':'Jan'},{'02':'Feb'},{'03':'Mar'},{'04':'Apr'},{'05':'May'},{'06':'Jun'},{'07':'Jul'},{'08':'Aug'},{'09':'Sep'},{'10':'Oct'},{'11':'Nov'},{'12':'Dec'}];

 
return(

    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar variant="dense" className='toolbar-align'>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Reports
        </Typography>
        <Stack direction="row" className='stack-box' >
        <Select
        value={'Test'}
        className='project-select'
      >
        <MenuItem value={'ALL PROJECTS'} style={{color:'#1976d2'}}>From</MenuItem>
        
         <MenuItem key={'TEst'}value={'Test'}>{'Test'}</MenuItem>
        

      </Select>
          <Button variant="outlined" className='add-entry-button' style={{color:'#1976d2',display:'flex',backgroundColor:'white'}}>Add Entry <AddIcon/></Button>
          <Button variant="outlined" >
                            <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="30px" height="30px"><path d="M 28.8125 0.03125 L 0.8125 5.34375 C 0.339844 5.433594 0 5.863281 0 6.34375 L 0 43.65625 C 0 44.136719 0.339844 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 28.875 49.980469 28.9375 50 29 50 C 29.230469 50 29.445313 49.929688 29.625 49.78125 C 29.855469 49.589844 30 49.296875 30 49 L 30 1 C 30 0.703125 29.855469 0.410156 29.625 0.21875 C 29.394531 0.0273438 29.105469 -0.0234375 28.8125 0.03125 Z M 32 6 L 32 13 L 34 13 L 34 15 L 32 15 L 32 20 L 34 20 L 34 22 L 32 22 L 32 27 L 34 27 L 34 29 L 32 29 L 32 35 L 34 35 L 34 37 L 32 37 L 32 44 L 47 44 C 48.101563 44 49 43.101563 49 42 L 49 8 C 49 6.898438 48.101563 6 47 6 Z M 36 13 L 44 13 L 44 15 L 36 15 Z M 6.6875 15.6875 L 11.8125 15.6875 L 14.5 21.28125 C 14.710938 21.722656 14.898438 22.265625 15.0625 22.875 L 15.09375 22.875 C 15.199219 22.511719 15.402344 21.941406 15.6875 21.21875 L 18.65625 15.6875 L 23.34375 15.6875 L 17.75 24.9375 L 23.5 34.375 L 18.53125 34.375 L 15.28125 28.28125 C 15.160156 28.054688 15.035156 27.636719 14.90625 27.03125 L 14.875 27.03125 C 14.8125 27.316406 14.664063 27.761719 14.4375 28.34375 L 11.1875 34.375 L 6.1875 34.375 L 12.15625 25.03125 Z M 36 20 L 44 20 L 44 22 L 36 22 Z M 36 27 L 44 27 L 44 29 L 36 29 Z M 36 35 L 44 35 L 44 37 L 36 37 Z"/></svg>
             </Button>
        </Stack>

      </Toolbar>

    </AppBar>

  </Box>
)

}
export default Reports;