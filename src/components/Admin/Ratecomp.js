import React, { useState, useEffect } from "react";
import Axios from "axios";

const Ratecomp = ({ bookid,userid }) => {
  const [rate, setrate] = useState([]);
  const [state, setstate] = useState([]);
  
  
  useEffect(() => {
    Axios.get(`http://localhost:5000/books/rate/${userid}/${bookid}`)
        .then((res) => {
            // console.log(res.data[0].rate);
            setrate(res.data[0].rate);
        })
    Axios.get(`http://localhost:5000/books/shelf/${userid}/${bookid}`)
        .then((res) => {
            // console.log(res.data);
            setstate(res.data[0].state);
        })
}, []);


  const changerate = (e) => {
    const { target: { id } } = e
    setrate(id);
    Axios.post('http://localhost:5000/books/rate', {"rate":id, "user":userid, "book":bookid}).then((messages) => { console.log(messages); });
  }
  const changeState = (e) => {
    const { target: { value } } = e
    setstate(value);
    Axios.post('http://localhost:5000/books/shelf', {"state":value, "user":userid, "book":bookid}).then((messages) => { console.log(messages); });
  }

  return (
    <div className="col-12">
      <div className="col-12">
        <div className="col-12">
          <span id="1" className={rate >= 1 ? "fa fa-star checked" : "fa fa-star"} onClick={changerate}></span>
          <span id="2" className={rate >= 2 ? "fa fa-star checked" : "fa fa-star"} onClick={changerate}></span>
          <span id="3" className={rate >= 3 ? "fa fa-star checked" : "fa fa-star"} onClick={changerate}></span>
          <span id="4" className={rate >= 4 ? "fa fa-star checked" : "fa fa-star"} onClick={changerate}></span>
          <span id="5" className={rate >= 5 ? "fa fa-star checked" : "fa fa-star"} onClick={changerate}></span>
        </div>
        <select className="form-control" id="shelv" value={parseInt(state)?state:1} onChange={changeState}>
          <option value={1}>Currently read</option>
          <option value={2}>Want To Read</option>
          <option value={3}>read</option>
        </select>
      </div>
    </div>
  )
};

export default Ratecomp;
