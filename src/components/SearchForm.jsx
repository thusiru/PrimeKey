import React from "react";
import {
  Combobox,
  DatePicker,
  DropdownList,
  NumberPicker,
} from "react-widgets/cjs";
import "react-widgets/styles.css";
import { Localization } from "react-widgets/cjs";
import { DateLocalizer } from "react-widgets/IntlLocalizer";

const SearchForm = () => {
  return (
    <section className="search-section">
      {/* Header Section */}
      <div className="search-header">
        <h1>Believe in Finding it</h1>
        <h2>with Sri Lanka's largest choice of homes</h2>
      </div>

      {/* Form Box */}
      <Localization date={new DateLocalizer({ culture: "en-GB" })}>
        <form className="search-box">
          <h3>Search Properties to buy</h3>

          <div className="filters-layout">
            {/* FILTER 1: Property Type */}
            <div className="filter-group">
              <label>Type</label>
              <DropdownList
                data={["Any", "House", "Flat"]}
                defaultValue="Any"
              />
            </div>

            {/* FILTER 2: Price Range */}
            <div className="filter-group">
              <label>Price (£)</label>
              <div className="row">
                <NumberPicker
                  format={{ style: "currency", currency: "LKR" }}
                  placeholder="Min"
                  step={10000}
                  min={0}
                />
                <NumberPicker
                  format={{ style: "currency", currency: "LKR" }}
                  placeholder="Max"
                  step={10000}
                  min={0}
                />
              </div>
            </div>

            {/* FILTER 3: Bedrooms */}
            <div className="filter-group">
              <label>Bedrooms</label>
              <div className="row">
                <NumberPicker placeholder="Min" min={0} max={10} />
                <NumberPicker placeholder="Max" min={0} max={10} />
              </div>
            </div>

            {/* FILTER 4: Date Added */}
            <div className="filter-group">
              <label>Date Added</label>
              <div className="row">
                <DatePicker placeholder="m/dd/yy" />
                <DatePicker placeholder="m/dd/yy" />
              </div>
            </div>

            {/* FILTER 5: Postcode */}
            <div className="filter-group">
              <label>Postcode</label>
              <Combobox placeholder="e.g. BR1" hideCaret hideEmptyPopup />
            </div>

            <div className="button-group">
              {/* Search Button */}
              <button type="submit" className="search-btn">
                Search
              </button>
              {/* Clear Button */}
              <button type="reset" className="clear-btn">
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
