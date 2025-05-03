import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BookAppointment from './BookAppointment';
import axios from 'axios';

const AppointmentsSection = ({ appointments, onDelete, onAdd }) => {
  const [sessionNotesMap, setSessionNotesMap] = useState({});

  useEffect(() => {
    // Fetch session notes for all appointments
    const fetchSessionNotes = async () => {
      try {
        const newSessionNotesMap = {};
        for (const appt of appointments) {
          const response = await axios.get(`http://localhost:5000/api/appointments/${appt._id}/session-notes`);
          if (response.data.success) {
            // Concatenate all notes into one string separated by new lines
            const notes = response.data.sessionNotes.map(sn => sn.note).join('\n---\n');
            newSessionNotesMap[appt._id] = notes;
          } else {
            newSessionNotesMap[appt._id] = '';
          }
        }
        setSessionNotesMap(newSessionNotesMap);
      } catch (error) {
        console.error('Failed to fetch session notes:', error);
      }
    };

    if (appointments.length > 0) {
      fetchSessionNotes();
    }
  }, [appointments]);

  const handleSessionNoteChange = (appointmentId, newNotes) => {
    setSessionNotesMap(prev => ({ ...prev, [appointmentId]: newNotes }));
  };

  const handleSessionNoteSave = async (appointmentId, patientEmail) => {
    try {
      const note = sessionNotesMap[appointmentId];
      if (!note || note.trim() === '') {
        alert('Session note cannot be empty.');
        return;
      }
      await axios.post(`http://localhost:5000/api/appointments/${appointmentId}/session-notes`, {
        note,
        patientEmail,
      });
      alert('Session note saved successfully.');
    } catch (error) {
      console.error('Failed to save session note:', error);
      alert('Failed to save session note. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Your Appointments</h2>
      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((appt, index) => (
            <div key={appt._id || index} className="border-b pb-4">
<p className="font-semibold">With: {appt.consultantName || 'Unknown Therapist'}</p>
              <p>Date: {appt.selectedDate || 'N/A'}</p>
              <p>Time: {appt.selectedTime || 'N/A'}</p>
              <p>Location: {appt.branch || 'N/A'}</p>
              <p>Meeting Type: {appt.type ? (appt.type.toLowerCase() === 'online' ? 'Online' : 'Offline') : 'N/A'}</p>
              <label className="block mt-2 font-medium text-gray-700">Session Notes:</label>
              <textarea
                value={sessionNotesMap[appt._id] || ''}
                onChange={(e) => handleSessionNoteChange(appt._id, e.target.value)}
                className="w-full border rounded p-2 mt-1"
                rows={5}
                placeholder="Add session notes here..."
              />
              <button
                onClick={() => handleSessionNoteSave(appt._id, appt.email)}
                className="bg-blue-500 text-white px-3 py-1 rounded mt-2 mr-2"
              >
                Save Note
              </button>
              <button
                onClick={() => onDelete(index)}
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No upcoming appointments.</p>
      )}
      <div className="mt-6">
        <BookAppointment onBook={onAdd} />
      </div>
    </div>
  );
};

AppointmentsSection.propTypes = {
  appointments: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AppointmentsSection;
