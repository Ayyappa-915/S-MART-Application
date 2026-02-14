import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist } from "../redux/wishlistSlice";
import "./ProductGrid.css";

const ProductGrid = ({ products }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  return (
    <div className="products-grid">
      {products.map((item) => {

        const inCart = cartItems.some(
          (cartItem) => cartItem.id === item.id
        );

        const inWishlist = wishlistItems.some(
          (wishItem) => wishItem.id === item.id
        );

        return (
          <div key={item.id} className="product-card">

            <div className="product-image">
              <img src={item.image} alt={item.title} />
            </div>

            <h4 className="product-title">
              {item.title.length > 40
                ? item.title.substring(0, 40) + "..."
                : item.title}
            </h4>

            <p className="price">${item.price}</p>

            <div className="product-buttons">

              <button onClick={() => dispatch(addToCart(item))}>
                {inCart ? "Added" : "Add to Cart"}
              </button>

              <button onClick={() => dispatch(addToWishlist(item))}>
                {inWishlist ? "Added" : "Wishlist"}
              </button>

            </div>
                <div className="btn">
                  <button onClick={()=> alert("Order Placed Successfully...")}>BUY NOW</button>
                </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
