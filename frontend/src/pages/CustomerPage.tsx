import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import RatingStars from './RatingStars';

interface Provider {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  contact_no: string;
  profession: string;
  address: string;
  rating: number;
  // Add other properties as needed
}

export function CustomerPage() {
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/provider/service_providers")
      .then(response => response.json())
      .then(data => {
        setProviders(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching providers:', error));
  }, []);

  const ratings = {
    provider1Id: 4,
    provider2Id: 3.5,
    provider3Id: 5,
    // Add more ratings as needed
  };
  return (
    <div>
      <NavBar />
      {/* <SideBar/> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            {/* Sidebar goes here */}
          </div>
          <div className="col-lg-10">
            {/* Main content goes here */}
            <h1 className="text-center mb-3">Welcome to the Customer Page</h1>
            <div className="row">
              <h2 className="text-center mb-4">Available Providers</h2>
              {providers.map(provider => (
                <div key={provider._id} className="col-md-4 mb-6">
                  <div className="card mb-3" style={{ width: '18rem' }}>
                    <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8KJRgiFDNyrYSEZcX2HK2QXF92mjphpS-wFH_dN29wA&s" alt="Provider Image" />
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <h5 className="card-title  ml-2">{provider.first_name} {provider.last_name}</h5>
                      </div>
                      {/* <p className="card-text">Email: {provider.email}</p> */}
                      <p className="card-text">Contact No: {provider.contact_no}</p>
                      <p className="card-text">Profession: {provider.profession}</p>
                      <p className="card-text">Address: {provider.address}</p>
                      <button className="btn btn-primary" onClick={() => handleRequest(provider._id)}>Request Service</button>
                      <RatingStars rating={ratings[provider._id]} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerPage;
