import { useContext, useRef, useState } from "react";
import { CartContext } from "../../../context/CartProvider";
import "./info.css";

function Info({ singleProduct }) {
  const originalPrice = singleProduct.price.current;
  const discountPercent = singleProduct.price.discount;
  const discountPrice = originalPrice - (originalPrice * discountPercent) / 100;
  const quantityRef = useRef(null);

  const { addToCart, setCurrentQuantity, currentQuantity, cartItems } =
    useContext(CartContext);

  const filteredCart = cartItems.find((item) => item._id === singleProduct._id);

  console.log(singleProduct);
  return (
    <div className="product-info">
      <h1 className="product-title">{singleProduct.name}</h1>
      <div className="product-review">
        <ul className="product-star">
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-fill"></i>
          </li>
          <li>
            <i className="bi bi-star-half"></i>
          </li>
        </ul>
        <span>2 reviews</span>
      </div>
      <div className="product-price">
        <s className="old-price">${originalPrice}</s>
        <strong className="new-price">${discountPrice.toFixed(2)}</strong>
      </div>
      <p
        className="product-description"
        dangerouslySetInnerHTML={{ __html: singleProduct.description }}
      ></p>
      <form className="variations-form">
        <div className="variations">
          <div className="colors">
            <div className="colors-label">
              <span>Color</span>
            </div>
            <div className="colors-wrapper">
              {singleProduct.color.map((c, index) => {
                return (
                  <div className="color-wrapper" key={index}>
                    <label
                      style={{
                        backgroundColor: `#${c}`,
                      }}
                    >
                      <input type="radio" name="product-color" />
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="values">
            <div className="values-label">
              <span>Size</span>
            </div>
            <div className="values-list">
              {singleProduct.size.map((s, index) => {
                return <span key={index}>{s.toUpperCase()}</span>;
              })}
            </div>
          </div>
          <div className="cart-button">
            <input
              type="number"
              defaultValue="1"
              min="1"
              id="quantity"
              // ref={quantityRef}
              value={currentQuantity}
              onChange={(e) => setCurrentQuantity(e.target.value)}
            />
            <button
              className="btn btn-lg btn-primary"
              id="add-to-cart"
              type="button"
              disabled={filteredCart}
              onClick={() => {
                addToCart({
                  ...singleProduct,
                  price: discountPrice,
                  quantity: parseInt(currentQuantity),
                });
              }}
            >
              Add to cart
            </button>
          </div>
          <div className="product-extra-buttons">
            <a href="#">
              <i className="bi bi-globe"></i>
              <span>Size Guide</span>
            </a>
            <a href="#">
              <i className="bi bi-heart"></i>
              <span>Add to Wislist</span>
            </a>
            <a href="#">
              <i className="bi bi-share"></i>
              <span>Share this Product</span>
            </a>
          </div>
        </div>
      </form>
      <div className="divider"></div>
      <div className="product-meta">
        <div className="product-sku">
          <span>SKU:</span>
          <strong>BE45VGRT</strong>
        </div>
        <div className="product-categories">
          <span>Categories:</span>
          <strong>Pants , Women</strong>
        </div>
        <div className="product-tags">
          <span>Tags:</span>
          <a href="#">black</a>,<a href="#">white</a>
        </div>
      </div>
    </div>
  );
}

export default Info;
