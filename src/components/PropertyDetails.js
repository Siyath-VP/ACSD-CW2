/**
 * PropertyDetails component fetches and displays detailed information about a property.
 * It includes a gallery of images, property details, and tabs for description, floor plan, and map.
 *
 * @component
 * @example
 * return (
 *   <PropertyDetails />
 * )
 */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./styles/PropertyDetails.css";

/**
 * PropertyDetails component
 *
 * @returns {JSX.Element} The rendered component
 */

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState("mainimage");

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => {
        const p = data.properties.find((pr) => pr.id === id);
        setProperty(p);
      });
  }, [id]);

  if (!property) return <div>Loading...</div>;

  const images = {
    mainimage: `/images/${id}/main.jpg`,
    livingroom: `/images/${id}/livingroom.jpg`,
    kitchen: `/images/${id}/kitchen.jpg`,
    bedroom: `/images/${id}/bedroom.jpg`,
    bathroom: `/images/${id}/bathroom.jpg`,
  };

  const imageLabels = {
    mainimage: "House",
    livingroom: "Living Room",
    kitchen: "Kitchen",
    bedroom: "Bedroom",
    bathroom: "Bathroom",
  };

  return (
    <div>
      <header style={{ background: "#333", color: "#fff", padding: "1rem" }}>
        <h1>{property.type}</h1>
      </header>
      <div className="property-details-container">
        <div className="property-gallery">
          <div className="gallery-main">
            <img
              src={images[selectedImage]}
              alt={imageLabels[selectedImage]}
              className="main-image"
            />
          </div>
          <div className="gallery-thumbnails">
            {Object.entries(images).map(([key, src]) => (
              <div
                key={key}
                className={`thumbnail-container ${
                  selectedImage === key ? "selected" : ""
                }`}
                onClick={() => setSelectedImage(key)}
              >
                <img
                  src={src}
                  alt={imageLabels[key]}
                  className="thumbnail-image"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="property-details-info">
          <h2>£{property.price}</h2>
          <p>Type: {property.type}</p>
          <p>Bedrooms: {property.bedrooms}</p>
          <p>Location: {property.location}</p>
          <Tabs className="property-tabs">
            <TabList>
              <Tab>Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Map</Tab>
            </TabList>

            <TabPanel>
              <p>{property.description}</p>
            </TabPanel>
            <TabPanel>
              <img
                src="/images/floorplans/prop1.jpg"
                alt="Floor Plan"
                style={{ maxWidth: "400px" }}
              />
            </TabPanel>
            <TabPanel>
              <iframe
                title="Property Location"
                width="400"
                height="300"
                style={{ border: 0 }}
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  property.location
                )}&output=embed`}
                allowFullScreen
              ></iframe>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
