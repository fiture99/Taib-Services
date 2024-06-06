import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import NavBar from './NavBar';
import SideBar from './SideBar';
import RatingStars from './RatingStars';
import loadingGif from '../assets/Loading_2.gif'
// import CustomerRequests from './CustomerRequests'
import customerId from './CustomerRequests'

// Mock authenticated customer ID (replace with actual implementation)
const getAuthenticatedCustomerId = () => {
  return 1;
};

interface Provider {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  contact_no: string;
  profession: string;
  address: string;
  rating: number;
}

export function CustomerPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const customerId = getAuthenticatedCustomerId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/provider/service_providers");
        if (!response.ok) {
          throw new Error('Failed to fetch providers');
        }
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        console.error('Error fetching providers:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    const timer = setTimeout(() => {
      fetchData();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);


  const handleRequest = async (provider: Provider) => {
    console.log('Provider', provider)
    const { value: description } = await Swal.fire({
      title: `Request service from ${provider.first_name} ${provider.last_name}`,
      input: 'textarea',
      inputLabel: 'Describe your issue',
      inputPlaceholder: 'Type your issue here...',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!';
        }
      }
    });

    if (description) {
      const requestData = {
        customer_id: customerId,
        provider_id: provider.id,
        request_details: description,
        // status: 'pending',
        // date: new Date().toISOString()
      
      };

      console.log('Request Data:', requestData, provider._id); // Log the request data

      fetch("http://localhost:8080/requests", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to submit request');
          }
          return response.json();
        })
        .then(data => {
          Swal.fire('Request submitted', 'Your service request has been submitted successfully', 'success');
        })
        .catch(error => {
          console.error('Error submitting request:', error);
          Swal.fire('Error', 'Failed to submit your request. Please try again later.', 'error');
        });
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            {/* Sidebar goes here */}
          </div>
          <div className="col-lg-10">
            <h1 className="text-center mb-3">Welcome to the Customer Page</h1>
            {loading ? (
              <div className="text-center">
                <img src={loadingGif} alt="Loading..." />
              </div>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
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
                        <p className="card-text">Profession: {provider.profession}</p>
                        <p className="card-text">Address: {provider.address}</p>
                        <button className="btn btn-primary" onClick={() => handleRequest(provider)}>Request Service</button>
                        <RatingStars rating={provider.rating} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerPage;