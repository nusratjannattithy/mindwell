import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Heading from './Heading';

const Registration = () => {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    specialization: '',
    licenseNumber: '',
    experience: '',
    documents: {
      educationalCertificates: null,
      resume: null,
      governmentID: null,
      consentForm: null,
      specializationCertificates: null,
      profilePhoto: null,
    },
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        [name]: files[0],
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
    } else if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
    } else {
      setError('');
      console.log('Registering:', { userType, ...formData });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-blue-50 flex flex-col">
        <Heading Headline={"Start Your Journey With MindWell"} pagename={"Registration"}/>

        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          {!userType ? (
            <div className="bg-white p-8 rounded-lg shadow-xl text-center w-full max-w-md">
              <h2 className="text-3xl font-bold text-blue-700">Register as</h2>
              <p className="text-gray-600 mt-2 mb-6">Please select your role to continue</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setUserType('patient')}
                  className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                  Patient
                </button>
                <button
                  onClick={() => setUserType('psychologist')}
                  className="flex-1 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                  Psychologist
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-6xl bg-white p-8 md:p-12 rounded-lg shadow-2xl">
              <h2 className="text-4xl font-bold text-blue-700 text-center mb-8">
                Psychologist Registration
              </h2>
              {error && <p className="text-red-500 text-center mb-4">{error}</p>}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Specialization */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                {/* License Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">License Number</label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Years of Experience</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Document Uploads */}
                {[
                  { label: 'Educational Certificates', name: 'educationalCertificates' },
                  { label: 'Professional Resume / CV', name: 'resume' },
                  { label: 'NID', name: 'governmentID' },
                 
                  { label: 'Specialization Certificates', name: 'specializationCertificates' },
                  { label: 'Profile Photo', name: 'profilePhoto' },
                ].map(({ label, name }) => (
                  <div key={name} className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700">{label}</label>
                    <input
                      type="file"
                      name={name}
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      onChange={handleFileChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                ))}

                {/* Submit Button */}
                <div className="col-span-2 flex justify-center mt-4">
                  <button
                    type="submit"
                    className="w-full max-w-xs py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
                  >
                    Create Account
                  </button>
                </div>
              </form>

              <p className="text-center text-gray-600 mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 font-bold hover:underline">
                  Log In
                </Link>
              </p>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Registration;
