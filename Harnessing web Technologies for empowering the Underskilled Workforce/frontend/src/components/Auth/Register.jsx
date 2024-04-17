import React, { useContext, useState } from "react";
import { FaRegUser, FaPencilAlt, FaPhoneAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom"; // Import Link for routing
import axios from "axios";
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import { Context } from "../../main";
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation(['Register']);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [passwordValidationMessage, setPasswordValidationMessage] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message); // Use toast.success() to display success notification
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message); // Use toast.error() to display error notification
    }
  };

  if (isAuthorized) {
    return <Navigate to={'/'} />
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.trim().length > 0) { // Check if password field is not empty
      if (newPassword.length < 8) { // Check for 8 characters
        setPasswordValidationMessage("Password must be at least 8 characters long");
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

        .toggleIcon {
          cursor: pointer;
          margin-left: -31px; /* 1px to the left */
          font-size: 0.8em; /* Reduced size */
          background-color: transparent; /* Remove background color */
          display: ${password ? 'block' : 'none'}; /* Show only when there is input in password field */
        }

        .passwordInputContainer input {
          padding-right: 30px; /* Increase padding for space */
        }

        .validationMessage {
          position: absolute;
          top: 0;
          right: 0;
          padding: 4px;
          background-color: red;
          color: white;
          border-radius: 4px;
          z-index: 1000;
        }
        `}
      </style>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/BLUE GO logo black.jpg" alt="logo" />
            <h3>{t("Create a new account")}</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>{t("Register As")}</label>
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
              <label>{t("Name")}</label>
              <div>
                <input
                  type="text"
                  placeholder={t("eg.SivaArulSelvan, Chandru, Rajesh, Gowdham")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>{t("Email Address")}</label>
              <div>
                <input
                  type="email"
                  placeholder={t("rajesh123@gmail.com")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>{t("Phone Number")}</label>
              <div>
                <input
                  type="number"
                  placeholder={t("eg. 12345678")}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPhoneAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>{t("Password")}</label>
              <div className="passwordInputContainer">
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
            {passwordValidationMessage && (
              <div className="validationMessage">{passwordValidationMessage}</div>
            )}
            <button 
              type="submit" 
              onClick={handleRegister} 
              data-popup-text={t("Register")}
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
              {t("Register")}
              </button>
            <Link 
              to={"/login"} 
              data-popup-text={t("Login Now")} 
              className="loginButton" // Add a class for styling
            >
              {t("Login Now")}
            </Link>
          </form>
        </div>
        <div className="banner">
          <img src="/register2.jpg" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Register;