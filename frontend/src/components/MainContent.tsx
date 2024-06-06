import React, { ReactNode } from 'react';
import styled from 'styled-components';

const MainContentContainer = styled.main`
  margin-left: 270px; /* Adjusted for the sidebar width */
  padding: 20px;
`;

interface MainContentProps {
  children: ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <MainContentContainer>
      {children}
    </MainContentContainer>
  );
};

export default MainContent;
