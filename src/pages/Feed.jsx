import React, { useState } from "react";
import PostForm from "../components/PostForm";
import Post from "../components/Post";
import { getUser } from "../utils/auth";
import "../styles/Feed.css";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const currentUser = getUser();

  const addPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <>
      <div className="feed-container">
        <PostForm onAddPost={addPost} currentUser={currentUser} />
        {posts.map((post) => (
          <Post key={post.id} post={post} />
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
