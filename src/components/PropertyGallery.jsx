import React, { useState } from "react";

const PropertyGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="gallery-section">
      <div className="main-image-container">
        <img src={mainImage} alt="Main view" className="main-image" />
      </div>
      <div className="thumbnail-grid">
        {images.map((img, index) => (
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
  );
};

export default PropertyGallery;
