import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategory,
  setSort,
  setMinPrice,
  setMaxPrice,
  resetFilters
} from "../redux/filterSlice";
import "./Filters.css";

const Filters = ({ onApply }) => {
  const dispatch = useDispatch();

  // 🔥 Get global filters from Redux
  const filters = useSelector((state) => state.filters);

  // 🔥 Local state for Apply button behavior
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (e) => {
    setLocalFilters({
      ...localFilters,
      [e.target.name]: e.target.value
    });
  };

  const handleApply = () => {
    dispatch(setCategory(localFilters.category));
    dispatch(setSort(localFilters.sort));
    dispatch(setMinPrice(localFilters.minPrice));
    dispatch(setMaxPrice(localFilters.maxPrice));

    if (onApply) onApply();
  };

  const handleReset = () => {
    dispatch(resetFilters());
    if (onApply) onApply();
  };

  return (
    <div className="fk-filters">

      <div className="fk-section">
        <label>Category</label>
        <select
          name="category"
          value={localFilters.category}
          onChange={handleChange}
        >
          <option value="all">All</option>
          <option value="electronics">electronics</option>
          <option value="jewelery">jewelery</option>
          <option value="men's clothing">men's clothing</option>
          <option value="women's clothing">women's clothing</option>
        </select>
      </div>

      <div className="fk-section">
        <label>Sort By</label>
        <select
          name="sort"
          value={localFilters.sort}
          onChange={handleChange}
        >
          <option value="">Relevance</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>

      <div className="fk-section">
        <label>Price Range</label>
        <div className="price-range">
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            value={localFilters.minPrice}
            onChange={handleChange}
          />
          <span>-</span>
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            value={localFilters.maxPrice}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="filter-buttons">
        <button className="apply-btn" onClick={handleApply}>
          Apply
        </button>

        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filters;
