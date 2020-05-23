import React, {useState, useEffect} from 'react';
import AuthorBooks from './AuthorBooks';
// import axios from 'axios';

const Author = ({match: { params: { id } } })=> {
    const [author, setAuthor] = useState({ author: {}, error: null, isloaded: false })

    useEffect(()=>{
        fetch(`http://localhost:5000/authors/${id}`)
            .then(res => res.json())
            .then(
              (result) => {
                if (result.message != "author page") {
                    setAuthor({author:{}, error:result, isloaded: true})
                }else{
                    setAuthor({author:result.data, error: null, isloaded: true})
                }
              },
              (error) => {
                    setAuthor({author:{}, error: error, isloaded: true})
              }
            )  
    }, [])
    console.log(author)


    if (author.error) {
        return <div style={{
                            position: 'absolute', left: '50%', top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}> 404|Error </div>
    }else if(!author.isloaded) {
        return <div style={{
                            position: 'absolute', left: '50%', top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}>Loading... </div>
    }else {
        return (
        <div className="container">
            {/* Author section */}
            <div className="row mt-4">
                <div className="col-3">
                <div className="card" style={{width:"100%", height:"260px"}}>
                    <img className="card-img-top" src={author.author.image} alt="Card image"/>
                </div>
                </div>
                <div className="col-9">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">{author.author.firstName}&nbsp;{author.author.lastName} </h4>
                            <hr/>
                            <p className="card-text">
                                <strong>Born : </strong> &nbsp;{author.author.birthDate.split('',10)}
                            </p>
                            <p className="card-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* books section */}
            <div className="card  mt-5">
                <div className="card-header">Author's Books</div>
                <div className="card-body">
                    <AuthorBooks id= {author.author._id}/>
                </div>
            </div>

        </div>
        );
    }
           
}

 
export default Author;