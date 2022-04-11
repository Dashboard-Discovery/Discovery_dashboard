
// // import './App.css';
// import { getTokenNow } from '../../utils/useToken';
// // import React, { useEffect, useState } from 'react';
// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import DenseAppBar from '../headerComponent/DenseAppBar'
// import Pagination from '@mui/material/Pagination';
// import EditIcon from '@mui/icons-material/Edit';
// import { useState, useEffect } from 'react';
// import EditForm from '../FormComponent/EditForm'
// import AddEditForm from '../grid/resourceForm';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
// import Stack from '@mui/material/Stack';
// import Select from '@mui/material/Select';
// import styles from '../grid/grid.module.scss';

// function App() {
//   const [users, setUser] = useState([])
//   const [country, setCountry] = useState([])
//   const [projectName, setProjectName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [userId, setUserId] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [selected, setSelected] = useState();
//   const [isUpdate, setIsUpdate] = useState(false);

//   const handleEditClick = (data) => {
//     setIsUpdate(true);
//     setSelected(data)
//     setOpen(true);
//   }

//   const handleAddClick = () => {
//     setIsUpdate(false);
//     setOpen(true);
//   }

//   const handleClose = () => {
//     setOpen(false);
//   };

//   useEffect(() => {
//     getUsers();
//   }, [])
//   function getUsers() {
//     const tokenNow = `Bearer ${getTokenNow()}`;
//     console.log('token now is', tokenNow)

//     fetch("http://10.75.80.111:8423/billing/v1/admin/project?projectName=Discovery", {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': tokenNow
//       },
//     }).then((result) => {
//       result.json().then((resp) => {
//         setUser(resp)
//       })
//     })
//   }


//   useEffect(() => {
//     getCountry();
//   }, [])
//   function getCountry() {
//     const tokenNow = `Bearer ${getTokenNow()}`;
//     console.log('token now is', tokenNow)

//     fetch("http://10.75.80.111:8423/billing/v1/admin/country", {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': tokenNow
//       },
//     }).then((result) => {
//       result.json().then((resp) => {
//         setCountry(resp)
//       })
//     })
//   }

//   function saveData() {
//     const tokenNow = `Bearer ${getTokenNow()}`;
//     console.log('token now is', tokenNow)
//     let item = { projectName }
//     fetch("http://10.75.80.111:8423/billing/v1/admin/project", {
//       method: "POST",
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': tokenNow
//       },
//       body: JSON.stringify(item)
//     }).then((resp) => {
//       resp.json().then((result) => {
//         console.warn("result", result)
//         getUsers()
//       })
//     })
//   }

//   function selectUser(id) {
//     let item = users[id - 1];
//     setProjectName(item.projectName)
//   }
//   function updateUser() {
//     const tokenNow = `Bearer ${getTokenNow()}`;
//     console.log('token now is', tokenNow)
//     let item = { projectName }
//     console.warn("item", item)

//     fetch(`http://10.75.80.111:8423/billing/v1/admin/project`, {
//       method: 'PUT',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': tokenNow
//       },
//       body: JSON.stringify(item)
//     }).then((result) => {
//       result.json().then((resp) => {
//         console.warn(resp)
//         getUsers()
//       })
//     })
//   }
//   return (<div style={{ width: '80%' }}>
//     {/* <DenseAppBar title={'Project'} style={{ width: '100%' }} /> */}
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar variant="dense">
//           <Typography variant="h6" color="inherit" component="div">
//             Project
//           </Typography>
//           <div className={styles.toolbar_buttons}>
//             <Button variant="outlined" className={styles.add_entry} onClick={handleAddClick}>Add Entry <AddIcon /></Button>
//           </div>
//         </Toolbar>
//       </AppBar>
//     </Box>
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: '100%' }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Project Name</TableCell>
//             <TableCell>Location</TableCell>
//             <TableCell align="center">Action</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {users.map((item, i) => (
//             <>
              // <TableRow key={i}>
              //   <TableCell component="th" scope="row" style={{ paddingBottom: '1%' }}>
              //     {item.projectName}
              //   </TableCell>
              //   {country.map((item, i) => (
              //     <>
              //       {item.countryName}
              //     </>
              //   ))}
              //   <TableCell align="center" style={{ paddingBottom: '1%' }}><EditIcon onClick={(e) => handleEditClick(item.id)} /></TableCell>
              //   {/* <td><button onClick={() => selectUser(item.id)}>Update</button></td> */}
              // </TableRow>
//             </>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     <div>
//       <input type="text" value={projectName} onChange={(e) => { setProjectName(e.target.value) }} /> <br /><br />
//       <button onClick={updateUser} >Update User</button>
//       <button type="button" onClick={saveData} >Save New User</button>
//     </div>
//     <AddEditForm formData={(isUpdate && selected) ? selected : undefined} isUpdate={isUpdate} open={open} setOpen={setOpen} />
//   </div>
//   );
// }
// export default App;





import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from "jspdf";
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
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
// import AddEditForm from '../grid/resourceForm';
import AddEditForm from './EditForm';
import * as FileSaver from 'file-saver';
import "jspdf-autotable";
import { getAllProjectMaster, getAllCountries } from '../Service/service';
import { excelIcon } from '../icons';
//import DataTable from 'react-data-table-component';

// import styles from '../grid/grid.module.scss';
import styles from './grid.module.scss';
import { StyledEngineProvider } from '@mui/styled-engine-sc';

export default function ResourceGrid() {
  const [projects, setProjects] = useState([]);
  const [countries, setCountries] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentpage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();
  const [isUpdate, setIsUpdate] = useState(false);

  const rowsPerPage = 10;
  useEffect(async () => {
    const projectDetails = await getAllProjectMaster();
    setProjects(projectDetails);
    setTotalPages(Math.ceil(projects.length / rowsPerPage));
  }, []);

  useEffect(async () => {
    const countryDetails = await getAllCountries();
    setCountries(countryDetails);
    // setTotalPages(Math.ceil(projects.length / rowsPerPage));
  }, []);

  const handleEditClick = (data) => {
    setIsUpdate(true);
    setSelected(data)
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddClick = () => {
    setIsUpdate(false);
    setOpen(true);
  }

  return (
    <div className={`col-10 ${styles.resources}`}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              project
            </Typography>
            <div className={styles.toolbar_buttons}>
              <Button variant="outlined" className={styles.add_entry} onClick={handleAddClick}>Add Entry <AddIcon /></Button>
            </div>
          </Toolbar>

        </AppBar>
      </Box>

      <TableContainer component={Paper} className={styles.table_container}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects && projects.map((row) => (
              <TableRow >
              <TableCell>
                {row.projectName}
              </TableCell>
              {countries && countries.map((row) => (
                <>
                  {row.countryName}
                </>
              ))}
              <TableCell align="center" style={{ paddingBottom: '1%' }}><EditIcon onClick={(e) => handleEditClick(row.id)} /></TableCell>
              {/* <td><button onClick={() => selectUser(item.id)}>Update</button></td> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination count={totalPages}
          page={currentpage}
          onChange={(e) => { setCurrentPage(e.target.value) }} />
      </TableContainer>

      <AddEditForm formData={(isUpdate && selected) ? selected : undefined} isUpdate={isUpdate} open={open} setOpen={setOpen} />

    </div>
  );
}
