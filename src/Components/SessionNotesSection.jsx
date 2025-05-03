import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const SessionNotesSection = ({ patientEmail }) => {
  const [appointmentsWithNotes, setAppointmentsWithNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!patientEmail) return;

    const fetchAppointmentsAndNotes = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch appointments for the patient
        const appointmentsRes = await axios.get(`http://localhost:5000/api/appointments/${patientEmail}`);
        if (!appointmentsRes.data.success) {
          setError('Failed to fetch appointments.');
          setLoading(false);
          return;
        }
        const appointments = appointmentsRes.data.appointments;

        // For each appointment, fetch session notes
        const appointmentsWithNotesPromises = appointments.map(async (appt) => {
          const notesRes = await axios.get(`http://localhost:5000/api/appointments/${appt._id}/session-notes`);
          const sessionNotes = notesRes.data.success ? notesRes.data.sessionNotes : [];
          return {
            appointmentId: appt._id,
            consultantName: appt.consultantName || 'Unknown Consultant',
            date: appt.selectedDate || 'N/A',
            sessionNotes: sessionNotes, // array of session note objects
          };
        });

        const appointmentsWithNotes = await Promise.all(appointmentsWithNotesPromises);
        setAppointmentsWithNotes(appointmentsWithNotes);
      } catch (err) {
        setError('An error occurred while fetching data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentsAndNotes();
  }, [patientEmail]);

  if (!patientEmail) {
    return <p>Please provide a patient email to view session notes.</p>;
  }

  if (loading) {
    return <p>Loading session notes...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (appointmentsWithNotes.length === 0) {
    return <p>No session notes found for this patient.</p>;
  }

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:5000/api/appointments/session-notes/${noteId}`);
      // Refresh the session notes after deletion
      setAppointmentsWithNotes((prev) =>
        prev.map((appt) => ({
          ...appt,
          sessionNotes: appt.sessionNotes.filter((note) => note._id !== noteId),
        }))
      );
    } catch (error) {
      console.error('Failed to delete session note:', error);
      alert('Failed to delete session note. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Session Notes</h2>
      {appointmentsWithNotes.map(({ appointmentId, consultantName, date, sessionNotes }) => (
        <div key={appointmentId} className="mb-6 border-b pb-4">
          <p className="font-semibold">Consultant: {consultantName}</p>
          <p>Date: {date}</p>
          <label className="block mt-2 font-medium text-gray-700">Session Notes:</label>
          {sessionNotes.length > 0 ? (
            sessionNotes.map((note) => (
              <div key={note._id} className="mb-2 p-3 border rounded bg-gray-100 relative">
                <p className="whitespace-pre-wrap">{note.note}</p>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="absolute top-2 right-2 bg-red-600 hover:bg-red-800 text-white font-semibold py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                  aria-label="Delete session note"
                  title="Delete session note"
                  style={{ cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No session notes available.</p>
          )}
        </div>
      ))}
    </div>
  );
};

SessionNotesSection.propTypes = {
  patientEmail: PropTypes.string.isRequired,
};

export default SessionNotesSection;
