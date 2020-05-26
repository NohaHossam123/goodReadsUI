import React from "react";
import Login from "./Login";
import Home from "./Home";
import { UserContext } from "../../App";
import "./style.css";

const Admin = () => {
  // getting the current user from the context
  const { user } = React.useContext(UserContext)
  // if there is a logged in user render the admin panel. else, render the login page
  return (user) ?  <Home /> : <Login isAdmin={true} UserContext={UserContext}/>
};

export default Admin;
