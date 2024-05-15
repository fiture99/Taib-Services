import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export function ProviderRegistration() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    profession:'',
    address: '',
    contact: '',
    gender: '',
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
    if (name === 'confirmPassword' && value !== formData.password) {
      setErrorMessage('Password and Confirm Password do not match');
    } else {
      setErrorMessage('');
    }
  };
  

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const gender = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      gender,
    }));
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Password and Confirm Password do not match');
      return;
    }
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
        // Redirect or perform other actions as needed
        navigate(`/login?message=${encodeURIComponent(data.message)}`);
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
      <MDBCol md='4'>
        <MDBCard>
          <MDBCardBody>
            <h2 className='text-center mb-4'>Provider Registration</h2>
            {errorMessage && <p className='text-danger mt-3'>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              <MDBInput label='Email address' type='email' name='email' value={formData.email} onChange={handleChange} required />
              <div className='mb-4'/> {/* Space between Email and Password */}
              <div className='row'>
                <div className='col-md-6 mb-4'>
                  <MDBInput label='Password' type='password' name='password' value={formData.password} onChange={handleChange} required />
                </div>
                <div className='col-md-6 mb-4'>
                  <MDBInput label='Confirm Password' type='password' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} required />
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6 mb-4'>
                  <MDBInput label='First Name' type='text' name='firstName' value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className='col-md-6 mb-4'>
                  <MDBInput label='Last Name' type='text' name='lastName' value={formData.lastName} onChange={handleChange} required />
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6 mb-4'>
                  <MDBInput label='Profession' type='text' name='profession' value={formData.profession} onChange={handleChange} required />
                </div>
                <div className='col-md-6 mb-4'>
                  <MDBInput label='Address' type='text' name='address' value={formData.address} onChange={handleChange} required />
                </div>
              </div>
              <div className='d-grid gap-2'/>
              <MDBInput label='Contact Number' type='text' name='contact' value={formData.contact} onChange={handleChange} required />
              <div className='d-grid gap-2 mb-4'/>
              <div className='mt-3'>
                <label className='form-label'>Gender</label>
                <div className='form-check'>
                  <input className='form-check-input' type='radio' name='gender' id='male' value='male' checked={formData.gender === 'male'} onChange={handleGenderChange} />
                  <label className='form-check-label' htmlFor='male'>
                    Male
                  </label>
                </div>
                <div className='form-check'>
                  <input className='form-check-input' type='radio' name='gender' id='female' value='female' checked={formData.gender === 'female'} onChange={handleGenderChange} />
                  <label className='form-check-label' htmlFor='female'>
                    Female
                  </label>
                </div>
              </div>
              <div className='d-grid gap-2 mt-5'>
                <MDBBtn color='primary' type='submit'>
                  Register
                </MDBBtn>
              </div>
            </form>
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

export default ProviderRegistration;
