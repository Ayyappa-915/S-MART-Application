import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Filters from "../components/Filters";
import ProductGrid from "../components/ProductGrid";
import ProductLineChart from "../components/ProductLineChart";
import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  setCurrentPage
} from "../redux/productSlice";
import "./Products.css";

const Products = () => {
  const dispatch = useDispatch();
  const productsRef = useRef(null);

  const {
    items,
    loading,
    error,
    currentPage,
    productsPerPage
  } = useSelector((state) => state.products);

  const filters = useSelector((state) => state.filters);
  const { category, minPrice, maxPrice, sort, search } = filters;

  const [showFilters, setShowFilters] = useState(true);
  const [showChart, setShowChart] = useState(true);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchStart());
      axios
        .get("https://fakestoreapi.com/products")
        .then((res) => dispatch(fetchSuccess(res.data)))
        .catch((err) => dispatch(fetchFailure(err.message)));
    }
  }, [dispatch, items.length]);

  /* ================= FILTER + SORT ================= */
  const filteredProducts = items
    .filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (minPrice && p.price < Number(minPrice)) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      return 0;
    });

  /* ================= RESET PAGE ON FILTER CHANGE ================= */
  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [category, minPrice, maxPrice, sort, search, dispatch]);

  /* ================= SCROLL TO TOP ON PAGE CHANGE ================= */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (productsRef.current) {
      productsRef.current.scrollTop = 0;
    }

    const scrollElement =
      document.scrollingElement || document.documentElement;

    scrollElement.scrollTop = 0;
  }, [currentPage]);

  /* ================= PAGINATION LOGIC ================= */
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirst,
    indexOfLast
  );

  /* ================= GENERATE PAGE BUTTONS USING FOR LOOP ================= */
  const pageButtons = [];

  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button
        key={i}
        className={currentPage === i ? "active" : ""}
        onClick={() => dispatch(setCurrentPage(i))}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="products-layout">
      {/* ===== SIDEBAR ===== */}
      <div className="sidebar-box">

        <div
          className="sidebar-header"
          onClick={() => setShowFilters(!showFilters)}
        >
          <span>Filters</span>
          {showFilters ? <FiChevronUp /> : <FiChevronDown />}
        </div>

        {showFilters && (
          <div className="sidebar-section">
            <Filters />
          </div>
        )}

        <div
          className="sidebar-header"
          onClick={() => setShowChart(!showChart)}
        >
          <span>Analytics</span>
          {showChart ? <FiChevronUp /> : <FiChevronDown />}
        </div>

        {showChart && !loading && !error && (
          <div className="sidebar-section">
            <ProductLineChart products={currentProducts} />
          </div>
        )}
      </div>

      {/* ===== PRODUCTS ===== */}
      <div className="products-content" ref={productsRef}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <>
            <ProductGrid products={currentProducts} />

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() =>
                    dispatch(setCurrentPage(currentPage - 1))
                  }
                  disabled={currentPage === 1}
                >
                  Prev
                </button>

                {pageButtons}

                <button
                  onClick={() =>
                    dispatch(setCurrentPage(currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
