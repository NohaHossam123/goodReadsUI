import React from "react";
import Login from "./Login";
import Home from "./Home";
import "../../App.css";

export const UserContext = React.createContext(null);

const Admin = () => {
  const [user, setUser] = React.useState(null);
  const providerValue = { user, setUser };

  return (
    <UserContext.Provider value={providerValue}>
      { user ? <Home /> : <Login />}
    </UserContext.Provider> 
  )
};

export default Admin;
