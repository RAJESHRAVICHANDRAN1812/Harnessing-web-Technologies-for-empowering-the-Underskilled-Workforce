import React from "react";
import { FaToolbox } from "react-icons/fa";
import { GiBulldozer } from "react-icons/gi";
import { SiLoom } from "react-icons/si";
import { useTranslation } from 'react-i18next'; // Import useTranslation

const PopularCompanies = () => {

  const {t} = useTranslation(['Home']);
  
  const companies = [
    {
      id: 1,
      title: t("Thamizh Textile"),
      location: t("location1"),
      openPositions: 10,
      icon: <SiLoom />,
    },
    {
      id: 2,
      title: t("SenThamizh Heavy vehicle Transportation"),
      location: t("location2"),
      openPositions: 35,
      icon: <GiBulldozer />,
    },
    {
      id: 3,
      title: t("Tamilan Construction"),
      location: t("location3"),
      openPositions: 20,
      icon: <FaToolbox />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3>{t("TOP COMPANIES")}</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>{t("Open Positions")} {element.openPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
