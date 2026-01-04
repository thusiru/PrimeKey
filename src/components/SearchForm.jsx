import React, { useState } from "react";
import {
  Combobox,
  DatePicker,
  DropdownList,
  NumberPicker,
} from "react-widgets/cjs";
import "react-widgets/styles.css";
import { Localization } from "react-widgets/cjs";
import { DateLocalizer } from "react-widgets/IntlLocalizer";

const SearchForm = ({ onSearch }) => {
  const defaultValues = {
    type: "Any",
    minPrice: null,
    maxPrice: null,
    minBed: null,
    maxBed: null,
    dateAfter: null,
    dateBefore: null,
    postcode: "",
  };

  const [filters, setFilters] = useState(defaultValues);

  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters(defaultValues);
  };

  return (
    <section className="search-section">
      {/* Header Section */}
      <div className="search-header">
        <h1>Believe in Finding it</h1>
        <h2>with UK's largest choice of homes</h2>
      </div>

      {/* Form Box */}
      <Localization date={new DateLocalizer({ culture: "en-GB" })}>
        <form className="search-box" onSubmit={handleSubmit}>
          <h3>Search Properties to buy</h3>

          <div className="filters-layout">
            {/* FILTER 1: Property Type */}
            <div className="filter-group">
              <label>Type</label>
              <DropdownList
                data={["Any", "House", "Flat"]}
                value={filters.type}
                onChange={(value) => handleChange("type", value)}
              />
            </div>

            {/* FILTER 2: Price Range */}
            <div className="filter-group">
              <label>Price (£)</label>
              <div className="row">
                <NumberPicker
                  format={{ style: "currency", currency: "GBP" }}
                  placeholder="Min"
                  step={10000}
                  min={0}
                  value={filters.minPrice}
                  onChange={(value) => handleChange("minPrice", value)}
                />
                <NumberPicker
                  format={{ style: "currency", currency: "GBP" }}
                  placeholder="Max"
                  step={10000}
                  min={0}
                  value={filters.maxPrice}
                  onChange={(value) => handleChange("maxPrice", value)}
                />
              </div>
            </div>

            {/* FILTER 3: Bedrooms */}
            <div className="filter-group">
              <label>Bedrooms</label>
              <div className="row">
                <NumberPicker
                  placeholder="Min"
                  min={0}
                  max={10}
                  value={filters.minBed}
                  onChange={(value) => handleChange("minBed", value)}
                />
                <NumberPicker
                  placeholder="Max"
                  min={0}
                  max={10}
                  value={filters.maxBed}
                  onChange={(value) => handleChange("maxBed", value)}
                />
              </div>
            </div>

            {/* FILTER 4: Date Added */}
            <div className="filter-group">
              <div className="row">
                <div>
                  <label>Added After</label>
                  <DatePicker
                    placeholder="dd/mm/yy"
                    value={filters.dateAfter}
                    onChange={(value) => handleChange("dateAfter", value)}
                  />
                </div>
                <div>
                  <label>Added Before</label>
                  <DatePicker
                    placeholder="dd/mm/yy"
                    value={filters.dateBefore}
                    onChange={(value) => handleChange("dateBefore", value)}
                  />
                </div>
              </div>
            </div>

            {/* FILTER 5: Postcode */}
            <div className="filter-group">
              <label>Postcode</label>
              <Combobox
                placeholder="e.g. BR1"
                hideCaret
                hideEmptyPopup
                value={filters.postcode}
                onChange={(value) => handleChange("postcode", value)}
              />
            </div>

            <div className="button-group">
              {/* Search Button */}
              <button type="submit" className="search-btn">
                Search
              </button>
              {/* Clear Button */}
              <button type="button" className="clear-btn" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </form>
      </Localization>
    </section>
  );
};

export default SearchForm;
