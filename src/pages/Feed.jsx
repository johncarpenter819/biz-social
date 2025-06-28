import React, { useState, useEffect } from "react";
import PostForm from "../components/PostForm";
import Post from "../components/Post";
import { getUser } from "../utils/auth";
import "../styles/Feed.css";

export default function Feed() {
  // Load posts from localStorage initially
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });

  const currentUser = getUser();

  const addPost = (newPost) => {
    setPosts((prevPosts) => {
      const updatedPosts = [newPost, ...prevPosts];
      localStorage.setItem("posts", JSON.stringify(updatedPosts)); // persist
      return updatedPosts;
    });
  };

  // New function to delete a post by ID
  const handleDeletePost = (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.filter((post) => post.id !== postId);
      localStorage.setItem("posts", JSON.stringify(updatedPosts)); // persist
      return updatedPosts;
    });
  };

  return (
    <>
      <div className="feed-container">
        <PostForm onAddPost={addPost} currentUser={currentUser} />
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onDeletePost={handleDeletePost}  // Pass delete handler here
          />
        ))}
      </div>

      <aside className="feed-sidebar">
        <h3>Trending</h3>
        <ul>
          <li>🔥 Company Retreat</li>
          <li>💼 Promotions</li>
          <li>📢 Announcements</li>
        </ul>
      </aside>
    </>
  );
}