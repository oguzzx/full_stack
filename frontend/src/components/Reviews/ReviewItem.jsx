import { useEffect, useState } from "react";

function ReviewItem({ reviewItem, isAdmin, people, user }) {
  console.log(reviewItem);

  return (
    <li className="comment-item">
      <div className="comment-avatar">
        <img src="/img/avatars/avatar1.jpg" alt="" />
      </div>
      <div className="comment-text">
        <ul className="comment-star">
          {[...Array(reviewItem.rating)].map((_, index) => {
            return (
              <li key={index}>
                <i className="bi bi-star-fill"></i>
              </li>
            );
          })}
        </ul>
        <div className="comment-meta">
          <strong> {user.username} </strong>
          <span> - </span>
          <time>
            {new Date(reviewItem.createdAt).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        <div className="comment-description">
          <p>{reviewItem.text}</p>
        </div>
      </div>
    </li>
  );
}

export default ReviewItem;
