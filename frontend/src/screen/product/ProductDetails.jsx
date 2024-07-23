import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const ProductDetails = () => {
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
