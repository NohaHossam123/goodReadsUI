import React from "react";
import Fetcher from "./Fetcher";
import { UserContext } from "./Admin";

const Table = (props) => {
  return (
    <table className="table table-light table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Photo</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((author, index) => {
          return (
            <tr key={author._id}>
              <td>{index + 1}</td>
              <td>
                <img src={author.image}></img>
              </td>
              <td>{author.firstName}</td>
              <td>{author.lastName}</td>
              <td>{author.birthDate}</td>
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

const Authors = () => {
  return (
    <Fetcher current="authors">
      <Table />
    </Fetcher>
  );
};

export default Authors;
