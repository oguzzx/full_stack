import "./categoryItem.css";

function CategoryItem({ category}) {

  const { name, img } = category;

  return (
    <li className="category-item">
      <a href="#">
        <img
          src={img}
          alt=""
          className="category-image"
        />
        <span className="category-title">{name}</span>
      </a>
    </li>
  );
}

export default CategoryItem;
