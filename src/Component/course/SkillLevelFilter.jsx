import React from "react";

const SkillLevelFilter = () => {
  const [selectedLevels, setSelectedLevels] = React.useState({
    all: false,
    beginner: false,
    intermediate: false,
    expert: false,
  });
  const handleChange = (level) => {
    setSelectedLevels((prevLevels) => ({
      ...prevLevels,
      [level]: !prevLevels[level],
    }));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-2xl max-w-full mx-auto">
      <div className="text-lg font-bold mb-4">Skill Level</div>
      <div className="space-y-2">
        {Object.entries(selectedLevels).map(([level, isChecked]) => (
          <label key={level} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handleChange(level)}
              className="h-5 w-5 text-primary rounded border-gray-300"
            />
            <span className="text-gray-500 capitalize text-lg">{`${level} Level (82)`}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SkillLevelFilter;
