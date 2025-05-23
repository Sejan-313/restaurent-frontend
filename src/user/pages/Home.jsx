import React from 'react';
import Menu from '../components/Menu';
import Reviews from '../components/Reviews';
import ReviewForm from '../components/ReviewForm';

const Home = () => {
  return (
    <div>
      <Menu />
      <hr />
      <Reviews />
      <ReviewForm />
    </div>
  );
};

export default Home;
