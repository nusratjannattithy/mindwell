// components/DashboardTabs.jsx
import React from 'react';

const tabs = [
  { key: 'profile', label: 'Update Profile' },
  { key: 'appointments', label: 'Your Appointments' },
  { key: 'sessionNotes', label: 'Session Notes' },
  { key: 'moodHistory', label: 'Mood Tracking History' },
  { key: 'selfAssessment', label: 'Self Assessment History' }
];

const DashboardTabs = ({ activeTab, setActiveTab }) => (
  <div className="w-64 bg-white shadow-md p-4">
    <h1 className="text-xl font-bold text-blue-600 mb-4">Patient Dashboard</h1>
    <ul className="space-y-2">
      {tabs.map(tab => (
        <li key={tab.key}>
          <button
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === tab.key ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-blue-100'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default DashboardTabs;