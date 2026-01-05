import React, { useState } from "react";
import DOMPurify from "dompurify";
import FavoriteButton from "./FavoriteButton";

const PropertyInfo = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(() => {
    const saved = localStorage.getItem("primekey_favorites");
    const favorites = saved ? JSON.parse(saved) : [];
    return favorites.some((fav) => fav.id === property.id);
  });

  const handleToggleFavorite = () => {
    const saved = localStorage.getItem("primekey_favorites");
    let favorites = saved ? JSON.parse(saved) : [];

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.id !== property.id);
      setIsFavorite(false);
    } else {
      favorites.push(property);
      setIsFavorite(true);
    }

    localStorage.setItem("primekey_favorites", JSON.stringify(favorites));
  };

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
        <button className="contact-btn">Contact Agent</button>
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={handleToggleFavorite}
        />
      </div>
    </div>
  );
};

export default PropertyInfo;
