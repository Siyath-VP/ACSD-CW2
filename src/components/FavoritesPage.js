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
