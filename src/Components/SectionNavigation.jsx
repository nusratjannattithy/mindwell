import React from 'react';
import PropTypes from 'prop-types';

const SectionNavigation = ({ activeSection, setActiveSection }) => {
  const sections = [
    { id: 'profile', label: 'Profile' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'moodHistory', label: 'Mood History' },
    { id: 'sessionNotes', label: 'Session Notes' },
    { id: 'selfAssessment', label: 'Self Assessment History' }, // Updated
  ];

  return (
    <div className="w-64 bg-white p-4 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Dashboard</h2>
      <nav>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`block w-full text-left px-4 py-2 mb-2 rounded-md font-medium transition-colors
              ${activeSection === section.id ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'}`}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

SectionNavigation.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
};

export default SectionNavigation;
