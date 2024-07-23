import React, { useEffect, useState } from 'react'
import { addCategory, getCategoryItem, getUpdateCatItem } from "../../../api";
import { useNavigate, useParams } from 'react-router-dom';


const CreateCategory = () => {
  const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
      });
  const { slug } = useParams();


      const fetchDetails = async () => {
        try {
          const response = await getCategoryItem(slug);
          console.log(response)
          const details = response?.data?.category;
          if (response && details) {
            setFormData({
              name: details?.name || "",
              id: details?._id || "",
            });
          }
        } catch (error) {
          console.error("Error fetching details:", error);
        }
      };

      useEffect(() => {
        if (slug) {
          fetchDetails();
        }
      }, [slug]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await addCategory(formData);
            if (formData.id) {
              await getUpdateCatItem(formData.id, formData); // Adjust API call as needed
            } else {
              await addCategory(formData); // Adjust API call as needed
            }
          navigate("/category-list");
        } catch (error) {
          console.error("Error adding item:", error);
        }
      };

      return (
        <div className="container mt-5">
          <h2>Contact Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      );
}

export default CreateCategory
