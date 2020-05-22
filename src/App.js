import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin/Admin";
import Categories from "./components/Categories";
import Books from "./components/Books";
import Book from "./components/Book";
import Authors from "./components/Authors";
import Author from "./components/Author";
import Userbook from "./components/Userbook";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

export const UserContext = React.createContext(null);

function App() {
  const [user, setUser] = React.useState(null);
  const providerValue = { user, setUser };
  return (
    <UserContext.Provider value={providerValue}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/userbook" component={Userbook} />
          <Route path="/admin" component={Admin} />
          <Route path="/categories" component={Categories} />
          <Route path="/books" component={Books} />
          <Route path="/book/:id" component={Book} />
          <Route path="/authors" component={Authors} />
          <Route path="/author/:id" component={Author} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider> 
  );
}

export default App;
