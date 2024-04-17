import React from "react";
import { MdConstruction } from "react-icons/md";
import { TbEngine } from "react-icons/tb";
import { FaBolt, FaRoad, FaWrench } from "react-icons/fa";
import { GiCrane, GiFactory, GiGrass } from "react-icons/gi";

import { useTranslation } from 'react-i18next'; // Import useTranslation

const PopularCategories = () => {

   const {t} = useTranslation(['Home']);
  
  const categories = [
    {
      id: 1,
      title: t("Manufacturing"),
      subTitle: t("305 Open Positions"),
      icon: <GiFactory />,
    },
    {
      id: 2,
      title: t("Electrical"),
      subTitle: t("500 Open Positions"),
      icon: <FaBolt />,
    },
    {
      id: 3,
      title: t("Agriculture"),
      subTitle: t("200 Open Positions"),
      icon: <GiGrass />,
    },
    {
      id: 4,
      title: t("Construction and Carpentry"),
      subTitle: t("1000+ Open Postions"),
      icon: <MdConstruction />,
    },
    {
      id: 5,
      title: t("Transportation"),
      subTitle: t("150 Open Positions"),
      icon: <FaRoad />,
    },
    {
      id: 6,
      title: t("Maintenance Sector"),
      subTitle: t("867 Open Positions"),
      icon: <FaWrench />,
    },
    {
      id: 7,
      title: t("Heavy Equipment Operations"),
      subTitle: t("50 Open Positions"),
      icon: <GiCrane />,
    },
    {
      id: 8,
      title: t("Automative Repair"),
      subTitle: t("80 Open Positions"),
      icon: <TbEngine />,
    },
  ];
  return (
    <div className="categories">
      <h3>{t("POPULAR CATEGORIES")}</h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="text">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
