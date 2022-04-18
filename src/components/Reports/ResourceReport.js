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
import { getResourceBetweenMonth } from '../Service/service';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
// import './BillingBase.css';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import FilterListIcon from '@mui/icons-material/FilterList';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import styles from './reports.module.scss';



const ResourceReport = ({ fromMonth, toMonth, toYear, fromYear, setFromMonth, setFromYear, setToMonth, setToYear, isReload, setIsReload, open, setOpen, handleCsv, setHandleCsv }) => {


    const monthData = [{ '01': 'Jan' }, { '02': 'Feb' }, { '03': 'Mar' }, { '04': 'Apr' }, { '05': 'May' }, { '06': 'Jun' }, { '07': 'Jul' }, { '08': 'Aug' }, { '09': 'Sep' }, { '10': 'Oct' }, { '11': 'Nov' }, { '12': 'Dec' }];
    const [openFilter, setOpenFilter] = useState(false);
    const [data, setData] = useState([]);
    const handleFilter = () => {
        setOpenFilter(true);
    }
    const handleClose = () => {
        setOpenFilter(false)
    }
    function converter(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }
    function addMonths(date, months) {
        date.setMonth(date.getMonth() + months);
        return date;
    }
    const handleChangeFromMonth = (e) => {

    }
    const exportToCSV = () => {
        console.log('test')
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const resdata = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(resdata, 'billing_details' + fileExtension);
        setHandleCsv(false);
    }

    useEffect(async () => {
        console.log('from month async', fromMonth, fromYear, toMonth, toYear)
        const initData = await getResourceBetweenMonth(`${fromMonth}-${fromYear}`, `${toMonth}-${toYear}`);
        setData(initData);
        setOpen(false)
    }, [isReload]);
    useEffect(() => {
        console.log('handle csv', handleCsv)
        if (handleCsv) {
            exportToCSV();

        }
    }, [handleCsv])
    return (
        <>
            {data && (
                <div className={styles.reports}><TableContainer component={Paper} className={styles.table_container}>
                    <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Employee ID</TableCell>
                                <TableCell>Project Name</TableCell>
                                <TableCell align="center">Month & Year</TableCell>
                                <TableCell align="center">Actual Working Days</TableCell>
                                <TableCell align="center">Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row) => (

                                <>
                                    <TableRow key={row?.id}>
                                        <TableCell scope="row" style={{ paddingBottom: '1%' }}>
                                            {row?.empNo}
                                        </TableCell>
                                        <TableCell align="center" style={{ paddingBottom: '1%' }}>{row.projectName}</TableCell>
                                        <TableCell align="center" style={{ paddingBottom: '1%' }}>{row.month}</TableCell>
                                        <TableCell align="center" style={{ paddingBottom: '1%' }}>{row.actualWrkDys}</TableCell>
                                        <TableCell align="center" style={{ paddingBottom: '1%' }}>{row.amount ? row.amount : 'N/A'}</TableCell>
                                    </TableRow>
                                </>
                            ))}
                        </TableBody>
                    </Table>
                    {/* <Pagination count={10}
                        page={1}
                        onChange={(e) => { setCurrentPage(e.target.value) }} /> */}
                    <Stack direction='row' style={{
                        marginTop: '2%',
                        alignItems: 'center', paddingBottom: '2%', marginLeft: '1%'
                    }}>
                        {/* <Pagination count={totalPages} color="primary" page={page} onChange={handlePage} style={{marginLeft:'50%'}}/>
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
    </Select> */}
                    </Stack>

                </TableContainer></div>
            )}</>

    )

}
export default ResourceReport;