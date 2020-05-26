import React, {useState, useEffect} from 'react';
import Buttons from './Buttons';
import BookRate from './RateResults';
import StateResult from './StateResult';
import axios from 'axios';
import { UserContext } from "../App";
import Pagination from './Pagination';
import Navbar from './Navbar';
import { Redirect } from 'react-router-dom';

import {Link} from 'react-router-dom';
import './buttons.css'

const Userbook = () => {
  const { user, setUser } = React.useContext(UserContext);
    const [userBook, setUserBook] = useState([]);
    const [isLoading,setIsLoading] = useState(true)
    const [books, setBooks] = useState([]);  
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPages] = useState(5);
    const indexOfLastItems = currentPage * itemsPerPage ;
    const indexOfFirstItems = indexOfLastItems - itemsPerPage ;
    const user_id = user ? user.user._id : null;

    useEffect(()=>{
        console.log("ID",user_id);
        axios.get(`http://localhost:5000/books/shelf/${user_id}`).then((res)=>{
            
            setUserBook(res.data);
            setBooks(res.data);
            setIsLoading(false)
            console.log(res);
            
        });
    }, []);

    const currentItems = books.slice(indexOfFirstItems, indexOfLastItems) ;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const changeState = (status)=>{
        switch(status){
            case 0 :
                setBooks(userBook);
                break;      
            case 1 :
                setBooks(userBook.filter(book=>book.state == 0));
                break;
            case 2 :
                setBooks(userBook.filter(book=>book.state == 1));
                break;
            case 3 :
                setBooks(userBook.filter(book=>book.state == 2));
                break;
        }
    }
    const handleState = (state)=>{
        changeState(state);
    }
    if (!user) return <Redirect to='/' />
    else if(isLoading){
        return <div>
            <h1>Loading...</h1>
        </div>
    }else
    return ( 
        <div>
            <Navbar user={user} setUser={setUser}/>
            <div className="row">
            <div>
            <Buttons handleState={handleState}/>
            </div>
            <div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Cover</th>
                    <th scope="col">Name</th>
                    <th scope="col">Author</th>
                    <th scope="col">Avg Rate</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Shelf</th>
                    </tr>
                </thead>
                <tbody>
                {
                    
                    currentItems.map(userbook=>{
                        if(!userbook.book){
                            return
                        }
                        return(
                            <tr key={userbook._id}>
                            <td><img src = {userbook.book.image} width="200px" height="200px"/></td>  
                            <td><Link to={`/book/${userbook.book._id}`}>{userbook.book.name}</Link></td>
                            <td><Link to={`/author/${userbook.book.author._id}`}>{userbook.book.author.firstName +" "+userbook.book.author.lastName}</Link></td>
                            <td><BookRate id={userbook.book._id} show={true} /></td>
                            <td><BookRate id={userbook.book._id} hideAvg /></td>
                            <td><StateResult state= {userbook.state} /></td>
                            </tr>
                        )
                         } )
                }
                </tbody>
            </table>
            <Pagination itemsPerPage={itemsPerPage} totalItems={books.length} paginate={paginate}/>
            </div>
        </div>
        </div>
     );
}
 
export default Userbook;