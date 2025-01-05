import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import propertiesData from '../../public/properties.json';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./styles/PropertyDetails.css";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // useEffect(() => {
  //   const p = propertiesData.find(pr => pr.id === parseInt(id));
  //   setProperty(p);
  // }, [id]);

  // - import propertiesData from '../../public/properties.json';
  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => {
        const p = data.properties.find((pr) => pr.id === id);
        setProperty(p);
      });
  }, [id]);

  if (!property) return <div>Loading...</div>;

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + property.images.length) % property.images.length
    );
  };

  const images = {
    // mainimage: `/img/${id}.jpg`,
    livingroom: `/images/${id}/livingroom.jpg`,
    kitchen: `/images/${id}/kitchen.jpg`,
    bedroom: `/images/${id}/bedroom.jpg`,
    bathroom: `/images/${id}/bathroom.jpg`,
  };

  return (
    <div>
      <header style={{ background: "#333", color: "#fff", padding: "1rem" }}>
        <h1>{property.type}</h1>
      </header>
      <div className="property-details-container">
        <div className="property-details-images">
          <div style={{ textAlign: "center" }}>
            <img
              src={property.picture}
              alt="Property"
              style={{ maxWidth: "400px" }}
            />
          </div>
          <div className="image-navigation">
            <div className="button">
              <button onClick={prevImage}>Prev</button>
              <button onClick={nextImage}>Next</button>
            </div>
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
                src="/images/Hero-img.jpg"
                alt="Floor Plan"
                style={{ maxWidth: "400px" }}
              />
            </TabPanel>
            <TabPanel>
              {/* A Google map iframe showing coordinates */}
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
}
