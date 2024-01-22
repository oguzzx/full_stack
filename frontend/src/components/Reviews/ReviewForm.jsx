import { useState } from "react";
import { message } from "antd";

function ReviewForm({ singleProduct, setSingleProduct }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const user =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      review: [
        ...singleProduct.review,
        {
          text: review,
          rating: parseInt(rating),
          user: user.id || user._id,
        },
      ],
    };

    try {
      const response = await fetch(
        `${apiUrl}/api/products/${singleProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSingleProduct(data);
        setReview("");
        setRating(0);
        message.success("Yorumunuz başarıyla eklendi");
      }
    } catch (error) {
      console.log(error);
      message.error("Yorumunuz eklenirken bir hata oluştu");
    }

    console.log(formData);
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <p className="comment-notes">
        Your email address will not be published. Required fields are marked
        <span className="required">*</span>
      </p>
      <div className="comment-form-rating">
        <label>
          Your rating
          <span className="required">*</span>
        </label>
        <div className="stars">
          <a
            className={`star ${rating === 1 && "active"}`}
            onClick={() => setRating(1)}
          >
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            className={`star ${rating === 2 && "active"}`}
            onClick={() => setRating(2)}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            className={`star ${rating === 3 && "active"}`}
            onClick={() => setRating(3)}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            className={`star ${rating === 4 && "active"}`}
            onClick={() => setRating(4)}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
          <a
            className={`star ${rating === 5 && "active"}`}
            onClick={() => setRating(5)}
          >
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
          </a>
        </div>
      </div>
      <div className="comment-form-comment form-comment">
        <label htmlFor="comment">
          Your review
          <span className="required">*</span>
        </label>
        <textarea
          id="comment"
          cols="50"
          rows="10"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
      </div>

      <div className="comment-form-cookies">
        <input id="cookies" type="checkbox" />
        <label htmlFor="cookies">
          Save my name, email, and website in this browser for the next time I
          comment.
          <span className="required">*</span>
        </label>
      </div>
      <div className="form-submit">
        <input type="submit" className="btn submit" />
      </div>
    </form>
  );
}

export default ReviewForm;
