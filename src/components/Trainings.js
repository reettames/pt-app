import React, { useState, useEffect, row } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import dayjs from 'dayjs';

function Trainings() {

    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = React.useState(false);
    const dayjs = require('dayjs');

    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (url) => {
        if(window.confirm('Are you sure?')){
            fetch(url, { method: 'DELETE' })
            .then(response => fetchTrainings()) 
            .catch(err => console.error(err))
        }
    }

    const columns = [
        { field: '', width: '60', cellRendererFramework: function (params) {
            return (
                <IconButton variant="contained" 
                onClick={() => deleteTraining('https://customerrest.herokuapp.com/api/trainings/' + params.data.id)} color="error"><DeleteIcon/></IconButton>
            );}
        },
        {field: 'activity', sortable: true, filter: true},
        {field: 'date', sortable: true, filter: true, cellRenderer: (data) => {
            return dayjs(data.value).format('MM/DD/YYYY HH:mm')
        }},
        {field: 'duration', sortable: true, filter: true},
        {field: 'customer', sortable: true, filter: true, valueGetter: params => {
            if (params.data.customer == null){
                return " ";
            }else {
                return params.data.customer.firstname + " " + params.data.customer.lastname;
                
            }}
        },
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