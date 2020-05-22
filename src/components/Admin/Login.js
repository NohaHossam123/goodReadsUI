import React from "react";

let error = null;

const Login = ({UserContext, isAdmin}) => {
  const { setUser } = React.useContext(UserContext);
  const [authData, setAuthData] = React.useState({
    username: "",
    password: "",
    isAdmin,
  });


  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setAuthData({ ...authData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      body: JSON.stringify(authData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if((res.status === 201 && isAdmin) || (res.status === 200 && !isAdmin)){
      const response = await res.json();
      const getUser = await fetch("http://localhost:5000/users/check", {
        method: "POST",
        body: JSON.stringify({ token: response.accessToken }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const user = await getUser.json();
      user.token = response.refreshToken;
      setImmediate(()=> setUser(user))
    }
    else if (res.status === 200 && isAdmin) error = "Sorry only Admins can access this page";
    else if (res.status === 401 || res.status === 401) error = "Invalid credintials";
    else error = "some thing wrong happened";
    setAuthData({ username: "", password: "", isAdmin: true });
  };

  if (isAdmin) return (
    <div className="container" style={{ height: 75 + "vh" }}>
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6 text-center border p-5">
          <h2 className="p-3">Welcome To Admin Panel</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group p-2">
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter your username"
                onChange={handleInputChange}
                required
                value={authData.username}
              />
            </div>
            <div className="form-group p-2">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter your password"
                onChange={handleInputChange}
                required
                value={authData.password}
              />
            </div>
            <button className="btn btn-primary col-3 p-2" type="submit">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  )
  else return (
    <form className="form-inline" onSubmit={handleSubmit}>
        <div className="form-group col-6">
            <label for="email">Welcome To Good Reads</label>
        </div>
        <div className="form-group col-2">
            <input type="text" placeholder="Username" className="form-control  col-12" 
            id="email" name='username' required onChange={handleInputChange}/>
        </div>
        <div className="form-group col-2">
            <input type="password" placeholder="Password" className="form-control col-12" 
            id="pwd" name='password' required onChange={handleInputChange}/>
        </div>
        <div className="checkbox col-1">
            <label><input type="checkbox" /> Remember me </label>
        </div>
        <button className="btn btn-primary col-1" type="submit">login</button>
    </form>
  )
};

export default Login;
