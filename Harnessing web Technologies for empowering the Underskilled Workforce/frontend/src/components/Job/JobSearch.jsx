import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import styles from "./JobSearch.module.css"; // Import CSS module
import { useTranslation } from 'react-i18next'; // Import useTranslation

const JobSearch = () => {
  const { t } = useTranslation(['JobSearch']);
  const [searchResults, setSearchResults] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);
  const [isNoResults, setIsNoResults] = useState(false); // State for no results found
  const location = useLocation();
  const searchQuery = location?.search ? new URLSearchParams(location.search).get("q") : '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery) {
          const response = await axios.get(
            `http://localhost:4000/api/v1/job/filter?q=${searchQuery}`,
            {
              withCredentials: true,
            }
          );
          const jobs = response.data.jobs;
          setSearchResults(jobs);
          setResultsCount(jobs.length);
          setIsNoResults(jobs.length === 0); // Check if no results found
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (searchQuery && location) {
      fetchData();
    }
  }, [searchQuery, location]);

  if (!location) {
    return null;
  }

  return (
    <div className={styles.jobSearchContainer}>
      <h1 className={styles.searchResultsTitle}>{t("Search Results")}</h1>
      {resultsCount > 0 && <p className={styles.resultsCount}>{t("Results found")}: {resultsCount}</p>}
      {isNoResults && <p className={styles.noResultsMessage}>{t("No results found")}.</p>}
      <div className={styles.searchResults}>
        {searchResults.map((job) => (
          <div className={styles.card} key={job._id}>
            <p className={styles.jobTitle}>{job.title}</p>
            <p className={styles.jobCategory}>{job.category}</p>
            <p className={styles.jobCountry}>{job.country}</p>
            <Link className={styles.jobDetailsLink} to={`/job/${job._id}`}>{t("Job Details")}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobSearch;
