import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getItem } from "../../api";


const View = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchDetails();
    }
  }, [id]);

  const fetchDetails = async () => {
    try {
      const response = await getItem(id);
      const details = response?.data?.blog;
      if (response && details) {
        setFormData({
          name: details?.name || "",
          email: details?.email || "",
          phone: details?.phone || "",
          address: details?.address || "",
        });
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };


  return (
    <div className="container mt-5">
      <h2>Contact Form</h2>
      <form >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            className="form-control"
            id="address"
            name="address"
            rows="3"
            value={formData.address}
            placeholder="Enter your address"
            required
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleBackClick}>
          Back
        </button>
      </form>
    </div>
  );
}

export default View
