import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./helpers/Api";
import JobCardList from "./JobCardList";
import LoadingSign from "./common/LoadingSign";
import "./CompanyDetail.css";

// Company Detail page.

function CompanyDetail() {
  const { handle } = useParams();

  const [company, setCompany] = useState(null);

  useEffect(function getCompanyAndJobsForUser() {
    async function getCompany() {
      setCompany(await JoblyApi.getCompany(handle));
    }

    getCompany();
  }, [handle]);

  if (!company) return <LoadingSign />;

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h4 className="CompanyDetail-title">{company.name}</h4>
      <p className="CompanyDetail">{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;
