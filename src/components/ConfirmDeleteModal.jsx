// components/ConfirmDeleteModal.jsx
import React from "react";
import "../styles/ConfirmDeleteModal.css"

export default function ConfirmDeleteModal({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content delete-confirmation">
        <p>{message || "Are you sure you want to delete this post?"}</p>
        <div className="modal-buttons">
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
