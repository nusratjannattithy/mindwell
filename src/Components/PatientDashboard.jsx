/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MoodTracking from './MoodTracking';
import BookAppointment from './BookAppointment';
import ProfileSettings from './ProfileSettings';
import HistorySection from './HistorySection';
import ActivitySection from './ActivitySection';

const PatientDashboard = () => {
  // Patient data with expanded fields
  const [patientData, setPatientData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    profilePhoto: '',
    coverPhoto: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: ''
    },
    upcomingAppointments: [],
    pastAppointments: [],
    moodHistory: [],
    sessionNotes: [],
    quizzes: [],
    courses: [],
    resources: []
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('patientDashboardData');
    if (savedData) {
      setPatientData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('patientDashboardData', JSON.stringify(patientData));
  }, [patientData]);

  const handleAddAppointment = (appointment) => {
    setPatientData(prev => ({
      ...prev,
      upcomingAppointments: [...prev.upcomingAppointments, appointment]
    }));
  };

  const handleMoodUpdate = (moodData) => {
    setPatientData(prev => ({
      ...prev,
      moodHistory: [...prev.moodHistory, moodData]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header with Cover Photo */}
        <div className="relative rounded-lg shadow-md mb-6 overflow-hidden">
          <div 
            className="h-48 bg-blue-500 w-full"
            style={{ 
              backgroundImage: patientData.coverPhoto ? `url(${patientData.coverPhoto})` : '',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="absolute top-2 right-2 bg-white bg-opacity-80 p-2 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <div className="bg-white p-6 pt-16">
            <div className="flex items-end -mt-20">
              <div className="relative">
                <img 
                  src={patientData.profilePhoto || 'https://via.placeholder.com/150'} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full border-4 border-white"
                />
                <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-blue-600">{patientData.name}</h1>
                <p className="text-gray-600">{patientData.email}</p>
                <div className="flex mt-2 space-x-4">
                  {patientData.socialLinks.facebook && (
                    <a href={patientData.socialLinks.facebook} className="text-blue-500 hover:text-blue-700">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>
                  )}
                  {patientData.socialLinks.twitter && (
                    <a href={patientData.socialLinks.twitter} className="text-blue-400 hover:text-blue-600">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  )}
                  {patientData.socialLinks.instagram && (
                    <a href={patientData.socialLinks.instagram} className="text-pink-500 hover:text-pink-700">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Upcoming Appointments</h2>
            <p className="text-3xl font-bold">{patientData.upcomingAppointments.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Mood Average</h2>
            <p className="text-3xl font-bold">
              {patientData.moodHistory.length > 0 
                ? (patientData.moodHistory.reduce((a, b) => a + b.value, 0) / patientData.moodHistory.length).toFixed(1)
                : 'N/A'}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Resources</h2>
            <p className="text-3xl font-bold">5+</p>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-600">Your Appointments</h2>
            <Link 
              to="/book-appointment" 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Book New
            </Link>
          </div>
          {patientData.upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {patientData.upcomingAppointments.map((appt, index) => (
                <div key={index} className="border-b pb-4">
                  <p className="font-semibold">With: {appt.therapist}</p>
                  <p>Date: {appt.date}</p>
                  <p>Time: {appt.time}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No upcoming appointments</p>
          )}
        </div>

        {/* Mood Tracking Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Mood Tracking</h2>
          <MoodTracking onMoodUpdate={handleMoodUpdate} />
          {patientData.moodHistory.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Your Mood History</h3>
              <div className="flex space-x-2 overflow-x-auto py-2">
                {patientData.moodHistory.map((mood, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center"
                    style={{ minWidth: '60px' }}
                  >
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white
                        ${mood.value > 7 ? 'bg-green-500' : 
                          mood.value > 4 ? 'bg-yellow-500' : 'bg-red-500'}`}
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

        {/* Profile Settings Section */}
        <ProfileSettings patientData={patientData} setPatientData={setPatientData} />

        {/* History Section */}
        <HistorySection patientData={patientData} />

        {/* Activity Section */}
        <ActivitySection patientData={patientData} />

        {/* Quick Links Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              to="/resources" 
              className="bg-blue-100 text-blue-600 p-4 rounded-lg text-center hover:bg-blue-200"
            >
              Resources
            </Link>
            <Link 
              to="/mood-enhancement" 
              className="bg-blue-100 text-blue-600 p-4 rounded-lg text-center hover:bg-blue-200"
            >
              Mood Tools
            </Link>
            <Link 
              to="/articles" 
              className="bg-blue-100 text-blue-600 p-4 rounded-lg text-center hover:bg-blue-200"
            >
              Articles
            </Link>
            <Link 
              to="/books" 
              className="bg-blue-100 text-blue-600 p-4 rounded-lg text-center hover:bg-blue-200"
            >
              Books
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
