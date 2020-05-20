import React from "react";
import Fetcher from "./Fetcher";
// import { UserContext } from "./Admin";
import { DataContext } from "./Home";
import Popup from "reactjs-popup";
import {tableData, tableHeaders, editForm, confirmDelete} from './helpers';

const Presenter = () => {
  const {data} = React.useContext(DataContext)
  const { currentView } = data;
  return (
  <><div className="">
    <ul className='text-right list-inline'>
      <Popup
        trigger={<button className="btn">
        <i className="fa fa-plus-circle fa-2x mr-3"></i>
      </button>}
        modal
        closeOnDocumentClick
      >
        {editForm(null,currentView)}
      </Popup>
    </ul>
  </div> 
  <Fetcher current={currentView}>
    <Table />
  </Fetcher>
  </>
 );
};

const Table = (props) => {
  const { current } = props;
  const {data, setData} = React.useContext(DataContext)
  return (
    <table className="table table-light table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>ID</th>
          {tableHeaders(current)}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((item, index) => {
          return (
            <tr key={item._id}>
              <td>{index + 1}</td>
              {tableData(item,current)}
              <td>
                <Popup
                  trigger={<button className="btn">
                  <i className="fa fa-pencil fa-lg"></i>
                </button>}
                  modal
                  closeOnDocumentClick
                >
                  {editForm(item,current)}
                </Popup>
                <Popup
                  trigger={<button className="btn">
                  <i className="fa fa-trash fa-lg"></i>
                </button>}
                  modal
                  closeOnDocumentClick
                >
                  {confirmDelete(item,current,data,setData)}
                </Popup>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Presenter;
