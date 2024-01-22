import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [activeImg, setActiveImg] = useState();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const quantity = currentQuantity

  const handleNextSlide = () => {
    setCurrentSlide(currentSlide + 1);
    if (currentSlide >= 2) {
      setCurrentSlide(0);
    }
  };

  const handlePrevSlide = () => {
    setCurrentSlide(currentSlide - 1);
    if (currentSlide <= 0) {
      setCurrentSlide(2);
    }
  };

  const addToCart = (item) => {
    // cartItems içindeki ürünlerden gelen ürün var mı kontrol et
    const existingCartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem._id === item._id
    );
    // varsa miktarını arttır
    if (existingCartItemIndex >= 0) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // yoksa ürünü cartItems e ekle
      setCartItems([...cartItems, { ...item, quantity }]);
    }
    
  };

  //   console.log(cartItems);

  const deleteCartItem = (id) => {
    // quantity 1 den büyükse miktarı azalt
    const existingCartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem._id === id
    );
    if (cartItems[existingCartItemIndex].quantity > 1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex].quantity -= 1;
      setCartItems(updatedCartItems);
    } else {
      // quantity 1 ise ürünü sepetten sil
      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem._id !== id
      );
      setCartItems(updatedCartItems);
    }
  };

  useEffect(() => {
    // cartItems içindeki ürünleri local storage ye kaydet
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        products,
        setProducts,
        cartItems,
        activeImg,
        setActiveImg,
        currentSlide,
        setCurrentSlide,
        handleNextSlide,
        handlePrevSlide,
        deleteCartItem,
        setCurrentQuantity,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
