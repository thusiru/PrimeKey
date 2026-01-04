import React from "react";

const SearchResults = ({ results }) => {
  if (results === null) {
    return (
      <div className="welcome-message">
        <p>Use the form above to find your perfect home.</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="results-container">
        <p className="no-results">No properties match your criteria.</p>
      </div>
    );
  }

  return (
    <section className="results-container">
      <h2>Results: {results.length} Properties Found</h2>

      <div className="property-grid">
        {results.map((property) => (
          <div key={property.id} className="property-card">
            <img
              src={property.picture}
              alt={property.location}
              className="card-img"
            />

            <div className="card-content">
              <div className="card-header">
                <span className="price">
                  £{property.price.toLocaleString()}
                </span>
                <span className="type-badge">{property.type}</span>
              </div>

              <h3>
                {property.bedrooms} Bed {property.type} for sale
              </h3>
              <p className="location">
                {property.location} ({property.postcode})
              </p>
              <p className="description">
                {property.description.length > 100
                  ? property.description.substring(0, 100) + "..."
                  : property.description}
              </p>

              <a href={`/property/${property.id}`} className="view-btn">
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchResults;
