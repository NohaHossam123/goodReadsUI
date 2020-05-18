import React, {useState} from 'react';

const Reviews = (props)=> {
    const [id, setId] = useState('')

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
                        <p className="card-text">
                            <strong>{review.user.firstName+" "+review.user.lastName}</strong>
                            &nbsp;
                            <button type="button" className=" btn btn-link" data-toggle="tooltip" title="edit review" onClick={()=>editHandler(review._id)}>
                            <i className="fa fa-edit fa-xs"></i>
                            </button>
                        </p>
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