import React from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { username } = useParams();
  return <div><h2>@{username}'s Profile</h2></div>;
}
