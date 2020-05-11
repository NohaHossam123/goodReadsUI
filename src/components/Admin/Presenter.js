import React from "react";
import Fetcher from "./Fetcher";
import { UserContext } from "./Admin";

const Presenter = (props) => {
  const { current } = props;
  return (
    <Fetcher current={current}>
      <Table />
    </Fetcher>
  );
};


const Table = (props) => {
  const { current } = props;


  const tableHeaders = () => {
    switch (current) {
      case "books":
        return (
          <>
            <th>Photo</th>
            <th>Name</th>
            <th>Category</th>
            <th>Author</th>
          </>
        );
      case "authors":
        return (
          <>
            <th>Photo</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
          </>
        );
      default:
      case "categories":
        return <th>Name</th>;
    }
}

const tableData = (item) => {
  switch (current) {
    case "books":
      return (
        <>
          <td>
            <img src={item.image}></img>
          </td>
          <td>{item.name}</td>
          <td>{item.category.name}</td>
          <td>
            {item.author.firstName} {item.author.lastName}
          </td>
        </>
      );
    case "authors":
      return (
        <>
          <td>
            <img src={item.image}></img>
          </td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.birthDate}</td>
        </>
      );
    default:
    case "categories":
      return <td>{item.name}</td>;
  }
}
  return (
    <table className="table table-light table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>ID</th>
          { tableHeaders() }
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((item, index) => {
          return (
            <tr key={item._id}>
              <td>{index + 1}</td>
              { tableData(item) }
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





export default Presenter;
