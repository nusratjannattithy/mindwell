import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AppointmentForm from './AppointmentForm';

const ConsultantProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [consultant, setConsultant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  useEffect(() => {
    // Check if redirected from login with flag to show appointment form
    if (location.state?.showAppointmentForm) {
      setShowAppointmentForm(true);
    }
  }, [location.state]);

  const handleBookNowClick = () => {
    console.log('Book Now clicked');
    try {
      // Always navigate to login page first
      navigate('/login', { state: { from: `/consultant/${id}`, consultantId: id, consultantName: consultant?.fullName || '' } });
    } catch (error) {
      console.error('Error in Book Now click handler:', error);
    }
  };

  useEffect(() => {
    const fetchConsultant = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/therapists/${id}`);
        console.log("Fetched consultant data:", response.data);
        setConsultant(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching consultant data:", err);
        setError('Failed to fetch consultant data.');
        setLoading(false);
      }
    };

    fetchConsultant();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading consultant profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10">{error}</div>;
  }

  if (!consultant) {
    return <div className="text-center text-red-600 mt-10">Consultant not found</div>;
  }

  if (showAppointmentForm) {
    return <AppointmentForm key={id} consultantName={consultant.fullName} />;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-xl">
      {/* Main layout with image and bio */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left: Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={consultant?.documents?.profilePhoto || "/default-avatar.jpg"}
            alt={consultant?.fullName || "Consultant"}
            className="w-52 h-52 rounded-xl object-cover border-4 border-blue-200 shadow-md"
          />
        </div>

        {/* Right: Info */}
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl font-bold text-blue-700">{consultant?.fullName || "N/A"}</h1>
          <h2 className="text-xl text-gray-600 font-medium">{consultant?.specialization || "N/A"}</h2>
          <p className="text-sm text-gray-600">Experience: {consultant?.experience || "N/A"} years</p>
          <p className="text-sm text-gray-600">License No: {consultant?.licenseNumber || "N/A"}</p>
          <p className="text-gray-700 italic">
            "Passionate about guiding you toward better mental well-being."
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200" />

      {/* Contact + Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
        <p><strong>Schedule:</strong> {consultant?.availability || "N/A"}</p>
        <p><strong>Phone:</strong> {consultant?.phone || "N/A"}</p>
        <p><strong>Email:</strong> {consultant?.email || "N/A"}</p>
        <p><strong>Facebook:</strong> fb.com/{consultant?.fullName?.split(" ")[1]?.toLowerCase() || "profile"}</p>
      </div>

      {/* Specializations */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Specialization</h3>
        <p className="text-gray-700">{consultant?.specialization || "N/A"}</p>
      </div>

      {/* Certificates Section */}
      {(consultant?.documents?.educationalCertificates || consultant?.documents?.specializationCertificates) ? (
        <div className="mt-10 flex gap-40 justify-center">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Educational Certificates</h3>
            {consultant.documents.educationalCertificates ? (
              <img
                src={consultant.documents.educationalCertificates}
                alt="Educational Certificate"
                className="w-80 h-80 object-cover rounded-lg shadow-md border"
              />
            ) : (
              <p className="text-gray-500">No educational certificates available.</p>
            )}
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Specialization Certificates</h3>
            {consultant.documents.specializationCertificates ? (
              <img
                src={consultant.documents.specializationCertificates}
                alt="Specialization Certificate"
                className="w-80 h-80 object-cover rounded-lg shadow-md border"
              />
            ) : (
              <p className="text-gray-500">No specialization certificates available.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mt-10">No certificates available.</p>
      )}

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        <button className="bg-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-purple-700">
          Attachments
        </button>
        <button
          type="button"
          className="bg-green-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-700"
          onClick={handleBookNowClick}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ConsultantProfile;
