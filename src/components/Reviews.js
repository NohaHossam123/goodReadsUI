import React from 'react';
import Popup from "reactjs-popup";
import ReviewForm from './Reviewform'; 
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const Reviews = (props)=> {
    const width = { width: "70%"}
    const user = props.user

    const deleteHandler = (id)=>{
        props.deleteHandler(id)
    }

    if (props.reviews.error) {
        return ( <p className="card-text"> oops.. something went wrong! </p>)
    }else if(!props.reviews.isloaded) {
        return (<p className="card-text"> Loading... </p>)
    }else if(props.reviews.reviews.length == 0) {
        return (<p className="card-text"> No reviews... :)</p>)
    }else{
        return (
        <>{
            props.reviews.reviews.map((review)=>
                <div className="mt-3" key={review._id}>
                <Card>
                <CardContent>
                        {user == review.user._id?  
                            <button type="button" className="close" data-toggle="tooltip" title="delete review" onClick={()=>deleteHandler(review._id)}>
                                <span aria-hidden="true">&times;</span>
                            </button>: <></>  
                        }
                            <Typography variant="h6" color="textSecondary" component="h6">
                            <strong>{review.user.firstName+" "+review.user.lastName}</strong>
                            {user == review.user._id?                            
                                <Popup
                                    trigger={<Button title="edit review">
                                    <i className="fa fa-edit fa-sm"></i>
                                    </Button>}
                                    position="right center"
                                    contentStyle={width}
                                    closeOnDocumentClick>
                                    {close => (
                                    <> 
                                    <a className="close btn btn-link" onClick={close}>cancel</a>
                                    <div className="container p-2">
                                    <h4>Edit your review </h4>
                                    <hr/>
                                    <ReviewForm submitHandler={props.submitHandler} review={review.review} mode="edit" id={review._id}/>
                                    </div>
                                    </>
                                    )}
                                </Popup> : <></>  
                        }
                        </Typography>
                        <Typography variant="body1" color="textPrimary" component="p">
                            {review.review}
                        </Typography>
                    </CardContent>
                    </Card>
                </div>
            )
        }
        </>
        )

    }
                      
           
}

 
export default Reviews;