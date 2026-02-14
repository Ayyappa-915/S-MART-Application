import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  decreaseQuantity,
  addToCart,
  clearCart
} from "../redux/cartSlice";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <div className="empty-page">
        <h1>Your cart is empty...</h1>
    </div>;
  }

  return (
    <div className="cart-container">
      <h2>My Cart</h2>

      <div className="cart-grid">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-card">
            <img src={item.image} alt={item.title} />

            <div className="cart-info">
              <h4>
                {item.title.length > 50
                  ? item.title.substring(0, 50) + "..."
                  : item.title}
              </h4>

              <p className="price">${item.price}</p>

              <div className="quantity-controls">
                <button onClick={() => dispatch(decreaseQuantity(item.id))}>
                  -
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => dispatch(addToCart(item))}>
                  +
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-total-section">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button onClick={() => dispatch(clearCart())}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
