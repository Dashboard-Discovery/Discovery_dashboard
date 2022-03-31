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


const TableComponent = (
    props
) => {
  const data = props.data;
  const [totalPages, setTotalPages] = useState(0);
  const [currentpage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [currentData, setCurrentData] = useState([]);
  useEffect(() => {
    console.log('page calculation', currentpage)
    setTotalPages(Math.ceil(data.length / rowsPerPage));
    setCurrentData(data.slice(((currentpage - 1) * rowsPerPage), (rowsPerPage * currentpage)));
  }, [data, currentpage, rowsPerPage]);
  useEffect(() => { }, [])
  const onChangeHandler = (
    event
  ) => {
    console.log('event catched', event)
    setCurrentPage(event.target.value);
  };
  console.log('cureent data', currentData)


  return (<>
    <DenseAppBar title={'Time Sheet'} />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Employee ID</TableCell>
            <TableCell align="right">Month & Year</TableCell>
            <TableCell align="right">Working Days</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentData.map((row) => (
            <TableRow
            >
              <TableCell component="th" scope="row">
                {row.empNo}
              </TableCell>
              <TableCell align="right">{row.month}</TableCell>
              <TableCell align="right">{row.workingDays}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination count={totalPages}
        page={currentpage}
        onChange={(e) => { setCurrentPage(e.target.value) }} />
    </TableContainer>

  </>)
}

export default TableComponent;

