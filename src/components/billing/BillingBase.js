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
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddEditForm from '../addEditForm/AddEditForm';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

const BillingBase = () => {
  const billingData = require('../../data/workTime.json');
  const [totalPages, setTotalPages] = useState(0);
  const [currentpage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState({})
  useEffect(() => {
    console.log('page calculation', currentpage)
    setCurrentRow(billingData[0])
    setTotalPages(Math.ceil(billingData.length / rowsPerPage));
  }, [billingData, currentpage, rowsPerPage]);
  useEffect(() => { }, [])
  const onChangeHandler = (
    event
  ) => {
    console.log('event catched', event)
    setCurrentPage(event.target.value);
  };
  const handleEditClick = (data) => {
    console.log('data on edit click ', data)
    setCurrentRow(data)
    setOpen(true);

  }
  const handleClose = () => {
    setOpen(false);
  }


  return (<>
    <DenseAppBar title={'Time Sheet'} />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Employee ID</TableCell>
            <TableCell align="right">Month & Year</TableCell>
            <TableCell align="right">Working Days</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {billingData.map((row) => (
            <>
              <TableRow>
                <TableCell component="th" scope="row" style={{ paddingBottom: '1%' }}>
                  {row.empNo}
                </TableCell>
                <TableCell align="right" style={{ paddingBottom: '1%' }}>{row.month}</TableCell>
                <TableCell align="right" style={{ paddingBottom: '1%' }}>{row.workingDays}</TableCell>
                <TableCell align="right" style={{ paddingBottom: '1%' }}><EditIcon onClick={(e) => handleEditClick(row)} /></TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
      <Pagination count={totalPages}
        page={currentpage}
        onChange={(e) => { setCurrentPage(e.target.value) }} />
    </TableContainer>
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <FormControl >
          <AddEditForm formData={currentRow} />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Update</Button>
      </DialogActions>
    </Dialog>

  </>)
}

export default BillingBase;

