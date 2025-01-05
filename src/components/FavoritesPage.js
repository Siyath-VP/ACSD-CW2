/**
 * FavoritesPage component displays a list of favorite properties.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.favourites - Array of favorite properties.
 * @param {Function} props.removeFavourite - Function to remove a property from favorites.
 *
 * @returns {JSX.Element} The rendered component.
 */

// Import necessary modules and components
import React from "react";
import PropertyCard from "./PropertyCard";
import "./styles/FavoritesPage.css";

const FavoritesPage = ({ favourites, removeFavourite }) => {
  return (
    <div className="favorites-page-container">
      <h2>My Favourites</h2>
      <div className="favorites-list">
        {favourites.length > 0 ? (
          favourites.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              removeFavourite={removeFavourite} // Pass removeFavourite
            />
          ))
        ) : (
          <p>No favourites added yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
