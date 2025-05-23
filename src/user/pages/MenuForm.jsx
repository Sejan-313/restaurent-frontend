import React, { useState } from 'react';
import axios from 'axios';

const MenuForm = ({ existingItem, onSuccess }) => {
  const [name, setName] = useState(existingItem?.name || '');
  const [description, setDescription] = useState(existingItem?.description || '');
  const [price, setPrice] = useState(existingItem?.price || '');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    if (image) formData.append('image', image); // multer expects field 'image'

    try {
      const url = existingItem
        ? `https://restaurant-backend-8.onrender.com/api/menu/${existingItem._id}`
        : 'https://restaurant-backend-8.onrender.com/api/menu';

      const method = existingItem ? 'put' : 'post';

      const res = await axios[method](url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('✅ Menu item saved successfully!');
      if (onSuccess) onSuccess(res.data);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to save menu item');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h3>{existingItem ? 'Update Menu Item' : 'Add Menu Item'}</h3>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name:</label>
          <input
            required
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Price:</label>
          <input
            required
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Preview selected image */}
        {image && (
          <div className="mb-3">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ width: '100%', maxHeight: '250px', objectFit: 'cover', borderRadius: '8px' }}
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          {existingItem ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default MenuForm;
