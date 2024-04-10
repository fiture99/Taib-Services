import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import {Link, useNavigate } from 'react-router-dom'; 
import SignUp from './SignUp';


export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      console.log(data);
      // Redirect based on user type
      if (data.type === 'provider') {
        navigate('/providerPage');
      } else if (data.type === 'customer') {
        navigate('/customerPage');
      }
    } catch (error: any) {
      console.error('Error logging in:', error.message);
      setError(error.message);
    }
  };
  
  

  return (
    <div className='mt-5'>
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol md='6'>
          <MDBCard>
            <MDBCardBody>
              <h2 className='text-center mb-4'>Login</h2>
              {error && <p className='text-danger mt-3'>{error}</p>}
              <form onSubmit={handleSubmit}>
                <MDBInput label='Email address' type='email' value={email} onChange={handleEmailChange} required  />
                <div className='d-grid gap-2 mb-4'/>            
                  <MDBInput label='Password' type='password' value={password} onChange={handlePasswordChange} required />
                <div className='d-grid gap-2 mt-4'>
                  <MDBBtn color='primary' type='submit'>Login</MDBBtn>
                </div>
              </form>
              <div className='text-center mt-3'> 
                <a href='#' className='text-decoration-none'>Forgot Password?</a>
              </div>
              <div className='text-center mt-3'>
                <span>Don't have an account? </span>
                <Link to='/signup' className='text-decoration-none'>Sign Up</Link>              
                </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  );
}

export default Login;
