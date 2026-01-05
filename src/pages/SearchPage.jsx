import React, { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import FavoritesList from "../components/FavoritesList";

const SearchPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState(null);

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("primekey_favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("primekey_favorites", JSON.stringify(favorites));
  }, [favorites]);

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

  const handleToggleFavorite = (property) => {
    const exists = favorites.some((fav) => fav.id === property.id);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.id !== property.id));
    } else {
      setFavorites([...favorites, property]);
    }
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
          onAddToFav={handleToggleFavorite}
          onDragStart={handleDragFromResult}
          favorites={favorites}
        />
      </div>
      <FavoritesList
        favorites={favorites}
        onClear={clearFavorites}
        onRemove={removeFromFavorites}
        onDragStart={handleDragFromFav}
        allowDrop={allowDrop}
        onDrop={(e) => {
          e.stopPropagation();
          handleDropOnSidebar(e);
        }}
      />
    </main>
  );
};

export default SearchPage;
