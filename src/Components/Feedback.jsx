
import React, { useState } from "react";

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    category: "Website",
    message: "",
  });

  const [reviews, setReviews] = useState([]); // Store reviews
  const [visibleReviews, setVisibleReviews] = useState(5); // "Load More" control
  const [editingIndex, setEditingIndex] = useState(null); // Track editing review
  const [editMessage, setEditMessage] = useState(""); // Temporary edit text

  // Handle input changes
  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  // Submit a new review
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.message.trim()) {
      alert("Feedback message cannot be empty.");
      return;
    }

    const newReview = {
      name: feedback.name || "Anonymous",
      category: feedback.category,
      message: feedback.message,
      date: new Date().toLocaleDateString(),
    };

    setReviews([newReview, ...reviews]); // Add new review at the top
    setFeedback({ name: "", category: "Website", message: "" }); // Reset form
  };

  // Delete a review
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter((_, i) => i !== index)); // Remove review
    }
  };

  // Start editing a review
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditMessage(reviews[index].message);
  };

  // Save edited review
  const handleSaveEdit = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].message = editMessage;
    setReviews(updatedReviews);
    setEditingIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Page Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-500">Share Your Experience</h2>
        <p className="text-lg text-gray-600 mt-2">
          Your feedback helps us improve and provide better support.
        </p>
      </div>

      {/* Feedback Form */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name (Optional)"
            value={feedback.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <select
            name="category"
            value={feedback.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-gray-50"
          >
            <option value="Website">Website Experience</option>
            <option value="Resources">Resources Feedback</option>
            <option value="Therapist">Therapist Review</option>
            <option value="Psychologist">Psychologist Review</option>
            <option value="Counselor">Counselor Review</option>
          </select>

          <textarea
            name="message"
            placeholder="Share your experience..."
            value={feedback.message}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            rows="5"
          ></textarea>

          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg">
            Submit Feedback
          </button>
        </form>
      </div>

      {/* Display Reviews */}
      <div className="max-w-3xl mx-auto mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">What People Are Saying</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No feedback yet. Be the first to share your experience!</p>
        ) : (
          <div className="space-y-4">
            {reviews.slice(0, visibleReviews).map((review, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-blue-500">{review.name}</h4>
                <p className="text-sm text-gray-500">{review.category} | {review.date}</p>

                {/* Edit Mode */}
                {editingIndex === index ? (
                  <div>
                    <textarea
                      className="w-full p-2 border rounded-lg mt-2"
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                    ></textarea>
                    <button
                      onClick={() => handleSaveEdit(index)}
                      className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingIndex(null)}
                      className="ml-2 px-3 py-1 bg-gray-500 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-700 mt-2">{review.message}</p>
                )}

                {/* Edit & Delete Buttons */}
                <div className="mt-3">
                  {editingIndex === index ? null : (
                    <>
                      <button
                        onClick={() => handleEdit(index)}
                        className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Reviews Button */}
        {visibleReviews < reviews.length && (
          <button
            onClick={() => setVisibleReviews((prev) => prev + 5)}
            className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg"
          >
            Load More Reviews
          </button>
        )}
      </div>
    </div>
  );
};

export default Feedback;
