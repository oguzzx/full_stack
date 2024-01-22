/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import Slider from "react-slick";
import "./products.css";
import { CartContext } from "../../context/CartProvider";

function Products() {
  // const [products, setProducts] = useState(productsData);
  // const [cartItems, setCartItems] = useState([]);

  // const addToCart = (item) => {
  //   const newCartItems = products.find((product) => product.id === item.id);
  //   setCartItems([...cartItems, newCartItems]);
  // };

  // console.log(cartItems);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(products);

  useEffect(() => {
    getProducts();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 2700,
    autoplay: true,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  function NextBtn({ onClick }) {
    return (
      <button className="glide__arrow glide__arrow--right" onClick={onClick}>
        <i className="bi bi-chevron-right"></i>
      </button>
    );
  }

  function PrevBtn({ onClick }) {
    return (
      <button className="glide__arrow glide__arrow--left" onClick={onClick}>
        <i className="bi bi-chevron-left"></i>
      </button>
    );
  }

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <div className="product-wrapper product-carousel">
          <div className="glide__track">
            <Slider {...sliderSettings}>
              {products.map((product) => {
                return (
                  <ProductItem
                    product={product}
                    key={product._id}
                    // addToCart={addToCart}
                  />
                );
              })}
            </Slider>
          </div>
          <div className="glide__arrows"></div>
        </div>
      </div>
    </section>
  );
}

export default Products;
