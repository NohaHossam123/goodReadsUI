import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import   {Link}  from "react-router-dom";
import Navbar from '../components/Navbar';
import { UserContext } from '../App';


const Category = (props) => {
    const { user, setUser } = React.useContext(UserContext);
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
        <Navbar user={user} setUser={setUser}/>
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