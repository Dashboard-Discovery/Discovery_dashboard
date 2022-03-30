import React from 'react';
import DataTable from 'react-data-table-component';
const resources = require('../../data/resourceDetails.json');

export default function ResourceGrid() {

    const dataStringLines = resources;
    const headers = Object.keys(dataStringLines[0]);

    const columns = headers.map(c => ({
        name: c,
        selector: c,
    }));


    return (
        <div>
            <DataTable
                pagination
                highlightOnHover
                columns={columns}
                data={dataStringLines}
            />
        </div>
    );
}
