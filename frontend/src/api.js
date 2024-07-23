import axios from 'axios';

const API_URL = 'http://localhost:9901/admin/blogs/delete';
const API_URLDetails = 'http://localhost:9901/admin/blogs/details';
const API_URLUpdate = 'http://localhost:9901/admin/blogs/update';
const API_URLRegister = 'http://localhost:9901/admin/user/register';
const API_URLLogin = 'http://localhost:9901/admin/user/login';

export const getItems = () => axios.get('http://localhost:9901/admin/blogs/list');
export const addItem = (item) => axios.post('http://localhost:9901/admin/create-product', item);
export const updateItem = (id, item) => axios.put(`${API_URLUpdate}/${id}`, item);
export const deleteItem = (id) => axios.delete(`${API_URL}/${id}`);
export const getItem = (id) => axios.get(`${API_URLDetails}/${id}`);
export const registerItem = (item) => axios.post(`${API_URLRegister}`, item);
export const loginItem = (item) => axios.post(`${API_URLLogin}`, item);




// category 


const BASE_URL = 'http://localhost:9901/admin';

const endpoints = {
  DELETE_CATEGORY: `${BASE_URL}/delete-category`,
  DETAILS_CATEGORY: `${BASE_URL}/single-category`,
  UPDATE_CATEGORY: `${BASE_URL}/update-category`,
  CREATE_CATEGORY: `${BASE_URL}/create-category`,
  GET_CATEGORY: `${BASE_URL}/get-category`
};

export const getCategory = () => axios.get(endpoints.GET_CATEGORY);
export const deleteCategory = (id) => axios.delete(`${endpoints.DELETE_CATEGORY}/${id}`);
export const addCategory = (item) => axios.post(endpoints.CREATE_CATEGORY, item);
export const getCategoryItem = (slug) => axios.get(`${endpoints.DETAILS_CATEGORY}/${slug}`);
export const getUpdateCatItem = (id, item) => axios.put(`${endpoints.UPDATE_CATEGORY}/${id}`, item);


// products 
const productendpoints = {
    DELETE_PRODUCT: `${BASE_URL}/delete-product`,
    DETAILS_PRODUCT: `${BASE_URL}/single-product`,
    UPDATE_PRODUCT: `${BASE_URL}/update-product`,
    CREATE_PRODUCT: `${BASE_URL}/create-product`,
    GET_PRODUCT: `${BASE_URL}/get-product`
  };
  
  export const getProduct = () => axios.get(productendpoints.GET_PRODUCT);
  export const deleteProduct = (id) => axios.delete(`${productendpoints.DELETE_PRODUCT}/${id}`);
  export const addProduct = (item) => axios.post(productendpoints.CREATE_PRODUCT, item);
  export const getProductItem = (slug) => axios.get(`${productendpoints.DETAILS_PRODUCT}/${slug}`);
  export const getUpdateProductItem = (id, item) => axios.put(`${productendpoints.UPDATE_PRODUCT}/${id}`, item);
  

