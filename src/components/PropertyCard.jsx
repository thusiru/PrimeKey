import React from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import FavoriteButton from "./FavoriteButton";

const PropertyCard = ({ property, isFavorite, onAddToFav, onDragStart }) => {
  return (
    <div
      className="property-card"
      draggable="true"
      onDragStart={(e) => onDragStart(e, property)}
    >
      <img
        src={property.picture}
        alt={property.location}
        className="card-img"
      />

      <div className="card-content">
        <div className="card-header">
          <span className="price">£{property.price.toLocaleString()}</span>
          <span className="type-badge">{property.type}</span>
        </div>

        <h3>
          {property.bedrooms} Bed {property.type} for sale
        </h3>
        <p className="location">{property.location}</p>

        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              property.description.length > 100
                ? property.description.substring(0, 100) + "..."
                : property.description
            ),
          }}
        />

        <div className="card-actions">
          <Link to={`/property/${property.id}`} className="view-btn">
            View Details
          </Link>
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={() => onAddToFav(property)}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
