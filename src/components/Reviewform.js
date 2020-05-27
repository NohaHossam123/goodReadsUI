import React , { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const ReviewForm = function(props){
    const [input , setInput] = useState(props.review);
    const handleChange = (e)=> {
        const {target: { value } } = e
        setInput(value)
      }
    
     const handleSubmit = (e) => {
        e.preventDefault();
        props.submitHandler(input,props.mode,props.id)
        setInput('')
    }

    
    return (
      <div>
          <form onSubmit={handleSubmit} >
             <div className="form">
             <TextField
                  label="review the book.."
                  multiline
                  rows={2}
                  value={input}
                  variant="outlined"
                  onChange={handleChange}
                  style={{width:"100%"}}
                  />
              
            </div>
            <div>
            <Button style={{backgroundColor:'#303030', color:'white', marginTop:'8px'}}type="submit">
            post review
            </Button>
            </div>
          </form>
      </div>
    )

}


export default ReviewForm;

