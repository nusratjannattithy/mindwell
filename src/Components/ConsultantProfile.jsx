import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminCons = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/consultant');
        if (response.data.success) {
          setConsultants(response.data.consultants);
        } else {
          console.error('Failed to fetch consultants:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching consultants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultants();
  }, []);

  const handleViewProfile = (id) => {
    navigate(`/consultant/${id}`);
  };

  if (loading) {
    return <div className="text-center text-lg font-semibold py-10">Loading consultants...</div>;
  }

  return (
    <div className="p-6">
      {consultants.length === 0 ? (
        <p className="text-center text-gray-500">No consultants found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {consultants.map((consultant) => (
            <div 
              key={consultant._id} 
              className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl p-6 flex flex-col items-center text-center"
            >
              <img 
                src={consultant.profilePhoto || "/default-avatar.jpg"}
                alt={consultant.name}
                className="w-32 h-32 object-cover rounded-full border-4 border-blue-200 mb-4"
              />
              <h3 className="text-xl font-bold text-blue-700">{consultant.name}</h3>
              <p className="text-gray-600">{consultant.specialization || "Specialization N/A"}</p>
              <p className="mt-2 text-sm text-gray-500">Availability: Monday - Friday, 10:00 AM - 6:00 PM</p> {/* Dummy availability */}
              <div className="mt-4 text-gray-500 text-sm">
                <p><strong>Email:</strong> {consultant.email}</p>
              </div>
              <button 
                onClick={() => handleViewProfile(consultant._id)}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCons;
