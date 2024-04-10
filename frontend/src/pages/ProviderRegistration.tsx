import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export function ProviderRegistration() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/provider/provider_register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data); // Handle response from server
      if (response.ok) {
        // alert('Provider registered successfully');
        // Redirect or perform other actions as needed
        // navigate('/providerPage');
        setMessage(data.message);
      } else {
        setErrorMessage(data.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Error registering provider:', error);
      setErrorMessage('An error occurred while registering the provider');
    }
  };

  return (
    <div className='mt-5'>
      <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol md='6'>
            <MDBCard>
              <MDBCardBody>
                <h2 className='text-center mb-4'>Provider Registration</h2>
                {errorMessage && <p className='text-danger mt-3'>{errorMessage}</p>}
                {message && <p className='text-success mt-3'>{message}</p>}

                <form onSubmit={handleSubmit}>
                  <MDBInput label='Email address' type='email' name='email' value={formData.email} onChange={handleChange} required  />
                  <div className='d-grid gap-2 mb-4'/>            

                  <MDBInput label='Password' type='password' name='password' value={formData.password} onChange={handleChange} required  />
                  <div className='d-grid gap-2 mb-4'/>            

                  <MDBInput label='First Name' type='text' name='first_name' value={formData.first_name} onChange={handleChange} required  />
                  <div className='d-grid gap-2 mb-4'/>            

                  <MDBInput label='Last Name' type='text' name='last_name' value={formData.last_name} onChange={handleChange} required  />
                  <div className='d-grid gap-2 mt-5'>
                    <MDBBtn color='primary' type='submit'>Register</MDBBtn>
                  </div>
                </form>
                <div className='text-center mt-3'>
                  <span>Already have an account? </span>
                  <a href='/login' className='text-decoration-none'>Login</a>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default ProviderRegistration;
