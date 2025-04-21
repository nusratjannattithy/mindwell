import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookAppointment = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/therapists"); // Adjust if needed
        setTherapists(response.data);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      }
    };

    fetchTherapists();
  }, []);

  const handleTherapistClick = (id) => {
    const user = localStorage.getItem('user');
    if (user) {
      // User is logged in, navigate to consultant profile
      navigate(`/consultant/${id}`);
    } else {
      // User not logged in, navigate to login and pass redirect state
      navigate('/login', { state: { from: `/consultant/${id}` } });
    }
  };

  const filteredTherapists = therapists.filter((t) =>
    t.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
        Our Consultants
      </h2>
      <p className="text-center text-gray-500 mb-4">
        Click a consultant’s photo to proceed to login.
      </p>

      <input
        type="text"
        placeholder="Search by name or specialization..."
        className="w-full p-2 mb-4 border rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredTherapists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTherapists.map((t) => (
            <div
              key={t._id}
              className="p-4 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100 flex flex-col items-center space-y-4"
              onClick={() => handleTherapistClick(t._id)}
            >
              <img
                src={t.documents?.profilePhoto || "/default-avatar.jpg"} // Fallback if no photo
                alt={t.fullName}
                className="w-48 h-48 object-cover rounded-full border"
              />
              <div className="text-center">
                <h3 className="text-xl font-semibold">{t.fullName}</h3>
                <p className="text-gray-600 capitalize">{t.userType}</p>
                <p className="text-gray-600">{t.specialization}</p>
                <p className="text-gray-500">Experience: {t.experience} years</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No consultants found.</p>
      )}
    </div>
  );
};

export default BookAppointment;
