import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import DOMPurify from "dompurify";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/properties.json");

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        const found = data.properties.find((p) => p.id === id);
        if (found) {
          setProperty(found);
          setMainImage(found.images[0]);
        }
      } catch (err) {
        console.error("Error loading properties: ", err);
      }
    };

    fetchProperties();
  }, [id]);

  if (!property)
    return <div className="loading">Loading property details...</div>;

  return (
    <main>
      <div className="property-page-container">
        <div className="property-hero">
          <div className="gallery-section">
            <div className="main-image-container">
              <img src={mainImage} alt="Main view" className="main-image" />
            </div>
            <div className="thumbnail-grid">
              {property.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className={`thumbnail ${mainImage === img ? "active" : ""}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          <div className="info-section">
            <h1>
              {property.bedrooms} Bed {property.type} in {property.location}
            </h1>
            <h2 className="price-tag">£{property.price.toLocaleString()}</h2>
            <p className="address">
              {property.location}, {property.postcode}
            </p>
            <div
              className="short-desc"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  property.description.length > 150
                    ? property.description.substring(0, 150) + "..."
                    : property.description
                ),
              }}
            />
            <div>
              <button className="contact-btn">Contact Agent</button>
              <div>Add to favorites</div>
            </div>
          </div>
        </div>

        <div className="details-tabs">
          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Map</Tab>
            </TabList>

            <TabPanel>
              <div className="tab-content">
                <h3>Property Description</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(property.description),
                  }}
                />
              </div>
            </TabPanel>

            <TabPanel>
              <div className="tab-content">
                <h3>Floor Plan</h3>
                <img
                  src={property.floorPlan}
                  alt="Floor Plan"
                  className="floor-plan-img"
                />
              </div>
            </TabPanel>

            <TabPanel>
              <div className="tab-content">
                <h3>Location</h3>
                <iframe
                  src={property.mapUrl}
                  width="100%"
                  height="400"
                  className="map-frame"
                  allowFullScreen=""
                  loading="lazy"
                  title="Google Map"
                ></iframe>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default PropertyPage;
