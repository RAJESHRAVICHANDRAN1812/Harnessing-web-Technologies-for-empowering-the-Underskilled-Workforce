import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { useTranslation } from 'react-i18next'; // Import useTranslation

const JobDetails = () => {
  const { t } = useTranslation(['Jobs']);
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]); // Add navigateTo to the dependencies array

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]); // Add isAuthorized and navigateTo to the dependencies array

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>{t("Job Details")}</h3>
        <div className="banner">
          <p>
            {t("Title")} <span> {job.title}</span>
          </p>
          <p>
            {t("Category")} <span>{job.category}</span>
          </p>
          <p>
            {t("State")} <span>{job.state}</span>
          </p>
          <p>
            {t("City")} <span>{job.city}</span>
          </p>
          <p>
           {t("Location")} <span>{job.location}</span>
          </p>
          <p>
            {t("Description")} <span>{job.description}</span>
          </p>
          <p>
            {t("Job Posted On")} <span>{job.jobPostedOn}</span>
          </p>
          <p>
            {t("Salary")}{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {/* Render other job details */}
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${job._id}`}>{t("Apply Now")}</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
