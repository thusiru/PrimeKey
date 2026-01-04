import React, { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";

const SearchPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/properties.json");

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

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

      if (minBed && properties.bedrooms < minBed) return false;
      if (maxBed && properties.bedrooms > maxBed) return false;

      if (
        postcode &&
        !properties.postcode.toLowerCase().startsWith(postcode.toLowerCase())
      )
        return false;

      const propertyDate = new Date(property.added);
      if (dateAfter && propertyDate < dateAfter) return false;
      if (dateBefore && propertyDate > dateBefore) return false;

      return true;
    });

    setFilteredProperties(results);
  };

  return (
    <main>
      <SearchForm onSearch={handleSearch} />
      <SearchResults results={filteredProperties} />
    </main>
  );
};

export default SearchPage;
