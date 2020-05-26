import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

 const Buttons = (props)=> {

        return (
                <div className="wrapper">
                <ul className="list-unstyled components" id="buttons">
                    <li>
                        <button type="button"className="btn btn-info" onClick={()=>{ props.handleState(0);}} >All</button>
                    </li>
                    <li>
                        <button type="button" className="btn btn-info" onClick={()=>{ props.handleState(1);}} >Read</button>
                    </li>
                    <li>
                        <button type="button" className="btn btn-info" onClick={()=>{ props.handleState(2);}} >Currently Reading</button>
                    </li>
                    <li>
                        <button type="button" className="btn btn-info" onClick={()=>{ props.handleState(3);}} >Want To Read</button>
                    </li>
                </ul>
                </div> 
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
