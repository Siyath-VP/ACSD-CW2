/**
 * PropertyList component fetches and displays a list of properties based on the given criteria.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.criteria - The criteria for filtering properties.
 * @param {string} [props.criteria.type] - The type of property (e.g., "house", "apartment").
 * @param {number} [props.criteria.minPrice] - The minimum price of the property.
 * @param {number} [props.criteria.maxPrice] - The maximum price of the property.
 * @param {number} [props.criteria.minBeds] - The minimum number of bedrooms.
 * @param {number} [props.criteria.maxBeds] - The maximum number of bedrooms.
 * @param {Date} [props.criteria.dateAfter] - The date after which the property was added.
 * @param {Date} [props.criteria.dateBefore] - The date before which the property was added.
 * @param {string} [props.criteria.postcode] - The postcode to filter properties by.
 * @param {Function} props.addFavourite - The function to add a property to favourites.
 *
 * @returns {JSX.Element} The rendered component.
 */

import React, { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import "./styles/PropertyList.css";

export default function PropertyList({ criteria, addFavourite }) {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => {
        let results = data.properties;
        if (criteria.type && criteria.type !== "") {
          results = results.filter((p) => p.type === criteria.type);
        }

        if (criteria.minPrice) {
          results = results.filter(
            (p) => p.price >= parseInt(criteria.minPrice)
          );
        }

        if (criteria.maxPrice) {
          results = results.filter(
            (p) => p.price <= parseInt(criteria.maxPrice)
          );
        }

        if (criteria.minBeds) {
          results = results.filter(
            (p) => p.bedrooms >= parseInt(criteria.minBeds)
          );
        }

        if (criteria.maxBeds) {
          results = results.filter(
            (p) => p.bedrooms <= parseInt(criteria.maxBeds)
          );
        }

        if (criteria.dateAfter) {
          const afterStr = criteria.dateAfter.toISOString().split("T")[0];
          results = results.filter((p) => p.dateAdded >= afterStr);
        }

        if (criteria.dateBefore) {
          const beforeStr = criteria.dateBefore.toISOString().split("T")[0];
          results = results.filter((p) => p.dateAdded <= beforeStr);
        }

        if (criteria.postcode && criteria.postcode.trim() !== "") {
          results = results.filter((p) =>
            p.postcode.toUpperCase().startsWith(criteria.postcode.toUpperCase())
          );
        }
        setFiltered(results);
      });
  }, [criteria]);

  return (
    <div className="property-list">
      {filtered.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          addFavourite={addFavourite}
          draggable // Makes the card draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("text/plain", JSON.stringify(property))
          }
        />
      ))}
    </div>
  );
}
