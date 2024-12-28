import React, { useState, useRef, useEffect } from "react";
import "./InfiniteScrollList.css"; // Import the CSS file

const InfiniteScrollList = () => {
  const [items, setItems] = useState([
    { text: "Form", id: "form", type: "Form", required: false },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    text: "",
    id: "",
    type: "",
    required: false,
  });
  const [modalTitle, setModalTitle] = useState(""); // New state for modal title
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
          type: "Text",
          required: false,
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleOpenModal = (item = null, title = "Delete Item") => {
    setSelectedItem(item);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const handleCreateNewItem = () => {
    setEditFormData({ text: "", id: "", type: "Text", required: false });
    setModalTitle("Add New Item");
    setIsModalOpen(true);
  };

  const handleAddNewItem = () => {
    if (editFormData.text.trim()) {
      setItems((prevItems) => [...prevItems, { ...editFormData, id: Date.now().toString() }]);
      setIsModalOpen(false); // Close modal after adding new item
    }
  };

  const handleDeleteItem = () => {
    if (selectedItem !== null) {
      setItems((prevItems) => prevItems.filter((item) => item !== selectedItem));
      setIsModalOpen(false); // Close modal after deletion
    }
  };

  const handleOpenEditModal = (item) => {
    setSelectedItem(item);
    const { text, id, type, required } = item;
    setEditFormData({ text, id, type, required });
    setModalTitle(`Edit ${type} Item`); // Set the modal title dynamically
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedItem(null);
  };

  const handleSaveEdit = () => {
    if (selectedItem !== null) {
      const updatedItems = items.map(item =>
        item === selectedItem ? { ...editFormData } : item
      );
      setItems(updatedItems);
      setIsEditModalOpen(false);
    }
  };

  const handleMouseEnter = (item) => {
    setHoveredIndex(items.indexOf(item));
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const handleDragStart = (item) => {
    setDraggedIndex(items.indexOf(item));
  };

  const handleDragOver = (item) => {
    if (items.indexOf(item) !== draggedIndex) {
      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(draggedIndex, 1);
      updatedItems.splice(items.indexOf(item), 0, draggedItem);
      setItems(updatedItems);
      setDraggedIndex(items.indexOf(item));
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleConvertToJSON = () => {
    const json = JSON.stringify(items, null, 2);
    alert(json); // Show JSON in a popup
  };

  const toggleShowAttributes = () => {
    setShowAttributes((prev) => !prev);
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
      <button onClick={toggleShowAttributes}>
        {showAttributes ? "Hide Attributes" : "Show All Attributes"}
      </button>
      <button onClick={handleConvertToJSON}>Convert to JSON</button>
      <button onClick={handleCreateNewItem} className="btn btn-add">
        ➕ Add New Item
      </button>

      <ul className="item-list">
        {items.map((item) => (
          <li
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(item)}
            onDragOver={(e) => {
              e.preventDefault();
              handleDragOver(item);
            }}
            onDragEnd={handleDragEnd}
            className={`list-item ${hoveredIndex === items.indexOf(item) ? "hovered" : ""}`}
            onMouseEnter={() => handleMouseEnter(item)}
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
                <p>Type: {item.type}</p>
                <p>ID: {item.id}</p>
                <p>Required: {item.required ? "Yes" : "No"}</p>
              </div>
            )}
            {hoveredIndex === items.indexOf(item) && (
              <div className="action-buttons">
                <span onClick={() => handleOpenEditModal(item)}>✏️</span>
                <span onClick={() => handleOpenModal(item)}>🗑️</span> {/* Show Delete modal */}
              </div>
            )}
          </li>
        ))}
      </ul>
      {isLoading && <p className="loading-text">Loading...</p>}
      <div ref={loaderRef} className="loader-placeholder" />

      {isModalOpen && (
        <div className="modal">
          <h3>{modalTitle}</h3>
          {modalTitle === "Delete Item" ? (
            <div>
              <p>Are you sure you want to delete this item?</p>
              <button onClick={handleDeleteItem} className="btn btn-delete">
                Delete
              </button>
              <button onClick={handleCloseModal} className="btn btn-cancel">
                Cancel
              </button>
            </div>
          ) : (
            <>
              <label>
                Element Type:
                <select
                  onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                  value={editFormData.type}
                  className="dropdown-select"
                >
                  <option value="Text">Text Input</option>
                  <option value="Textarea">Text Area</option>
                  <option value="Number">Number Input</option>
                  {/* Add more options as needed */}
                </select>
              </label>
              <label>
                Text:
                <input
                  type="text"
                  value={editFormData.text}
                  onChange={(e) => setEditFormData({ ...editFormData, text: e.target.value })}
                  className="edit-input"
                />
              </label>
              <label>
                Id:
                <input
                  type="text"
                  value={editFormData.id}
                  onChange={(e) => setEditFormData({ ...editFormData, id: e.target.value })}
                  className="edit-input"
                />
              </label>
              <label>
                Required:
                <input
                  type="checkbox"
                  checked={editFormData.required}
                  onChange={(e) => setEditFormData({ ...editFormData, required: e.target.checked })}
                />
              </label>
              <button onClick={handleAddNewItem} className="btn btn-add">
                Add
              </button>
              <button onClick={handleCloseModal} className="btn btn-cancel">
                Cancel
              </button>
            </>
          )}
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal">
          <h3>{modalTitle}</h3> {/* Use modalTitle state */}
          <label>
            Text:
            <input
              type="text"
              value={editFormData.text}
              onChange={(e) => setEditFormData({ ...editFormData, text: e.target.value })}
              className="edit-input"
            />
          </label>
          <label>
            Id:
            <input
              type="text"
              value={editFormData.id}
              onChange={(e) => setEditFormData({ ...editFormData, id: e.target.value })}
              className="edit-input"
            />
          </label>
          <label>
            Required:
            <input
              type="checkbox"
              checked={editFormData.required}
              onChange={(e) => setEditFormData({ ...editFormData, required: e.target.checked })}
            />
          </label>
          <button onClick={handleSaveEdit} className="btn btn-save">
            Save
          </button>
          <button onClick={handleCloseEditModal} className="btn btn-cancel">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollList;
