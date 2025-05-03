import React from 'react';
import PropTypes from 'prop-types';

const ProfileSection = ({ patientData }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Patient Profile</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600 font-medium">Full Name:</p>
          <p className="text-gray-900">{patientData.fullName}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Email:</p>
          <p className="text-gray-900">{patientData.email}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Phone:</p>
          <p className="text-gray-900">{patientData.phone}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Gender:</p>
          <p className="text-gray-900 capitalize">{patientData.gender}</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">Date of Birth:</p>
          <p className="text-gray-900">{new Date(patientData.birthdate).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

ProfileSection.propTypes = {
  patientData: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    gender: PropTypes.string,
    birthdate: PropTypes.string,
  }).isRequired,
};

export default ProfileSection;
