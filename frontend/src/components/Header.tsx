import React from 'react';
import styled from 'styled-components';
import { FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';

const HeaderContainer = styled.header`
  position: absolute;
  width: calc(100% - 250px); /* Make it responsive */
  height: 56px;
  left: 250px; /* Adjusted for the sidebar width */
  top: 3;
  background-color: #5679F0; 
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 1, 0.1);
  padding: 0 20px;
  z-index: 1000;

  @media (max-width: 768px) {
    left: 0;
    width: 100%;
  }
`;

const Logo = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: #ff6f61;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;

  a {
    color: #FFFFFF;
    text-decoration: none;
    margin-left: 20px;
    font-size: 1em;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px;
    border-radius: 4px;

    &:hover {
      background-color: #a8c7fa;
      color: #5679F0;
    }

    @media (max-width: 768px) {
      display: none; /* Hide links on small screens */
    }
  }
`;

const IconWrapper = styled.div`
  font-size: 1.5em;
  margin-left: 20px;
  cursor: pointer;
  color: #FFFFFF;

  &:hover {
    color: #333;
  }

  @media (max-width: 768px) {
    margin-left: 10px; /* Adjust margin for smaller screens */
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 5px;
  padding: 5px 10px;
  width: 300px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  margin-left: 10px;
  width: 100%;
`;

// const FaBell = styled`

// `;
const TopNavBar: React.FC = () => {
  return (
    <HeaderContainer>
      <SearchContainer>
        <FaSearch />
        <SearchInput type="text" placeholder="Search..." />
      </SearchContainer>
      <NavLinks>
        <a href="/dashboard">Dashboard</a>
        <a href="/orders">Orders</a>
        <a href="/profile">Profile</a>
        <IconWrapper><FaBell /></IconWrapper>
        <IconWrapper><FaUserCircle /></IconWrapper>
      </NavLinks>
    </HeaderContainer>
  );
};

export default TopNavBar;
