import React, {useState, useEffect} from 'react';
import Buttons from './Buttons';
import axios from 'axios';
import { UserContext } from "../App";
import Pagination from './Pagination';


const Userbook = () => {
  const { user } = React.useContext(UserContext);
    console.log("userbook",user?.user?.username);
    const [userBook, setUserBook] = useState([]);
    const [books, setBooks] = useState([]);  
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage, setBooksPerPages] = useState(1);
    const indexOfLastBooks = currentPage * booksPerPage ;
    const indexOfFirstBooks = indexOfLastBooks - booksPerPage ;
    const user_id = user ? user.user._id : null;

    useEffect(()=>{
        axios.get(`http://localhost:5000/books/shelf/${user_id}`).then((res)=>{
            setUserBook(res.data);
            setBooks(res.data);
        });
    }, []);

    const currentBooks = books.slice(indexOfFirstBooks, indexOfLastBooks) ;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const changeState = (status)=>{
        switch(status){
            case 0 :
                setBooks(userBook);
                break;      
            case 1 :
                setBooks(userBook.filter(book=>book.state == 0));
                break;
        }
    }
    const handleState = (state)=>{
        changeState(state);
    }
    return ( 
        <div className="container col-12">
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
                    <th scope="col">Sheleve</th>
                    </tr>
                </thead>
                <tbody>
                {
                    currentBooks.map(userbook=>{
                        return(
                            <tr key={userbook._id}>
                            <td>{userbook.book.image}</td>  
                            <td>{userbook.book.name}</td>
                            <td>{userbook.book.author.firstName +" "+userbook.book.author.lastName}</td>
                            <td>3</td>
                            <td>5</td>
                            <td>3</td>
                            </tr>
                        )
                         } )
                }
                </tbody>
            </table>
            <Pagination booksPerPage={booksPerPage} totalBooks={books.length} paginate={paginate}/>
            </div>
        </div>
        </div>
     );
}
 
export default Userbook;