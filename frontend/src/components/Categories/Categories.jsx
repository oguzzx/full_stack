import { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import "./categories.css";

function Categories() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>All Categories</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <ul className="category-list">
          {categories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Categories;
