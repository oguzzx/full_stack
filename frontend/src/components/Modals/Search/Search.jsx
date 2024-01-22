import { useEffect, useState } from "react";
import "./search.css";

// eslint-disable-next-line react/prop-types
function Search({ isSearchShow, setIsSearchShow }) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  console.log(products);

  const handleSearch = async (e) => {
    try {
      const response = await fetch(`${apiUrl}/api/products?name=${name}`, {
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

  useEffect(() => {
    handleSearch();
  }, [name]);

  return (
    <div
      className={`modal-search ${isSearchShow ? "show" : ""}
    } `}
    >
      <div className="modal-wrapper">
        <h3 className="modal-title">Search for products</h3>
        <p className="modal-text">
          Start typing to see products you are looking for.
        </p>
        <form className="search-form">
          <input
            type="text"
            placeholder="Search a product"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button>
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>RESULTS FROM PRODUCT</h3>
          </div>
          <div className="results">
            {products
              .filter((product) =>
                product.name.toLowerCase().includes(name.toLowerCase())
              )
              .map((product) => {
                return (
                  <a
                    href={`/product/${product._id}`}
                    className="result-item"
                    key={product._id}
                  >
                    <img src={product.img[0]} className="search-thumb" alt="" />
                    <div className="search-info">
                      <h4>{product.name}</h4>
                      <span className="search-sku">SKU: PD0016</span>
                      <span className="search-price">
                        ${product.price.current.toFixed(2)}
                      </span>
                    </div>
                  </a>
                );
              })}
          </div>
        </div>
        <i
          className="bi bi-x-circle"
          id="close-search"
          onClick={() => setIsSearchShow(false)}
        ></i>
      </div>
      <div
        className="modal-overlay"
        onClick={() => setIsSearchShow(false)}
      ></div>
    </div>
  );
}

export default Search;
