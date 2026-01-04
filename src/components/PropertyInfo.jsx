import React from "react";
import DOMPurify from "dompurify";

const PropertyInfo = ({ property }) => {
  return (
    <div className="info-section">
      <h1>
        {property.bedrooms} Bed {property.type} in {property.location}
      </h1>
      <h2 className="price-tag">£{property.price.toLocaleString()}</h2>
      <p className="address">
        {property.location}, {property.postcode}
      </p>

      {/* Short Description with Safety */}
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
        <button className="contact-btn">Contact Agent</button>
        {/* You can add your actual 'Add to Fav' button here later */}
        <button className="fav-btn-secondary">Add to Favorites</button>
      </div>
    </div>
  );
};

export default PropertyInfo;
