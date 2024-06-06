// src/components/ProviderCard.tsx

import React from 'react';
import styled from 'styled-components';
import { FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';

const Card = styled.div`
  width: 18rem;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  // border-radius: 50%;
`;

const CardBody = styled.div`
  padding: 20px;
  
`;

const CardTitle = styled.h5`
  font-size: 1.2em;
  margin: 0 0 10px;
`;

const CardText = styled.p`
  margin: 0 0 10px;
  color: #A3A3A3;
`;

const Button = styled.button`
  background-color:#5679F0 ;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2E53CF;
  }
`;
const IconWrapper = styled.div`

`;

interface Provider {
  _id: string;
  first_name: string;
  last_name: string;
  profession: string;
  address: string;
  rating: number;
}

interface ProviderCardProps {
  provider: Provider;
  handleRequest: (provider: Provider) => void;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider, handleRequest }) => {
  return (
    <Card>
      <CardImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8KJRgiFDNyrYSEZcX2HK2QXF92mjphpS-wFH_dN29wA&s" alt="Provider Image" />
      <CardBody>
        <CardTitle><IconWrapper><FaUserCircle /></IconWrapper>{provider.first_name} {provider.last_name}</CardTitle>
        <CardText>{provider.profession}</CardText>
        <CardText>Address: {provider.address}</CardText>
        <Button onClick={() => handleRequest(provider)}>Request Service</Button>
      </CardBody>
    </Card>
  );
};

export default ProviderCard;
