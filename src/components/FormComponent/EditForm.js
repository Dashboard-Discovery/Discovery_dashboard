import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState,useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';



export default function EditForm({currentRow,formType,open,setOpen}) {

  const handleClose = () => {
    setOpen(false);
  }
  const [currentMonth,setCurrentMonth]=useState('');
  const [currentYear,setCurrentYear]=useState('')
  const monthData=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  useEffect(()=>{
    let splitted=currentRow?.month?.split('-');
    if(splitted){
      const monthCurr=monthData[splitted[0]-1];
      setCurrentMonth(monthCurr);
      setCurrentYear(splitted[1]);
    }

  },[currentRow])
  const handleChange=()=>{

  }
  const handleChangeYear=()=>{

  }
  return (


    <Dialog open={open} onClose={handleClose}>
    <DialogContent>
    <FormControl>
    <TextField
      id="outlined-name"
      label="Employee Number"
      value={`${formType==='edit'?currentRow.empNo:'' }`}
      disabled={true}
      style={{ paddingBottom: '10%' }}
    />
    <span style={{paddingBottom:'10%'}}>
      <Select
        value={currentMonth}
        onChange={handleChange}
        style={{marginRight:'20%',width:'40%'}}
      >
        <MenuItem value={'Jan'}>Jan</MenuItem>
        <MenuItem value={'Feb'}>Feb</MenuItem>
        <MenuItem value={'Mar'}>Mar</MenuItem>
        <MenuItem value={'Apr'}>Apr</MenuItem>
        <MenuItem value={'May'}>May</MenuItem>
        <MenuItem value={'Jun'}>Jun</MenuItem>
        <MenuItem value={'Jul'}>Jul</MenuItem>
        <MenuItem value={'Aug'}>Aug</MenuItem>
        <MenuItem value={'Sep'}>Sep</MenuItem>
        <MenuItem value={'Oct'}>Oct</MenuItem>
        <MenuItem value={'Nov'}>Nov</MenuItem>
        <MenuItem value={'Dec'}>Dec</MenuItem>
      </Select>
      <Select
        value={`${formType==='edit'?currentYear :'2020'}`}
        onChange={handleChangeYear}
        style={{width:'40%'}}
      >
        <MenuItem value={'2018'}>2018</MenuItem>
        <MenuItem value={'2019'}>2019</MenuItem>
        <MenuItem value={'2020'}>2020</MenuItem>
        <MenuItem value={'2021'}>2021</MenuItem>
        <MenuItem value={'2022'}>2022</MenuItem>
        <MenuItem value={'2023'}>2023</MenuItem>
        <MenuItem value={'2024'}>2024</MenuItem>
      </Select>
      </span>
    <TextField
      id="outlined-name"
      label="Working Days"
      value={`${formType==='edit'?currentRow.workingDays:''}`}

    />

  </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose}>Update</Button>
    </DialogActions>
  </Dialog>
  
  );
}