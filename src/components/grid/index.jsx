import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
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
import "jspdf-autotable";
import styles from './grid.module.scss';
import { getResourceByEmployeeNumber } from '../Service/service';

const resources = require('../../data/resourceDetails.json');

export default function ResourceGrid() {

    const [totalPages, setTotalPages] = useState(0);
    const [currentpage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const rowsPerPage = 10;
    useEffect(() => {
        console.log('page calculation', currentpage)
        setTotalPages(Math.ceil(resources.length / rowsPerPage));
        setCurrentData(resources.slice(((currentpage - 1) * rowsPerPage), (rowsPerPage * currentpage)));
    }, [resources, currentpage, rowsPerPage]);

    useEffect(()=>{
      getResourceByEmployeeNumber('1234')
    })
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

    return (
        <div>
            <DenseAppBar title={'Resource Details'} />
            <div className='d-flex flex-row-reverse'>
                {/* <Button variant="primary" className={styles.primaryBtn}>
                  <CSVLink
                    data={this.rows_data_for_export}
                    headers={this.columns_data_for_export}
                    filename={"client_list.csv"}
                  >
                    Excel
                  </CSVLink>
                </Button> */}
                <button
                    className={styles.primaryBtn}
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
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Project</TableCell>
                            <TableCell align="right">Emp Number</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell align="right">Experience</TableCell>
                            <TableCell>Skill set</TableCell>
                            <TableCell>Billability</TableCell>
                            <TableCell align="right">billing start date</TableCell>
                            <TableCell align="right">Billing end date</TableCell>
                            <TableCell>WON</TableCell>
                            <TableCell>TEL location</TableCell>
                            <TableCell>email</TableCell>
                            <TableCell align="right">mobile</TableCell>
                            <TableCell>competency</TableCell>
                            <TableCell align="right">source</TableCell>
                            <TableCell align="right">grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((row) => (
                            <TableRow
                            >
                                <TableCell>{row.project}</TableCell>
                                <TableCell align="right">{row.empNo}</TableCell>
                                <TableCell align="right">{row.name}</TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination count={totalPages}
                    page={currentpage}
                    onChange={(e) => { setCurrentPage(e.target.value) }} />
            </TableContainer>
        </div>
    );
}
