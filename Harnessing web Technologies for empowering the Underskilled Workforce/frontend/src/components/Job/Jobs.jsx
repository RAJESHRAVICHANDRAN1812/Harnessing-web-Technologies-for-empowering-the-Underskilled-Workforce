import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { useTranslation } from 'react-i18next';
import { FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Jobs = () => {
  const { t } = useTranslation(['Jobs']);
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [searchButtonColor, setSearchButtonColor] = useState("#002349"); // Initial color for search button

  useEffect(() => {
    try {
      axios.get("http://localhost:4000/api/v1/job/getall", {
        withCredentials: true,
      }).then((res) => {
        setJobs(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const handleSearch = async () => {
    try {
      if (!searchQuery.trim()) {
        toast.error("Please enter a search query."); // Toast notification for empty input
        return;
      }

      const response = await axios.get(`http://localhost:4000/api/v1/job/filter?q=${searchQuery}`, {
        withCredentials: true,
      });
      setJobs(response.data.jobs);
      // Update the URL to /job/filter?q=<searchQuery>
      navigateTo(`/job/filter?q=${searchQuery}`);
    } catch (error) {
      console.error("Error searching jobs:", error);
    }
  };

  const handleButtonClick = () => {
    setSearchButtonColor("#add8e6"); // Change color to light blue when button is clicked
    setTimeout(() => {
      setSearchButtonColor("#002349"); // Revert color back to original after 2 seconds
    }, 2000);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setSearchButtonColor("#002349"); // Reset color when input changes
  };

  return (
    <section className="jobs page">
      <div className="container">
        <h1>{t("ALL AVAILABLE JOBS")}</h1>
        <div className="search-container" style={{ display: "flex", alignItems: "center" }}>
          <div style={{ position: "relative", marginRight: "10px" }}>
            <FaSearch style={{ position: "absolute", top: "50%", left: "10px", transform: "translateY(-50%)" }} /> {/* Search icon */}
            <input
              className="col-xs-9"
              type="text"
              placeholder={t("Search jobs")}
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ padding: "8px 35px", borderRadius: "20px", border: "1px solid #ccc", outline: "none", width: "300px" }} // Inline styles for the input
            />
          </div>
          <button
            className="col-xs-1"
            style={{ backgroundColor: searchButtonColor, color: "#fff", border: "none", padding: "8px 16px", borderRadius: "20px" }} // Inline styles for the button
            onClick={() => {
              handleSearch();
              handleButtonClick(); // Change color on button click
            }}
          >
            {t("Search")}
          </button>
          <a href="https://en.wikipedia.org/wiki/Special:Random" target="_blank"><span className="glyphicon glyphicon-random col-xs-1"  data-toggle="tooltip" title="Random topic"></span></a>
        </div>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => (
              <div className="card" key={element._id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.country}</p>
                <Link to={`/job/${element._id}`}>{t("Job Details")}</Link>
              </div>
            ))}
        </div>
      </div>
      <ToastContainer /> {/* Toast notification container */}
    </section>
  );
};

export default Jobs;
