import React, { useState } from "react";
import MenuForm from "./MenuForm";

const MenuManager = ({ menuItems, fetchData, setMessage }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Open add/edit form
  const openForm = (item = null) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  // Delete menu item
  const deleteMenuItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) return;

    try {
      await fetch(`https://restaurant-backend-11.onrender.com/api/menu/${id}`, { method: "DELETE" });
      setMessage("Menu item deleted!");
      fetchData();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete menu item");
    }
  };

  return (
    <div>
      <button className="btn btn-success mb-3" onClick={() => openForm(null)}>
        + Add New Menu Item
      </button>

      <div className="row">
        {menuItems.length === 0 && <p>No menu items found.</p>}
        {menuItems.map((item) => (
          <div key={item._id} className="col-md-4 mb-4">
            <div className="card">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text"><strong>Price:</strong> ${item.price}</p>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => openForm(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteMenuItem(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeForm}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 8,
              width: "90%",
              maxWidth: 600,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <MenuForm
              existingItem={editingItem}
              onSuccess={() => {
                fetchData();
                closeForm();
              }}
            />
            <button className="btn btn-secondary mt-3" onClick={closeForm}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManager;
