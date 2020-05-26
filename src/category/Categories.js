import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Redirect, useParams, Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import { UserContext } from '../App';
import Pagination from '../components/Pagination';

const CategoryBooks = (props) => {
    const { user, setUser } = React.useContext(UserContext);
    const [data, setData] = useState([]);
    const { categoryname, id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPages] = useState(5);
    const indexOfLastItems = currentPage * itemsPerPage ;
    const indexOfFirstItems = indexOfLastItems - itemsPerPage ;

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

    const currentItems = data.slice(indexOfFirstItems, indexOfLastItems) ;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

        return (
            <>
            <div className="row">       
            <Navbar user={user} setUser={setUser}/>          
                {
                    currentItems.map(book=>
                    <div className="card card_cat text-white bg-dark mb-3" >
                        <h5 className="card-title">{book.name}</h5>
                    <Link  key={book.id} to={`/book/${book._id}`}>
                        <button className="btn btn-success">Read More</button>
                    </Link>
                    </div>
                    
                    )
                }
            </div>
            <div>
                <Pagination itemsPerPage={itemsPerPage} totalItems={data.length} paginate={paginate}/>
            </div>
        </>
        );
    

}

export default CategoryBooks;



