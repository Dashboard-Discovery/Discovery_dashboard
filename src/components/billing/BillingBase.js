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
import { getAllProjects } from '../Service/service';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import './BillingBase.css';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';



const BillingBase = () => {
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
  const [page,setPage]=useState(1);
  const [pageSize,setPageSize]=useState(10)
  const [openDelete,setOpenDelete]=useState(false);
  const [deleteId,setDeleteId]=useState(-1);
  useEffect(async () => {
    console.log('getting here after selecting')
    setReload(false);
    const data= await getAllTimesheet(currentProject,page,pageSize);
    console.log('data billing is',data)
    setBillingData(data);
    console.log('current billing data',billingData[0])
    setCurrentRow(billingData[0])
    setTotalPages(Math.ceil(billingData.length / rowsPerPage));
  },[isReload,currentpage,currentProject,page,pageSize]);
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
  const exportToCSV = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(billingData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, 'timesheet_details' + fileExtension);
}
const handlePage = (event,value) => {
  console.log('event',event);
  console.log('value',value)
  setPage(value);
};
const handlePageSize=(e)=>{
  setPageSize(e.target.value);

}
const handleDelete=(row)=>{
console.log(row)
setOpenDelete(true);
setDeleteId(row?.id);
}
  console.log('billing data line 79',billingData?.message)


  return (<div style={{width:'80%'}}>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar variant="dense" className='toolbar-align'>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Time Sheet
        </Typography>
        <Stack direction="row" className='stack-box' >
        <Select
        value={currentProject}
        onChange={(e)=>{handleProject(e)}}
        className='project-select'
      >
        <MenuItem value={'ALL PROJECTS'} style={{color:'#1976d2'}}>ALL PROJECTS</MenuItem>
        {projectList &&(projectList.map((item)=>{
         return <MenuItem key={item?.id}value={item?.projectName}>{item?.projectName}</MenuItem>
        }))}

      </Select>
          <Button variant="outlined" className='add-entry-button' style={{color:'#1976d2',display:'flex',backgroundColor:'white'}}onClick={handleAdd}>Add Entry <AddIcon/></Button>
          <Button variant="outlined" onClick={exportToCSV}>
                            <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="30px" height="30px"><path d="M 28.8125 0.03125 L 0.8125 5.34375 C 0.339844 5.433594 0 5.863281 0 6.34375 L 0 43.65625 C 0 44.136719 0.339844 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 28.875 49.980469 28.9375 50 29 50 C 29.230469 50 29.445313 49.929688 29.625 49.78125 C 29.855469 49.589844 30 49.296875 30 49 L 30 1 C 30 0.703125 29.855469 0.410156 29.625 0.21875 C 29.394531 0.0273438 29.105469 -0.0234375 28.8125 0.03125 Z M 32 6 L 32 13 L 34 13 L 34 15 L 32 15 L 32 20 L 34 20 L 34 22 L 32 22 L 32 27 L 34 27 L 34 29 L 32 29 L 32 35 L 34 35 L 34 37 L 32 37 L 32 44 L 47 44 C 48.101563 44 49 43.101563 49 42 L 49 8 C 49 6.898438 48.101563 6 47 6 Z M 36 13 L 44 13 L 44 15 L 36 15 Z M 6.6875 15.6875 L 11.8125 15.6875 L 14.5 21.28125 C 14.710938 21.722656 14.898438 22.265625 15.0625 22.875 L 15.09375 22.875 C 15.199219 22.511719 15.402344 21.941406 15.6875 21.21875 L 18.65625 15.6875 L 23.34375 15.6875 L 17.75 24.9375 L 23.5 34.375 L 18.53125 34.375 L 15.28125 28.28125 C 15.160156 28.054688 15.035156 27.636719 14.90625 27.03125 L 14.875 27.03125 C 14.8125 27.316406 14.664063 27.761719 14.4375 28.34375 L 11.1875 34.375 L 6.1875 34.375 L 12.15625 25.03125 Z M 36 20 L 44 20 L 44 22 L 36 22 Z M 36 27 L 44 27 L 44 29 L 36 29 Z M 36 35 L 44 35 L 44 37 L 36 37 Z"/></svg>
             </Button>
        </Stack>

      </Toolbar>

    </AppBar>

  </Box>
  {billingData && billingData?.message!=='No Items Found' &&(<TableContainer component={Paper}>
      <Table sx={{ minWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Employee ID</TableCell>
            <TableCell>Project Name</TableCell>
            <TableCell align="center">Month & Year</TableCell>
            <TableCell align="center">Planned Working Days</TableCell>
            <TableCell align="center">Actual Working Days</TableCell>
            <TableCell align="center">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {billingData.map((row) => (
            
            <>
              <TableRow key={row?.id}>
                <TableCell component="th" scope="row" style={{ paddingBottom: '1%' }}>
                  {row?.empNo}
                </TableCell>
                <TableCell align="center" style={{ paddingBottom: '1%' }}>{row.projectName}</TableCell>
                <TableCell align="center" style={{ paddingBottom: '1%' }}>{row.month}</TableCell>
                <TableCell align="center"  component="th" scope="row" style={{ paddingBottom: '1%' }}>
                  {row.plannedWrkDys}
                </TableCell>
                <TableCell align="center" style={{ paddingBottom: '1%' }}>{row.actualWrkDys}</TableCell>
                <TableCell align="center" style={{ paddingBottom: '1%' }}>{row.amount?row.amount:'N/A'}</TableCell>
                <TableCell align="center" style={{ paddingBottom: '1%' }}><span><EditIcon onClick={(e) => handleEditClick(row)} /> <DeleteForeverIcon onClick={(e)=>handleDelete(row)}/></span></TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
      {/* <Pagination count={10}
        page={currentpage}
        onChange={(e) => { setCurrentPage(e.target.value) }} /> */}
        <Stack direction='row' style={{marginTop: '2%',
    alignItems: 'center',paddingBottom:'2%',marginLeft:'1%'}}> 
        <Pagination count={10} color="primary" page={page} onChange={handlePage} style={{marginLeft:'50%'}}/>
         <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={pageSize}
    label="Page Size"
    onChange={(e)=>handlePageSize(e)}
    style={{marginRight:'5%'}}
  >
    <MenuItem value={10}>10</MenuItem>
    <MenuItem value={25}>25</MenuItem>
    <MenuItem value={50}>50</MenuItem>
  </Select></Stack>

    </TableContainer>)}
    {!billingData || billingData?.message=='No Items Found'&&(<>
    {currentProject==='ALL PROJECTS' &&(    <div className='no-data-div'>No Data Available</div>)}
    {currentProject !=='ALL PROJECTS'&&(<div className='no-data-project'><h2 style={{color:'red'}}>No Entries Available For Current Project, Please Add Entries Or Select Different Project</h2>
     <div><Button variant="contained" onClick={()=>{setCurrentProject('ALL PROJECTS')}}>Reset To All Projects</Button></div>
    </div>)}

    </>)    }

  
    <EditForm formType={formType} setFormType={setFormType} currentRow={currentRow} open={open} setOpen={setOpen} handleReload={handleReload}/>
    {openDelete&&(<ConfirmDelete openDelete={openDelete} setOpenDelete={setOpenDelete} id={deleteId}/>)}
  </div>)
}

export default BillingBase;

