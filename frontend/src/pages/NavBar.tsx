import React from 'react';
import { Link } from 'react-router-dom';
import CustomerRequests from './CustomerRequests';


function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
      <div className="container ">
        <Link className="navbar-brand" to="/">Taib Services</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='./CustomerRequests'>My Requests</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Navigation() {
  return (
    <div>
      <Header />
      <div className="wrapper">
        {/* Add main content here */}
      </div>
    </div>
  );
}

export default Navigation;
