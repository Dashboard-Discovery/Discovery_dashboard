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
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import AddEditForm from '../addEditForm/AddEditForm';
// import Button from '@mui/material/Button';
// import FormControl from '@mui/material/FormControl';

// const RoleInfo = () => {
//   const roleData = require('../../data/role.json');
//   const [open, setOpen] = useState(false);
//   const [currentRow, setCurrentRow] = useState({});
  
//   const handleEditClick = (data) => {
//     console.log('data on edit click ', data)
//     setOpen(true);
//   }

//   const handleClose = () => {
//     setOpen(false);
//   }
//   return (<>
//     <DenseAppBar title={'Role Details'} />
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Role Name</TableCell>
//             <TableCell align="right">Role Id</TableCell>
//             <TableCell align="right">Action</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {roleData.map((row) => (
//             <>
//               <TableRow>
//                 <TableCell component="th" scope="row" style={{ paddingBottom: '1%' }}>
//                   {row.role}
//                 </TableCell>
//                 <TableCell align="right" style={{ paddingBottom: '1%' }}>{row.roleId}</TableCell>
//                 <TableCell align="right" style={{ paddingBottom: '1%' }}><EditIcon onClick={(e) => handleEditClick(row)} /></TableCell>
//               </TableRow>
//             </>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     <Dialog open={open} onClose={handleClose}>
//       <DialogContent>
//         <FormControl >
//           {/* <AddEditForm formData={currentRow} /> */}
//         </FormControl>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose}>Cancel</Button>
//         <Button onClick={handleClose}>Update</Button>
//       </DialogActions>
//     </Dialog>

//   </>)
// }

// export default RoleInfo;


// import "antd/dist/antd.css";
// // import "./App.css";
// import { Button, Table, Modal, Input } from "antd";
// import { useState } from "react";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// function App() {
//     const roleData = require('../../data/role.json');
//     const [isEditing, setIsEditing] = useState(false);
//     const [editingStudent, setEditingStudent] = useState(null);
//     const [dataSource, setDataSource] = useState(roleData);
//     const columns = [
//         {
//             key: "1",
//             title: "Role",
//             dataIndex: "role",
//         },
//         {
//             key: "2",
//             title: "Role Id",
//             dataIndex: "roleId",
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
//             role : "Name " + randomNumber,
//             roleId: randomNumber,
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
//       <div className="App">
//         <header className="App-header">
//           <Button onClick={onAddStudent}>Add a new Student</Button>
//           <Table columns={columns} dataSource={dataSource}></Table>
//           <Modal
//             title="Edit Student"
//             visible={isEditing}
//             okText="Save"
//             onCancel={() => {
//                 resetEditing();
//             }}
//             onOk={() => {
//               setDataSource((pre) => {
//                   return pre.map((student) => {
//                       if (student.id === editingStudent.id) {
//                           return editingStudent;
//                       } else {
//                           return student;
//                       }
//                   });
//               });
//               resetEditing();
//           }}
//         >
//           <Input
//               value={editingStudent?.role}
//               onChange={(e) => {
//                   setEditingStudent((pre) => {
//                       return { ...pre, role : e.target.value };
//                   });
//               }}
//             />
//             <Input
//                 value={editingStudent?.roleId}
//                 onChange={(e) => {
//                     setEditingStudent((pre) => {
//                         return { ...pre, roleId: e.target.value };
//                     });
//                 }}
//             />
//           </Modal>
//         </header>
//       </div>
//   );
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
import { useState,useEffect } from 'react';
import EditForm from '../FormComponent/EditForm'
function App() {
  const [users, setUser] = useState([])
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [userId,setUserId]=useState(null)

  useEffect(() => {
    getUsers();
  }, [])
  function getUsers() {
    const tokenNow = `Bearer ${getTokenNow()}`;
    console.log('token now is', tokenNow)

    fetch("http://10.75.80.111:8423/billing/v1/admin/role",{
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
        setRole(resp[0].role)
        // setMobile(resp[0].mobile)
        // setEmail(resp[0].email)
        // setUserId(resp[0].id)
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
  // function selectUser(id)
  // {
  //   let item=users[id-1];
  //   setName(item.name)
  //       setEmail(item.email)
  //       setMobile(item.mobile);
  //       setUserId(item.id)
  // }
  // function updateUser()
  // {
  //   let item={projectName}
  //   console.warn("item",item)
  //   const tokenNow = await `Bearer ${getTokenNow()}`;
  //   console.log('token now is', tokenNow)

  //   await fetch(`http://10.75.80.111:8423/billing/v1/admin/project`, {
  //     method: 'PUT',
  //     headers:{
  //       'Accept':'application/json',
  //       'Content-Type':'application/json'
  //       'Authorization': tokenNow
  //     },
  //     body:JSON.stringify(item)
  //   }).then((result) => {
  //     result.json().then((resp) => {
  //       console.warn(resp)
  //       getUsers()
  //     })
  //   })
  // }
  return ( <div style={{width:'80%'}}>
    <DenseAppBar title={'Role'} style={{width:'100%'}}/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Role Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((item, i) => (
            <>
              <TableRow>
                <TableCell component="th" scope="row" style={{ paddingBottom: '1%' }}>
                  {item.role}
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  );
}
export default App;