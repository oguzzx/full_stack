import { useContext } from "react";
import SliderItem from "./SliderItem";
import "./sliders.css";
import { CartContext } from "../../context/CartProvider";

function Sliders() {
  // const [currentSlide, setCurrentSlide] = useState(0);

  // const handleNextSlide = () => {
  //   setCurrentSlide(currentSlide + 1);
  //   if (currentSlide >= 2) {
  //     setCurrentSlide(0);
  //   }
  // };

  // const handlePrevSlide = () => {
  //   setCurrentSlide(currentSlide - 1);
  //   if (currentSlide <= 0) {
  //     setCurrentSlide(2);
  //   }
  // };

  const { currentSlide, setCurrentSlide, handleNextSlide, handlePrevSlide } =
    useContext(CartContext);

  return (
    <section className="slider">
      <div className="slider-elements">
        {currentSlide === 0 && (
          <SliderItem imageSrc={"img/slider/slider1.jpg"} />
        )}
        {currentSlide === 1 && (
          <SliderItem imageSrc={"img/slider/slider2.jpg"} />
        )}
        {currentSlide === 2 && (
          <SliderItem imageSrc={"img/slider/slider3.jpg"} />
        )}
        <div className="slider-buttons">
          <button onClick={() => handlePrevSlide()}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <button onClick={() => handleNextSlide()}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
        <div className="slider-dots">
          <button
            className={`slider-dot ${currentSlide === 0 ? "active" : ""}`}
            onClick={() => {
              setCurrentSlide(0);
            }}
          >
            <span></span>
          </button>
          <button
            className={`slider-dot ${currentSlide === 1 ? "active" : ""}`}
            onClick={() => {
              setCurrentSlide(1);
            }}
          >
            <span></span>
          </button>
          <button
            className={`slider-dot ${currentSlide === 2 ? "active" : ""}`}
            onClick={() => {
              setCurrentSlide(2);
            }}
          >
            <span></span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Sliders;
