import React, {useState, useEffect} from 'react';
import BookRate from './RateResults';
import { Link } from 'react-router-dom';
import Ratecomp from './Admin/Ratecomp';
import { UserContext } from "../App";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    media: {
      height: 150,
    },
    
  });
const AuthorBooks = (props)=> {
    const id = props.id
    const [books, setBooks] = useState({ books: [], error: null, isloaded: false })
    const { user } = React.useContext(UserContext);
    const user_id = user? user.user._id: null
    const classes = useStyles();


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
                <div className="row mt-4" key={book._id}>
                    <div className="col-2">
                        <Card>
                        <CardMedia
                        className={classes.media}
                        image={book.image}
                        title={book.name}
                        />
                        </Card>
                    </div>
                    <div className="row col-10">
                        <Card style={{width:"100%"}}>
                            <CardContent>
                            <div className="row">
                                <div className="col-8">
                                    <Typography variant="body1" color="textPrimary" component="p">
                                        <strong><Link to={`/book/${book._id}`}>{book.name}</Link></strong>
                                    </Typography>
                                    <Typography variant="body1" color="textPrimary" component="p">
                                        <BookRate id={book._id}/>
                                    </Typography>  
                                </div>
                                <div className="col-4">
                                    <Ratecomp bookid={book._id} userid={user_id}/>
                                </div>
                            </div>
                            </CardContent>
                        </Card>
                       
                    </div>
                </div>

            )
        }
       
        </>
        )

    }
                      
           
}

 
export default AuthorBooks;