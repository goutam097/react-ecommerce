import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductItem,
} from "../../api";

const ProductDetails = () => {
  const navigate = useNavigate();

  const { slug } = useParams();
  const [formData, setFormData] = useState()

  useEffect(() => {
    if (slug) {
      fetchDetails();
    }
  }, [slug]);

  const fetchDetails = async () => {
    try {
      const response = await getProductItem(slug);
      const details = response?.data?.product;
      if (response && details) {
        setFormData({
          name: details?.name || "",
          price: details?.price || "",
          phone: details?.phone || "",
          description: details?.description || "",
          quantity: details?.quantity || "",
          photo: details?.photo || "",
          category: details?.category.name || "",
          shipping: details?.shipping || "",
          id: details?._id || "",
        });
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  return (
    <div>
      <Header />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src="https://via.placeholder.com/500"
              alt="Product Image"
              className="product-image"
            />
          </div>
          <div className="col-md-6">
            <div className="product-details">
              <h1>Product Title</h1>
              <p className="text-muted">Category: Electronics</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero. Sed cursus ante dapibus diam.
              </p>
              <h2 className="text-primary">$99.99</h2>
              <button className="btn btn-success btn-lg">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>

<div className="text-center mt-5 bg-dark text-white">

      <Footer />
</div>
    </div>
  );
};

export default ProductDetails;
