import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaLinkedin,
  FaGithub,
  FaGoogleDrive,
  FaApple,
  FaFacebookF,
  FaInstagram,
  FaCamera,
  FaHandPaper,
  FaCog,
} from "react-icons/fa";
import Post from "../components/Post";
import "../styles/Profile.css";

const DEFAULT_BANNER = "/img/default-banner.jpg";
const DEFAULT_AVATAR = "/img/avatar1.svg";

const socialLinks = [
  { href: "https://linkedin.com", icon: <FaLinkedin />, name: "linkedin" },
  { href: "https://github.com", icon: <FaGithub />, name: "github" },
  { href: "https://drive.google.com", icon: <FaGoogleDrive />, name: "google-drive" },
  { href: "https://www.icloud.com", icon: <FaApple />, name: "icloud" },
  { href: "https://facebook.com", icon: <FaFacebookF />, name: "facebook" },
  { href: "https://instagram.com", icon: <FaInstagram />, name: "instagram" },
];

export default function Profile() {
  const { username } = useParams();
  const [banner, setBanner] = useState(DEFAULT_BANNER);
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [bgPosition, setBgPosition] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [isDragMode, setIsDragMode] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [posts, setPosts] = useState([]);

  // New state for color picker
  const [primaryColor, setPrimaryColor] = useState("#a084ca"); // default purple
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = allUsers.find((u) => u.username === username);
    setUserDetails(user);
    if (user?.avatar) setAvatar(user.avatar);

    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const userPosts = savedPosts.filter((post) => post.user.username === username);
    setPosts(userPosts);
  }, [username]);

  const handleMouseDown = (e) => {
    if (!isDragMode) return;
    setDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!dragging || !startPos) return;
    e.preventDefault();
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;

    setBgPosition((pos) => {
      let newX = pos.x + (deltaX / window.innerWidth) * 100;
      let newY = pos.y + (deltaY / 250) * 100;
      newX = Math.min(100, Math.max(0, newX));
      newY = Math.min(100, Math.max(0, newY));
      return { x: newX, y: newY };
    });

    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDragging(false);
    setStartPos(null);
  };

  const toggleDragMode = () => setIsDragMode((prev) => !prev);

  // Toggle color picker visibility
  const toggleColorPicker = () => setShowColorPicker((v) => !v);

  // Handle primary color change from color picker
  const handleColorChange = (e) => {
    setPrimaryColor(e.target.value);
  };

  const bannerStyle = {
    backgroundImage: `url(${banner})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: `${bgPosition.x}% ${bgPosition.y}%`,
    height: "250px",
    cursor: isDragMode ? (dragging ? "grabbing" : "grab") : "default",
    userSelect: "none",
    position: "relative",
    transition: "background-position 0.3s ease",
  };

  const handleDeletePost = (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedAllPosts = allPosts.filter((post) => post.id !== postId);
    localStorage.setItem("posts", JSON.stringify(updatedAllPosts));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setAvatar(base64);

      const allUsers = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = allUsers.map((u) =>
        u.username === username ? { ...u, avatar: base64 } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="profile-page" style={{ "--primary": primaryColor }}>
      <div
        className="profile-banner"
        style={bannerStyle}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="banner-controls">
          <input
            type="file"
            accept="image/*"
            id="banner-upload"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setBanner(url);
                setBgPosition({ x: 50, y: 50 });
              }
            }}
          />
          <button
            className="edit-banner-icon"
            title="Edit Banner"
            onClick={() => document.getElementById("banner-upload").click()}
          >
            <FaCamera />
          </button>
          <button
            className={`drag-toggle-button ${isDragMode ? "active" : ""}`}
            onClick={toggleDragMode}
            title="Toggle Drag Mode"
          >
            <FaHandPaper />
          </button>

          {/* Gear cog button */}
          <button
            className="gear-button"
            title="Change Theme Color"
            onClick={toggleColorPicker}
            aria-label="Toggle theme color picker"
          >
            <FaCog />
          </button>

          {/* Color picker */}
          {showColorPicker && (
            <input
              type="color"
              className="color-picker"
              value={primaryColor}
              onChange={handleColorChange}
              aria-label="Pick theme primary color"
            />
          )}
        </div>

        <div className="avatar-orbit-wrapper">
          <label className="avatar-wrapper" title="Click to change profile picture">
            <img
              src={avatar}
              alt={`${username} avatar`}
              className="profile-avatar"
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </label>
          <div className="social-links-orbit">
            {socialLinks.map(({ href, icon, name }, idx) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="orbit-icon"
                style={{ "--angle": `${(idx / socialLinks.length) * 360}deg` }}
                aria-label={name}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="user-details">
        <h3>
          {userDetails?.firstName} {userDetails?.lastName}
        </h3>
        <ul>
          <li>
            <strong>Username:</strong> {userDetails?.username}
          </li>
          <li>
            <strong>Email:</strong> {userDetails?.email}
          </li>
          <li>
            <strong>Phone:</strong> {userDetails?.phone}
          </li>
          <li>
            <strong>Address:</strong> {userDetails?.address}
          </li>
          <li>
            <strong>Birthday:</strong> {userDetails?.birthday}
          </li>
        </ul>
      </div>

      <div className="user-posts" style={{ maxWidth: 900, margin: "2rem auto" }}>
        <h3>{username}&apos;s Posts</h3>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <Post key={post.id} post={post} onDeletePost={handleDeletePost} />
          ))
        )}
      </div>
    </div>
  );
}
