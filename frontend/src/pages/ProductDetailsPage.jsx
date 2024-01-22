// import Footer from "../components/Layout/Footer/Footer"
// import Header from "../components/Layout/Header/Header"
import { useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import { useParams } from "react-router-dom";
function ProductDetailsPage() {
  const [singleProduct, setSingleProduct] = useState(null);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();

  console.log(singleProduct);

  const fetchSingleProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSingleProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  return singleProduct ? (
    <ProductDetails
      singleProduct={singleProduct}
      setSingleProduct={setSingleProduct}
    />
  ) : (
    <p>Ürün Yükleniyor</p>
  );
}

export default ProductDetailsPage;
