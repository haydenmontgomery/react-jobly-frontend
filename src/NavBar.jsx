import React, { useContext } from "react";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import UserContext from "./UserContext";

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);

  function loggedOut() {
    return (
      <Navbar expand="md" bg="secondary" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="">
            <NavLink to="/" className="navbar-brand text-white">
              Jobly
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        {/* Need some authentication to change it up and add the job links */}
        <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <NavLink to="/auth/login" className="text-white mx-2">Login</NavLink>
              </Navbar.Text>
              <Navbar.Text>
                <NavLink to="/auth/signup" className="text-white mx-2">Sign Up</NavLink>
              </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
    function loggedIn() {
      return (
        <Navbar expand="md" bg="secondary" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="">
              <NavLink to="/" className="navbar-brand text-white">
                Jobly
              </NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />

            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <NavLink to="/companies" className="text-white mx-2">Companies</NavLink>
              </Navbar.Text>
              <Navbar.Text>
                <NavLink to="/jobs" className="text-white mx-2">Jobs</NavLink>
              </Navbar.Text>
              <Navbar.Text>
                <NavLink to="/profile" className="text-white mx-2">Profile</NavLink>
              </Navbar.Text>
              <Navbar.Text>
                <Link to="/" onClick={logout} className="text-white mx-2">
                Logout {currentUser.firstName || currentUser.username} 
                </Link>
              </Navbar.Text>

          </Navbar.Collapse>

          </Container>
        </Navbar>
      )
    }

  return (
    <div>
    {currentUser ? loggedIn() : loggedOut()}
    </div>
  )
}

export default NavBar;