import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminCons = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);  // Track expanded consultant ID

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/consultant');
        if (response.data.success) {
          setConsultants(response.data.consultants); // Store all consultants in the state
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

  const handleViewMore = (id) => {
    setExpandedId(expandedId === id ? null : id);  // Toggle visibility of details
  };

  const handleVerify = (id) => {
    console.log('Verified consultant with ID:', id);
    // Add the logic to verify the consultant here
  };

  const handleDecline = (id) => {
    console.log('Declined consultant with ID:', id);
    // Add the logic to decline the consultant here
  };

  if (loading) {
    return <div className="text-center text-lg font-semibold py-10">Loading consultants...</div>;
  }

  return (
    <div className="p-6">
      {consultants.length === 0 ? (
        <p className="text-center text-gray-500">No consultants found.</p>
      ) : (
        <div className="space-y-6">
          {consultants.map((consultant) => (
            <div
              key={consultant._id}
              className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0"
            >
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-bold text-blue-700">{consultant.fullName || "Name not available"}</h3>
                <p className="text-gray-600">{consultant.specialization || "Specialization N/A"}</p>
                <div className="mt-4 text-gray-500 text-sm">
                  <p><strong>Email:</strong> {consultant.email}</p>
                </div>
              </div>

              <div className="flex flex-col items-start">
                {expandedId === consultant._id && (
                  <div className="mt-4 text-gray-500 text-sm">
                    {/* Display all information about the consultant */}
                    <p><strong>Phone:</strong> {consultant.phone || "Phone not available"}</p>
                    <p><strong>Address:</strong> {consultant.address || "Address not available"}</p>
                    {/* Add more fields as necessary */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleVerify(consultant._id)}
                        className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => handleDecline(consultant._id)}
                        className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleViewMore(consultant._id)}
                  className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-all"
                >
                  {expandedId === consultant._id ? 'Show Less' : 'View More'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCons;
