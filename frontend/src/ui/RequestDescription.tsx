import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';

const RequestDescription = ({ provider, show, handleClose, handleSubmit }) => {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFormSubmit = () => {
    handleSubmit(provider._id, description);
    setDescription(''); // Clear the input after submit
  };

  return (
    <MDBModal show={show} setShow={handleClose} tabIndex='-1'>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Request Service</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={handleClose}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <p>Request service from {provider.first_name} {provider.last_name}</p>
            <MDBInput
              label='Describe your issue'
              type='textarea'
              rows='3'
              value={description}
              onChange={handleDescriptionChange}
            />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color='secondary' onClick={handleClose}>Close</MDBBtn>
            <MDBBtn color='primary' onClick={handleFormSubmit}>Submit Request</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default RequestDescription;
