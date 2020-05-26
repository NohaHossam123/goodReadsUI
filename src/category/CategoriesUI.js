import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import   {Link}  from "react-router-dom";
import Navbar from '../components/Navbar';
import { UserContext } from '../App';
import Pagination from '../components/Pagination';
import './category-style.css'

const Category = (props) => {
    const { user, setUser } = React.useContext(UserContext);
    const [categories, setCategories] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPages] = useState(5);
    const indexOfLastItems = currentPage * itemsPerPage ;
    const indexOfFirstItems = indexOfLastItems - itemsPerPage ;
    useEffect(() => {
    axios.get(`http://localhost:5000/categories`).then((res) => {
      console.log(res)
    setCategories(res.data);
    }).catch(err => {
    console.log(err.message);
    });
    }, []);

    const currentItems = categories.slice(indexOfFirstItems, indexOfLastItems) ;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return(
      <>
      <div className="row">
        <Navbar user={user} setUser={setUser}/>
              {
                currentItems.map(cat =>
                      <div className="card card_cat text-white bg-dark mb-3">
                          <div className="card_cat_body" >
                            <h1 className="card-title">{cat.name}</h1>
                            <Link  key={cat.id} to={`/category/${cat._id}`}>
                              <button className="btn btn-success" >Discover</button>
                              </Link>
                          </div>
                      </div>
              )}
      </div>
      <div>
        <Pagination itemsPerPage={itemsPerPage} totalItems={categories.length} paginate={paginate}/>
      </div>
      </>
     )

    }
    

export default Category;