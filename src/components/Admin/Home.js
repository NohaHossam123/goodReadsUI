import React from "react";
import { UserContext } from "./Admin";
import Categories from "./Categories";
import Authors from "./Authors";
import Books from "./Books";

const Home = () => {
  const { user } = React.useContext(UserContext);
  const [currentView, setCurrentView] = React.useState("categories");

  return (
    <>
    <div className="navbar navbar-expand-md">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={
              currentView === "categories" ? "nav-link active" : "nav-link"
            }
            onClick={() => setCurrentView("categories")}
          >
            Categories
          </button>
        </li>
        <li className="nav-item">
          <button
            className={currentView === "books" ? "nav-link active" : "nav-link"}
            onClick={() => setCurrentView("books")}
          >
            Books
          </button>
        </li>
        <li className="nav-item">
          <button
            className={
              currentView === "authors" ? "nav-link active" : "nav-link"
            }
            onClick={() => setCurrentView("authors")}
          >
            Authors
          </button>
        </li>
      </ul>
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul className='navbar-nav ml-auto'>
        <button className="btn">
          <i className="fa fa-plus-circle fa-2x"></i>
        </button>
      </ul>
      </div>
      </div>
      {(() => {
        switch (currentView) {
          case "books":
            return <Books />;
          case "authors":
            return <Authors />;
          default:
          case "categories":
            return <Categories />;
        }
      })()}
    </>
  );
};

export default Home;
