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
          <th>Name</th>
          <th>Category</th>
          <th>Author</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((book, index) => {
          return (
            <tr key={book._id}>
              <td>{index + 1}</td>
              <td>
                <img src={book.image}></img>
              </td>
              <td>{book.name}</td>
              <td>{book.category.name}</td>
              <td>
                {book.author.firstName} {book.author.lastName}
              </td>
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

const Books = () => {
  return (
    <Fetcher current="books">
      <Table />
    </Fetcher>
  );
};

export default Books;
