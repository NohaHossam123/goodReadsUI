import React, {useState, useEffect} from 'react';
// import axios from 'axios';

const BookRate = (props)=> {
    const id = props.id
    const [rate, setRate] = useState({ rate: [], error: null, isloaded: false })

    useEffect(()=>{      
    //         fetch(`http://localhost:5000/books/rate/${id}`)
    //         .then(res => res.json())
    //         .then(
    //           (result) => {
    //                 setRate({rate:result, error: null, isloaded: true})
    //           },
    //           (error) => {
    //                 setRate({books:[], error: error, isloaded: true})
    //           }
    //         )

    }, [])

    
    console.log(rate)
        return (
        <>
            <div>
                <span>  
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>

                </span>

                <span>
                &nbsp; -  {/* {rate} */} &nbsp; rates
                </span>
            </div>
       
        </>
        )

    }
                      

 
export default BookRate;