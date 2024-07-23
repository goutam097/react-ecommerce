import React, { useState, useEffect } from "react";
import {
  addProduct,
  getProductItem,
  getUpdateProductItem,
  getCategory,
} from "../../api";
import { useNavigate, useParams } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    quantity: "",
    photo: [],
    shipping: false,
  });
  const { slug } = useParams();

  const fetchCategoryItems = async () => {
    const response = await getCategory();
    setCategories(response.data.category);
  };

  useEffect(() => {
    fetchCategoryItems();
    if (slug) {
      fetchDetails();
      fetchCategoryItems();
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
          category: details?.category._id || "",
          shipping: details?.shipping || "",
          id: details?._id || "",
        });
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const uploadImage = (e) => {
    const { files } = e.target;
    const file = files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          photo: file,
          previewPhoto: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  console.log(formData)
  const formDataToSend = new FormData();
  formDataToSend.append("name", formData.name);
  formDataToSend.append("price", formData.price);
  formDataToSend.append("description", formData.description);
  formDataToSend.append("category", formData.category);
  formDataToSend.append("quantity", formData.quantity);
  formDataToSend.append("shipping", formData.shipping);
  if (formData.photo) {
    formDataToSend.append("photo", formData.photo); // Appending the file object
  }
    try {
      if (formData.id) {
        await getUpdateProductItem(formData.id, formDataToSend);
      } else {
        await addProduct(formDataToSend);
      }
      navigate("/list");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Product Form</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData?.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={formData?.price}
            onChange={handleChange}
            placeholder="Enter product price"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            id="category"
            name="category"
            value={formData?.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={formData?.description}
            onChange={handleChange}
            placeholder="Enter product description"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={formData?.quantity}
            onChange={handleChange}
            placeholder="Enter product quantity"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Choose Image</label>
          <input
            type="file"
            className="form-control"
            id="photo"
            name="photo"
            multiple
            accept="image/jpg,image/jpeg,image/png"
            onChange={uploadImage}
            
            
          />
        </div>
        {formData.previewPhoto && (
          <div className="form-group">
            <img
              src={formData.previewPhoto}
              alt="Preview"
              style={{ maxHeight: "200px" }}
            />
          </div>
        )}
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="shipping"
            name="shipping"
            checked={formData?.shipping}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="shipping">Shipping</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );

  // return (
  //   <div className="container mt-5">
  //     <h2>Contact Form</h2>
  //     <form onSubmit={handleSubmit}>
  //       <div className="form-group">
  //         <label htmlFor="name">Name</label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           id="name"
  //           name="name"
  //           value={formData.name}
  //           onChange={handleChange}
  //           placeholder="Enter your name"
  //           required
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label htmlFor="email">Price</label>
  //         <input
  //           type="number"
  //           className="form-control"
  //           id="price"
  //           name="price"
  //           value={formData.price}
  //           onChange={handleChange}
  //           placeholder="Enter your price"
  //           required
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label htmlFor="category">Category</label>
  //         <select
  //           className="form-control"
  //           id="category"
  //           name="category"
  //           value={formData.category}
  //           onChange={handleChange}
  //           required
  //         >
  //           <option value="">Select a category</option>
  //           {categories.map((category) => (
  //             <option key={category._id} value={category._id}>
  //               {category.name}
  //             </option>
  //           ))}
  //         </select>
  //       </div>
  //       <div className="form-group">
  //         <label htmlFor="address">Description</label>
  //         <textarea
  //           className="form-control"
  //           id="description"
  //           name="description"
  //           rows="3"
  //           value={formData.description}
  //           onChange={handleChange}
  //           placeholder="Enter your description"
  //           required
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label htmlFor="email">Quantity</label>
  //         <input
  //           type="number"
  //           className="form-control"
  //           id="quantity"
  //           name="quantity"
  //           value={formData.quantity}
  //           onChange={handleChange}
  //           placeholder="Enter your quantity"
  //           required
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label htmlFor="photo">Choose Image</label>
  //         <input
  //           type="file"
  //           className="form-control"
  //           id="photo"
  //           name="photo"
  //           accept="image/jpg,image/jpeg,image/png"
  //           onChange={handleChange}
  //           required
  //         />
  //       </div>
  //       {formData.photoPreview && (
  //         <div className="form-group">
  //           <img
  //             src={formData.photoPreview}
  //             alt="Preview"
  //             style={{ maxHeight: "200px" }}
  //           />
  //         </div>
  //       )}
  //       <div className="mb-3">
  //         <label htmlFor="shipping" className="form-label">
  //           Shipping
  //         </label>
  //         <input
  //           type="checkbox"
  //           className="form-check-input"
  //           id="shipping"
  //           defaultChecked
  //         />
  //       </div>
  //       <button type="submit" className="btn btn-primary">
  //         Submit
  //       </button>
  //     </form>
  //   </div>
  // );
};

export default Add;
