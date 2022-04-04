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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import AddEditForm from './resourseForm';
import * as FileSaver from 'file-saver';
import "jspdf-autotable";
import styles from './grid.module.scss';

const resources = require('../../data/resourceDetails.json');

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle classes='text-center' sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function ResourceGrid() {

    const [totalPages, setTotalPages] = useState(0);
    const [currentpage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState();
    const [isUpdate, setIsUpdate] = useState(false);

    const rowsPerPage = 10;
    useEffect(() => {
        console.log('page calculation', currentpage)
        setTotalPages(Math.ceil(resources.length / rowsPerPage));
        setCurrentData(resources.slice(((currentpage - 1) * rowsPerPage), (rowsPerPage * currentpage)));
    }, [resources, currentpage, rowsPerPage]);
    const dataStringLines = resources;
    const headers = Object.keys(dataStringLines[0]);

    const columns = headers.map(c => ({
        name: c.toUpperCase(),
        selector: c,
    }));

    const columnsForExport = columns
        .slice(0, columns.length - 1)
        .map((d) => d.name);

    const downloadPdf = () => {
        const doc = new jsPDF();

        const temp_rows = dataStringLines.map((d1) =>
            columns
                .slice(0, columns.length - 1)
                .map((d2) => d2.selector)
                .map((d3) => d1[d3])
        );
        doc.autoTable({
            head: [columnsForExport],
            styles: { fontSize: 8 },
            body: temp_rows,
            horizontalPageBreak: true
        });
        doc.save("client_list.pdf");
    }

    const handleEditClick = (data) => {
        setIsUpdate(true);
        setSelected(data)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });

        FileSaver.saveAs(data, fileName + fileExtension);
    }

    const handleAddClick = () => {
        setIsUpdate(false);
        setOpen(true);
    }

    return (
        <div className={styles.resources}>
            <DenseAppBar title={'Resource Details'} />
            <div className='d-flex flex-row'>
                <button
                    className={`${styles.primaryBtn}`}
                    onClick={handleAddClick}
                >Add Row</button>
                <button
                    className={`mx-4 align-self-end ${styles.primaryBtn}`}
                    onClick={exportToCSV(resources, 'resourceDetails')}
                >Export to Excel</button>
                <button
                    className={`mx-4 align-self-end ${styles.primaryBtn}`}
                    onClick={downloadPdf}
                >
                    Pdf
                </button>
            </div>
            {/* <DataTable
                pagination
                highlightOnHover
                columns={columns}
                data={dataStringLines}
            /> */}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Project</TableCell>
                            <TableCell>Emp Number</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Experience</TableCell>
                            <TableCell>Skill set</TableCell>
                            <TableCell>Billability</TableCell>
                            <TableCell>Billing start date</TableCell>
                            <TableCell>Billing end date</TableCell>
                            <TableCell>WON</TableCell>
                            <TableCell>TEL location</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Mobile</TableCell>
                            <TableCell>Competency</TableCell>
                            <TableCell>Source</TableCell>
                            <TableCell>Grade</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((row) => (
                            <TableRow
                            >
                                <TableCell>{row.project}</TableCell>
                                <TableCell align="right">{row.empNo}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.role}</TableCell>
                                <TableCell align="right">{row.experience}</TableCell>
                                <TableCell>{row.skillSet}</TableCell>
                                <TableCell>{row.billability}</TableCell>
                                <TableCell align="right">{row.billingStartDate}</TableCell>
                                <TableCell align="right">{row.billingEndDate}</TableCell>
                                <TableCell>{row.WON}</TableCell>
                                <TableCell>{row.tellocation}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell align="right">{row.mobile}</TableCell>
                                <TableCell>{row.competency}</TableCell>
                                <TableCell align="right">{row.source}</TableCell>
                                <TableCell align="right">{row.grade}</TableCell>
                                <TableCell><button className='border-0'><EditIcon onClick={(e) => handleEditClick(row)} /></button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination count={totalPages}
                    page={currentpage}
                    onChange={(e) => { setCurrentPage(e.target.value) }} />
            </TableContainer>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {isUpdate ? 'Update details' : 'Add new details'}
                </BootstrapDialogTitle>
                <AddEditForm formData={(isUpdate && selected) ? selected : undefined} />
            </Dialog>
        </div>
    );
}
