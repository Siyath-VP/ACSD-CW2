import React from "react";
import { Link } from "react-router-dom";
import "./styles/PropertyCard.css";

const PropertyCard = ({ property, addFavourite, removeFavourite }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(property));
    };

    return (
        <div
            className="property-card-container"
            draggable={addFavourite ? true : false} // Enable dragging only if addFavourite is passed
            onDragStart={addFavourite ? handleDragStart : undefined}
        >
            <div className="property-image-container">
                <img
                    src={property.picture}
                    alt={property.description}
                    className="property-image"
                />
            </div>
            <div className="property-info">
                <h3 className="property-title">{property.description}</h3>
                <p className="property-location">{property.location}</p>
                <p className="property-price">£{property.price.toLocaleString()}</p>
                <p className="property-details">{property.bedrooms} Bedrooms</p>
                <div className="property-actions">
                    <Link to={`/property/${property.id}`} className="details-link">
                        View Details
                    </Link>
                    {addFavourite && (
                        <button
                            className="favourite-button"
                            onClick={() => addFavourite(property)}
                        >
                            ❤ Favourite
                        </button>
                    )}
                    {removeFavourite && (
                        <button
                            className="remove-button"
                            onClick={() => removeFavourite(property.id)}
                        >
                            ✖ Remove
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
