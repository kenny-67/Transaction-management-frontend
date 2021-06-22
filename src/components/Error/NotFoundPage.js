import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  let path;

  if (user.isAdmin) {
    path = `/admin`;
  } else {
    path = `/employee`;
  }
  return (
    <div>
      page not found <Link to={path}>go home</Link>
    </div>
  );
}

export default NotFoundPage;
