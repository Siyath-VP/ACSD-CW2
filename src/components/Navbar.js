/**
 * Navbar component that displays a navigation bar with links and a toggle button.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.toggleSidebar - Function to toggle the sidebar.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 */

import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav>
      <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>FindR</div>
      <ul>
        <li>
          <button onClick={toggleSidebar}>
            <FaSearch />
          </button>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="#footer">Contact us</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
