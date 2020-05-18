import React , { useState } from 'react';


const ReviewForm = function(props){
    const [input , setInput] = useState('');

    const handleChange = (e)=> {
        const {target: { value } } = e
        setInput(value)
      }
    
     const handleSubmit = (e) => {
        e.preventDefault();
        props.submitHandler(input)
        setInput('')
    }

    
    return (
      <div>
          <form onSubmit={handleSubmit} >
             <div className="form">
                <textarea className="form-control mb-1" id="content" rows="3"
                 onChange={handleChange} value={input} placeholder="review the book..."></textarea>
            </div>
            <div>
            <button className="btn btn-info" type="submit">post review</button>
            </div>
          </form>
      </div>
    )

}


export default ReviewForm;

