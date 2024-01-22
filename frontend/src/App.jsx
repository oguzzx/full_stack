import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AuthPage from "./pages/AuthPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import BlogPage from "./pages/BlogPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { Route, Routes } from "react-router-dom";
import AdminUserPage from "./pages/admin/Users/AdminUserPage";
import AdminCategoryPage from "./pages/admin/Categories/AdminCategoryPage";
import AdminUpdateCategoryPage from "./pages/admin/Categories/AdminUpdateCategoryPage";
import AdminCreateCategoryPage from "./pages/admin/Categories/AdminCreateCategoryPage";
import AdminUpdateProductPage from "./pages/admin/Products/AdminUpdateProductPage";
import AdminCreateProductPage from "./pages/admin/Products/AdminCreateProductPage";
import AdminProductPage from "./pages/admin/Products/AdminProductPage";
import "./App.css";
import AdminCouponPage from "./pages/admin/Coupons/AdminCouponPage";
import AdminUpdateCouponPage from "./pages/admin/Coupons/AdminUpdateCouponPage";
import AdminCreateCouponPage from "./pages/admin/Coupons/AdminCreateCouponPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/blog/:id" element={<BlogDetailsPage />} />
      <Route path="/admin/*">
        <Route path="users" element={<AdminUserPage />} />
        <Route path="categories" element={<AdminCategoryPage />} />
        <Route path="categories/update/:id" element={<AdminUpdateCategoryPage />} />
        <Route path="categories/create" element={<AdminCreateCategoryPage />} />
        <Route path="products" element={<AdminProductPage />} />
        <Route path="products/update/:id" element={<AdminUpdateProductPage />} />
        <Route path="products/create" element={<AdminCreateProductPage />} />
        <Route path="coupons" element={<AdminCouponPage />} />
        <Route path="coupons/update/:id" element={<AdminUpdateCouponPage />} />
        <Route path="coupons/create" element={<AdminCreateCouponPage />} />
      </Route>
    </Routes>
  );
}

export default App;
