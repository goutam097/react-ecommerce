import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './screen/home/Home';
import List from './screen/addEdit/list';
import Add from './screen/addEdit/Add';
import View from './screen/addEdit/View';
import Login from './screen/authScreen/Login';
import Register from './screen/authScreen/Register';
import ProtectedRoute from './components/ProtectedRoute';
import CreateCategory from './screen/admin/category/CreateCategory';
import CategoryList from './screen/admin/category/CategoryList';
import Dashboard from './screen/admin/dashboard/Dashboard';
import ProductDetails from './screen/product/ProductDetails';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRoute element={Home} />} />
          <Route path='/product-details' element={<ProtectedRoute element={ProductDetails} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* Admin Section  */}
          <Route path='/dashboard' element={<ProtectedRoute element={Dashboard} />} />
          {/* category section  */}
          <Route path='/create-category' element={<ProtectedRoute element={CreateCategory} />} />
          <Route path='/create-category/:slug' element={<ProtectedRoute element={CreateCategory} />} />
          <Route path='/category-list' element={<ProtectedRoute element={CategoryList} />} />
          {/* product section  */}
          <Route path='/list' element={<ProtectedRoute element={List} />} />
          <Route path='/add' element={<ProtectedRoute element={Add} />} />
          <Route path='/add/:slug' element={<ProtectedRoute element={Add} />} />
          <Route path='/view/:slug' element={<ProtectedRoute element={View} />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
