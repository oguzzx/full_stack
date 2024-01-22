import { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider";
import { loadStripe } from "@stripe/stripe-js";
import { message } from "antd";

function CartTotals() {
  const { cartItems } = useContext(CartContext);
  const [isCheck, setIsCheck] = useState(false);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const stripeKey = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const subTotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const cargoFee = 15;

  const handlePayment = async () => {
    if (!user) {
      return message.info("Ödeme yapabilmek için giriş yapmalısınız!");
    }

    const body = {
      products: cartItems,
      user: user,
      cargoFee: isCheck ? cargoFee : 0,
    };

    try {
      const stripe = await loadStripe(stripeKey);

      const res = await fetch(`${apiUrl}/api/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        return message.error("Ödeme işlemi başarısız oldu.");
      }

      const session = await res.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart-totals">
      <h2>Cart totals</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span id="subtotal">${subTotal.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              <ul>
                <li>
                  <label>
                    Fast Cargo: $15.00
                    <input
                      type="checkbox"
                      id="fast-cargo"
                      checked={isCheck ? "checked" : ""}
                      onChange={() => setIsCheck(!isCheck)}
                    />
                  </label>
                </li>
                <li>
                  <a href="#">Change Address</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              <strong id="cart-total">
                ${(isCheck ? subTotal + 15 : subTotal).toFixed(2)}
              </strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <button className="btn btn-lg" onClick={handlePayment}>
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}

export default CartTotals;
