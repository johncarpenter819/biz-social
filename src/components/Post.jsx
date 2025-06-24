// Post.jsx
import React from "react";

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
    <div className="post">
      <div className="post-header" style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
        {post.user?.username || "Unknown user"}
      </div>
      <p>{post.content}</p>

      {post.files && post.files.length > 0 && (
        <div className="post-files">
          {post.files.map((file, idx) => {
            // Show images and videos inline, otherwise show file name as link
            if (file.type.startsWith("image/")) {
              return <img key={idx} src={file.url} alt={file.name} style={{ maxWidth: "100%", marginTop: "0.5rem" }} />;
            } else if (file.type.startsWith("video/")) {
              return (
                <video key={idx} controls style={{ maxWidth: "100%", marginTop: "0.5rem" }}>
                  <source src={file.url} type={file.type} />
                  Your browser does not support the video tag.
                </video>
              );
            } else {
              return (
                <a key={idx} href={file.url} target="_blank" rel="noreferrer" style={{ display: "block", marginTop: "0.5rem" }}>
                  {file.name}
                </a>
              );
            }
          })}
        </div>
      )}

      <small style={{ color: "#555", fontSize: "0.85rem", marginTop: "0.5rem", display: "block" }}>
        Posted on {formatDateTime(post.timestamp)}
      </small>
    </div>
  );
}
