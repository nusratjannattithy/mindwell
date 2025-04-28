import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminHelpline = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/helpline');
        setMessages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching helpline messages:', error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Helpline Messages</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-600">Loading messages...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                No messages found.
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-lg transition duration-300 ease-in-out"
                >
                  <h2 className="text-xl font-semibold text-indigo-600 mb-2">{msg.subject}</h2>
                  <p className="text-gray-700 text-sm mb-1">
                    <span className="font-semibold">From:</span> {msg.name}
                  </p>
                  <p className="text-gray-700 text-sm mb-4">{msg.email}</p>
                  <p className="text-gray-600 mb-4">{msg.message}</p>
                  <div className="text-xs text-gray-400 text-right">
                    {new Date(msg.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHelpline;
