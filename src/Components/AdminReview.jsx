import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/feedback");
        setReviews(response.data.feedback);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/feedback/${id}`);
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">


      {loading ? (
        <p className="text-center text-gray-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border border-gray-300 rounded-lg p-5 shadow hover:shadow-md transition duration-300"
            >
              <div className="mb-2">
                <h2 className="text-xl font-semibold text-indigo-700">{review.category}</h2>
              </div>
              <p className="text-gray-700 mb-4">{review.message}</p>
              <div className="text-sm text-gray-500 mb-4">
                <p><span className="font-medium">By:</span> {review.name}</p>
                <p>{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => handleDelete(review._id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-4 rounded-md transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReview;
