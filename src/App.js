import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
 import Categories from "./components/CategoriesUI";
import Books from "./components/Books";
import Authors from "./components/Authors";
// import CategoryDetails from "./category/Categories"
import "./App.css";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/categories" component={Categories} />
          {/* <Route path="/categories/:categoryname/:id" component={CategoryDetails} /> */}
          <Route path="/books" component={Books} />
          <Route path="/authors" component={Authors} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default App;
