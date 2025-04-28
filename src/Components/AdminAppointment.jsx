import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/appointments"); 
        console.log("Fetched appointments:", response.data);
        setAppointments(response.data);
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
              <h2 className="text-xl font-semibold text-indigo-700 mb-4">Appointment Details</h2>
              <p className="text-gray-700 mb-1">
                <strong>Patient Name:</strong> {appointment.name || "N/A"}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Email:</strong> {appointment.email || "N/A"}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Phone:</strong> {appointment.phone || "N/A"}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Branch:</strong> {appointment.branch || "N/A"}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Date:</strong> {appointment.selectedDate || "N/A"}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Time:</strong> {appointment.selectedTime || "N/A"}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Fee:</strong> {appointment.fee ? `${appointment.fee} Taka` : "N/A"}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Issue:</strong> {appointment.remarks || "Not Provided"}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Status:</strong> {appointment.status || "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAppointment;
