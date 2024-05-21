import React, { useEffect, useState } from 'react';
import loadingGif from '../assets/Loading_2.gif'
interface Request {
  _id: string;
  provider_id: string;
  request_details: string;
  status: string;
  date: string;
}

const CustomerRequests = ({ customerId }) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 

  useEffect(() => {
    fetch(`http://localhost:8080/customer/${customerId}/requests`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }
        return response.json();
      })
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching requests:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [customerId]);

  if (loading) {
    return (
      <div className="text-center">
        <img src={loadingGif} alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Your Requests</h2>
      {requests.length === 0 ? (
        <p>You have no requests.</p>
      ) : (
        <ul>
          {requests.map(request => (
            <li key={request._id}>
              <p>Provider ID: {request.provider_id}</p>
              <p>Details: {request.request_details}</p>
              <p>Status: {request.status}</p>
              <p>Date: {request.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerRequests;
