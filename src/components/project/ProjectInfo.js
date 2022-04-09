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
// import { useEffect, useState } from 'react';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// // import EditIcon from '@mui/icons-material/';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import AddEditForm from '../addEditForm/AddEditForm';
// import Button from '@mui/material/Button';
// import FormControl from '@mui/material/FormControl';

// const ProjectInfo = () => {
//   const projectData = require('../../data/project.json');
//   const [open, setOpen] = useState(false);

//   const handleEditClick = (data) => {
//     console.log('data on edit click ', data)
//     setOpen(true);

//   }
//   const handleDeleteClick = (data)  => {
// 	console.log('data on edit click ', data)
//     setOpen(true);
//   }

//   const handleClose = () => {
//     setOpen(false);
//   }
//   return (<>
//     <DenseAppBar title={'Project Details'} />
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>project Name</TableCell>
//             <TableCell align="right">Project Id</TableCell>
//             <TableCell align="right">Action</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {projectData.map((row) => (
//             <>
//               <TableRow>
//                 <TableCell component="th" scope="row" style={{ paddingBottom: '1%' }}>
//                   {row.projectName}
//                 </TableCell>
//                 <TableCell align="right" style={{ paddingBottom: '1%' }}>{row.projectId}</TableCell>
//                 <TableCell align="right" style={{ paddingBottom: '1%' }}><EditIcon onClick={(e) => handleEditClick(row)} /></TableCell>
// 				<TableCell align="right" style={{ paddingBottom: '1%' }}><DeleteIcon onClick={(e) => handleDeleteClick(row)} /></TableCell>
//               </TableRow>
//             </>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     <Dialog open={open} onClose={handleClose}>

//       <DialogActions>
//         <Button onClick={handleClose}>Cancel</Button>
//         <Button onClick={handleClose}>Update</Button>
//       </DialogActions>
//     </Dialog>

//   </>)
// }

// export default ProjectInfo;



// import "antd/dist/antd.css";
// // import "./App.css";
// import { Button, Table, Modal, Input } from "antd";
// import { useState } from "react";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// function App() {
//     const projectData = require('../../data/project.json');
//     const [isEditing, setIsEditing] = useState(false);
//     const [editingStudent, setEditingStudent] = useState(null);
//     const [dataSource, setDataSource] = useState(projectData);
//     const columns = [
//         {
//             key: "1",
//             title: "Project Name",
//             dataIndex: "projectName",
//         },
//         {
//             key: "2",
//             title: "Project Id",
//             dataIndex: "projectId",
//         },
//         {
//             key: "3",
//             title: "Actions",
//             render: (record) => {
//                 return (
//                     <>
//                         <EditOutlined
//                             onClick={() => {
//                                 onEditStudent(record);
//                             }}
//                         />
//                         <DeleteOutlined
//                             onClick={() => {
//                                 onDeleteStudent(record);
//                             }}
//                             style={{ color: "red", marginLeft: 12 }}
//                         />
//                     </>
//                 );
//             },
//         },
//     ];

