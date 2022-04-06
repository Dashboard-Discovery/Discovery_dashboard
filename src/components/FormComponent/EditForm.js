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
import { saveTimeSheetEntry } from '../Service/service';



export default function EditForm({currentRow,formType,open,setOpen,handleReload}) {

  const handleClose = () => {
    setOpen(false);

  }
  const [currentMonth,setCurrentMonth]=useState('');
  const [currentYear,setCurrentYear]=useState('')
  const [empNo,setEmpNo]=useState('');
  const [project,setProject]=useState('');
  const [plannedWrkDys,setPlannedWrkDys]=useState('0');
  const [actualWrkDys,setActualWrkDys]=useState('0');
  const [amount,setAmount]=useState('0');

  const monthData=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  useEffect(()=>{
    let splitted=currentRow?.month?.split('-');
    if(splitted){
      const monthCurr=monthData[Number(splitted[0])-1];
      setCurrentMonth(monthCurr);
      setCurrentYear(splitted[1]);
    }

  },[currentRow])
  const handleChangeMonth=(e)=>{
    setCurrentMonth(e.target.value)

  }
  const handleChangeYear=(e)=>{
     setCurrentYear(e.target.value);
  }
  const handleEmpNo=(e)=>{
    setEmpNo(e.target.value)
  }
  const handleProject=(e)=>{
    setProject(e.target.value)
  }
  const handlePlannedDays=(e)=>{
    setPlannedWrkDys(e.target.value);
  }
  const handleActualDays=(e)=>{
    setActualWrkDys(e.target.value);
  }
  const handleAmount=(e)=>{
    setAmount(e.target.value);
  }
  const handleSaveOrUpdate=()=>{
    console.log('saving data...........................')
    const data={
      "empNo":empNo,
      "projectName":project,
      "month":`${currentMonth}-${currentYear}`,
      "plannedWrkDys":plannedWrkDys,
      "actualWrkDys":actualWrkDys,  
      }
      if(formType!=='edit'){
        const response=saveTimeSheetEntry(data);
        if(response==='200' || 'OK'){
          setOpen(false);
          handleReload();
        }
      }
  }
  return (


    <Dialog open={open} onClose={handleClose} >
    <DialogContent>
    <FormControl>
    <TextField
      id="outlined-name"
      label="Employee Number"
      value={`${formType==='edit'?currentRow?.empNo:empNo }`}
      disabled={formType=='edit'? true:false}
      style={{ paddingBottom: '10%' }}
      onChange={(e)=>handleEmpNo(e)}
    />
          <Select
          label="project"
        value={`${formType==='edit'?currentRow?.projectName:project }`}
        onChange={(e)=>{handleProject(e)}}
        style={{marginRight:'20%',width:'100%',color:'black',marginBottom:'10%'}}
      >
        <MenuItem value={'ATVE'}>Discovery ATVE</MenuItem>
        <MenuItem value={'ATVE2'}>Discovery ATVE2</MenuItem>
      </Select>
    <span style={{paddingBottom:'10%'}}>
      <Select
        value={currentMonth}
        onChange={(e)=>{handleChangeMonth(e)}}
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
        value={`${formType==='edit'?currentYear :currentYear}`}
        onChange={(e)=>handleChangeYear(e)}
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
      label="Planned Working Days"
      value={`${formType==='edit'?currentRow?.plannedWrkDys:plannedWrkDys}`}
      onChange={(e)=>handlePlannedDays(e)}
      style={{marginBottom:'10%'}}

    />
        <TextField
      id="outlined-name"
      label="Actual Working Days"
      value={`${formType==='edit'?currentRow?.actualWrkDys:actualWrkDys}`}
      onChange={(e)=>{handleActualDays(e)}}
      style={{marginBottom:'10%'}}

    />
        <TextField
      id="outlined-name"
      label="Amount"
      value={`${formType==='edit'?currentRow?.amount:amount}`}
      onChange={(e)=>{handleAmount(e)}}
      style={{marginBottom:'10%'}}

    />
  </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleSaveOrUpdate}>Save</Button>
    </DialogActions>
  </Dialog>
  
  );
}