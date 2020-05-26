import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Login from './Admin/Login'
import { UserContext } from "../App";
import { Redirect } from 'react-router-dom';


const Home = () => {
    const [erors, setErors] = useState([]);
    const [done, setdone] = useState([]);
    const [topbooks, settopbooks] = useState([]);
    const [topcats, settopcats] = useState([]);
    const [topauths, settopauths] = useState([]);
    const [newUserFirstName, setnewUserFirstName] = useState([]);
    const [newUserLastName, setnewUserLastName] = useState([]);
    const [newUserUsername, setnewUserUsername] = useState([]);
    const [newUserEmail, setnewUserEmail] = useState([]);
    const [newUserPassword, setnewUserPassword] = useState([]);
    const [newUserPasswordCheck, setnewUserPasswordCheck] = useState([]);
    const [newUserImage, setnewUserImage] = useState([]);

    const { user } = React.useContext(UserContext);

    useEffect(() => {
        axios.get('http://localhost:5000/books/topbooks')
            .then((res) => {
                settopbooks(res.data);
            })
        axios.get('http://localhost:5000/books/topcats')
            .then((res) => {
                settopcats(res.data);
            })
        axios.get('http://localhost:5000/books/topauths')
            .then((res) => {
                settopauths(res.data);
            })
    }, []);

    // const handleChangeUser = (e) => {
    //     const { target: { value } } = e;
    //     setnewUser(value);

    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        let newUser = {
            "firstName": newUserFirstName,
            "lastName": newUserLastName,
            "username": newUserUsername,
            "email": newUserEmail,
            "password": newUserPassword,
            "image": newUserImage,
            "isadmin": false
        };
        // console.log(newUser);
        if (newUserPassword.length < 4) {
            setErors("password is too short")
        }
        else if (newUserPassword !== newUserPasswordCheck) {
            setErors("password doesnot match");
        } else {
            axios.post('http://localhost:5000/users', newUser).then((messages) => {
                setdone(messages);
                setErors("");
                setnewUserFirstName("");
                setnewUserLastName("");
                setnewUserUsername("");
                setnewUserEmail("");
                setnewUserPassword("");
                setnewUserPasswordCheck("");
                setnewUserImage("");
            }).catch((err) => setErors(err.response.data));
        }
    }

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
                                        <a href={'book\\' + book["_id"]}>{book["name"]}</a>
                                    </h5>)}
                                </div>
                            </div>
                            <div className="card border-dark m-3 col-5">
                                <div className="card-header">top Categories</div>
                                <div className="card-body text-dark col-12">
                                    {topcats.map(category => <h5 key={Math.ceil(Math.random() * 100000)} className="card-title">
                                        <a href={'category/' + category._id}>{category.name}</a>
                                    </h5>)}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="card border-dark m-3 col-5">
                                <div className="card-header ">top Authors</div>
                                <div className="card-body text-dark col-12">
                                    {topauths.map(author => <h5 key={Math.ceil(Math.random() * 100000)} className="card-title">
                                        <a href={'author/' + author._id}>{author.name}</a>
                                    </h5>)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="card border-dark col-12 mb-3">
                            <div className="container">
                                <form id="form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <h2>New here? Create a free account</h2>
                                    </div>
                                    {erors != "" ? <div className="alert alert-danger">{erors}</div> : ""}
                                    {done != "" ? <div className="alert alert-success">you can log in now</div> : ""}
                                    <div className="form-group">
                                        <label>first name</label>
                                        <input type="text" className="form-control" id="firstName" value={newUserFirstName} onChange={e => { const { target: { value } } = e; setnewUserFirstName(value) }} aria-describedby="emailHelp" placeholder="first name" required />
                                    </div>
                                    <div className="form-group">
                                        <label >last name</label>
                                        <input type="text" className="form-control" id="lastname" value={newUserLastName} onChange={e => { const { target: { value } } = e; setnewUserLastName(value) }} aria-describedby="emailHelp" placeholder="last name" required />
                                    </div>
                                    <div className="form-group">
                                        <label >username</label>
                                        <input type="text" className="form-control" id="username" value={newUserUsername} onChange={e => { const { target: { value } } = e; setnewUserUsername(value) }} aria-describedby="emailHelp" placeholder="username" required />
                                    </div>
                                    <div className="form-group">
                                        <label >Email address</label>
                                        <input type="email" className="form-control" id="email" value={newUserEmail} onChange={e => { const { target: { value } } = e; setnewUserEmail(value) }} aria-describedby="emailHelp" placeholder="Email address" required />
                                    </div>
                                    <div className="form-group">
                                        <label >password</label>
                                        <input type="password" className="form-control" id="password" value={newUserPassword} onChange={e => { const { target: { value } } = e; setnewUserPassword(value) }} aria-describedby="emailHelp" placeholder="password" required />
                                    </div>
                                    <div className="form-group">
                                        <label >Retype Password</label>
                                        <input type="password" className="form-control" id="passwordCheck" value={newUserPasswordCheck} onChange={e => { const { target: { value } } = e; setnewUserPasswordCheck(value) }} aria-describedby="emailHelp" placeholder="Retype Password" required />
                                    </div>
                                    {/* <div className="custom-file mb-3">
                                        <input type="file" className="custom-file-input" id="validatedCustomFile" value={newUserImage} onChange={e => { const { target: { value } } = e; setnewUserImage(value) }} required />
                                        <label className="custom-file-label" >upload your image</label>
                                        <div className="invalid-feedback">Example invalid custom file feedback</div>
                                    </div> */}
                                    <div className="form-group mb-3 text-center">
                                        <button className="btn btn-primary col-2" type="submit">Signup</button>
                                    </div>
                                </form>
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
                                <a className="nav-link " href="/"><h1> Home </h1><span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item col-2">
                                <a className="nav-link" href="/books"><h1> Books</h1></a>
                            </li>
                            <li className="nav-item col-2">
                                <a className="nav-link" href="/categories"><h1> Categories</h1></a>
                            </li>
                            <li className="nav-item col-2">
                                <a className="nav-link" href="/authors"><h1> Authors</h1></a>
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