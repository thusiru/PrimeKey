import React, { useState } from "react";
import DOMPurify from "dompurify";
import FavoriteButton from "./FavoriteButton";

const PropertyInfo = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
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

      <div className="action-buttons">
        <button className="contact-btn">Buy</button>
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={() => setIsFavorite(!isFavorite)}
        />
      </div>
    </div>
  );
};

export default PropertyInfo;
