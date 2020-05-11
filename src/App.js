import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin/Admin";
import Categories from "./components/Categories";
import Books from "./components/Books";
import Authors from "./components/Authors";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/categories" component={Categories} />
          <Route path="/books" component={Books} />
          <Route path="/authors" component={Authors} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
