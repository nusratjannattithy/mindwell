import React, { useEffect, useState } from 'react';

const SelfAssessmentSection = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const storedUser = localStorage.getItem('patientUser');
        if (!storedUser) {
          setError('No patient user found in local storage.');
          setLoading(false);
          return;
        }
        const user = JSON.parse(storedUser);
        const userId = user._id || user.id;
        if (!userId) {
          setError('User ID not found.');
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:5000/api/selftest/history/" + userId);
        if (!response.ok) {
          throw new Error('Failed to fetch self-assessment history');
        }
        const data = await response.json();
        if (data.success && data.history) {
          setHistory(data.history);
        } else {
          setHistory([]);
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
    
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Self Assessment History</h2>
      {loading && <p>Loading history...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && history.length === 0 && <p>No self-assessment history found.</p>}
      {!loading && !error && history.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Test Type</th>
              <th className="border border-gray-300 px-4 py-2">Result</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry._id}>
                <td className="border border-gray-300 px-4 py-2">{new Date(entry.createdAt).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">{entry.testType}</td>
                <td className="border border-gray-300 px-4 py-2">{entry.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SelfAssessmentSection;
