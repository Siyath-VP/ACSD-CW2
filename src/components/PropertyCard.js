import React from "react";
import { Link } from "react-router-dom";
import "./styles/PropertyCard.css"; // New styles file for better organization

const PropertyCard = ({ property, addFavourite }) => {
    return (
        <div className="property-card-container">
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
                    <button
                        className="favourite-button"
                        onClick={() => addFavourite(property)}
                    >
                        ❤ Favourite
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
