import React from "react";
import { Link } from "react-router-dom";

const links = [
  { title: "Home", path: "/" },
  { title: "Movies", path: "/movies" },
  { title: "Admin", path: "/admin" },
];

const Navigation = () => {
  return (
    <nav>
      <ul className="list-group">
        {links.map((link) => (
          <li key={link.title} className="list-group-item">
            <Link to={link.path}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
