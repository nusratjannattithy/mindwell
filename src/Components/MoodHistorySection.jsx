// components/MoodHistorySection.jsx
import React from 'react';
import MoodTracking from './MoodTracking';

const MoodHistorySection = ({ moodHistory, onMoodUpdate }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4">Mood Tracking</h2>
    <MoodTracking onMoodUpdate={onMoodUpdate} />
    {moodHistory.length > 0 && (
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Your Mood History</h3>
        <div className="flex space-x-2 overflow-x-auto">
          {moodHistory.map((mood, index) => (
            <div key={index} className="flex flex-col items-center" style={{ minWidth: '60px' }}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  mood.value > 7 ? 'bg-green-500' :
                  mood.value > 4 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
              >
                {mood.value}
              </div>
              <span className="text-xs mt-1">{new Date(mood.date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default MoodHistorySection;
