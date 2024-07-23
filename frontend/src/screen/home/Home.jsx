import React, { useEffect, useState } from "react";

import "./home.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { getProduct } from '../../api';


const Home = () => {
  const imagePath = require('../../assests/banner1.jpg');
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);
  

  const fetchItems = async () => {
    const response = await getProduct();
    setItems(response.data.products);
  };


  return (
    <>
      <div>

        <Header />
        <div className="banner-container">
      <div className="container h-100">
        <div className="row h-100 align-items-center">
          <div className="col-md-6 text-left">
            <h1 className="banner-title">Your Title Here</h1>
            <p className="banner-description">This is a description of the banner section. It provides additional information or context.</p>
            <a href="#action" className="btn btn-primary">Shop Now</a>
          </div>
        </div>
      </div>
    </div>
       


        <section className="container my-5">
          <h2 className="text-center mb-4">Featured Products</h2>
          <div className="row">
          {items.map((item, index) => (
            <div className="col-md-4">
              <div className="card product-card" onClick={() => navigate(`/product-details/${item.slug}`)}>
                <img
                  src={item?.photo[0]}
                  className="card-img-top"
                  alt="Product 1"
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">${item.price}</p>
                  <a  className="btn btn-primary">
                    Get Details
                  </a>
                </div>
              </div>
            </div>
                ))}

            {/* <div className="col-md-4">
              <div className="card product-card">
                <img
                  src="https://via.placeholder.com/300x200"
                  className="card-img-top"
                  alt="Product 2"
                />
                <div className="card-body">
                  <h5 className="card-title">Product 2</h5>
                  <p className="card-text">$49.99</p>
                  <a href="#" className="btn btn-primary">
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card product-card">
                <img
                  src="https://via.placeholder.com/300x200"
                  className="card-img-top"
                  alt="Product 3"
                />
                <div className="card-body">
                  <h5 className="card-title">Product 3</h5>
                  <p className="card-text">$19.99</p>
                  <a href="#" className="btn btn-primary">
                    Buy Now
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Home;
