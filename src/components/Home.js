import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Login from './Admin/Login'
import { UserContext } from "../App";
import { Redirect } from 'react-router-dom';

const Home = () => {
    const [topbooks, settopbooks] = useState([]);
    const [topcats, settopcats] = useState([]);
    const [topauths, settopauths] = useState([]);
    const { user } = React.useContext(UserContext);

    useEffect(() => {
        axios.get('http://localhost:5000/books/topbooks')
            .then((res) => {
                settopbooks(res.data);
                console.log(topbooks);
            })
    }, []);
    useEffect(() => {
        axios.get('http://localhost:5000/books/topcats')
            .then((res) => {
                settopcats(res.data);
                console.log(topbooks);
            })
    }, []);
    useEffect(() => {
        axios.get('http://localhost:5000/books/topauths')
            .then((res) => {
                settopauths(res.data);
                console.log(topbooks);
            })
    }, []);


    if (user) return <Redirect to='/userbook' />
    else
        return (
            <div className="container col-12">
                <div className="card border-dark m-0 col-12">
                    <div className="card-header col-12">
                        {<Login isAdmin={false} UserContext={UserContext} />}
                    </div>
                </div>
                <div className="row m-1">
                    <div className="container m-2 col-6">
                        <div className="row">
                            <div className="card border-dark m-3 col-5">
                                <div className="card-header ">top Books</div>
                                <div className="card-body text-dark col-12">
                                    {topbooks.map(book => <h5 key={Math.ceil(Math.random() * 100000)} className="card-title">
                                        {book["name"]}
                                    </h5>)}
                                </div>
                            </div>
                            <div className="card border-dark m-3 col-5">
                                <div className="card-header">top Categories</div>
                                <div className="card-body text-dark col-12">
                                    {topcats.map(book => <h5 key={Math.ceil(Math.random() * 100000)} className="card-title">
                                        {book["category"]["name"]}
                                    </h5>)}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="card border-dark m-3 col-5">
                                <div className="card-header ">top Authors</div>
                                <div className="card-body text-dark col-12">
                                {topauths.map(book => <h5 key={Math.ceil(Math.random() * 100000)} className="card-title">
                                        {book["author"]["firstName"]}  {book["author"]["lastName"]}
                                    </h5>)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="card border-dark col-12 mb-3">
                            <div className="container">
                                <div className="form-group">
                                    <h2>New here? Create a free account</h2>
                                </div>
                                <div className="form-group">
                                    <label >first name</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="first name" />
                                </div>
                                <div className="form-group">
                                    <label >last name</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="last name" />
                                </div>
                                <div className="form-group">
                                    <label >Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email address" />
                                </div>
                                <div className="form-group">
                                    <label >password</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="password" />
                                </div>
                                <div className="form-group">
                                    <label >Retype Password</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Retype Password" />
                                </div>
                                <div className="custom-file mb-3">
                                    <input type="file" className="custom-file-input" id="validatedCustomFile" required />
                                    <label className="custom-file-label" >upload your image</label>
                                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                                </div>
                                <div className="form-group mb-3 text-center">
                                    <button className="btn btn-primary col-2" type="submit">Signup</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav container col-12">
                            <li className="nav-item active col-2 ml-5">
                                <a className="nav-link " href="#"><h1> Home </h1><span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item col-2">
                                <a className="nav-link" href="#"><h1> About us</h1></a>
                            </li>
                            <li className="nav-item col-2">
                                <a className="nav-link" href="#"><h1> Categories</h1></a>
                            </li>
                            <li className="nav-item col-2">
                                <a className="nav-link" href="#"><h1> Authors</h1></a>
                            </li>
                            <li className="nav-item col-3">
                                <a className="nav-link" href="#"><h1> Terms & Conditions</h1></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
}

export default Home;