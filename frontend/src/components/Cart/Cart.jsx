import { useContext } from "react";
import CartCoupon from "./CartCoupon";
import CartProgress from "./CartProgress";
import CartTable from "./CartTable";
import CartTotals from "./CartTotals";
import "./cart.css";
import { CartContext } from "../../context/CartProvider";

function Cart() {
  const { cartItems } = useContext(CartContext);
  return (
    <section className="cart-page">
      <div className="container">
        {cartItems.length > 0 ? (
          <div className="cart-page-wrapper">
            <form className="cart-form">
              <CartProgress />
              <div className="shop-table-wrapper">
                <CartTable />
                <CartCoupon />
              </div>
            </form>
            <div className="cart-collaterals">
              <CartTotals />
            </div>
          </div>
        ) : (
          <div className="cart-empty">
            <h2>Your cart is currently empty.</h2>
            <p>
              Return to shop
              <a
                href="/"
                style={{
                  color: "#f76b1c",
                  fontWeight: "bold",
                  marginLeft: "5px",
                }}
              >
                {" "}
                here
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
