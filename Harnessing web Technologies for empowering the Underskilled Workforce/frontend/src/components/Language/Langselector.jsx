// export default Langselector;
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Languages = [
  { code: "en", lang: "English" },
  { code: "ta", lang: "தமிழ்" }
];

const Langselector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const selectStyle = {
    height: 'fit-content',
    padding: '6px',
    border: '1px solid #f1f3f6',
    color: '#f1f3f6',
    background: '#002349',
    fontSize: '15px',
    fontWeight: 300,
  };

  const optionStyle = {
    color: '#f1f3f6',
    background: '#002349',
    border: '1px solid #f1f3f6',
  };
  return (
    <div className="lang-selector">
      <select
        style={isOpen ? {...selectStyle, ...optionStyle} : selectStyle}
        onClick={toggleDropdown}
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
      >
        <option value="" disabled>
          Select Language
        </option>
        {Languages.map((lng) => (
          <option key={lng.code} value={lng.code}>
            {lng.lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Langselector;



