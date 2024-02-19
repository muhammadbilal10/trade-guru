import React, { useState } from "react";

const languages = [
  { id: "spanish", label: "Spanish Language" },
  { id: "arabic", label: "Arabic Language" },
  { id: "us", label: "United States (US)" },
  { id: "uk", label: "United Kingdom (UK)" },
];

const LanguageFilter = () => {
  const [selectedLanguages, setSelectedLanguages] = useState({});

  const toggleLanguage = (id) => {
    setSelectedLanguages((prevSelectedLanguages) => ({
      ...prevSelectedLanguages,
      [id]: !prevSelectedLanguages[id],
    }));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-2xl max-w-full mx-auto">
      <div className="font-bold text-lg mb-4">Language</div>
      <div className="space-y-2">
        {languages.map((language) => (
          <label key={language.id} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectedLanguages[language.id] || false}
              onChange={() => toggleLanguage(language.id)}
              className="form-checkbox h-5 w-5 text-gray-600 rounded border-gray-300"
            />
            <span className="text-gray-500">{language.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default LanguageFilter;
