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
import { getAllProjectMaster, getAllCountries, getAllRoleMaster } from '../Service/service';
import { excelIcon } from '../icons';
//import DataTable from 'react-data-table-component';

// import styles from '../grid/grid.module.scss';
import styles from './grid.module.scss';
import { StyledEngineProvider } from '@mui/styled-engine-sc';

export default function ResourceGrid() {
  const [roles, setRoles] = useState([]);
  const [countries, setCountries] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentpage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();
  const [isUpdate, setIsUpdate] = useState(false);

  const rowsPerPage = 10;
  useEffect(async () => {
    const roleDetails = await getAllRoleMaster();
    setRoles(roleDetails);
    setTotalPages(Math.ceil(roles.length / rowsPerPage));
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
              Role
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
              <TableCell>Role Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles && roles.map((row) => (
              <TableRow >
              <TableCell>
                {row.role}
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