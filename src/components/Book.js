import React, {useState, useEffect} from 'react';
import { Link , NavLink } from 'react-router-dom';
import BookRate from './RateResults';
import Reviews from './Reviews';
import ReviewForm from './Reviewform'; 
import { UserContext } from "../App";
import Popup from "reactjs-popup";
import Ratecomp from './Admin/Ratecomp';
import Navbar from './Navbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      maxWidth: 900,
    },
    media: {
      height: 280,
    },
    heading: {
        background: "#141414",
        color: "white",
        height: 55,
    }
    
  });

const Book = ({match: { params: { id } } })=> {
    const [book, setBook] = useState({ book: {}, error: null, isloaded: false })
    const [reviews,setReviews] = useState ({reviews: [], error:null , isloaded: false})
    const { user, setUser } = React.useContext(UserContext);
    const user_id = user? user.user._id: null
    const [open, setOpen] = useState(false)
    const classes = useStyles();
   
      


    
    useEffect(()=>{
        fetch(`http://localhost:5000/books/${id}`)
            .then(res => res.json())
            .then(
              (result) => {
                    setBook({book:result, error:null, isloaded: true})
              },
              (error) => {
                    setBook({book:{}, error: error, isloaded: true})
              }
            )  

            fetch(`http://localhost:5000/reviews/${id}`)
            .then(res => res.json())
            .then(
              (result) => {
                    setReviews({reviews:result, error:null, isloaded: true})
              },
              (error) => {
                    setReviews({reviews:[], error: error, isloaded: true})
              }
            )  
    }, [])
    
    const submitHandler = (text, mode,book_id)=>{
        if(!user_id){
           setOpen(true)    
        }else{
            switch(mode){
                case "add":
                    fetch("http://localhost:5000/reviews",
                    {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            review:text,
                            book: id,
                            user: user_id,
                        }),
                    })
                    .then(res => res.json())
                    .then(
                    (result) => {
                        setReviews({reviews:[...reviews.reviews,result], error:null, isloaded: true})
                    },
                    (error) => {
                        alert("cannot add review! something went wrong\nnote:'You cannot send empty review'")
                    })
                    break
                case "edit":
                    fetch(`http://localhost:5000/reviews/${book_id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            review:text
                        }),
                    })
                    .then(res => res.json())
                    .then(
                    (result) => {
                        const newRev = reviews.reviews.map(review=>{
                            if(review._id == result._id) review = result
                            return review
                        })            
                        setReviews({reviews:newRev, error:null, isloaded: true})
                    },
                    (error) => {
                        alert("cannot edit this reviw! something went wrong\nnote:'You cannot send empty review'")
                    })
                }
            } 
        } 
    

    const deleteHandler = (id)=>{
        fetch(`http://localhost:5000/reviews/${id}`,{ method: "delete"})
        .then(res => res.json())
        .then(
          (result) => {
            const newRev = reviews.reviews.filter(review=>review._id != result._id)            
            setReviews({reviews:newRev, error:null, isloaded: true})
          },
          (error) => {
                alert("something went wrong")
          })
    }
    // ------------ render

    if (book.error) {
        return <div style={{
                            position: 'absolute', left: '50%', top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}> 404|Error </div>
    }else if(!book.isloaded) {
        return <div style={{
                            position: 'absolute', left: '50%', top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}>Loading... </div>
    }else {
        return (
        <>
            <Navbar user={user} setUser={setUser}/>
            <div className="container-xl">
                <Popup
                    open={open}
                    modal
                    closeOnDocumentClick
                    onClose={()=>setOpen(false)}>
                    <>
                        <a className="close" onClick={()=>setOpen(false)}>&times;</a>
                        <div className="container p-2">
                            <h5 className="text-center">WARNNING </h5>
                            <hr/>
                            <p>You have to Login first</p>
                            <hr/>
                            <div className="text-center">
                                <NavLink activeClassName="btn btn-info mr-2" to="/"> Login page </NavLink>
                                <button className="btn btn-dark ml-2" onClick={()=>setOpen(false)}>Close</button>
                            </div>
                        </div>
                    </>
                </Popup>
                {/* Author section */}
                <div className="row mt-4">
                    <div className="col-3">
                    <Card>
                    <CardMedia
                      className={classes.media}
                      image={book.book.image}
                      title={book.book.name}
                    />
                    </Card>
                    <br/>
                    <div>
                    <Ratecomp bookid={id} userid={user_id}/>
                    </div>
                    </div>
                    <div className="col-9">
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h4">
                             <strong>{book.book.name}</strong>
                            </Typography>
                            <hr/>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <strong>By : </strong> &nbsp;<Link to={`/author/${book.book.author._id}`}>{book.book.author.firstName}&nbsp;{book.book.author.lastName}</Link>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <strong>Category : </strong> &nbsp;<Link to={`/category/${book.book.category._id}`}>{book.book.category.name}</Link>
                            </Typography>  
                            <Typography variant="body2" color="textSecondary" component="p">  
                                <BookRate id={id}/>
                            </Typography>
                            <Typography variant="body1" color="textPrimary" component="p">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </Typography>
                        </CardContent>
                    </Card>
                    </div>
                </div>
                <br/>
                {/* reviews section */}
                {/* review form */}
                <div className="mt-5">
                <Card>
                    <CardHeader title="Add your review review" titleTypographyProps={{ variant:'h6' }} className={classes.heading}> </CardHeader>
                    <CardContent>
                        <Typography component="div" style={{marginTop:"10px"}}>
                            <ReviewForm submitHandler={submitHandler} review="" mode="add" id=""/>
                        </Typography>
                    </CardContent>
                </Card>    
                </div>

                {/* reviews */}
                <br/>
                <div className="card  mt-5 mb-5">
                <Card>
                    <CardHeader title="Book's reviews" titleTypographyProps={{ variant:'h6' }} className={classes.heading}> </CardHeader>
                    <CardContent>
                        <Reviews reviews ={reviews} submitHandler={submitHandler} deleteHandler={deleteHandler} user={user_id}/>
                    </CardContent>
                </Card>               
                </div>

            </div>
        </>
        );
    }
           
}

 
export default Book;