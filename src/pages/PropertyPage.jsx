import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropertyGallery from "../components/PropertyGallery";
import PropertyInfo from "../components/PropertyInfo";
import PropertyTabs from "../components/PropertyTabs";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("properties.json");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        const found = data.properties.find((p) => p.id === id);
        if (found) setProperty(found);
      } catch (err) {
        console.error("Error loading properties: ", err);
      }
    };

    fetchProperties();
  }, [id]);

  if (!property)
    return <main className="loading">Loading property details...</main>;

  return (
    <main>
      <div className="property-page-container">
        <div className="property-hero">
          <PropertyGallery images={property.images} />
          <PropertyInfo property={property} />
        </div>
        <PropertyTabs property={property} />
      </div>
    </main>
  );
};

export default PropertyPage;
