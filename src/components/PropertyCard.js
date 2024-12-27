import React from 'react';
import { Link } from 'react-router-dom';

export default function PropertyCard({ property, addFavourite }) {
  const handleAddFavourite = () => {
    addFavourite(property);
  };

  return (
    <div className="property-card"
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify(property));
      }}>
      <img src={`./images/${property.images[0]}`} alt="Property" />
      <div className="info">
        <h3>{property.shortDescription}</h3>
        <p>Price: £{property.price}</p>
        <p>Bedrooms: {property.bedrooms}</p>
        <p>Type: {property.type}</p>
        <p>Postcode: {property.postcode}</p>
        <Link to={`/property/${property.id}`}>View Details</Link>
        <button onClick={handleAddFavourite}>♥ Favourite</button>
      </div>
    </div>
  );
}
