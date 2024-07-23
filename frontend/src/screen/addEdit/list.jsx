import React, { useEffect, useState } from 'react';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import LeftMenu from "../../components/leftMenu/LeftMenu";
import "./list.css";
import { getProduct, deleteProduct } from '../../api';
import { useNavigate } from 'react-router-dom';

const List = () => {

  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);
  

  const fetchItems = async () => {
    const response = await getProduct();
    setItems(response.data.products);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchItems();
  };


  return (
    <div>
      <header className="bg-primary text-white text-center py-3">
        <Header />
      </header>

      <div className="wrapper">
        <LeftMenu />

        <div className="container-fluid">
          <div className="row">
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h2>Heading</h2>
                <a href="/add" className='btn btn-primary'>Add</a>
              </div>
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Product Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item?.category?.name}</td>
                    <td><img width={'30%'} src={item?.photo[0]} alt="" /></td>
                    <td>
                      <button onClick={() => navigate(`/add/${item.slug}`)} className="btn btn-sm btn-primary">Edit</button>
                      <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-danger">Delete</button>
                      <button onClick={() => navigate(`/view/${item.slug}`)} className="btn btn-sm btn-info">View</button>
                    </td>
                  </tr>
                ))}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </div>

      <footer className="bg-light">
        <Footer />
      </footer>
    </div>
  );
};

export default List;  // Changed list to List
