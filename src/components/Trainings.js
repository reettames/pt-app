import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import dayjs from 'dayjs';

function Trainings() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = React.useState(false);
    var dayjs = require('dayjs');

    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    const columns = [
        {field: 'actions', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {field: 'date', sortable: true, filter: true, cellRenderer: (data) => {
            return dayjs(data.value).format('MM/DD/YYYY HH:mm')
        }},
        {field: 'duration', sortable: true, filter: true},
        {field: 'customer', sortable: true, filter: true, width: 120},

    ]

    return(
        <div>
            <div className="ag-theme-material" style={{marginTop: 20, height: 600, width: '80%', margin: 'auto'}}>
                <AgGridReact 
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellSelection={true}
                    />
            </div>
        </div>
    );
}

export default Trainings;