import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        message.success("Kayıt başarılı");
        // localstorage ye kaydetme işlemi
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        // anasayfaya yönledirip sayfanın en üstüne çıkartma
        navigate("/", { replace: true });
      } else {
        message.error("Kayıt başarısız");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="account-column">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <span>
              Username <span className="required">*</span>
            </span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            <span>
              Email address <span className="required">*</span>
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            <span>
              Password <span className="required">*</span>
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="privacy-policy-text remember">
          <p>
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our <a href="#">privacy policy.</a>
          </p>
          <button className="btn btn-sm">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
