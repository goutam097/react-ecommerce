import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { loginItem } from "../../api";


const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
const handleChange = (e) => {
  const { name, value,  } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   console.log("Form submitted:", formData);
//   const response = await loginItem(formData);
//   if (response) {
//     localStorage.setItem("user", JSON.stringify(response.user));
//     localStorage.setItem("token", response.token);
//     navigate("/");
//   } else {
//     console.error("Login failed");
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted:", formData);

  try {
    const response = await loginItem(formData);
    if (response && response.data) {
      const { user, token } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      console.log(user.role)
      if (user.role) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } else {
      console.error("Login failed: No response data");
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};


  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header text-center">
                <h3>Login</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        className="form-control"
                        id="password"
                        name="password"
                      value={formData.password}
                      onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={togglePasswordVisibility}
                      >
                        <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                      </button>
                    </div>
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                    <button type="button" className="btn btn-link">
                      Forgot Password
                    </button>
                    <a href="/register" className="btn btn-secondary">
                      Register
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
