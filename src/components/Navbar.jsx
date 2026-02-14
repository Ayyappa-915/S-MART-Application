import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearch } from "../redux/filterSlice";
import Filters from "../components/Filters";
import ProductLineChart from "../components/ProductLineChart";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const dispatch = useDispatch();

  /* Redux State */
  const cartCount = useSelector((state) => state.cart.items.length);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const search = useSelector((state) => state.filters.search);
  const { items } = useSelector((state) => state.products);
  const filters = useSelector((state) => state.filters);

  /* Prevent Background Scroll */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  /* Filter Logic */
  const { category, minPrice, maxPrice, sort } = filters;

  const filteredProducts = items
    .filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (minPrice !== "" && p.price < Number(minPrice)) return false;
      if (maxPrice !== "" && p.price > Number(maxPrice)) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      return 0;
    });

  const navItems = [
    { path: "/products", label: "Products" },
    { path: "/wishlist", label: `Wishlist (${wishlistCount})` },
    { path: "/cart", label: `Cart (${cartCount})` },
    { path: "/login", label: "Login" },
    { path: "/register", label: "Register" }
  ];

  return (
    <nav className="navbar">

      {/* ===== DESKTOP ===== */}
      <div className="desktop-nav">
        <div className="logo">S-MART Application</div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for Products..."
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
        </div>

        <div className="nav-links">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className="nav-link">
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="mobile-nav">
        <div className="mobile-logo">S-MART Application</div>

        <div className="mobile-search-row">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />

          <div className="hamburger" onClick={() => setMenuOpen(true)}>
            <FaBars size={24} />
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div
        className={`overlay ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* ===== SIDE DRAWER ===== */}
      <div className={`side-drawer ${menuOpen ? "open" : ""}`}>

        <div className="drawer-header">
          <span>Menu</span>
          <button onClick={() => setMenuOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMenuOpen(false)}
            className="drawer-link"
          >
            {item.label}
          </NavLink>
        ))}

        {/* ===== FILTER DROPDOWN ===== */}
        <div className="drawer-section">
          <div
            className="drawer-section-header"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span>Filters</span>
            <span className="drawer-icon">
              {showFilters ? (
                <FiChevronUp size={18} />
              ) : (
                <FiChevronDown size={18} />
              )}
            </span>
          </div>

          {showFilters && (
            <div className="drawer-section-content">
              <Filters onApply={() => setMenuOpen(false)} />
            </div>
          )}
        </div>

        {/* ===== ANALYTICS DROPDOWN ===== */}
        <div className="drawer-section">
          <div
            className="drawer-section-header"
            onClick={() => setShowChart(!showChart)}
          >
            <span>Analytics</span>
            <span className="drawer-icon">
              {showChart ? (
                <FiChevronUp size={18} />
              ) : (
                <FiChevronDown size={18} />
              )}
            </span>
          </div>

          {showChart && (
            <div className="drawer-section-content">
              <ProductLineChart products={filteredProducts} />
            </div>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
