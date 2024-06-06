import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Dashboard from '../components/Dashboard';
import TopNavBar from '../components/Header';

const LayoutContainer = styled.div`
  display: flex;
`;

const MainContentContainer = styled.main<{ isOpen: boolean }>`
  flex-grow: 1;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-top: 56px; /* Adjust for the top navbar height */
  transition: margin-left 0.3s;

  @media (max-width: 768px) {
    padding-top: 76px; /* Adjust for navbar height */
  }
`;

const CustomerView: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <TopNavBar />
      <LayoutContainer>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <MainContentContainer isOpen={isSidebarOpen}>
          <Dashboard />
        </MainContentContainer>
      </LayoutContainer>
    </div>
  );
};

export default CustomerView;
