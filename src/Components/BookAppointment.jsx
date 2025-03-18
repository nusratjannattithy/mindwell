import { useState } from "react"; // Import useState for handling component state
import { useNavigate } from "react-router-dom"; // Import useNavigate to handle page navigation

// Static data for therapists (this will be replaced with actual data in a real-world app)
const therapists = [
  {
    _id: "1", // Unique identifier for each therapist
    name: "Dr. John Doe", // Name of the therapist
    specialization: "Psychologist", // Specialization of the therapist
    availability: "Mon-Fri, 9AM-5PM", // Availability hours
    image: "src/assets/consultant_img/consultant1.jpg", // Image of the therapist
  },
  {
    _id: "2",
    name: "Dr. June Smith",
    specialization: "Therapist",
    availability: "Mon-Fri, 10AM-6PM",
    image: "src/assets/consultant_img/consultant2.jpg",
  },
  {
    _id: "3",
    name: "Dr. Alexa Brown",
    specialization: "Counselor",
    availability: "Mon-Fri, 8AM-4PM",
    image: "src/assets/consultant_img/consultant3.jpg",
  },
];

const BookAppointment = () => {
  const navigate = useNavigate(); // Initialize navigation function
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term for filtering therapists

  // Function to handle when a therapist photo is clicked
  const handleTherapistClick = () => {
    // Navigate to the login page
    navigate("/LogIn");
  };

  // Filter therapists based on the search term
  const filteredTherapists = therapists.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Filter by name
      t.specialization.toLowerCase().includes(searchTerm.toLowerCase()) // Filter by specialization
  );

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
      {/* Heading section */}
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
        Our Consultants
      </h2>
      <p className="text-center text-gray-500 mb-4">
        Click a consultant's photo to proceed to login.
      </p>

      {/* Search input field */}
      <input
        type="text"
        placeholder="Search by name or specialization..."
        className="w-full p-2 mb-4 border rounded-lg"
        value={searchTerm} // The input value is bound to the state
        onChange={(e) => setSearchTerm(e.target.value)} // Update the state when the user types
      />

      {/* Display filtered therapists */}
      {filteredTherapists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Iterate through filtered therapists and display each one */}
          {filteredTherapists.map((t) => (
            <div
              key={t._id} // Unique key for each therapist
              className="p-4 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100 flex flex-col items-center space-y-4"
              onClick={handleTherapistClick} // On click, navigate to the login page
            >
              {/* Therapist image with round shape and border */}
              <img
                src={t.image} // Image source
                alt={t.name} // Alt text for accessibility
                className="w-48 h-48 object-cover rounded-full border" // Style the image with round shape and specific size
              />
              {/* Therapist details */}
              <div className="text-center">
                <h3 className="text-xl font-semibold">{t.name}</h3>
                <p className="text-gray-600">{t.specialization}</p>
                <p className="text-gray-500">Available: {t.availability}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // If no therapists match the search, show a message
        <p className="text-center text-gray-500">No consultants found.</p>
      )}
    </div>
  );
};

export default BookAppointment;
