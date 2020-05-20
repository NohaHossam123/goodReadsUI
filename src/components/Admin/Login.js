import React from "react";
import { UserContext } from "./Admin";

let error = null;

const Login = () => {
  const { setUser } = React.useContext(UserContext);
  const [authData, setAuthData] = React.useState({
    username: "",
    password: "",
    isAdmin: true,
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

    switch (res.status) {
      case 201:
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
        break;
      case 200:
        error = "Sorry only Admins can access this page";

        break;
      case 401:
      case 404:
        error = "Invalid credintials";
        break;
      default:
        error = "some thing wrong happened";
        break;
    }
    setAuthData({ username: "", password: "", isAdmin: true });
  };

  return (
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
  );
};

export default Login;
