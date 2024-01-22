/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import "./reviews.css";

function Reviews({ active, singleProduct, setSingleProduct }) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [users, setUsers] = useState([]);
  console.log(users);

  const user =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  console.log(user.id);

  const isAdmin = users.find((u) => u._id === user.id);
  const people = isAdmin && isAdmin.role === "admin" ? true : false;
  console.log(people);

  const getUsers = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={`tab-panel-reviews ${active}`}>
      <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
      {singleProduct.review.length > 0 ? (
        <div className="comments">
          <ol className="comment-list">
            {singleProduct.review.map((review, index) => {
              return (
                <ReviewItem
                  review={review}
                  key={index}
                  reviewItem={review}
                  isAdmin={isAdmin}
                  people={people}
                  users={users}
                  user={user}
                />
              );
            })}
          </ol>
        </div>
      ) : (
        <p className="no-reviews">Hiç yorum yok</p>
      )}
      <div className="review-form-wrapper">
        <h2>Add a review</h2>
        <ReviewForm
          singleProduct={singleProduct}
          setSingleProduct={setSingleProduct}
        />
      </div>
    </div>
  );
}

export default Reviews;
