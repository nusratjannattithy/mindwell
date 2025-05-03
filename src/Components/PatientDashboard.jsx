import { useState, useEffect } from 'react';
import SectionNavigation from './SectionNavigation';
import ProfileSection from './ProfileSection';
import AppointmentsSection from './AppointmentsSection';
import MoodHistorySection from './MoodHistorySection';
import SessionNotesSection from './SessionNotesSection';
import SelfAssessmentSection from './SelfAssessmentSection'; // Renamed
import AppointmentForm from './AppointmentForm';

const PatientDashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      setLoading(true);
      setError(null);
      try {
        const storedUser = localStorage.getItem('patientUser');
        console.log('Stored user from localStorage:', storedUser);
        if (!storedUser) {
          setError('No patient user found in local storage.');
          setLoading(false);
          return;
        }
        const user = JSON.parse(storedUser);
        console.log('Parsed user object:', user);
        const userId = user._id || user.id; // depending on backend id field
        console.log('User ID:', userId);

        if (!userId) {
          setError('User ID not found.');
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:5000/users/${userId}`);
        console.log('Fetch response status:', response.status);
        if (!response.ok) {
          throw new Error('Failed to fetch patient data');
        }
        const data = await response.json();
        console.log('Fetched patient data:', data);
        if (data.success && data.user) {
          setPatientData(data.user);
          // Fetch appointments after patient data is loaded
          fetchAppointments(data.user.email);
        } else {
          setError('Failed to load patient data');
        }
      } catch (err) {
        console.error('Error in fetchPatientData:', err);
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    const fetchAppointments = async (email) => {
      try {
        const response = await fetch(`http://localhost:5000/api/appointments/${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        if (data.success && data.appointments) {
          // Include branch and type fields from backend data
          const mappedAppointments = data.appointments.map((appt) => ({
            ...appt,
            therapist: appt.consultantId || 'Unknown',
            date: appt.selectedDate,
            time: appt.selectedTime,
            sessionNotes: appt.remarks || '',
            branch: appt.branch || 'N/A',
            type: appt.type || 'N/A',
          }));
          setAppointments(mappedAppointments);
        } else {
          setAppointments([]);
        }
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setAppointments([]);
      }
    };

    fetchPatientData();
  }, []);

  const handleDeleteAppointment = (index) => {
    setAppointments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddAppointment = (newAppointment) => {
    setAppointments((prev) => [...prev, newAppointment]);
  };

  const handleNoteChange = (index, newNotes) => {
    setAppointments((prev) =>
      prev.map((appt, i) => (i === index ? { ...appt, sessionNotes: newNotes } : appt))
    );
  };

  const renderSection = () => {
    if (showAppointmentForm) {
      return <AppointmentForm />;
    }
    switch (activeSection) {
      case 'profile':
        if (loading) {
          return <p>Loading patient data...</p>;
        }
        if (error) {
          return <p className="text-red-500">Error: {error}</p>;
        }
        if (patientData) {
          return <ProfileSection patientData={patientData} />;
        }
        return <p>No patient data available.</p>;
      case 'appointments':
        return (
          <AppointmentsSection
            appointments={appointments}
            onDelete={handleDeleteAppointment}
            onAdd={handleAddAppointment}
            onNoteChange={handleNoteChange}
          />
        );
      case 'moodHistory':
        return <MoodHistorySection />;
      case 'sessionNotes':
        return <SessionNotesSection patientEmail={patientData?.email} />;
      case 'selfAssessment':
        return <SelfAssessmentSection />;
      default:
        return <ProfileSection patientData={patientData} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <SectionNavigation activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-blue-600 mb-6 flex justify-between items-center">
          Patient Dashboard
          <button
            onClick={() => setShowAppointmentForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Book Now
          </button>
        </h1>
        {renderSection()}
      </div>
    </div>
  );
};

export default PatientDashboard;
