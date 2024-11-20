import React, { useContext } from "react";
import "./Home.css"
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

const Home = () => {
  const { currentUser } = useContext(UserContext);

  return(
    <>
    <div style={{height: "100vh"}} className="Home">
      <div className="container text-center">
        <h1 className="my-4 fw-bold">Jobly</h1>
        <p className="lead">All the jobs in one, convenient place.</p>
        {currentUser
          ? <h2>
            Welcome Back, {currentUser.firstName || currentUser.username}!
          </h2>
          : (
            <p>
              <Link className="btn btn-primary fw-bold mx-3" to="/auth/login">Login</Link>
              <Link className="btn btn-primary fw-bold" to="/auth/signup">Signup</Link>
            </p>
          )}
      </div>
    </div>
    </>
  )
}

export default Home;