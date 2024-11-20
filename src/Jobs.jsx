import React, { useEffect, useState } from "react";
import SearchForm from "./common/SearchForm"
import JoblyApi from "./helpers/Api";
import JobCardList from "./JobCardList";
import LoadingSign from "./common/LoadingSign";

const Jobs = () => {

  const [jobs, setJobs] = useState(null);

  useEffect(function getJobs() {
    search();
  }, []);

  //Search function. Updates jobs on search.
  async function search(title) {
    let res = await JoblyApi.getJobs(title);
    setJobs(res);
  }

  if (!jobs) return <LoadingSign />;

  return(
    <div className="JobList col-md-8 offset-md-2">
      <SearchForm searchFor={search} />
      {jobs.length
        ? <JobCardList jobs={jobs} />
        : <p className="lead">Sorry, no match!</p>
    }
    </div>
  )
}

export default Jobs;