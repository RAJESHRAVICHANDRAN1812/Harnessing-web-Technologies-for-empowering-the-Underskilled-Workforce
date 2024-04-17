import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { useTranslation } from 'react-i18next'; // Import useTranslation

const HeroSection = () => {

  
  const {t} = useTranslation(['Home']);
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: t("Live Job"),
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: t("Companies"),
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: t("Job Seekers"),
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: t("Employers"),
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">   
        <div className="container">
          <div className="title">
            <h4 >{t("Welcome To")} {t("BLUE GO")} </h4>
            <h4>{t("Find a job that suits")}</h4>
            <h4>{t("your interests and skills")}</h4>
            <p>{t("content1")}</p>
          </div>
          <div className="image">
            <img src="/HeroS2.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
