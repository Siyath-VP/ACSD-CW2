import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
// import properties from '../../public/properties.json';
import './styles/SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    // if (location.state?.searchCriteria) {
    //   const { type, minPrice, maxPrice, minBedrooms, maxBedrooms, postcode } = location.state.searchCriteria;

    //   const filtered = properties.properties.filter((property) => {
    //     return (
    //       (!type || type === 'Any' || property.type === type) &&
    //       (!minPrice || property.price >= Number(minPrice)) &&
    //       (!maxPrice || property.price <= Number(maxPrice)) &&
    //       (!minBedrooms || property.bedrooms >= Number(minBedrooms)) &&
    //       (!maxBedrooms || property.bedrooms <= Number(maxBedrooms)) &&
    //       (!postcode || property.location.toLowerCase().includes(postcode.toLowerCase()))
    //     );
    //   });

    //   setFilteredProperties(filtered);
    // }

    if (location.state?.searchCriteria) {
      fetch('/properties.json')
        .then(res => res.json())
        .then(data => {
          const { type, minPrice, maxPrice, minBedrooms, maxBedrooms, postcode } = location.state.searchCriteria;
          const filtered = data.filter(property => {
            
            return (
              (!type || type === 'Any' || property.type === type) &&
              (!minPrice || property.price >= Number(minPrice)) &&
              (!maxPrice || property.price <= Number(maxPrice)) &&
              (!minBedrooms || property.bedrooms >= Number(minBedrooms)) &&
              (!maxBedrooms || property.bedrooms <= Number(maxBedrooms)) &&
              (!postcode || property.location.toLowerCase().includes(postcode.toLowerCase()))
            );

          });
          setFilteredProperties(filtered);
        });
    }

  }, [location.state]);

  return (
    <div className="results-container">
      <h1>Search Results</h1>
      {filteredProperties.length > 0 ? (
        <div className="results-grid">
          {filteredProperties.map((property) => (
            <div key={property.id} className="property-card">
              <img src={property.picture} alt={property.description} />
              <h2>{property.type}</h2>
              <p>{property.location}</p>
              <p>Price: £{property.price.toLocaleString()}</p>
              <Link to={`/properties/${property.id}`} className="details-link">
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No properties found matching your criteria.</p>
      )}
    </div>
  );
};

export default SearchResults;