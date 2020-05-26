import React from "react";
import { UserContext } from "../../App";
import PropTypes from 'prop-types';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Categories from "./Categories";
import Authors from "./Authors";
import { Switch, 
        FormGroup, 
        FormControlLabel, 
        Toolbar, 
        Button, 
        AppBar, 
        Typography, 
        Tab, 
        Tabs, 
        Box 
      } from "@material-ui/core";
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';
import CategoryTwoToneIcon from '@material-ui/icons/CategoryTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import Books from "./Books";

//Holding loading and if component should update
export const DataContext = React.createContext(null);


const Home = () => {
// holding user data
  const { user, setUser } = React.useContext(UserContext);
// holding user, loading status, and if the component should update
  const [data, setData] = React.useState({ user, loading:false, toggleUpdate: false});

  const providerValue = { data, setData };

  // logout function
  const logout = () => {
   setUser()
  }

  const classes = useStyles();
// value of the tab index
  const [value, setValue] = React.useState(0);
// dark mode status
  const [darkMode, setDarkMode] = React.useState(false);
// dark mode settings
  const darkTheme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <DataContext.Provider value={providerValue}>
      <ThemeProvider theme={darkTheme}>
        <div className={classes.root}>
        <AppBar position="static">
        <Toolbar>
          <MenuBookTwoToneIcon fontSize='large' className={classes.menuIcon}/>
          <Typography variant="h6" className={classes.title}>
            GoodReads
          </Typography>
          <Typography variant="h6" className={classes.title}>
          <AccountCircleTwoToneIcon className={classes.menuIcon}/>
            {data?.user?.user?.firstName} {data?.user?.user?.lastName} 
          </Typography>
          <Button color="inherit" onClick={ (e) => logout()}>Log out</Button>
        </Toolbar>
      </AppBar>
          <AppBar position="static" variant='elevation'>
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              classes={{
                indicator: classes.indicator,
              }}
              style={{backgroundColor:"#424242"}}
            >
              <LinkTab label="Categories"  icon={<CategoryTwoToneIcon style={{ display: "inline-block", marginBottom:"-20px", marginLeft:"-140px"}} />} {...a11yProps(0)} />
              <LinkTab label="Books" icon={<MenuBookTwoToneIcon style={{ display: "inline-block", marginBottom:"-20px", marginLeft:"-100px"}}/>} {...a11yProps(1)} />
              <LinkTab label="Authors" icon={<PersonOutlineTwoToneIcon style={{ display: "inline-block", marginBottom:"-20px", marginLeft:"-110px"}}/> } {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <FormGroup row>
            <FormControlLabel
              className='ml-auto mt-3'
              control={<Switch
                  checked={darkMode}
                  onChange={(e)=> setDarkMode(!darkMode)}
                  name="Dark Mode"
                  color='primary'
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />}
                label="Dark Mode"
              />
          </FormGroup>
          <TabPanel value={value} index={0}>
              <Categories />
          </TabPanel>
          <TabPanel value={value} index={1}>
              <Books />
          </TabPanel>
          <TabPanel value={value} index={2}>
              <Authors />
          </TabPanel>
        </div>
      </ThemeProvider>
    </DataContext.Provider>
  );
  
};



//TabPanel settings
const TabPanel= (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
// navigation tabs controls
const a11yProps = (index) => {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}
// style settings
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
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
    marginBottom:"10px", 
  }
}));

export default Home;
