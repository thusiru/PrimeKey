import { Button, DatePicker, Input, InputNumber, Select, Space } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";

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
    console.log(field, value);
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

  const currencyFormatter = (value) => {
    if (value) {
      const [start, end] = `${value}`.split(".") || [];
      const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return `£ ${end ? `${v}.${end}` : `${v}`}`;
    } else return undefined;
  };

  const dateFormat = "DD/MM/YYYY";

  return (
    <section className="search-section">
      <div className="search-header">
        <h1>Believe in Finding it</h1>
        <h2>with UK's largest choice of homes</h2>
      </div>

      <form className="search-box" onSubmit={handleSubmit}>
        <h3>Search Properties to buy</h3>

        <Space vertical size="large">
          <Space wrap size="large">
            <Space.Compact vertical>
              <label>Type</label>
              <Select
                value={filters.type}
                onChange={(value) => handleChange("type", value)}
                placeholder="Select Type"
                options={[
                  { value: "Any", label: "Any" },
                  { value: "House", lable: "House" },
                  { value: "Flat", label: "Flat" },
                ]}
              />
            </Space.Compact>

            <Space.Compact vertical>
              <label>Price (£)</label>
              <Space>
                <InputNumber
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(value) => handleChange("minPrice", value)}
                  formatter={currencyFormatter}
                  parser={(value) => value?.replace(/£\s?|(,*)/g, "")}
                  changeOnWheel
                  min={0}
                  max={filters.maxPrice || 100000000}
                />
                <InputNumber
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(value) => handleChange("maxPrice", value)}
                  formatter={currencyFormatter}
                  parser={(value) => value?.replace(/£\s?|(,*)/g, "")}
                  changeOnWheel
                  min={filters.minPrice || 0}
                  max={100000000}
                />
              </Space>
            </Space.Compact>

            <Space.Compact vertical>
              <label>Bedrooms</label>
              <Space>
                <InputNumber
                  placeholder="Min"
                  value={filters.minBed}
                  onChange={(value) => handleChange("minBed", value)}
                  changeOnWheel
                  min={0}
                  max={filters.maxBed || 100}
                />
                <InputNumber
                  placeholder="Max"
                  value={filters.maxBed}
                  onChange={(value) => handleChange("maxBed", value)}
                  changeOnWheel
                  min={filters.minBed || 0}
                  max={100}
                />
              </Space>
            </Space.Compact>

            <Space.Compact vertical>
              <label>Date Added</label>
              <Space>
                <DatePicker
                  format={dateFormat}
                  placeholder="After"
                  value={filters.dateAfter ? dayjs(filters.dateAfter) : null}
                  onChange={(date) =>
                    handleChange("dateAfter", date ? date.toDate() : null)
                  }
                  minDate={dayjs("2000-01-01")}
                  maxDate={
                    filters.dateBefore ? dayjs(filters.dateBefore) : dayjs()
                  }
                />
                <DatePicker
                  format={dateFormat}
                  placeholder="Before"
                  value={filters.dateBefore ? dayjs(filters.dateBefore) : null}
                  onChange={(date) =>
                    handleChange("dateBefore", date ? date.toDate() : null)
                  }
                  minDate={
                    filters.dateAfter
                      ? dayjs(filters.dateAfter)
                      : dayjs("2000-01-01")
                  }
                  maxDate={dayjs()}
                />
              </Space>
            </Space.Compact>

            <Space.Compact vertical>
              <label>Postcode</label>
              <Input
                placeholder="e.g. BR1"
                value={filters.postcode}
                onChange={(e) => handleChange("postcode", e.target.value)}
              />
            </Space.Compact>
          </Space>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
              size="large"
            >
              Search
            </Button>
            <Button
              icon={<ClearOutlined />}
              size="large"
              danger
              onClick={handleClear}
            >
              Clear
            </Button>
          </Space>
        </Space>
      </form>
    </section>
  );
};

export default SearchForm;
