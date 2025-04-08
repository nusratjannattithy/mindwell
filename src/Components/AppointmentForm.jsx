// File: src/components/AppointmentForm.jsx

import { useState } from "react";


export default function AppointmentForm() {
  const [type, setType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const fee = 3500;

  const resetForm = () => {
    setType("");
    setSelectedDate("");
    setSelectedTime("");
  };

  const saveAppointment = () => {
    if (!type || !selectedDate || !selectedTime) {
      alert("Please fill out all required fields.");
      return;
    }

    alert("Appointment Saved!");
    // Submit logic here
  };

  const availableDates = [
    "21-03-2025 (Fri)", "22-03-2025 (Sat)", "23-03-2025 (Sun)",
    "24-03-2025 (Mon)", "25-03-2025 (Tue)", "28-03-2025 (Fri)",
    "29-03-2025 (Sat)", "30-03-2025 (Sun)",
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add Appointment</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Doctor</label>
          <input
            type="text"
            value="Tonima Islam Tanni"
            disabled
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Branch</label>
          <select className="w-full border rounded p-2">
            <option>Panthopath L-6</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Month</label>
          <select className="w-full border rounded p-2">
            <option>Mar 2025</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Type</label>
          <select
            className={`w-full border rounded p-2 ${!type && "border-red-500"}`}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
          {!type && <p className="text-sm text-red-500">Required</p>}
        </div>
      </div>

      <div className="mt-6">
        <label className="block font-medium mb-2">Available Date</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {availableDates.map((date) => (
            <label key={date} className="flex items-center gap-2">
              <input
                type="radio"
                name="date"
                value={date}
                checked={selectedDate === date}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              {date}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="block font-medium mb-2">Select Time Slot</label>
        <div className="flex gap-4">
          {["02:00 pm", "04:00 pm"].map((time) => (
            <label key={time} className="flex items-center gap-2">
              <input
                type="radio"
                name="time"
                value={time}
                checked={selectedTime === time}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
              {time}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 text-lg">
        <p>Fee: <strong>{fee}</strong></p>
        <p>Total: <strong>{fee}</strong></p>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button variant="outline" onClick={resetForm}>Reset</Button>
        <Button onClick={saveAppointment}>Save</Button>
      </div>
    </div>
  );
}
