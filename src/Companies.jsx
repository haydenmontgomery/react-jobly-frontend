import React, { useEffect, useState } from "react";
import SearchForm from "./common/SearchForm"
import JoblyApi from "./helpers/Api";
import LoadingSign from "./common/LoadingSign";
import CompanyCard from "./CompanyCard";

const Companies = () => {

  const [companies, setCompanies] = useState(null);

  useEffect(function getCompanies() {
    search();
  }, []);


  async function search(name) {
    let res = await JoblyApi.getCompanies(name);
    setCompanies(res);
  }

  if (!companies) return <LoadingSign />;

  return(
    <div className="CompanyList col-md-8 offset-md-2 mt-3">
      <SearchForm searchFor={search} />
      {companies.length
        ? (
        <div className="CompanyList-list mt-3">
        {companies.map(c => (
          <CompanyCard
            key={c.handle}
            handle={c.handle}
            name={c.name}
            description={c.description}
            logoUrl={c.logoUrl}
          />
        ))}
        </div>
    ) : (
      <p className="lead">Sorry, no results were found!</p>
    )}
    </div>
  )
}

export default Companies;