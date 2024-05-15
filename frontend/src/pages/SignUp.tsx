import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export function SignUp() {
  const [role, setRole] = useState('provider'); // Default role is provider
  const navigate = useNavigate();

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }), // Sending role to the backend
      });
      const data = await response.json();
      console.log(data); // Handle response from backend
      // Redirect user after successful signup
      if (response.ok) {
        if (role === 'provider') {
          navigate('/providerRegistration'); // Redirect to provider registration page
        } else {
          navigate('/customerRegistration'); // Redirect to customer registration page
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='mt-5'>
      <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol md='4'>
            <MDBCard>
              <MDBCardBody>
                <h2 className='text-center mb-4'>Sign Up</h2>
                <div className='mb-3'>
                  <label className='form-label'>Register as:</label>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='role'
                      value='provider'
                      checked={role === 'provider'}
                      onChange={handleRoleChange}
                    />
                    <label className='form-check-label'>Provider</label>
                  </div>
                  <div className='form-check'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='role'
                      value='customer'
                      checked={role === 'customer'}
                      onChange={handleRoleChange}
                    />
                    <label className='form-check-label'>Customer</label>
                  </div>
                </div>
                <div className='d-grid gap-2 mt-4'>
                  <MDBBtn color='primary' onClick={handleSignup}>
                    Continue
                  </MDBBtn>
                </div>
                <div className='text-center mt-3'>
                  <span>Already have an account? </span>
                  <a href='/login' className='text-decoration-none'>
                    Login
                  </a>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default SignUp;
