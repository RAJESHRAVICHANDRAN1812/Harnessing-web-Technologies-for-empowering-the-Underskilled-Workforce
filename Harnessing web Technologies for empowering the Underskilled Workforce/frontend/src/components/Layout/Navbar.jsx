import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import Langselector from "../Language/Langselector"; // Update the import path accordingly
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

const Navbar = () => {
  const { t } = useTranslation(['Navbar']);
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <>
      <ToastContainer /> {/* Add ToastContainer here */}
      <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
        <div className="container">
          <div className="logo">
            <img src="/BLUE GO logo white.png" alt="logo" />
          </div>
          <ul className={!show ? "menu" : "show-menu menu"}>
            <li>
              <Link to={"/"} onClick={() => setShow(false)}>
                {t("HOME")}
              </Link>
            </li>
            <li>
              <Langselector />
            </li>
            <li>
              <Link to={"/job/getall"} onClick={() => setShow(false)}>
                {t("ALL JOBS")}
              </Link>
            </li>
            <li>
              <Link to={"/applications/me"} onClick={() => setShow(false)}>
                {user && user.role === "Employer"
                  ? t("APPLICANT'S APPLICATIONS")
                  : t("MY APPLICATIONS")}
              </Link>
            </li>
            {user && user.role === "Employer" ? (
              <>
                <li>
                  <Link to={"/job/post"} onClick={() => setShow(false)}>
                    {t("POST NEW JOB")}
                  </Link>
                </li>
                <li>
                  <Link to={"/job/me"} onClick={() => setShow(false)}>
                    {t("VIEW YOUR JOBS")}
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}

            <button onClick={handleLogout}>{t("LOGOUT")}</button>
          </ul>
          <div className="hamburger">
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
