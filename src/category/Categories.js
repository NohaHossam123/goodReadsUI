import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Redirect, useParams, Link } from "react-router-dom";
const CategoryBooks = (props) => {
    const [data, setData] = useState([]);
    const { categoryname, id } = useParams();
    let path = `http://localhost:5000/categories/${id}/books`;
    useEffect(() => {
        axios.get(path).then(res => {
            console.log(res.data)
            setData(res.data);  
            
        }).catch(e => {
            console.log(e);
            setData([{ category: { name: "error" } }]);
        });
    }, []);
        return (
                <div className="row">                 
                  {
                      data.map(book=>
                        <div className="card text-white bg-dark mb-3" >
                            <h5 className="card-title">{book.name}</h5>
                        <Link  key={book.id} to={`/book/${book._id}`}>
                          <button className="btn btn-success">Read More</button>
                        </Link>
                     </div>
                       
                        )
                  }
                </div>

        );
    

}

export default CategoryBooks;



