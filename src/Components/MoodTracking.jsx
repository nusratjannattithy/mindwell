/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MoodTracking = () => {
  const [mood, setMood] = useState(5);
  const [distraction, setDistraction] = useState(5);
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let combinedResult = '';

    if (mood <= 3 && distraction >= 7) {
      combinedResult = "You're feeling low and highly distracted. Engaging in calming and focus-enhancing activities might help.";
    } else if (mood <= 3) {
      combinedResult = "You're feeling low. Consider some calming activities to uplift your mood.";
    } else if (distraction >= 7) {
      combinedResult = "You're feeling quite distracted. Engaging with stress-relief content might improve your focus.";
    } else if (mood <= 7 || distraction <= 7) {
      combinedResult = "You're feeling okay but could benefit from some mood-enhancing or focus activities.";
    } else {
      combinedResult = "You're in a great mood and highly focused! Keep it up, but feel free to explore more uplifting content.";
    }

    setResult(combinedResult);

    // Send data to backend
    try {
      const response = await fetch('http://localhost:5000/moodtracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood: Number(mood),
          distraction: Number(distraction),
          result: combinedResult,
          // userId can be added here if user authentication is implemented
        }),
      });

      if (!response.ok) {
        console.error('Failed to save mood tracking data');
      } else {
        console.log('Mood tracking data saved successfully');
      }
    } catch (error) {
      console.error('Error sending mood tracking data:', error);
    }
  };

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 w-full flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8 md:p-12">
        {/* Page Title & Description */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900">Track Your Daily Mood </h2>
          <p className="text-lg text-gray-700 mt-3">
            Log your daily mood and distraction levels to gain insights into your well-being. 
            By signing in, you can track your mood trends weekly or monthly and identify patterns that can help you improve your mental well-being.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Mood Rating Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Mood Level (0 - Worst, 10 - Best)
            </label>
            <input 
              type="range" 
              min="0" 
              max="10" 
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full accent-blue-500 h-2 rounded-lg"
            />
            <p className="text-center text-blue-600 font-semibold mt-2">Mood: {mood}</p>
          </div>

          {/* Distraction Rating Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <label className="block text-lg font-medium text-gray-900 mb-4">
              Distraction Level (0 - Focused, 10 - Very Distracted)
            </label>
            <input 
              type="range" 
              min="0" 
              max="10" 
              value={distraction}
              onChange={(e) => setDistraction(e.target.value)}
              className="w-full accent-blue-400 h-2 rounded-lg"
            />
            <p className="text-center text-blue-600 font-semibold mt-2">Distraction: {distraction}</p>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Get Results
          </button>
        </form>

        {/* Results Section */}
        {result && (
          <div className="mt-8 p-6 bg-blue-50 rounded-xl shadow-lg">
            <p className="text-lg font-medium text-gray-900">{result}</p>
            <p className="mt-4 text-blue-800 font-medium">
              Explore mood-enhancing activities:
            </p>
            <Link 
              to="/MoodEnhancement" 
              onClick={handleLinkClick}
              className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
            >
              Visit Mood Enhancement Segment
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTracking;
