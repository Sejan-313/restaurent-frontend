import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import styles from './ReviewForm.module.css';

const ReviewForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setMessage('');
    setError('');

    try {
      await axios.post('https://restaurant-backend-11.onrender.com/api/reviews', {
        ...data,
        rating
      });

      setMessage('✅ Review submitted successfully!');
      reset();
      setRating(5);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className={styles.formContainer}>
        <h3 className={styles.reviewTitle}>📝 Leave a Review</h3>

        {message && <div className={styles.successMessage}>{message}</div>}
        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="text-danger small mt-1">{errors.name.message}</p>}
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Your Review"
              rows={4}
              {...register('comment', { required: 'Comment is required' })}
            />
            {errors.comment && <p className="text-danger small mt-1">{errors.comment.message}</p>}
          </div>

          <div className="mb-3 d-flex align-items-center gap-2">
            <label className="me-2">Your Rating:</label>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  color: star <= rating ? '#ffc107' : '#ddd',
                }}
              >
                ★
              </span>
            ))}
          </div>

          <button type="submit" className="btn btn-primary w-100">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
