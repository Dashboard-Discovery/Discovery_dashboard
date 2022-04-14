import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import { getAllProjects, getPlannedWorkingDays, saveTimeSheetEntry, updateTimeSheetEntry, validateEmployee } from '../Service/service';



export default function EditForm({ currentRow, formType, open, setOpen, handleReload, setFormType }) {

  const [currentMonth, setCurrentMonth] = useState('');
  const [currentYear, setCurrentYear] = useState('')
  const [empNo, setEmpNo] = useState('');
  const [project, setProject] = useState('');
  const [plannedWrkDys, setPlannedWrkDys] = useState('0');
  const [actualWrkDys, setActualWrkDys] = useState('0');
  const [projectList, setProjectList] = useState([]);
  const [employeeValid, setEmployeeValid] = useState(false);
  const [isPlannedWrkDys, setIsPlannedWrkDys] = useState(false);
  const [isActualValid, setIsActualValid] = useState(false);
  const [actualHelper, setActualHelper] = useState('');
  const [isEnableSave, setIsEnableSave] = useState(false);
  const monthData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  useEffect(() => {
    if (formType === 'edit') {
      let splitted = currentRow?.month?.split('-');
      if (splitted) {
        const monthCurr = monthData[Number(splitted[0]) - 1];
        setCurrentMonth(monthCurr);
        setCurrentYear(splitted[1]);
      }
      setProject(currentRow?.projectName);
      setPlannedWrkDys(currentRow?.plannedWrkDys);
      setActualWrkDys(currentRow?.actualWrkDys);
      setEmpNo(currentRow?.empNo)
    } else if (formType === 'add') {
      setProject('');
      setPlannedWrkDys('');
      setActualWrkDys('');
      setEmpNo('')
      setCurrentMonth('');
      setCurrentYear('');
    }
  }, [currentRow, open])

  useEffect(async () => {
    if (currentMonth && currentYear && employeeValid) {
      const plannedDaysFromApi = await getPlannedWorkingDays(currentMonth, currentYear, empNo);
      if (plannedDaysFromApi && plannedDaysFromApi?.message !== 'No Items Found') {
        setPlannedWrkDys(plannedDaysFromApi);
        setIsPlannedWrkDys(true)
      } else {
        setIsPlannedWrkDys(false);
      }
    }
  }, [currentMonth, currentYear, empNo])

  useEffect(async () => {
    const responseProject = await getAllProjects();
    setProjectList(responseProject);
  }, [])
  useEffect(() => {
    if (isActualValid && isPlannedWrkDys && employeeValid) {
      setIsEnableSave(true);
    } else {
      setIsEnableSave(false);
    }
  }, [isActualValid, isPlannedWrkDys, employeeValid])

  const handleChangeMonth = (e) => {
    setCurrentMonth(e.target.value)

  }

  const handleChangeYear = (e) => {
    setCurrentYear(e.target.value);
  }

  const handleEmpNo = (e) => {
    setEmpNo(e.target.value)
  }

  const handleProject = (e) => {
    setProject(e.target.value)
  }

  const handleActualDays = (e) => {
    setActualWrkDys(e.target.value);
    if (parseInt(actualWrkDys) > parseInt(plannedWrkDys) || parseInt(actualWrkDys) < 0 || !actualWrkDys || !plannedWrkDys) {
      setIsActualValid(false);
      setActualHelper('Actual days should be valid number less than planned');
    } else {
      setIsActualValid(true);
    }
  }

  function converter(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

  useEffect(async () => {
    const res = await validateEmployee(empNo);
    if (res && res.message !== 'No Items Found') {
      setEmployeeValid(true);
      setProject(res.projectName);
    } else {
      setEmployeeValid(false)
    }
  }, [empNo])

  const handleSaveOrUpdate = () => {
    let monthVal = converter(monthData.indexOf(currentMonth) + 1);
    let data = {
      "empNo": empNo,
      "projectName": project,
      "month": `${monthVal}-${currentYear}`,
      "plannedWrkDys": plannedWrkDys,
      "actualWrkDys": actualWrkDys,
    }

    if (formType === 'edit') {
      data = { ...data, 'amount': currentRow?.amount };
      const response = updateTimeSheetEntry(data, currentRow?.id);
      if (response === '200' || 'OK') {
        setOpen(false);
        handleReload();
      }
    }
    if (formType !== 'edit') {
      const response = saveTimeSheetEntry(data);
      if (response === '200' || 'OK') {
        setOpen(false);
        handleReload();
      }
    }
  }
  const handleClose = () => {
    setOpen(false);
    setFormType('')
  }

  return (

    <Dialog open={open} onClose={handleClose} >
      <DialogContent>
        <FormControl>
          <TextField
            id="standard-basic"
            variant='outlined'
            required
            error={!employeeValid}
            label="Employee Number"
            helperText={employeeValid ? '' : 'Enter Valid Employee Number'}
            value={`${formType === 'edit' ? currentRow?.empNo : empNo}`}
            disabled={formType === 'edit' ? true : false}
            style={{ paddingBottom: '10%', textAlign: 'center' }}
            onChange={(e) => handleEmpNo(e)}
          />
          <Select
            label="project"
            value={project}
            defaultValue={project}
            onChange={(e) => { handleProject(e) }}
            style={{ marginRight: '20%', width: '100%', color: 'black', marginBottom: '10%' }}
          >
            {projectList && (projectList.map((item) => {
              return <MenuItem key={item?.id} value={item.projectName}>{item.projectName}</MenuItem>
            }))}

          </Select>
          <span style={{ paddingBottom: '10%' }}>
            <Select
              value={currentMonth}
              onChange={(e) => { handleChangeMonth(e) }}
              style={{ marginRight: '20%', width: '40%' }}
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
              value={currentYear}
              onChange={(e) => handleChangeYear(e)}
              style={{ width: '40%' }}
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
            error={!isPlannedWrkDys}
            helperText={isPlannedWrkDys ? '' : 'Unable to get planned days'}
            value={plannedWrkDys}
            style={{ marginBottom: '10%' }}

          />
          <TextField
            id="outlined-name"
            label="Actual Working Days"
            error={!isActualValid}
            helperText={actualHelper}
            value={actualWrkDys}
            onChange={(e) => { handleActualDays(e) }}
            style={{ marginBottom: '10%' }}

          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveOrUpdate} disabled={employeeValid ? false : true}>{formType === 'edit' ? 'Update' : 'Save'}</Button>
      </DialogActions>
    </Dialog>

  );
}