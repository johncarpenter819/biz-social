// Feed.jsx
import React, { useState } from "react";
import PostForm from "../components/PostForm";
import Post from "../components/Post";
import { getUser } from "../utils/auth";  // <-- import getUser

export default function Feed() {
  const [posts, setPosts] = useState([]);

  // get current user once when rendering Feed
  const currentUser = getUser();

  const addPost = (post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  return (
    <div className="feed-container">
      {/* pass currentUser here */}
      <PostForm onAddPost={addPost} currentUser={currentUser} />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