//     const onAddStudent = () => {
//         const randomNumber = parseInt(Math.random() * 1000);
//         const newStudent = {
//             projectName: "Name " + randomNumber,
//             projectId: randomNumber,
//             // address: "Address " + randomNumber,
//         };
//         setDataSource((pre) => {
//             return [...pre, newStudent];
//         });
//     };
//     const onDeleteStudent = (record) => {
//         Modal.confirm({
//             title: "Are you sure, you want to delete this student record?",
//             okText: "Yes",
//             okType: "danger",
//             onOk: () => {
//                 setDataSource((pre) => {
//                     return pre.filter((student) => student.id !== record.id);
//                 });
//             },
//         });
//     };
//     const onEditStudent = (record) => {
//         setIsEditing(true);
//         setEditingStudent({ ...record });
//     };
//     const resetEditing = () => {
//         setIsEditing(false);
//         setEditingStudent(null);
//     };
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <Button onClick={onAddStudent}>Add a new Student</Button>
//                 <Table columns={columns} dataSource={dataSource}></Table>
//                 <Modal
//                     title="Edit Student"
//                     visible={isEditing}
//                     okText="Save"
//                     onCancel={() => {
//                         resetEditing();
//                     }}
//                     onOk={() => {
//                         setDataSource((pre) => {
//                             return pre.map((student) => {
//                                 if (student.id === editingStudent.id) {
//                                     return editingStudent;
//                                 } else {
//                                     return student;
//                                 }
//                             });
//                         });
//                         resetEditing();
//                     }}
//                 >
//                     <Input
//                         value={editingStudent?.projectName}
//                         onChange={(e) => {
//                             setEditingStudent((pre) => {
//                                 return { ...pre, projectName: e.target.value };
//                             });
//                         }}
//                     />
//                     <Input
//                         value={editingStudent?.projectId}
//                         onChange={(e) => {
//                             setEditingStudent((pre) => {
//                                 return { ...pre, projectId: e.target.value };
//                             });
//                         }}
//                     />
//                 </Modal>
//             </header>
//         </div>
//     );
// }

// export default App;





// import './App.css';
import { getTokenNow } from '../../utils/useToken';
// import React, { useEffect, useState } from 'react';
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
import { useState, useEffect } from 'react';
import EditForm from '../FormComponent/EditForm'
function App() {
  const [users, setUser] = useState([])
  const [projectName, setProjectName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    getUsers();
  }, [])
  function getUsers() {
    const tokenNow = `Bearer ${getTokenNow()}`;
    console.log('token now is', tokenNow)

    fetch("http://10.75.80.111:8423/billing/v1/admin/project?projectName=Discovery", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': tokenNow
      },
    }).then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setUser(resp)
        // setprojectName(resp.projectName)
        // setMobile(resp[0].mobile)
        // setEmail(resp[0].email)
        // setUserId(resp[0].id)
      })
    })
  }

  function saveData() {
    const tokenNow = `Bearer ${getTokenNow()}`;
    console.log('token now is', tokenNow)
    let data = { projectName }
    // console.warn(data);
    fetch("http://10.75.80.111:8423/billing/v1/admin/project", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': tokenNow
      },
      body: JSON.stringify(data)
    }).then((resp) => {
      // console.warn("resp",resp);;
      resp.json().then((result) => {
        console.warn("result", result)
        getUsers()
      })
    })
  }

  // function deleteUser(id) {
  //   fetch(`http://localhost:4000/todo/${id}`, {
  //     method: 'DELETE'
  //   }).then((result) => {
  //     result.json().then((resp) => {
  //       console.warn(resp)
  //       getUsers()
  //     })
  //   })
  // }
  function selectUser(id)
  {
    let item=users[id-1];
      setProjectName(item.projectName)
        // setEmail(item.email)
        // setMobile(item.mobile);
        // setUserId(item.id)
  }
  function updateUser()
  {
    const tokenNow = `Bearer ${getTokenNow()}`;
    console.log('token now is', tokenNow)
    let item={projectName}
    console.warn("item",item)

    fetch(`http://10.75.80.111:8423/billing/v1/admin/project`, {
      method: 'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': tokenNow
      },
      body:JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp)
        getUsers()
      })
    })
  }
  return (<div style={{ width: '80%' }}>
    <DenseAppBar title={'Project'} style={{ width: '100%' }} />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((item, i) => (
            <>
              <TableRow key={i}>
                <TableCell component="th" scope="row" style={{ paddingBottom: '1%' }}>
                  {item.projectName}
                </TableCell>
                {/* <TableCell align="right" style={{ paddingBottom: '1%' }}><EditIcon onClick={(e) => handleEditClick(item.id)} /></TableCell> */}
                <td><button onClick={() => selectUser(item.id)}>Update</button></td>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div>
      <input type="text" value={projectName} onChange={(e) => { setProjectName(e.target.value) }} /> <br /><br />
      <button onClick={updateUser} >Update User</button>  
      {/* <button type="button" onClick={saveData} >Save New User</button> */}
    </div>
  </div>

  );
}
export default App;






