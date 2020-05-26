import React, { useState, useEffect } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Axios from "axios"
const StateResult = (props) => {
  const state = props.state

  switch(state){
    case 0 :
      return (
        <div className="d-flex">
            Read
        </div>
      )
        break;      
    case 1 :
      return (
        <div className="d-flex">
            Currently Reading
        </div>
      )
        break;
    case 2 :
      return (
        <div className="d-flex">
            Want To Read
        </div>
      )
        break;
      }

}



export default StateResult;