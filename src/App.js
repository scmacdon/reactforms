import React, { useState, useRef, useEffect } from "react";
import "./InfiniteScrollList.css"; // Import the CSS file

const InfiniteScrollList = () => {
  const [items, setItems] = useState([
    { text: "Form", id: "form", required: false },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
    text: "",
    id: "",
    required: false,
  });
  const loaderRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [showAttributes, setShowAttributes] = useState(false);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      loadMoreItems();
    }
  };

  const loadMoreItems = () => {
    if (isLoading) return; // Prevent duplicate loading
    setIsLoading(true);

    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        {
          text: `Text Element ${prevItems.length + 1}`,
          id: "",
          required: false,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleAddNewItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        text: `Text Element ${prevItems.length + 1}`,
        id: "",
        required: false,
      },
    ]);
    setIsModalOpen(false);
  };

  const handleDeleteItem = () => {
    if (selectedIndex !== null) {
      setItems((prevItems) => prevItems.filter((_, index) => index !== selectedIndex));
      setIsModalOpen(false);
    }
  };

  const handleOpenModal = (index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (index) => {
    setSelectedIndex(index);
    const { text, id, required } = items[index];
    setEditFormData({ text, id, required });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIndex(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedIndex(null);
  };

  const handleSaveEdit = () => {
    if (selectedIndex !== null) {
      const updatedItems = [...items];
      updatedItems[selectedIndex] = { ...editFormData };
      setItems(updatedItems);
      setIsEditModalOpen(false);
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index) => {
    if (index !== draggedIndex) {
      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(draggedIndex, 1);
      updatedItems.splice(index, 0, draggedItem);
      setItems(updatedItems);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleConvertToJSON = () => {
    const json = JSON.stringify(items, null, 2);
    alert(json); // Show JSON in a popup
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loaderRef.current]);

  return (
    <div className="infinite-scroll-container">
      <button onClick={() => setShowAttributes(!showAttributes)}>
        {showAttributes ? "Hide Attributes" : "Show All Attributes"}
      </button>
      <button onClick={handleConvertToJSON}>Convert to JSON</button>

      <ul className="item-list">
        {items.map((item, index) => (
          <li
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => {
              e.preventDefault();
              handleDragOver(index);
            }}
            onDragEnd={handleDragEnd}
            className={`list-item ${hoveredIndex === index ? "hovered" : ""}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <input
              type="text"
              value={item.text}
              id={item.id}
              required={item.required}
              readOnly
              className="item-input"
            />
            {showAttributes && (
              <div className="item-attributes">
                <p>ID: {item.id}</p>
                <p>Required: {item.required ? "Yes" : "No"}</p>
              </div>
            )}
            {hoveredIndex === index && (
              <div className="action-buttons">
                <span onClick={() => handleOpenEditModal(index)}>✏️</span>
                <span onClick={() => handleOpenModal(index)}>⚙️</span>
              </div>
            )}
          </li>
        ))}
      </ul>
      {isLoading && <p className="loading-text">Loading...</p>}
      <div ref={loaderRef} className="loader-placeholder" />

      {isModalOpen && (
        <div className="modal">
          <h3>Manage Item</h3>
          <button onClick={handleAddNewItem} className="btn btn-add">Add New Item</button>
          <button onClick={handleDeleteItem} className="btn btn-delete">Delete</button>
          <button onClick={handleCloseModal} className="btn btn-cancel">Cancel</button>
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal">
          <h3>Edit Item</h3>
          <label>
            Text:
            <input
              type="text"
              value={editFormData.text}
              onChange={(e) =>
                setEditFormData({ ...editFormData, text: e.target.value })
              }
              className="edit-input"
            />
          </label>
          <label>
            Id:
            <input
              type="text"
              value={editFormData.id}
              onChange={(e) =>
                setEditFormData({ ...editFormData, id: e.target.value })
              }
              className="edit-input"
            />
          </label>
          <label>
            Required:
            <input
              type="checkbox"
              checked={editFormData.required}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  required: e.target.checked,
                })
              }
            />
          </label>
          <button onClick={handleSaveEdit} className="btn btn-save">Save</button>
          <button onClick={handleCloseEditModal} className="btn btn-cancel">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollList;
