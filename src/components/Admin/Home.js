import React from "react";
import { UserContext } from "./Admin";
import Presenter from "./Presenter";

export const DataContext = React.createContext(null);

const Home = () => {
  const { user } = React.useContext(UserContext);

  const [data, setData] = React.useState({ items: [], currentView: 'categories', user, toggleModal: false});


  const providerValue = { data, setData };

  return (
    <>
    <div className="navbar navbar-expand-md">
        <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={
              data.currentView === "categories" ? "nav-link active" : "nav-link"
            }
            onClick={() => setData({...data, currentView: "categories"})}
          >
            Categories
          </button>
        </li>
        <li className="nav-item">
          <button
            className={data.currentView === "books" ? "nav-link active" : "nav-link"}
            onClick={() => setData({...data, currentView: "books"})}
          >
            Books
          </button>
        </li>
        <li className="nav-item">
          <button
            className={
              data.currentView === "authors" ? "nav-link active" : "nav-link"
            }
            onClick={() => setData({...data, currentView: "authors"})}
          >
            Authors
          </button>
        </li>
      </ul>
      </div>
    </div>
    <DataContext.Provider value={providerValue}>
    <Presenter/>
    </DataContext.Provider>
    </>
  );
};

export default Home;
