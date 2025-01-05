/**
 * Main App component for the property listing application.
 * Manages state for search criteria, favorites, and sidebar visibility.
 * Renders the Navbar, Routes, and Footer components.
 *
 * @component
 */

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
import PropertyList from "./components/PropertyList";
import FavoritesList from "./components/FavoritesList";
import FavoritesPage from "./components/FavoritesPage";
import PropertyDetails from "./components/PropertyDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FaArrowLeft } from "react-icons/fa";

import "./App.css";

export default function App() {
  // State for search criteria
  const [searchCriteria, setSearchCriteria] = useState({});

  // State for favorite properties
  const [favourites, setFavourites] = useState([]);

  // State to control the visibility of the sidebar
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  /**
   * useEffect hook to load favorites from localStorage when the component mounts.
   * Runs only once due to the empty dependency array.
   */
  useEffect(() => {
    const saved = localStorage.getItem("favourites");
    if (saved) {
      setFavourites(JSON.parse(saved));
    }
  }, []);

  /**
   * Updates the search criteria state with the provided criteria.
   *
   * @param {Object} criteria - The search criteria entered by the user.
   */
  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
  };

  /**
   * Adds a property to the favorites list and updates localStorage.
   *
   * @param {Object} property - The property object to add to favorites.
   */
  const addFavourite = (property) => {
    if (!favourites.find((f) => f.id === property.id)) {
      const updated = [...favourites, property];
      setFavourites(updated);
      localStorage.setItem("favourites", JSON.stringify(updated));
    }
  };

  /**
   * Removes a property from the favorites list by its ID and updates localStorage.
   *
   * @param {number|string} id - The ID of the property to remove.
   */
  const removeFavourite = (id) => {
    const updated = favourites.filter((f) => f.id !== id);
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  /**
   * Clears all properties from the favorites list and updates localStorage.
   */
  const clearFavourites = () => {
    setFavourites([]);
    localStorage.setItem("favourites", "[]");
  };

  /**
   * Toggles the visibility state of the search sidebar.
   */
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  /**
   * Closes the search sidebar by setting its visibility to false.
   */
  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  return (
    <>
      <div className="main-content">
        <div>
          {/* Navbar component with toggleSidebar function passed as prop */}
          <Navbar toggleSidebar={toggleSidebar} />

          {/* Define routes for different pages */}
          <Routes>
            {/* Home route */}
            <Route
              path="/"
              element={
                <div>
                  {/* Search Sidebar */}
                  <div
                    className={`search-section ${
                      isSidebarVisible ? "visible" : ""
                    }`}
                    onDragOver={(e) => e.preventDefault()} // Allow dragging over the sidebar
                    onDrop={(e) => {
                      const data = e.dataTransfer.getData("text/plain");
                      if (data) {
                        const property = JSON.parse(data);
                        addFavourite(property);
                      }
                    }}
                  >
                    {/* Close Sidebar Button */}
                    <FaArrowLeft
                      className="close-button"
                      style={{
                        fontSize: "1.5rem",
                        color: "#007bff",
                        cursor: "pointer",
                        marginBottom: "1rem",
                      }}
                      onClick={closeSidebar}
                    />
                    <h2>Search Criteria</h2>

                    {/* Search Form */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault(); // Prevent page reload
                        const formData = new FormData(e.target);
                        const criteria = {
                          type: formData.get("type"),
                          minPrice: formData.get("minPrice"),
                          maxPrice: formData.get("maxPrice"),
                          minBeds: formData.get("minBeds"),
                          maxBeds: formData.get("maxBeds"),
                          dateAfter: formData.get("dateAfter"),
                          dateBefore: formData.get("dateBefore"),
                          postcode: formData.get("postcode"),
                        };
                        handleSearch(criteria); // Update search criteria
                      }}
                    >
                      <label>Property Type:</label>
                      <select name="type">
                        <option value="">Choose type...</option>
                        <option value="House">House</option>
                        <option value="Flat">Flat</option>
                      </select>

                      <label>Min Price:</label>
                      <input
                        type="number"
                        name="minPrice"
                        placeholder="e.g. 100000"
                      />

                      <label>Max Price:</label>
                      <input
                        type="number"
                        name="maxPrice"
                        placeholder="e.g. 500000"
                      />

                      <label>Min Bedrooms:</label>
                      <input
                        type="number"
                        name="minBeds"
                        placeholder="e.g. 1"
                      />

                      <label>Max Bedrooms:</label>
                      <input
                        type="number"
                        name="maxBeds"
                        placeholder="e.g. 5"
                      />

                      <label>Date After:</label>
                      <input type="date" name="dateAfter" />

                      <label>Date Before:</label>
                      <input type="date" name="dateBefore" />

                      <label>Postcode area:</label>
                      <input
                        type="text"
                        name="postcode"
                        placeholder="e.g. BR1"
                      />

                      <button type="submit">Search</button>
                    </form>

                    {/* Favorites Section in Sidebar */}
                    <div className="favorites-section">
                      <h3>Favourites</h3>
                      {favourites.map((property) => (
                        <div key={property.id} className="favorite-item">
                          <img
                            src={property.picture}
                            alt={property.type}
                            onError={(e) => {
                              e.target.src = "/placeholder-property.jpg"; // Fallback image
                            }}
                          />
                          <div className="favorite-item-content">
                            <div className="favorite-item-title">
                              {property.type}
                            </div>
                            <div className="favorite-item-price">
                              £{property.price.toLocaleString()}
                            </div>
                          </div>
                          <button onClick={() => removeFavourite(property.id)}>
                            Remove
                          </button>
                        </div>
                      ))}
                      {favourites.length > 0 && (
                        <button
                          className="clear-favorites"
                          onClick={clearFavourites}
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Hero Section */}
                  <div
                    className="hero-section"
                    style={{
                      backgroundImage: "url(/images/Hero-img.jpg)",
                    }}
                  >
                    <div className="hero-text">
                      <span>Live where you want,</span>
                      <span>How you want</span>
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div
                    className="main-container"
                    style={{ padding: "2rem", marginTop: "1rem" }}
                  >
                    <div className="results-section">
                      <h2 className="results-heading">Properties</h2>
                      {/* Property List Component */}
                      <PropertyList
                        criteria={searchCriteria}
                        addFavourite={addFavourite}
                      />
                    </div>
                  </div>
                </div>
              }
            />

            {/* Favorites Page Route */}
            <Route
              path="/favorites"
              element={
                <FavoritesPage
                  favourites={favourites}
                  removeFavourite={(id) => {
                    removeFavourite(id);
                  }}
                />
              }
            />

            {/* Property Details Route */}
            <Route path="/property/:id" element={<PropertyDetails />} />
          </Routes>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </>
  );
}
