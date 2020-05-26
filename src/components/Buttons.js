import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

 const Buttons = (props)=> {

    const classes = useStyles();
        // return (
        //         <div className="wrapper">
        //         <ul className="list-unstyled components" id="buttons">
        //             <li>
        //                 <button type="button"className="btn btn-info" onClick={()=>{ props.handleState(0);}} >All</button>
        //             </li>
        //             <li>
        //                 <button type="button" className="btn btn-info" onClick={()=>{ props.handleState(1);}} >Read</button>
        //             </li>
        //             <li>
        //                 <button type="button" className="btn btn-info">Currently Reading</button>
        //             </li>
        //             <li>
        //                 <button type="button" className="btn btn-info">Want To Read</button>
        //             </li>
        //         </ul>
        //         </div> 
        // )

    return (
        <List component="nav" className={classes.root} aria-label="mailbox folders">
        <ListItem button onClick={()=>{ props.handleState(0);}}>
            <ListItemText primary="All" />
        </ListItem>
        <Divider />
        <ListItem button divider onClick={()=>{ props.handleState(1);}}>
            <ListItemText primary="Read" />
        </ListItem>
        <ListItem button onClick={()=>{ props.handleState(2);}}>
            <ListItemText primary="Currently Reading" />
        </ListItem>
        <Divider light />
        <ListItem button onClick={()=>{ props.handleState(3);}}>
            <ListItemText primary="Want To Read" />
        </ListItem>
        </List>
    )

}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));

export default Buttons;
