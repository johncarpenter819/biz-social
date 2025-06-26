import React from "react";
import "../styles/Post.css";

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

export default function Post({ post }) {
  return (
    <div className="post-card">
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

      <div className="post-content">
        <p>{post.content}</p>

        {post.files && post.files.length > 0 && (
          <div className="post-files">
            {post.files.map((file, idx) => {
              if (file.type.startsWith("image/")) {
                return <img key={idx} src={file.url} alt={file.name} />;
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
    </div>
  );
}
