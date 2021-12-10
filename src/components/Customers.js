import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@mui/material/Snackbar';
import AddCustomer from './AddCustomer';
import DeleteIcon from '@mui/icons-material/Delete';
import Editcustomer from './EditCustomer';
import IconButton from '@mui/material/IconButton';
import AddTraining from './AddTraining';


function Customers() {
    const [customers, setCustomers] = useState([]);
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }
    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(customer)
        }
        )
        .then(_ => fetchCustomers())
        .catch(err => console.error(err))

    }
    const deleteCust = (url) => {
        if(window.confirm('Are you sure? This will also delete customers all trainings.')){
            fetch(url, { method: 'DELETE' })
            .then(response => fetchCustomers()) 
            .catch(err => console.error(err))
        }
    }
    const editCustomer = (url, customer) => {
        fetch(url, 
            { method: 'PUT', 
            headers: { 'Content-type': 'application/json' }, 
            body: JSON.stringify(customer) 
        })
            .then(response => response.json())
            .then(data => { fetchCustomers()})
            .catch(err => console.error(err))
    }

    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(training)
        }
        )
        .then(response => response.json())
        .then (data => fetchTrainings())
        .catch(err => console.error(err))

    }

    const columns = [

        { field: '', width: '60', cellRendererFramework: function (params) {
            return (
                <IconButton variant="contained" 
                onClick={() => deleteCust(params.data.links[0].href)} color="error"><DeleteIcon/></IconButton>
            );}
        },
        { field: '', width: '60', cellRendererFramework: function (params) {
                return (
                    <Editcustomer variant="contained" customer={params.data} editCustomer={editCustomer} />
                );
            }
        },
        {field: '', width: '120', cellRendererFramework: function (params) {
                return(
                    <AddTraining variant="contained" customer={params.data} addTraining={addTraining} />
                )
        }},
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true, width: 120},
    ]

    return(
        <div>
            <AddCustomer addCustomer= {addCustomer} />
            <div className="ag-theme-material" style={{marginTop: 20, height: 600, width: '90%', margin: 'auto'}}>
                <AgGridReact 
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellSelection={true}
                    />
            </div>
        </div>
    );
}

export default Customers;