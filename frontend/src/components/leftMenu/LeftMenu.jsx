import React from 'react'
import { useNavigate } from 'react-router-dom';

const LeftMenu = () => {
  const navigate = useNavigate();

  return (
    <div>
        <nav className="sidebar bg-light border-end">
            <ul className="nav flex-column">
              <li className="nav-item" onClick={() => navigate(`/list`)}>
                <a className="nav-link active" aria-current="page">
                  Product
                </a>
              </li>
              <li className="nav-item" onClick={() => navigate(`/category-list`)}>
                <a className="nav-link">
                  Category
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  Link 3
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  Link 4
                </a>
              </li>
            </ul>
          </nav>
    </div>
  )
}

export default LeftMenu
