import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminDashboard.module.css";
import MenuManager from "./MenuManager"; // import new component

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("menu");
  const [menuItems, setMenuItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch menu & reviews
  const fetchData = async () => {
    try {
      setLoading(true);
      const menuRes = await axios.get("https://restaurant-backend-w42j.onrender.com/api/menu");
      const reviewRes = await axios.get(
        "https://restaurant-backend-w42j.onrender.com/api/reviews/admin/all"
      );
      setMenuItems(menuRes.data);
      setReviews(reviewRes.data);
      setLoading(false);
    } catch (err) {
      setMessage("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Toggle review approval
  const toggleApproval = async (id) => {
    try {
      await axios.put(`https://restaurant-backend-w42j.onrender.com/api/reviews/admin/toggle/${id}`);
      setMessage("Review approval status updated!");
      fetchData();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Failed to update review");
    }
  };

  // Delete review
  const deleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await axios.delete(`https://restaurant-backend-w42j.onrender.com/api/reviews/${id}`);
      setMessage("Review deleted!");
      fetchData();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Failed to delete review");
    }
  };

  return (
    <div>
      {/* Sidebar */}
      <nav className={styles.sidebar}>
        <a
          className={`${styles.navLink} ${activeTab === "menu" ? styles.active : ""}`}
          onClick={() => setActiveTab("menu")}
        >
          🍽️ Manage Menu
        </a>
        <a
          className={`${styles.navLink} ${activeTab === "reviews" ? styles.active : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          ⭐ Manage Reviews
        </a>
      </nav>

      {/* Main content */}
      <main className={styles.mainContent}>
        <h2 className="mb-4">Admin Dashboard</h2>
        {message && <div className="alert alert-info text-center mb-4">{message}</div>}

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status"></div>
            <div>Loading...</div>
          </div>
        ) : activeTab === "menu" ? (
          <MenuManager
            menuItems={menuItems}
            setMenuItems={setMenuItems}
            fetchData={fetchData}
            setMessage={setMessage}
          />
        ) : (
          <>
            {/* Reviews List */}
            <div className="row">
              {reviews.length === 0 && <p>No reviews available.</p>}
              {reviews.map((rev) => (
                <div key={rev._id} className="col-md-6 col-sm-12 mb-3">
                  <div className={styles.reviewCard}>
                    <h5>{rev.name}</h5>
                    <p>{rev.comment}</p>
                    <p className="text-warning">⭐ {rev.rating}/5</p>
                    <div className={styles.reviewButtons}>
                      <button
                        className={`btn btn-sm ${rev.approved ? "btn-danger" : "btn-success"}`}
                        onClick={() => toggleApproval(rev._id)}
                      >
                        {rev.approved ? "Unapprove ❌" : "Approve ✅"}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteReview(rev._id)}
                      >
                        Delete 🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
