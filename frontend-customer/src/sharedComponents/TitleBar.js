import React from 'react';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MapIcon from '@material-ui/icons/Map';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";

export default function TitleBar(props){
    const [open, setOpen] = React.useState(false);
    const [role, setRole] = React.useState('');
    const [name, setName] = React.useState('');

    function logout() {
        localStorage.clear('Authorization-Token');
        localStorage.clear('role');
        localStorage.clear('name');
        delete axios.defaults.headers.common['Authorization'];
        window.location.assign('/login');
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        setRole(localStorage.getItem('role'));
        setName(localStorage.getItem('name'));
      }, []);

    return(
        <div>
        {/* The navgation bar */}
        <AppBar position="sticky" style={{ backgroundColor: '#0B345C' }}>
            <Toolbar>
                <IconButton
                    style={{ color: '#fff' }}
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerOpen}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" style={{ color: '#fff' }}>
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
        {/* This drawer will show up after the user clicks on the IconButton in the navigation bar */}
        <React.Fragment>
            <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
            <div style={{ backgroundImage: 'linear-gradient(to bottom, #0f1622, #042849)', height: '100%' }}>
            <List style={{width: 250}}>
                {/* Greeting */}
                <div>
                    <p style={{color: "#fff", fontSize: '2rem', fontWeight: '600', textAlign: 'center', marginBottom: '10px'}}>Hello!</p>
                    <p style={{color: "#fff", fontSize: '2rem', fontWeight: '600', textAlign: 'center', marginTop: '10px'}}>{name}</p>
                </div>
                {/* <Divider /> */}
                {/* If ths user is a customer */}
                {role.localeCompare("Customer") === 0 && (
                <>
                    <div style={{width: 'max-content', marginLeft: 40, marginBottom: 5}}>
                        <ListItem button component={Link} to="/" style={{textAlign: 'center', width: 'max-content'}}>
                            <ListItemIcon style={{color: '#fff', width: 'max-content'}}><LoyaltyIcon fontSize="large" /></ListItemIcon>
                            <ListItemText style={{color: '#fff', width: 'max-content'}}><p style={{fontSize: "1.2em", margin: 0}}>Promotion</p></ListItemText>
                        </ListItem>
                    </div>
                    <div style={{width: 'max-content', marginLeft: 40, marginBottom: 5}}>
                        <ListItem button component={Link} to="/coupon-List" style={{textAlign: 'center', width: 'max-content'}}>
                            <ListItemIcon style={{color: '#fff', width: 'max-content'}}><AccountBalanceWalletIcon fontSize="large" /></ListItemIcon>
                            <ListItemText style={{color: '#fff', width: 'max-content'}}><p style={{fontSize: "1.2em", margin: 0}}>My Coupon</p></ListItemText>
                        </ListItem>
                    </div>
                    <div style={{width: 'max-content', marginLeft: 40, marginBottom: 5}}>
                        <ListItem button component={Link} to="/explore" style={{textAlign: 'center', width: 'max-content'}}>
                            <ListItemIcon style={{color: '#fff', width: 'max-content'}}><MapIcon fontSize="large" /></ListItemIcon>
                            <ListItemText style={{color: '#fff', width: 'max-content'}}><p style={{fontSize: "1.2em", margin: 0}}>Explore</p></ListItemText>
                        </ListItem>
                    </div>
                </>
                )}
                {/* If ths user is a restaurant staff */}
                {role.localeCompare("Restaurant Staff") === 0 && (
                <div style={{width: 'max-content', marginLeft: 40, marginBottom: 5}}>
                    <ListItem button component={Link} to="/validation" style={{textAlign: 'center', width: 'max-content'}}>
                        <ListItemIcon style={{color: '#fff', width: 'max-content'}}><LoyaltyIcon fontSize="large" /></ListItemIcon>
                        <ListItemText style={{color: '#fff', width: 'max-content'}}><p style={{fontSize: "1.2em", margin: 0}}>Validation</p></ListItemText>
                    </ListItem>
                </div>
                )}
                <Divider style={{backgroundColor: '#fff', width: 180, margin: 'auto'}}/>
                {/* Log Out (This is shared by both customers and restaurant staff) */}
                <div style={{width: 'max-content', marginLeft: 40, marginTop: 5}}>
                    <ListItem button onClick={logout} style={{textAlign: 'center', width: 'max-content'}}>
                            <ListItemIcon style={{color: '#fff', width: 'max-content'}}><ExitToAppIcon fontSize="large" /></ListItemIcon>
                            <ListItemText style={{color: '#fff', width: 'max-content', fontSize: "1.5em", fontWeight: '600'}}><p style={{fontSize: "1.2em", margin: 0}}>Logout</p></ListItemText>
                    </ListItem>
                </div>
            </List>
            </div>
            </Drawer>
        </React.Fragment>
        </div>
    );
}