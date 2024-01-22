/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
// import productData from "../../../data.json";
import Slider from "react-slick";
import { CartContext } from "../../../context/CartProvider";
import { useParams } from "react-router-dom";
import "./gallery.css";

function Gallery({ singleProduct }) {
  const [activeImg, setActiveImg] = useState({
    img: singleProduct.img[0],
  });
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  console.log(products);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };

  // eslint-disable-next-line no-unused-vars
  function NextBtn({ onClick }) {
    return (
      <button
        className="glide__arrow glide__arrow--right"
        data-glide-dir=">"
        onClick={onclick}
        style={{
          zIndex: "2",
        }}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    );
  }

  // eslint-disable-next-line no-unused-vars
  function PrevBtn({ onClick }) {
    return (
      <button
        className="glide__arrow glide__arrow--left"
        data-glide-dir="<"
        onClick={onclick}
        style={{
          zIndex: "2",
        }}
      >
        <i className="bi bi-chevron-left"></i>
      </button>
    );
  }
  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={`${activeImg.img}`} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            <Slider {...sliderSettings}>
              {singleProduct.img.map((img, index) => {
                return (
                  <li
                    className="glide__slide glide__slide--active"
                    key={index}
                    onClick={() => {
                      setActiveImg({ img });
                    }}
                  >
                    <img
                      src={`${img}`}
                      alt=""
                      style={{
                        width: "250px",
                      }}
                      className={`img-fluid ${
                        activeImg.imgIndex === index ? "active" : ""
                      }`}
                    />
                  </li>
                );
              })}
            </Slider>
          </ol>
        </div>
        <div className="glide__arrows" data-glide-el="controls"></div>
      </div>
    </div>
  );
}

export default Gallery;
