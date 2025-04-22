import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ConsultantProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consultant, setConsultant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
          <p className="text-sm text-gray-600">License No: {consultant?.license || "N/A"}</p>
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
        <p><strong>Phone:</strong> +880123456789</p>
        <p><strong>Email:</strong> consultant@example.com</p>
        <p><strong>Facebook:</strong> fb.com/{consultant?.fullName?.split(" ")[1]?.toLowerCase() || "profile"}</p>
      </div>

      {/* Specializations */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Specializations</h3>
        <ul className="flex flex-wrap gap-2">
          {consultant?.specializations?.length > 0 ? (
            consultant.specializations.map((item, index) => (
              <li
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm shadow-sm"
              >
                {item}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No specializations listed.</li>
          )}
        </ul>
      </div>

      {/* Certificates Section */}
      {consultant?.certificates?.length > 0 ? (
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Certificates</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {consultant.certificates.map((cert, index) => (
              <img
                key={index}
                src={cert.replace('src/assets/', '/src/assets/')}
                alt={`Certificate ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-md border"
              />
            ))}
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
        <button className="bg-green-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-700">
          Book Now
        </button>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700">
          Message
        </button>
      </div>
    </div>
  );
};

export default ConsultantProfile;
  