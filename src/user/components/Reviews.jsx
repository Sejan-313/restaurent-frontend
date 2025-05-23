import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Reviews.module.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get('https://restaurant-backend-w42j.onrender.com/api/reviews');
        setReviews(res.data);
      } catch (err) {
        setError('Failed to load reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading reviews...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">⭐ Customer Reviews</h2>
      <div className="row">
        {reviews.map((rev) => (
          <div key={rev._id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className={`p-4 ${styles.reviewCard}`}>
              <div className="d-flex align-items-center mb-2">
                <img
                  src={rev.avatar || 'https://i.pravatar.cc/100?img=3'}
                  alt="avatar"
                  className={styles.avatar}
                />
                <span className={styles.reviewerName}>{rev.name}</span>
              </div>
              <p className={styles.commentText}>"{rev.comment}"</p>
              <p className={styles.starRating}>⭐ {rev.rating}/5</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
