import React, { useState } from "react";
import { Tab } from "@headlessui/react";

import { CheckCircle, Trash2 } from "lucide-react";

const dummyTherapists = [
  { id: 1, name: "Dr. Jane Doe", type: "Therapist", isVerified: false },
  { id: 2, name: "Dr. Alex Carter", type: "Clinical Psychologist", isVerified: true },
];

const dummyResources = [
  { id: 1, title: "Mindfulness Guide", category: "Articles" },
  { id: 2, title: "Stress Management Tips", category: "Videos" },
];

const dummyReviews = [
  { id: 1, user: "Sarah", message: "Amazing session!", rating: 5 },
  { id: 2, user: "Tom", message: "Helpful advice, thanks!", rating: 4 },
];

const AdminDashboard = () => {
  const [therapists, setTherapists] = useState(dummyTherapists);
  const [resources, setResources] = useState(dummyResources);
  const [reviews, setReviews] = useState(dummyReviews);

  const verifyTherapist = (id) => {
    setTherapists(prev =>
      prev.map(t => t.id === id ? { ...t, isVerified: true } : t)
    );
  };

  const deleteReview = (id) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Admin Dashboard</h1>

      <Tabs>
        <Tab.List className="flex space-x-4 border-b mb-6">
          <Tab className={({ selected }) =>
            selected ? "px-4 py-2 text-white bg-blue-600 rounded-t" : "px-4 py-2 bg-blue-100 rounded-t"
          }>
            Therapists
          </Tab>
          <Tab className={({ selected }) =>
            selected ? "px-4 py-2 text-white bg-blue-600 rounded-t" : "px-4 py-2 bg-blue-100 rounded-t"
          }>
            Resources
          </Tab>
          <Tab className={({ selected }) =>
            selected ? "px-4 py-2 text-white bg-blue-600 rounded-t" : "px-4 py-2 bg-blue-100 rounded-t"
          }>
            Reviews
          </Tab>
        </Tab.List>

        <Tab.Panels>
          {/* Therapists Panel */}
          <Tab.Panel>
            <div className="grid md:grid-cols-2 gap-4">
              {therapists.map(t => (
                <div key={t.id} className="p-4 border rounded-lg shadow">
                  <h2 className="text-xl font-semibold">{t.name}</h2>
                  <p className="text-gray-600">{t.type}</p>
                  <div className="mt-2">
                    {t.isVerified ? (
                      <span className="text-green-600 font-medium flex items-center gap-1">
                        <CheckCircle size={18} /> Verified
                      </span>
                    ) : (
                      <button
                        onClick={() => verifyTherapist(t.id)}
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                      >
                        Verify
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>

          {/* Resources Panel */}
          <Tab.Panel>
            <div className="grid md:grid-cols-2 gap-4">
              {resources.map(r => (
                <div key={r.id} className="p-4 border rounded-lg shadow">
                  <h2 className="text-lg font-semibold">{r.title}</h2>
                  <p className="text-gray-600">{r.category}</p>
                  <button className="text-red-600 text-sm mt-2 hover:underline">
                    Delete Resource
                  </button>
                </div>
              ))}
            </div>
          </Tab.Panel>

          {/* Reviews Panel */}
          <Tab.Panel>
            <div className="grid md:grid-cols-2 gap-4">
              {reviews.map(r => (
                <div key={r.id} className="p-4 border rounded-lg shadow">
                  <p className="text-lg font-medium">"{r.message}"</p>
                  <p className="text-gray-600">- {r.user}</p>
                  <p className="text-yellow-500">Rating: {r.rating} ⭐</p>
                  <button
                    onClick={() => deleteReview(r.id)}
                    className="text-red-600 text-sm mt-2 flex items-center gap-1 hover:underline"
                  >
                    <Trash2 size={16} /> Delete Review
                  </button>
                </div>
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
