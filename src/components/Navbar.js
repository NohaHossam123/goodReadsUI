import React from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import { NavLink } from 'react-router-dom';

const Navbar = ({ user, setUser}) => {

    const logout = () => {
        setUser()
    }
    
    const classes = useStyles();
     
    return ( 
        <AppBar position="static" style={{ backgroundColor:'#303030'}}>
            <Toolbar>
                <MenuBookTwoToneIcon fontSize='large' className={classes.menuIcon}/>
                <Typography variant="h6" className={classes.title}>
                    GoodReads
                </Typography>
                <Typography className={classes.title}>
                    <NavLink to="/" style={{ textDecoration: 'none', color: 'unset' }}>
                        Home
                    </NavLink>
                </Typography>
                <Typography className={classes.title}>
                    <NavLink to="/categories" style={{ textDecoration: 'none', color: 'unset' }}>
                        Categories
                    </NavLink>
                </Typography>
                <Typography className={classes.title}>
                    <NavLink to="/books" style={{ textDecoration: 'none', color: 'unset' }}>
                        Books
                    </NavLink>
                </Typography>
                <Typography className={classes.title}>
                    <NavLink to="/authors" style={{ textDecoration: 'none', color: 'unset' }}>
                        Authors
                    </NavLink>
                </Typography>
                {user && (<Typography variant="h6" className={classes.title}>
                <AccountCircleTwoToneIcon className={classes.menuIcon} fontSize='large' style={{ display: "inline-block", marginBottom:"0px", marginRight:'5px'}}/>
                    {user?.user?.firstName} {user?.user?.lastName} 
                </Typography>)}
                {user && (<Button color="inherit" onClick={ (e) => logout()}>Log out</Button>)}
            </Toolbar>
    </AppBar>
     );
}
 
// style settings
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
    palette: {
        primary: '#00bcd4',
        secondary: '#ff4081'
    },
    indicator: {
      backgroundColor: 'white',
    },
    title: {
      flexGrow: 1,
    },
    menuIcon: {
      marginRight: theme.spacing(2),
      display: "inline-block", 
      marginBottom:"10px"
    }
  }));
export default Navbar;