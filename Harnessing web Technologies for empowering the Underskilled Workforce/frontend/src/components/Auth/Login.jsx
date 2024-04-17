import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../../main";
import { useTranslation } from 'react-i18next';
import Langselector from "../Language/Langselector";
import { FaRegUser, FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const Login = () => {
  const { t } = useTranslation(['Login']);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValidationMessage, setPasswordValidationMessage] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={'/'} />
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.trim().length > 0) { // Check if password field is not empty
      if (newPassword.length < 8 || newPassword.length > 20) {
        setPasswordValidationMessage("Password must be 8-20 characters long");
      } else {
        setPasswordValidationMessage("");
      }
    } else {
      setPasswordValidationMessage(""); // Reset validation message when password field is empty
    }
  };

  return (
    <>
      <style>
        {`
        .passwordInputContainer {
          position: relative;
        }

        .validationMessage {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 8px;
          background-color: red;
          color: white;
          border-radius: 4px;
          z-index: 1000;
        }

        /* Adjust the password toggle icon */
        .toggleIcon {
          cursor: pointer;
          margin-left: -31px; /* 1px to the left */
          font-size: 0.8em; /* Reduced size */
          background-color: transparent; /* Remove background color */
          display: ${password ? 'block' : 'none'}; /* Show only when there is input in password field */
        }

        /* Adjust the gap between input and toggle icon */
        .passwordInputContainer input {
          padding-right: 30px; /* Increase padding for space */
        }
        `}
      </style>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <h3>{t("Welcome To ")}</h3>
            <img src="/BLUE GO logo black.jpg" alt="logo" />
            <h3>{t("Login to your account")}</h3>
            <h6>{t("Select Language")} <Langselector /></h6>
          </div>
          <form>
            <div className="inputTag">
              <label>{t("Login As")}</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">{t("Select Role")}</option>
                  <option value="Employer">{t("Employer")}</option>
                  <option value="Job Seeker">{t("Job Seeker")}</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>{t("Email Address")}</label>
              <div>
                <input
                  type="email"
                  placeholder={t("Rajesh123@gmail.com")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>{t("Password")}</label>
              <div className={`passwordInputContainer ${passwordValidationMessage ? 'invalid' : ''}`}>
                <input
                  type={showPassword ? "text" : "password"} // Show/hide password based on state
                  placeholder={t("Your Password")}
                  value={password}
                  onChange={handlePasswordChange} // Use handlePasswordChange function
                />
                {password && ( // Show icon only when there is input in password field
                  showPassword ? (
                    <FaEyeSlash
                      className="toggleIcon"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <FaEye
                      className="toggleIcon"
                      onClick={() => setShowPassword(true)}
                    />
                  )
                )}
                <RiLock2Fill />
              </div>
            </div>
            <button 
              type="submit" 
              onClick={handleLogin} 
              data-popup-text={t("Login")}
              style={{ 
                backgroundColor: '#002349', // Set hover color here
                color: '#ffffff',
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: '4px',
                border: 'none',
                transition: 'background-color 0.3s ease',
              }}
            >
              {t("Login")}
            </button>
            <Link 
              to={"/register"} 
              data-popup-text={t("Register Now")} 
              style={{ 
                backgroundColor: '#ffffff', // Set background color to white
                color: '#002349', // Set text color to your desired color
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: '4px',
                border: '2px solid #002349', // Add border to the button
                textDecoration: 'none',
                transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease', // Add transition for smooth effect
              }}
            >
              {t("Register Now")}
            </Link>
          </form>
          {passwordValidationMessage && <div className="validationMessage">{passwordValidationMessage}</div>}
        </div>
        <div className="banner">
          <img src="/login3.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Login;
