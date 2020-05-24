import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import   {Link}  from "react-router-dom";


const Category = (props) => {

    const [categories, setCategories] = useState([]); 
    useEffect(() => {
    axios.get(`http://localhost:5000/categories`).then((res) => {
      console.log(res)
    setCategories(res.data);
    }).catch(err => {
    console.log(err.message);
    });
    }, []);
    return(
      <div className="row">
              {
                categories.map(cat =>
                      <div className="card text-white bg-dark mb-3">
                          <div className="card-body" >
                            <h1 className="card-title">{cat.name}</h1>
                            <Link  key={cat.id} to={`/category/${cat._id}`}>
                              <button className="btn btn-success" >Discover</button>
                              </Link>
                          </div>
                      </div>
              )}
      </div>
     )

    }
    

export default Category;