import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostJob = () => {
  const { t } = useTranslation(['PostJob']);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
      return;
    }

    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/job/post",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              state,
              city,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              state,
              city,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error posting job");
    }
  };

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>{t("POST NEW JOB")}</h3>
          <form onSubmit={handleJobPost}>
            <div className="wrapper">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("Job Title (eg. Driver, Sales Person)")}
              />
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder={t("Category (eg. Manufacturing, Construction)")}
              />
            </div>
            
            <div className="wrapper">
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder={t("State")}
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={t("City")}
              />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={t("Location (exact location it's located)")}
            />
            <div className="salary_wrapper">
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
              >
                <option value="default">{t("Select Salary Type")}</option>
                <option value="Fixed Salary">{t("Fixed Salary")}</option>
                <option value="Ranged Salary">{t("Ranged Salary")}</option>
              </select>
              <div>
                {salaryType === "default" ? (
                  <p>{t("Please provide Salary Type *")}</p>
                ) : salaryType === "Fixed Salary" ? (
                  <input
                    type="number"
                    placeholder={t("Enter Fixed Salary")}
                    value={fixedSalary}
                    onChange={(e) => setFixedSalary(e.target.value)}
                  />
                ) : (
                  <div className="ranged_salary">
                    <input
                      type="number"
                      placeholder={t("Salary From")}
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder={t("Salary To")}
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("Job Description")}
            />
            <button type="submit">{t("Post Job")}</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PostJob;
