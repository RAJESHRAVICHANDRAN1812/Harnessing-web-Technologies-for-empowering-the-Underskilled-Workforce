import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

import { useTranslation } from 'react-i18next'; // Import useTranslation

const HowItWorks = () => {

   const {t} = useTranslation(['Home']);
   
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>{t("How BlueGo Works")}</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>{t("Create Account")}</p>
              <p>{t("content2")}</p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>{t("Find a Job/Post a Job")}</p>
              <p>{t("content3")}</p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>{t("Apply For Job/Recruit Suitable Candidates")}</p>
              <p>{t("content4")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
