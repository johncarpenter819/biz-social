import React, { useState, useEffect } from "react";
import "../styles/Post.css";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

function formatDateTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function Post({ post, onDeletePost }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [modalSize, setModalSize] = useState({ width: "80vw", height: "80vh" });

  const imageFiles = post.files?.filter((file) => file.type.startsWith("image/")) || [];

  const [favorites, setFavorites] = useState(() =>
    post.files?.map(() => false) || []
  );

  const [postFavorited, setPostFavorited] = useState(false);
  const [animatingFavoritePost, setAnimatingFavoritePost] = useState(false);
  const [animatingFavorite, setAnimatingFavorite] = useState(null);

  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    type: null,
    imageIdx: null,
  });

  const openModal = (idx) => {
    setCurrentImgIdx(idx);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const showPrev = () =>
    setCurrentImgIdx((idx) => (idx === 0 ? imageFiles.length - 1 : idx - 1));

  const showNext = () =>
    setCurrentImgIdx((idx) => (idx === imageFiles.length - 1 ? 0 : idx + 1));

  const handleFavorite = (idx) => {
    setFavorites((prev) => {
      const newFavs = [...prev];
      newFavs[idx] = !newFavs[idx];
      return newFavs;
    });
    setAnimatingFavorite(idx);
    setTimeout(() => setAnimatingFavorite(null), 600);
  };

  const handleFavoritePost = () => {
    setPostFavorited((prev) => !prev);
    setAnimatingFavoritePost(true);
    setTimeout(() => setAnimatingFavoritePost(false), 600);
  };

  const handleShare = (idx) => {
    const image = imageFiles[idx];
    navigator.clipboard.writeText(image.url);
    alert("Image URL copied to clipboard!");
  };

  const handleSharePost = () => {
    if (imageFiles.length > 0) {
      navigator.clipboard.writeText(imageFiles[0].url);
      alert("First image URL copied to clipboard!");
    } else {
      alert("No images to share.");
    }
  };

  const requestDeletePost = () => {
    setDeleteConfirm({ isOpen: true, type: "post", imageIdx: null });
  };

  const requestDeleteImage = (idx) => {
    setDeleteConfirm({ isOpen: true, type: "image", imageIdx: idx });
  };

  const confirmDelete = () => {
    if (deleteConfirm.type === "post") {
      onDeletePost?.(post.id);
    } else if (deleteConfirm.type === "image") {
      const updatedFiles = [...post.files];
      updatedFiles.splice(deleteConfirm.imageIdx, 1);
      console.log("Deleted image from post:", updatedFiles);
      alert("Image deleted from post. Please refresh or update state accordingly.");
    }
    setDeleteConfirm({ isOpen: false, type: null, imageIdx: null });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, type: null, imageIdx: null });
  };

  useEffect(() => {
    if (!modalOpen || imageFiles.length === 0) return;

    const imgPromises = imageFiles.map(
      (file) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = file.url;
          img.onload = () => {
            resolve({ width: img.naturalWidth, height: img.naturalHeight });
          };
        })
    );

    Promise.all(imgPromises).then((sizes) => {
      const maxWidth = Math.min(Math.max(...sizes.map((s) => s.width)), window.innerWidth * 0.9);
      const maxHeight = Math.min(Math.max(...sizes.map((s) => s.height)), window.innerHeight * 0.9);
      setModalSize({ width: `${maxWidth}px`, height: `${maxHeight}px` });
    });
  }, [modalOpen, imageFiles]);

  return (
    <div className="post-card" style={{ position: "relative" }}>
      <div className="post-top">
        <img
          src={post.user?.avatar || "/img/avatar1.svg"}
          alt="User avatar"
          className="post-avatar"
        />
        <div>
          <div className="post-username">{post.user?.username}</div>
          <div className="post-timestamp">{formatDateTime(post.timestamp)}</div>
        </div>
      </div>

      <div className="post-actions" style={{ position: "absolute", top: "10px", right: "10px" }}>
        <button
          onClick={handleFavoritePost}
          title="Favorite"
          className={`favorite-btn ${postFavorited ? "favorited" : ""} ${
            animatingFavoritePost ? "pop" : ""
          }`}
          aria-label="Favorite post"
        >
          ❤️
        </button>
        <button onClick={handleSharePost} title="Share" aria-label="Share post">
          🔗
        </button>
        <button
          onClick={requestDeletePost}
          title="Delete"
          style={{ color: "red" }}
          aria-label="Delete post"
        >
          🗑️
        </button>
      </div>

      <div className="post-content">
        <p>{post.content}</p>

        {post.files && post.files.length > 0 && (
          <div className="post-files">
            {post.files.map((file, idx) => {
              if (file.type.startsWith("image/")) {
                return (
                  <img
                    key={idx}
                    src={file.url}
                    alt={file.name}
                    onClick={() => openModal(idx)}
                    style={{ cursor: "pointer" }}
                  />
                );
              } else if (file.type.startsWith("video/")) {
                return (
                  <video key={idx} controls>
                    <source src={file.url} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                );
              } else {
                return (
                  <a key={idx} href={file.url} target="_blank" rel="noreferrer">
                    {file.name}
                  </a>
                );
              }
            })}
          </div>
        )}
      </div>

      {modalOpen && imageFiles.length > 0 && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ width: modalSize.width, height: modalSize.height }}
          >
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>

            <button className="modal-prev" onClick={showPrev}>
              &#8592;
            </button>

            <img
              src={imageFiles[currentImgIdx].url}
              alt={imageFiles[currentImgIdx].name}
              className="modal-image"
            />

            <button className="modal-next" onClick={showNext}>
              &#8594;
            </button>

            <div className="modal-actions">
              <button
                onClick={() => handleFavorite(currentImgIdx)}
                title="Favorite"
                className={`favorite-btn ${
                  favorites[currentImgIdx] ? "favorited" : ""
                } ${animatingFavorite === currentImgIdx ? "pop" : ""}`}
                aria-label="Favorite image"
              >
                ❤️
              </button>
              <button
                onClick={() => handleShare(currentImgIdx)}
                title="Share"
                aria-label="Share image"
              >
                🔗
              </button>
              <button
                onClick={() => requestDeleteImage(currentImgIdx)}
                title="Delete"
                style={{ color: "red" }}
                aria-label="Delete image"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={deleteConfirm.isOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message={
          deleteConfirm.type === "post"
            ? "Are you sure you want to delete this post?"
            : "Are you sure you want to delete this image?"
        }
      />
    </div>
  );
}
