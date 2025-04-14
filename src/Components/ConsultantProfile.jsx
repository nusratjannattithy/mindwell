// src/Components/ConsultantProfile.jsx

import { useParams } from 'react-router-dom';


const therapists = [
  // same static array as in BookAppointment.jsx
  {
    _id: "1",
    name: "Dr. John Doe",
    specialization: "Psychologist",
    availability: "Mon-Fri, 9AM-5PM",
    image: "src/assets/consultant_img/consultant1.jpg",
    specializations: ["Relationship Issues", "Grief", "Self-Esteem"],
    experience: "8 years",
    license: "LIC-67890",
    certificates: [
        "src/assets/Certificates/Certificate2.jpg",
        "src/assets/Certificates/Certificate1.jpg"
      ]

  },
  {
    _id: "2",
    name: "Dr. June Smith",
    specialization: "Therapist",
    availability: "Mon-Fri, 10AM-6PM",
    image: "src/assets/consultant_img/consultant2.jpg",
    specializations: ["Depression", "Anxiety", "Stress Management", "Trauma"],
    experience: "8 years",
    license: "LIC-67890",
    certificates: [
        "src/assets/Certificates/Certificate2.jpg",
        "src/assets/Certificates/Certificate1.jpg"
      ]

  },
  {
    _id: "3",
    name: "Dr. Alexa Brown",
    specialization: "Counselor",
    availability: "Mon-Fri, 8AM-4PM",
    image: "src/assets/consultant_img/consultant3.jpg",
    specializations: ["Relationship Issues", "Grief", "Self-Esteem"],
    experience: "8 years",
    license: "LIC-67890",
    certificates: [
        "src/assets/Certificates/Certificate2.jpg",
        "src/assets/Certificates/Certificate1.jpg"
      ]
  },
  {
    _id: "4",
    name: "Dr. Michael Johnson",
    specialization: "Clinical Psychologist",
    availability: "Mon-Fri, 7AM-3PM",
    image: "src/assets/consultant_img/consultant4.jpg",
    specializations: ["Relationship Issues", "Grief", "Self-Esteem"],
    experience: "8 years",
    license: "LIC-67890",
    certificates: [
       "src/assets/Certificates/Certificate2.jpg",
        "src/assets/Certificates/Certificate1.jpg"
      ]

  },
  {
    _id: "5",
    name: "Dr. Emily Carter",
    specialization: "Behavioral Therapist",
    availability: "Mon-Fri, 9AM-5PM",
    image: "src/assets/consultant_img/consultant5.jpg",
    specializations: ["Relationship Issues", "Grief", "Self-Esteem"],
    experience: "8 years",
    license: "LIC-67890",
    certificates: [
        "src/assets/Certificates/Certificate2.jpg",
        "src/assets/Certificates/Certificate1.jpg"
      ]

  },
  {
    _id: "6",
    name: "Dr. William Thomas",
    specialization: "Marriage Counselor",
    availability: "Mon-Fri, 10AM-6PM",
    image: "src/assets/consultant_img/consultant6.jpg",
    specializations: ["Relationship Issues", "Grief", "Self-Esteem"],
    experience: "8 years",
    license: "LIC-67890",
    certificates: [
        "src/assets/Certificates/Certificate2.jpg",
        "src/assets/Certificates/Certificate1.jpg"
      ]

  },
  {
    _id: "7",
    name: "Dr. Ethan Martinez",
    specialization: "Child Psychologist",
    availability: "Mon-Fri, 8AM-4PM",
    image: "src/assets/consultant_img/consultant7.jpg",
    specializations: ["Relationship Issues", "Grief", "Self-Esteem"],
    experience: "8 years",
    license: "LIC-67890",
    certificates: [
        "src/assets/Certificates/Certificate2.jpg",
        "src/assets/Certificates/Certificate1.jpg"
      ]

  },
  {
    _id: "8",
    name: "Dr. Sophia Anderson",
    specialization: "Family Therapist",
    availability: "Mon-Fri, 7AM-3PM",
    image: "src/assets/consultant_img/consultant8.jpg",
    specializations: ["Relationship Issues", "Grief", "Self-Esteem"],
    experience: "8 years",
    license: "LIC-67890",
    certificates: [
        "src/assets/Certificates/Certificate2.jpg",
        "src/assets/Certificates/Certificate1.jpg"
      ]

  },
  {
    _id: "9",
    name: "Dr. Olivia Wilson",
    specialization: "Cognitive Therapist",
    availability: "Mon-Fri, 9AM-5PM",
    image: "src/assets/consultant_img/consultant9.jpg",
    specializations: ["Relationship Issues", "Grief", "Self-Esteem"],
    experience: "8 years",
    license: "LIC-67890",
    certificates: [
       "src/assets/Certificates/Certificate2.jpg",
        "src/assets/Certificates/Certificate1.jpg"
      ]

  },
  {
    _id: "10",
    name: "Dr. Ava Robinson",
    specialization: "Mental Health Counselor",
    availability: "Mon-Fri, 10AM-6PM",
    image: "src/assets/consultant_img/consultant10.jpg",
    specializations: ["Relationship Issues", "Grief", "Self-Esteem"],
    experience: "8 years",
    license: "LIC-67890",
    certificates: [
        "src/assets/Certificates/Certificate2.jpg",
        "src/assets/Certificates/Certificate1.jpg"
      ]

  },
];


const ConsultantProfile = () => {
  const { id } = useParams();
  const consultant = therapists.find((t) => t._id === id);

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
              src={`/${consultant.image}`}
              alt={consultant.name}
              className="w-52 h-52 rounded-xl object-cover border-4 border-blue-200 shadow-md"
            />
          </div>
  
          {/* Right: Info */}
          <div className="text-center md:text-left space-y-2">
  <h1 className="text-3xl font-bold text-blue-700">{consultant.name}</h1>
  <h2 className="text-xl text-gray-600 font-medium">{consultant.specialization}</h2>
  <p className="text-sm text-gray-600">Experience: {consultant.experience}</p>
  <p className="text-sm text-gray-600">License No: {consultant.license}</p>
  <p className="text-gray-700 italic">
    "Passionate about guiding you toward better mental well-being."
  </p>
  </div>
  
</div>


        {/* Divider */}
        <div className="my-6 border-t border-gray-200" />
  
        {/* Contact + Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
          <p><strong>Schedule:</strong> {consultant.availability}</p>
          <p><strong>Phone:</strong> +880123456789</p>
          <p><strong>Email:</strong> consultant@example.com</p>
          <p><strong>Facebook:</strong> fb.com/{consultant.name.split(" ")[1].toLowerCase()}</p>
        </div>

        {/* Specializations */}
<div className="mt-6">
  <h3 className="text-xl font-semibold text-gray-700 mb-2">Specializations</h3>
  <ul className="flex flex-wrap gap-2">
    {consultant.specializations?.map((item, index) => (
      <li
        key={index}
        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm shadow-sm"
      >
        {item}
      </li>
    ))}
  </ul>
</div>

{/* Certificates Section */}
{consultant.certificates?.length > 0 && (
  <div className="mt-10">
    <h3 className="text-xl font-semibold text-gray-700 mb-4">Certificates</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {consultant.certificates.map((cert, index) => (
       <img
       key={index}
       src={cert}
       alt={`Certificate ${index + 1}`}
       className="w-full h-48 object-cover rounded-lg shadow-md border"
     />     
      ))}
    </div>
  </div>
)}

  
        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-purple-700">
            Attachments
          </button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-700">
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
  