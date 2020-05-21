import React, {useState} from 'react';
import Popup from "reactjs-popup";
import ReviewForm from './Reviewform'; 


const Reviews = (props)=> {
    const [id, setId] = useState('')
    const width = { width: "70%"}

const editHandler = ()=>{
    
}


const deleteHandler = (id)=>{
    setId(id)
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
                <div className="card mt-1" key={review._id}>
                    <div className="card-body">
                        <button type="button" className="close" data-toggle="tooltip" title="delete" onClick={()=>deleteHandler(review._id)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div className="card-text">
                            <strong>{review.user.firstName+" "+review.user.lastName}</strong>
                            &nbsp;
                                                       
                                <Popup
                                    trigger={<button type="button" className=" btn btn-link" data-toggle="tooltip" title="edit review" onClick={()=>editHandler(review._id)}>
                                    <i className="fa fa-edit fa-xs"></i>
                                    </button>}
                                    position="right center"
                                    contentStyle={width}
                                    closeOnDocumentClick>
                                    <> 
                                    <div className="container p-2">
                                    <h5 className="text-center">Edit your review </h5>
                                    <hr/>
                                    <ReviewForm submitHandler={props.submitHandler} review={review.review} mode="edit" id={review._id}/>
                                    </div>
                                    </>
                                </Popup>     
                           
                        </div>
                        <p className="card-text">
                            {review.review}
                        </p>
                    </div>
                </div>
            )
        }
        </>
        )

    }
                      
           
}

 
export default Reviews;