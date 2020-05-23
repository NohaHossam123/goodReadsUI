import React, {useState, useEffect} from 'react';
import BookRate from './RateResults';
import { Link } from 'react-router-dom';
// import axios from 'axios';

const AuthorBooks = (props)=> {
    const id = props.id
    const [books, setBooks] = useState({ books: [], error: null, isloaded: false })

    useEffect(()=>{      
            fetch(`http://localhost:5000/authors/${id}/books`)
            .then(res => res.json())
            .then(
              (result) => {
                    setBooks({books:result, error: null, isloaded: true})
              },
              (error) => {
                    setBooks({books:[], error: error, isloaded: true})
              }
            )
    }, [])
    console.log(books)

    if (books.error) {
        return ( <p className="card-text"> oops.. something went wrong! </p>)
    }else if(!books.isloaded) {
        return (<p className="card-text"> Loading... </p>)
    }else if(books.books.length == 0) {
        return (<p className="card-text"> Coming Soon... :)</p>)
    }else{
        return (
        <>{
            books.books.map((book)=>
                <div className="row mt-1" key={book._id}>
                    <div className="col-2">
                        <div className="card" style={{width:"105px", height:"110px"}}>
                            <img className="card-img-top" src={book.image} alt="Card image"/>
                        </div>
                    </div>
                    <div className="col-10 card">
                            <div className="card-body">
                                <p className="card-text">
                                    <strong><Link to={`/book/${book._id}`}>{book.name}</Link></strong>
                                </p>
                                {/* rating results */}
                                <BookRate id={book._id}/>
                            </div>
                        </div>
                    </div>
            )
        }
       
        </>
        )

    }
                      
           
}

 
export default AuthorBooks;