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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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
        <>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerOpen}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
        <React.Fragment>
            <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
            <List style={{width: 250}}>
                <ListItem>
                    <ListItemIcon>
                        <AccountCircleIcon/>
                    </ListItemIcon>
                    <Typography variant="h6">
                        Hello, {name}
                    </Typography>
                </ListItem>
                <Divider />
                {role.localeCompare("Customer") === 0 && (
                <>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon><LoyaltyIcon  fontSize="small"/></ListItemIcon>
                        <ListItemText primary="Promotion"></ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/coupon-List">
                        <ListItemIcon><AccountBalanceWalletIcon  fontSize="small"/></ListItemIcon>
                        <ListItemText primary="My Coupon" ></ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/explore">
                        <ListItemIcon><MapIcon  fontSize="small"/></ListItemIcon>
                        <ListItemText primary="Explore" ></ListItemText>
                    </ListItem>
                </>
                )}
                {role.localeCompare("Restaurant Staff") === 0 && (
                <>
                    <ListItem button component={Link} to="/coupon-validation">
                        <ListItemIcon><LoyaltyIcon fontSize="small"/></ListItemIcon>
                        <ListItemText primary="Coupon Validation"></ListItemText>
                    </ListItem>
                    <ListItem button component={Link} to="/subtask-validation">
                        <ListItemIcon><LoyaltyIcon fontSize="small"/></ListItemIcon>
                        <ListItemText primary="Subtask Validation"></ListItemText>
                    </ListItem>
                </>
                )}
                <Divider />
                <ListItem button onClick={logout}>
                        <ListItemIcon><ExitToAppIcon fontSize="small"/></ListItemIcon>
                        <ListItemText primary="Log out"></ListItemText>
                </ListItem>
            </List>
            </Drawer>
        </React.Fragment>
        </>
    );
}