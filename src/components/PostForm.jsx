import React, { useState } from "react";
import "../styles/PostForm.css";

export default function PostForm({ onAddPost, currentUser }) {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  console.log("Posting as user:", currentUser); // log here

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim() && files.length === 0) {
      alert("Please add text or attach files.");
      return;
    }

    // Create URLs for all files so they can be previewed/rendered
    const filesWithUrls = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type,
    }));

    const newPost = {
      id: Date.now(),
      content,
      timestamp: new Date().toISOString(),
      files: filesWithUrls,
      user: currentUser || { username: "Unknown user" }, // fallback user if none provided
    };

    onAddPost(newPost);
    setContent("");
    setFiles([]);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
  console.log("Files selected:", selectedFiles);
  setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  e.target.value = null;
};

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        className="post-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows={4}
      />

      {files.length > 0 && (
        <div className="file-preview-list">
          {files.map((file, index) => (
            <div key={index} className="file-preview-item">
              {file.name}
              <button
                type="button"
                className="clear-file-button"
                onClick={() => removeFile(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="post-form-footer">
        <label htmlFor="file-upload" className="file-upload-label">
          📎 Add Files
        </label>
        <input
          type="file"
          id="file-upload"
          className="file-upload-input"
          onChange={handleFileChange}
          accept="image/*,video/*,application/pdf"
          multiple
        />

        <button type="submit" className="post-submit-button">
          Post
        </button>
      </div>
    </form>
  );
}
