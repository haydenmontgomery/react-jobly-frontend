import React from "react";
import JobCard from "./JobCard";

// Show list of job
//  Used by both Jobs and CompanyDetail components to list jobs.

  

function JobCardList({ jobs, apply }) {

  return (
    <div className="JobCardList">
      {jobs.map(job => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
          companyName={job.companyName}
        />
      ))}
    </div>
  );
}

export default JobCardList;
