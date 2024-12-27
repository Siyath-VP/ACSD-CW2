import React, { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
import PropertyList from "./components/PropertyList";
import FavoritesList from "./components/FavoritesList";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./components/styles/App.css";

function Navbar({ toggleSidebar }) {
  return (
    <nav style={navbarStyle}>
      <div style={titleStyle}>FindR</div>
      <ul style={navListStyle}>
        <li>
          <button onClick={toggleSidebar} style={iconButtonStyle}>
            <FaSearch />
          </button>
        </li>
        <li>
          <a href="#" style={linkStyle}>
            Sell
          </a>
        </li>
        <li>
          <a href="#search" style={linkStyle}>
            Contact us
          </a>
        </li>
        <li>
          <a href="#favorites" style={linkStyle}>
            Favorites
          </a>
        </li>
        {/* <Link to={"/search"}>
          <SearchResults /> Search
        </Link> */}
      </ul>
    </nav>
  );
}

const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.5rem 1rem",
  background: "#333",
  color: "#fff",
};

const titleStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
};

const navListStyle = {
  listStyle: "none",
  display: "flex",
  gap: "1rem",
  margin: 0,
  padding: 0,
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
};

const iconButtonStyle = {
  background: "none",
  border: "none",
  color: "#fff",
  fontSize: "1.5rem",
  cursor: "pointer",
};

const sidebarStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "300px",
  height: "100%",
  background: "#ffffff",
  boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
  transform: "translateX(-100%)",
  transition: "transform 0.3s ease-in-out",
  zIndex: 1000,
  overflowY: "auto",
};

const sidebarVisibleStyle = {
  transform: "translateX(0)",
};

// const closeIconStyle = {
//   position: "absolute",
//   top: "10px",
//   right: "10px",
//   fontSize: "1.5rem",
//   color: "#333",
//   cursor: "pointer",
// };

// const heroSectionStyle = {
//   backgroundImage: "url(/images/c0cf7472da8dd51db46dcc4339c8f421.jpg)",
//   color: "#fff",
//   textAlign: "center",
//   padding: "3rem 1rem",
//   fontSize: "1.5rem",
//   fontWeight: "bold",
//   marginBottom: "2rem", // Adjust spacing
// };

export default function App() {
  const [searchCriteria, setSearchCriteria] = useState({});
  const [favourites, setFavourites] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Load favourites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favourites");
    if (saved) {
      setFavourites(JSON.parse(saved));
    }
  }, []);

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
  };

  const addFavourite = (property) => {
    if (!favourites.find((f) => f.id === property.id)) {
      const updated = [...favourites, property];
      setFavourites(updated);
      localStorage.setItem("favourites", JSON.stringify(updated));
    }
  };

  const removeFavourite = (id) => {
    const updated = favourites.filter((f) => f.id !== id);
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  const clearFavourites = () => {
    setFavourites([]);
    localStorage.setItem("favourites", "[]");
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      <div
        // style={{
        //   ...sidebarStyle,
        //   ...(isSidebarVisible ? sidebarVisibleStyle : {}),
        // }}
        className={`search-section ${isSidebarVisible ? "visible" : ""}`}
      >
        <FaArrowLeft
          className="close-button"
          // style={closeIconStyle}
          onClick={closeSidebar}
        />
        <h2>Search Criteria</h2>
        <SearchForm onSearch={handleSearch} />
        <div className="favorites-section">
          <h3>Favourites</h3>
          <FavoritesList
            favourites={favourites}
            removeFavourite={removeFavourite}
            clearFavourites={clearFavourites}
            addFavourite={addFavourite}
          />
        </div>
        <div
          style={{
            marginTop: "2rem",
            border: "1px solid #ccc",
            padding: "1rem",
            background: "#fdf1f1",
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const data = e.dataTransfer.getData("text/plain");
            if (data) {
              const prop = JSON.parse(data);
              // If this property is in favourites, remove it.
              removeFavourite(prop.id);
            }
          }}
        >
          <h3>Drag here to remove from favourites</h3>
        </div>
      </div>
      <div
        className="hero-section"
        style={{
          backgroundImage: "url(/images/c0cf7472da8dd51db46dcc4339c8f421.jpg)",
          height: "500px",
          width: "100%",
        }}
      >
        Live where you want, How you want.
      </div>
      <div
        className="main-container"
        style={{ padding: "2rem", marginTop: "1rem" }}
      >
        <div
          className="results-section"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
          <h2>Results</h2>
          <PropertyList criteria={searchCriteria} addFavourite={addFavourite} />
        </div>
      </div>
      <footer
        style={{
          textAlign: "center",
          padding: "1rem",
          background: "#333",
          color: "#fff",
          marginTop: "2rem",
        }}
      >
        &copy; 2024 Property Finder
      </footer>
    </div>
  );
}
