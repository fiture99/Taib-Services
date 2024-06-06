import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { FaBoxOpen, FaCheck, FaTimes } from 'react-icons/fa';
import ProviderCard from './ProviderCard';
import loadingImage from '../assets/Loading_2.gif';
import customerId from '../pages/CustomerRequests';
// import customerId from './CustomerRequests'


const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const Widget = styled.div`
  background: #fff;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const WidgetContent = styled.div`
  margin-left: 15px;
`;

const WidgetHeader = styled.h2`
  margin: 0;
  font-size: 1.2em;
`;

const WidgetValue = styled.p`
  margin: 5px 0 0;
  font-size: 1.5em;
  font-weight: bold;
`;

const IconWrapper = styled.div<{ color: string }>`
  font-size: 2em;
  color: ${({ color }) => color};
`;

const SectionTitle = styled.h2`
  grid-column: span 3;
  text-align: center;
  margin-top: 20px;
`;

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
const LoadingContainer = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`;

const getAuthenticatedCustomerId = () => {
  return 1; // Replace with actual customer ID retrieval logic
};

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const customerId = getAuthenticatedCustomerId();
  // const [customerId, setCustomerId] = useState<number | null>(null); // Added state for customer ID
  const [loading, setLoading] = useState(true); // Initially set loading to true

  // // Fetch authenticated customer ID
  // useEffect(() => {
  //   const fetchCustomerId = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8080/customer/customers");
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch customer ID');
  //       }
  //       const data = await response.json();
  //       setCustomerId(data.id); // Assuming the response has the customer ID in `data.id`
  //     } catch (error) {
  //       console.error('Error fetching customer ID:', error);
  //     }
  //   };

  //   fetchCustomerId();
  // }, []);


  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch("http://localhost:8080/provider/service_providers");
        if (!response.ok) {
          throw new Error('Failed to fetch providers');
        }
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        console.error('Error fetching providers:', error);
        // Handle error
        Swal.fire('Error', 'Failed to fetch providers. Please try again later.', 'error');
      } finally {
        setLoading(false); // Set loading to false after fetching, regardless of success or error
      }
    };
    setLoading(true); // Set loading to true when fetching starts
    const timeout = setTimeout(() => {
      fetchProviders();
    }, 3000); // Delay fetching for 10 seconds

    return () => clearTimeout(timeout); // Clear the timeout when component unmounts
  }, []); 

  const handleRequest = async (provider: Provider) => {
      console.log('Provider', provider);
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
          provider_id: provider.id, // Assuming provider ID is stored in _id field
          request_details: description,
          // status: 'pending',
          // date: new Date().toISOString()
        };
  
        console.log('Request Data:', requestData); // Log the request data
  
        try {
          const response = await fetch("http://localhost:8080/requests", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          });
  
          if (!response.ok) {
            throw new Error('Failed to submit request');
          }
  
          const data = await response.json();
          Swal.fire('Request submitted', 'Your service request has been submitted successfully', 'success');
        } catch (error) {
          console.error('Error submitting request:', error);
          Swal.fire('Error', 'Failed to submit your request. Please try again later.', 'error');
        }
      }  };

  return (
    <DashboardContainer>
      <Widget>
        <IconWrapper color="#4CAF50"><FaBoxOpen /></IconWrapper>
        <WidgetContent>
          <WidgetHeader>Pending Requests</WidgetHeader>
          <WidgetValue>75</WidgetValue>
        </WidgetContent>
      </Widget>
      <Widget>
        <IconWrapper color="#2196F3"><FaCheck /></IconWrapper>
        <WidgetContent>
          <WidgetHeader>Services Delivered</WidgetHeader>
          <WidgetValue>357</WidgetValue>
        </WidgetContent>
      </Widget>
      <Widget>
        <IconWrapper color="#f44336"><FaTimes /></IconWrapper>
        <WidgetContent>
          <WidgetHeader>Services Canceled</WidgetHeader>
          <WidgetValue>65</WidgetValue>
        </WidgetContent>
      </Widget>

      <SectionTitle>Available Providers</SectionTitle>
      {loading ? (
        <LoadingContainer>
          <img src={loadingImage} alt="Loading..." />
        </LoadingContainer>
      ) : (
        providers.map(provider => (
          <ProviderCard key={provider._id} provider={provider} handleRequest={handleRequest} />
        ))
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
