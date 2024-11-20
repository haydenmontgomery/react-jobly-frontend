import React, { useState, useContext } from "react";
import JoblyApi from "./helpers/Api";
import UserContext from "./UserContext";
import "./Profile.css"


/** Profile editing form.
 * Displays profile form and handles changes to local form state.
 */

function Profile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const INITIAL_STATE = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
  }
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isInvalid, setIsInvalid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  /** on form submit:
   *  Tries to save to backend
   * clears error messages and saves if successful.
   */

  async function handleSubmit(e) {
    e.preventDefault();

    let profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await JoblyApi.patchUser(username, profileData);
    } catch (errors) {
      console.log(errors);
      return;
    }

    setFormData(f => ({ ...f }));
    setIsInvalid(true);
    setIsTouched(false);

    // trigger reloading of user information throughout the site
    setCurrentUser(currentUser => ({
      ...currentUser,
      data: updatedUser
    }));
  }

  /** Handle form data changing */
  function handleChange(e) {
    setIsTouched(true);
    const { name, value } = e.target;
    if(value === '') {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }

  return (
    <div className="Profile container" style={{height: "100vh"}}>
      <p className="h1 text-center">Update Profile</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            disabled
            className="form-control"
            placeholder={formData.username}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {isInvalid && isTouched && <span style={{ color: 'red' }}>Please enter all info</span>}
        <button className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;
