import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddTraining(props){
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        activity: '',
        date: new Date(),
        duration: 0,
        customer: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
        setTraining({...training, customer: props.customer.links[0].href});
    };

    const handleClose = () => {
        setOpen(false);
    };
    const inputChanged = e => {
        setTraining({...training, [e.target.name]: e.target.value})
    }
    const addTraining = () =>{
        props.addTraining(training);
        handleClose();
    }

    return(
        <div>
            <Button size='small' variant="outlined" onClick={handleClickOpen}>New training</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New training</DialogTitle>
                <DialogContent>
                <TextField
                    margin="dense"
                    name ="activity"
                    value={training.activity}
                    onChange={inputChanged}
                    label="Activity"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name ="date"
                    value={training.date}
                    onChange={inputChanged}
                    label="Date"
                    fullWidth
                    type='datetime-local'
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name ="duration"
                    value={training.duration}
                    onChange={inputChanged}
                    label="Duration"
                    fullWidth
                    type='number'
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={addTraining}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}
export default AddTraining;