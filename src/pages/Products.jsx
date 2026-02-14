import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Filters from "../components/Filters";
import ProductGrid from "../components/ProductGrid";
import ProductLineChart from "../components/ProductLineChart";
import {
  fetchStart,
  fetchSuccess,
  fetchFailure
} from "../redux/productSlice";
import "./Products.css";

const Products = () => {
  const dispatch = useDispatch();

  const [showFilters, setShowFilters] = useState(true);
  const [showChart, setShowChart] = useState(true);

  const { items, loading, error } = useSelector(
    (state) => state.products
  );

  const filters = useSelector(
    (state) => state.filters
  );

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchStart());

      axios
        .get("https://fakestoreapi.com/products")
        .then((response) => {
          dispatch(fetchSuccess(response.data));
        })
        .catch((err) => {
          dispatch(fetchFailure(err.message));
        });
    }
  }, [dispatch, items.length]);

  const { category, minPrice, maxPrice, sort, search } = filters;

  const filteredProducts = items
    .filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (minPrice !== "" && p.price < Number(minPrice)) return false;
      if (maxPrice !== "" && p.price > Number(maxPrice)) return false;
      if (
        search &&
        !p.title.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      return 0;
    });

  return (
    <div className="products-layout">

      {/* ===== LEFT BOX (Independent Scroll) ===== */}
      <div className="sidebar-box">

        {/* ===== FILTERS DROPDOWN ===== */}
        <div
          className="sidebar-header"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span>Filters</span>
          <span className="sidebar-icon">
            {showFilters ? (
              <FiChevronUp size={18} />
            ) : (
              <FiChevronDown size={18} />
            )}
          </span>
        </div>

        {showFilters && (
          <div className="sidebar-section">
            <Filters />
          </div>
        )}

        {/* ===== ANALYTICS DROPDOWN ===== */}
        <div
          className="sidebar-header"
          onClick={() => setShowChart(!showChart)}
        >
          <span>Analytics</span>
          <span className="sidebar-icon">
            {showChart ? (
              <FiChevronUp size={18} />
            ) : (
              <FiChevronDown size={18} />
            )}
          </span>
        </div>

        {showChart && (
          <div className="sidebar-section">
            {!loading && !error && (
              <ProductLineChart products={filteredProducts} />
            )}
          </div>
        )}

      </div>

      {/* ===== PRODUCTS (Separate Scroll) ===== */}
      <div className="products-content">
        {loading && <p>Loading products...</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <ProductGrid products={filteredProducts} />
        )}
      </div>

    </div>
  );
};

export default Products;
