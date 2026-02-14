import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import "./Wishlist.css";

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  if (wishlistItems.length === 0) {
    return <div className="empty-page">
        <h1>Your wishlist is empty...</h1>
    </div>;
  }

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>

      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div key={item.id} className="wishlist-card">
            <img src={item.image} alt={item.title} />

            <div className="wishlist-info">
              <h4>{item.title}</h4>
              <p>${item.price}</p>

              <button
                onClick={() =>
                  dispatch(removeFromWishlist(item.id))
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
