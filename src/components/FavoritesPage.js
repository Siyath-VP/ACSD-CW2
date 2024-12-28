import React, { useState, useEffect } from "react";
import FavoritesList from "./FavoritesList";

const FavoritesPage = () => {
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("favourites");
        if (saved) {
            setFavourites(JSON.parse(saved));
        }
    }, []);

    const removeFavourite = (id) => {
        const updated = favourites.filter((f) => f.id !== id);
        setFavourites(updated);
        localStorage.setItem("favourites", JSON.stringify(updated));
    };

    const clearFavourites = () => {
        setFavourites([]);
        localStorage.setItem("favourites", "[]");
    };

    return (
        <div
            style={{
                padding: "2rem",
                minHeight: "calc(100vh - 6rem)", // Adjust for navbar and footer
            }}
        >
            <h2>Favorites</h2>
            <FavoritesList
                favourites={favourites}
                removeFavourite={removeFavourite}
                clearFavourites={clearFavourites}
            />
        </div>
    );
};

export default FavoritesPage;
