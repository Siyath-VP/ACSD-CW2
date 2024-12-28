import React, { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import "./styles/PropertyList.css"; // Optional for additional layout styles

export default function PropertyList({ criteria, addFavourite }) {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("/properties.json")
        .then((res) => res.json())
        .then((data) => {
          let results = data;
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
            const afterStr = criteria.dateAfter
                .toISOString()
                .split("T")[0];
            results = results.filter((p) => p.dateAdded >= afterStr);
          }

          if (criteria.dateBefore) {
            const beforeStr = criteria.dateBefore
                .toISOString()
                .split("T")[0];
            results = results.filter((p) => p.dateAdded <= beforeStr);
          }

          if (criteria.postcode && criteria.postcode.trim() !== "") {
            results = results.filter((p) =>
                p.postcode
                    .toUpperCase()
                    .startsWith(criteria.postcode.toUpperCase())
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
            />
        ))}
      </div>
  );
}
