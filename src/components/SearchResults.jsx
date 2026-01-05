import React from "react";
import PropertyCard from "./PropertyCard";

const SearchResults = ({ results, onAddToFav, onDragStart, favorites }) => {
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
        {results.map((property) => {
          const isFav = favorites.some(
            (fav) => String(fav.id) === String(property.id)
          );

          return (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite={isFav}
              onAddToFav={onAddToFav}
              onDragStart={onDragStart}
            />
          );
        })}
      </div>
    </section>
  );
};

export default SearchResults;
