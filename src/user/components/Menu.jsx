import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Menu.module.css';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('https://restaurant-backend-8.onrender.com/api/menu');
        setMenu(res.data);
      } catch (err) {
        setError('Failed to load menu. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading menu...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🍽️ Our Menu</h2>
      <div className="row">
        {menu.map((item) => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={item._id}>
            <div className={`card ${styles.menuCard}`}>
              <img
                src={item.image}
                className={`card-img-top ${styles.menuImage}`}
                alt={item.name}
              />
              <div className="card-body">
                <h5 className={`card-title ${styles.menuTitle}`}>{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className={`card-text ${styles.menuPrice}`}>₹{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
