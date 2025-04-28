import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/appointment");
        setAppointments(response.data.appointments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Appointments
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments found.</p>
      ) : (
        <div className="space-y-6">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white border border-gray-300 rounded-lg p-5 shadow hover:shadow-md transition duration-300"
            >
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                {appointment.category || "Appointment"}
              </h2>
              <p className="text-gray-700 mb-1">
                <strong>Name:</strong> {appointment.name}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Email:</strong> {appointment.email}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <strong>Message:</strong> {appointment.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAppointment;
