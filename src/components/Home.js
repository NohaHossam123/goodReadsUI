import React from 'react';
const Home = () => {
    return (
        <div className="container col-12">
            <div className="card border-dark mb-3 col-12">
                <div className="card-header col-12">
                <form className="form-inline" action="/action_page.php">
                        <div className="form-group col-6">
                            <label for="email">Welcome To Good Reads</label>
                        </div>
                        <div className="form-group col-2">
                            <input type="email" placeholder="Username" className="form-control  col-12" id="email" />
                        </div>
                        <div className="form-group col-2">
                            <input type="password" placeholder="Password" className="form-control col-12" id="pwd" />
                        </div>
                        <div className="checkbox col-1">
                            <label><input type="checkbox" /> Remember me </label>
                        </div>
                        <button className="btn btn-primary col-1" type="submit">login</button>
                    </form>
                </div>
            </div>
            <div className="row m-1">
                <div className="card-deck col-6">
                    <div className="row">
                        <div className="card border-dark mb-3 col-6">
                            <div className="card-header">Header</div>
                            <div className="card-body text-dark">
                                <h5 className="card-title">Dark card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                        <div className="card border-dark mb-3 col-6">
                            <div className="card-header">Header</div>
                            <div className="card-body text-dark">
                                <h5 className="card-title">Dark card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="card border-dark mb-3 col-7">
                            <div className="card-header">Header</div>
                            <div className="card-body text-dark">
                                <h5 className="card-title">Dark card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col ">
                    <div className="card border-dark mb-3">
                        <div className="container">
                            <div className="form-group">
                                <h2>New here? Create a free account</h2>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">first name</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="first name" />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">last name</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="last name" />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email address" />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">password</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="password" />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Retype Password</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Retype Password" />
                            </div>
                            <div className="custom-file mb-3">
                                <input type="file" className="custom-file-input" id="validatedCustomFile" required />
                                <label className="custom-file-label" for="validatedCustomFile">upload your image</label>
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