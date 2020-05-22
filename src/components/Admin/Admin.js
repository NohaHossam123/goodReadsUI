import React from "react";
import Login from "./Login";
import Home from "./Home";
import { UserContext } from "../../App";
import "../../App.css";


const Admin = () => {
  const { user } = React.useContext(UserContext)
  if (user) return <Home />
  else return <Login isAdmin={true} UserContext={UserContext}/>
};

export default Admin;
