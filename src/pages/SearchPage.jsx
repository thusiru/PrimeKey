import React, { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("properties.json");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setProperties(data.properties);
      } catch (err) {
        console.error("Error loading properties: ", err);
      }
    };

    fetchProperties();
  }, []);

  const handleSearch = (filters) => {
    const {
      type,
      minPrice,
      maxPrice,
      minBed,
      maxBed,
      dateAfter,
      dateBefore,
      postcode,
    } = filters;

    const results = properties.filter((property) => {
      if (type && type !== "Any" && property.type !== type) return false;

      if (minPrice && property.price < minPrice) return false;
      if (maxPrice && property.price > maxPrice) return false;

      if (minBed && property.bedrooms < minBed) return false;
      if (maxBed && property.bedrooms > maxBed) return false;

      if (
        postcode &&
        !property.location.toLowerCase().includes(postcode.toLowerCase())
      ) {
        return false;
      }

      const dateString = `${property.added.month} ${property.added.day}, ${property.added.year}`;
      const propertyDate = new Date(dateString);
      if (dateAfter && propertyDate < dateAfter) return false;
      if (dateBefore && propertyDate > dateBefore) return false;

      return true;
    });

    setFilteredProperties(results);
  };

  const addToFavorites = (property) => {
    const exists = favorites.some((fav) => fav.id === property.id);
    if (!exists) setFavorites([...favorites, property]);
    else alert("Property is already in favorites!");
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const handleDragFromResult = (e, property) => {
    e.dataTransfer.setData("type", "ADD_FAV");
    e.dataTransfer.setData("propId", property.id);
  };

  const handleDragFromFav = (e, id) => {
    e.dataTransfer.setData("type", "REMOVE_FAV");
    e.dataTransfer.setData("propId", id);
  };

  const allowDrop = (e) => e.preventDefault();

  const handleDropOnSidebar = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const propId = e.dataTransfer.getData("propId");

    if (type === "ADD_FAV") {
      const property = properties.find((p) => p.id === propId);
      if (property) {
        addToFavorites(property);
      }
    }
  };

  const handleDropOnMain = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    const propId = e.dataTransfer.getData("propId");

    if (type === "REMOVE_FAV") {
      removeFromFavorites(propId);
    }
  };

  return (
    <main
      className="page-layout"
      onDragOver={allowDrop}
      onDrop={handleDropOnMain}
    >
      <div className="main-content">
        <SearchForm onSearch={handleSearch} />
        <SearchResults
          results={filteredProperties}
          onAddToFav={addToFavorites}
          onDragStart={handleDragFromResult}
        />
      </div>
      <aside
        className="favorites-sidebar"
        onDragOver={allowDrop} // Essential to allow dropping
        onDrop={(e) => {
          e.stopPropagation(); // Stop the 'Main Area' drop from firing
          handleDropOnSidebar(e);
        }}
      >
        <div className="fav-header">
          <h3>❤️ Favorites</h3>
          {favorites.length > 0 && (
            <button onClick={clearFavorites} className="btn-clear">
              Clear
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="fav-placeholder">
            <p>Drag properties here to save</p>
          </div>
        ) : (
          <ul className="fav-list">
            {favorites.map((fav) => (
              <li
                key={fav.id}
                className="fav-item"
                draggable="true"
                onDragStart={(e) => handleDragFromFav(e, fav.id)}
              >
                <Link to={`/property/${fav.id}`} className="fav-link">
                  <img src={fav.picture} alt="thumb" />
                  <div className="fav-info">
                    <h4>£{fav.price.toLocaleString()}</h4>
                    <p>{fav.type}</p>
                  </div>
                </Link>

                <button
                  className="btn-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromFavorites(fav.id);
                  }}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </main>
  );
};

export default SearchPage;
