import Typography from '@mui/material/Typography';
import React from 'react';
import './App.css';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import burger from './burger.png';

export default function App() {
  const [value, setValue] = React.useState('customers');
  const [drawerOpen, setDrawer] = React.useState(false);

  const toggleDrawer = (value) => {
    setDrawer(value);
  }
  return (
    <div>
      <AppBar position="sticky" color="secondary">
        <Toolbar>
  <Link onClick={() => toggleDrawer(true)} variant="contained" style={{ margin: '10px' }}><img src={burger} /></Link>
          <Drawer anchor="left"
            variant="temporary"
            open={drawerOpen}
            onClose={() => toggleDrawer(false)}
          >
            <Box>
              <List>
                <ListItem>
                  <Button onClick={() => setValue("customers")} color="secondary">Customers</Button>
                </ListItem>
                <ListItem>
                  <Button onClick={() => setValue("trainings")} color="secondary">Trainings</Button>
                </ListItem>
                <ListItem>
                  <Button onClick={() => setValue("calendar")} color="secondary">Calendar</Button>
                </ListItem>
              </List>
            </Box>
          </Drawer>
          <Typography variant="h6">
            Training App
          </Typography>
        </Toolbar>
      </AppBar>
      {value === 'customers' && <Customers />}
      {value === 'trainings' && <Trainings />}

    </div>
  );
}