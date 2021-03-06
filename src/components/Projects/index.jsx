import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
//import jsPDF from "jspdf";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import {ConvertDate} from '../../utils/Common';
import EditIcon from '@mui/icons-material/Edit';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import AddEditForm from './projectForm';
import * as FileSaver from 'file-saver';
import "jspdf-autotable";
import { getAllProjects } from '../Service/service';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
//import DataTable from 'react-data-table-component';
import styles from '../ResourceGrid/grid.module.scss';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState();    
    const [isReload, setReload] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(async () => {
        setReload(false);
        const result = await getAllProjects(); 
        setProjects(result);
    }, [isReload]);

    const handleEditClick = (data) => {
        setIsUpdate(true);
        setSelected(data)
        setOpen(true);
    }
    
    const handleReload = () => {
        setReload(true);
    }
    
    const exportToCSV = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(projects);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, 'Projects' + fileExtension);
    }

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
                            Projects
                        </Typography>
                        <div className={styles.toolbar_buttons}>
                            <Button variant="outlined" className={styles.add_entry} onClick={handleAddClick}>Add Entry <AddIcon /></Button>
                            <Button variant="outlined" onClick={exportToCSV}>
                                <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="30px" height="30px"><path d="M 28.8125 0.03125 L 0.8125 5.34375 C 0.339844 5.433594 0 5.863281 0 6.34375 L 0 43.65625 C 0 44.136719 0.339844 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 28.875 49.980469 28.9375 50 29 50 C 29.230469 50 29.445313 49.929688 29.625 49.78125 C 29.855469 49.589844 30 49.296875 30 49 L 30 1 C 30 0.703125 29.855469 0.410156 29.625 0.21875 C 29.394531 0.0273438 29.105469 -0.0234375 28.8125 0.03125 Z M 32 6 L 32 13 L 34 13 L 34 15 L 32 15 L 32 20 L 34 20 L 34 22 L 32 22 L 32 27 L 34 27 L 34 29 L 32 29 L 32 35 L 34 35 L 34 37 L 32 37 L 32 44 L 47 44 C 48.101563 44 49 43.101563 49 42 L 49 8 C 49 6.898438 48.101563 6 47 6 Z M 36 13 L 44 13 L 44 15 L 36 15 Z M 6.6875 15.6875 L 11.8125 15.6875 L 14.5 21.28125 C 14.710938 21.722656 14.898438 22.265625 15.0625 22.875 L 15.09375 22.875 C 15.199219 22.511719 15.402344 21.941406 15.6875 21.21875 L 18.65625 15.6875 L 23.34375 15.6875 L 17.75 24.9375 L 23.5 34.375 L 18.53125 34.375 L 15.28125 28.28125 C 15.160156 28.054688 15.035156 27.636719 14.90625 27.03125 L 14.875 27.03125 C 14.8125 27.316406 14.664063 27.761719 14.4375 28.34375 L 11.1875 34.375 L 6.1875 34.375 L 12.15625 25.03125 Z M 36 20 L 44 20 L 44 22 L 36 22 Z M 36 27 L 44 27 L 44 29 L 36 29 Z M 36 35 L 44 35 L 44 37 L 36 37 Z" /></svg>
                            </Button>
                        </div>
                    </Toolbar>

                </AppBar>
            </Box>
           {/* Projects Grid*/}
            <TableContainer component={Paper} className={styles.table_container}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Project</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects && projects.map((row) => (
                            <TableRow key={row?.id}
                            >
                                <TableCell>{row.projectName}</TableCell>
                                <TableCell><button className='btn'><EditIcon onClick={(e) => handleEditClick(row)} /></button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddEditForm formData={(isUpdate && selected) ? selected : undefined} isUpdate={isUpdate} open={open} setOpen={setOpen} handleReload={handleReload}/>

        </div>
    );
}
