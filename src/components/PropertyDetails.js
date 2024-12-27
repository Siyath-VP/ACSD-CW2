import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import propertiesData from '../data/properties.json';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const p = propertiesData.find(pr => pr.id === parseInt(id));
    setProperty(p);
  }, [id]);

  if (!property) return <div>Loading...</div>;

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + property.images.length) % property.images.length);
  };

  return (
    <div>
      <header style={{ background: '#333', color:'#fff', padding:'1rem' }}>
        <h1>{property.shortDescription}</h1>
      </header>
      <div className="property-details-container">
        <div className="property-details-images">
          <div style={{ textAlign: 'center' }}>
            <img src={`../images/${property.images[currentImageIndex]}`} alt="Property" style={{ maxWidth: '400px' }} />
          </div>
          <div style={{ marginTop: '1rem', textAlign:'center' }}>
            <button onClick={prevImage}>Prev</button>
            <button onClick={nextImage}>Next</button>
          </div>
        </div>
        <div className="property-details-info">
          <h2>£{property.price}</h2>
          <p>Type: {property.type}</p>
          <p>Bedrooms: {property.bedrooms}</p>
          <p>Postcode: {property.postcode}</p>
          <Tabs className="property-tabs">
            <TabList>
              <Tab>Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Map</Tab>
            </TabList>

            <TabPanel>
              <p>{property.longDescription}</p>
            </TabPanel>
            <TabPanel>
              <img src={`../images/${property.floorPlanImage}`} alt="Floor Plan" style={{ maxWidth: '400px' }} />
            </TabPanel>
            <TabPanel>
              {/* A Google map iframe showing coordinates */}
              <iframe
                title="Property Location"
                width="400"
                height="300"
                style={{ border:0 }}
                src={`https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&hl=es;z=14&output=embed`}
                allowFullScreen
              ></iframe>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
