import React from "react";

export default function FavoritesList({
  favourites,
  removeFavourite,
  clearFavourites,
  addFavourite,
}) {
  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (data) {
      const prop = JSON.parse(data);
      addFavourite(prop);
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        className="favorites-list"
        onDragOver={allowDrop}
        onDrop={handleDrop}
      >
        {favourites.map((f) => (
          <div
            className="fav-item"
            key={f.id}
            draggable={true}
            onDragStart={(e) =>
              e.dataTransfer.setData("text/plain", JSON.stringify(f))
            }
          >
            {f.description}
            <button onClick={() => removeFavourite(f.id)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={clearFavourites}>Clear All</button>
    </div>
  );
}
