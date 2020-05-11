import React from "react";
import Fetcher from "./Fetcher";
import { UserContext } from "./Admin";

const Table = (props) => {
  return (
    <table className="table table-light table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((cat, index) => {
          return (
            <tr key={cat._id}>
              <td>{index + 1}</td>
              <td>{cat.name}</td>
              <td>
                <button className="btn">
                  <i className="fa fa-pencil fa-lg"></i>
                </button>
                <button className="btn">
                  <i className="fa fa-trash fa-lg"></i>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Categories = () => {
  return (
    <Fetcher current="categories">
      <Table />
    </Fetcher>
  );
};

export default Categories;
