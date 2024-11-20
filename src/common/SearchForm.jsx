import React, { useState } from "react";

const SearchForm = ({ searchFor }) => {
  const [searchTerm, setSearchTerm] = useState("");


  //Handles the search submit. Sends search for to parent
  const handleSubmit = (e) => {
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  // Sets the search term on submit
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="form-group row justify-content-center">
      <div className="col-3">
        <input
        className="form-control"
        type="form-control form-control-lg"
        name="searchTerm"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={handleChange}
        />
      </div>
      <div className="col-1">
        <button 
        type="submit"
        className="btn btn-md btn-primary form-control"
        >
          Submit
        </button>

      </div>
    </div>
  )
}

export default SearchForm