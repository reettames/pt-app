import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

function Editcustomer(props){
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({ firstname: props.customer.firstname, lastname: props.customer.lastname, email: props.customer.email, phone: props.customer.phone, streetaddress: props.customer.streetaddress, postcode: props.customer.postcode, city: props.customer.city, url: props.customer.links[0].href });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = e => {
        setCustomer({...customer, [e.target.name]: e.target.value})
    }
    const saveCustomer = () => {
        props.editCustomer(props.customer.links[0].href, customer);
        setOpen(false);
    }

    return(
        <div>
            <IconButton variant="outlined" onClick={handleClickOpen} ><EditIcon /></IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                <TextField
                    margin="dense"
                    name ="firstname"
                    value={customer.firstname}
                    onChange={inputChanged}
                    label="First Name"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name ="lastname"
                    value={customer.lastname}
                    onChange={inputChanged}
                    label="Last Name"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name ="email"
                    value={customer.email}
                    onChange={inputChanged}
                    label="Email"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name ="phone"
                    value={customer.phone}
                    onChange={inputChanged}
                    label="Phone"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name ="streetaddress"
                    value={customer.streetaddress}
                    onChange={inputChanged}
                    label="Street Address"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name ="city"
                    value={customer.city}
                    onChange={inputChanged}
                    label="City"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name ="postcode"
                    value={customer.postcode}
                    onChange={inputChanged}
                    label="Postcode"
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={saveCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}
export default Editcustomer;