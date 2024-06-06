import React from 'react';
import styled from 'styled-components';
import {FaTachometerAlt, FaClipboardList, FaUsers, FaChartBar, FaStar, FaHamburger, FaCalendarAlt, FaComments, FaWallet, FaBars } from 'react-icons/fa';
import { FcTodoList, FcList, FcCalendar, FcHome, FcVoicePresentation,FcViewDetails} from "react-icons/fc";


const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  width: ${props => (props.isOpen ? '250px' : '80px')};
  background-color: #fff;
  color: #333;
  height: 100vh;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: width 0.3s;

  @media (max-width: 768px) {
    width: ${props => (props.isOpen ? '250px' : '0')};
    overflow: hidden;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 1.5em;
  cursor: pointer;
  margin-bottom: 30px;
  outline: none;
  display: flex;
  align-items: center;
`;

const Logo = styled.div<{ isOpen: boolean }>`
  font-size: 1.5em;
  font-weight: bold;
  color: #333333;
  margin-bottom: 30px;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const MenuItem = styled.div<{ isOpen: boolean }>`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  a {
    color: #333;
    text-decoration: none;
    font-size: 1em;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px;
    border-radius: 4px;

    &:hover {
      background-color: #5679F0;
      color: white;
    }

    span {
      display: ${props => (props.isOpen ? 'inline' : 'none')};
      margin-left: 10px;
    }
  }
`;

const IconWrapper = styled.div`
  font-size: 1.4em;
`;

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <SidebarContainer isOpen={isOpen}>
      <ToggleButton onClick={toggleSidebar}>
        <FaBars />
      </ToggleButton>
      <Logo isOpen={isOpen}>Taib Services</Logo>
      <MenuItem isOpen={isOpen}><a href="/"><IconWrapper><FcHome /></IconWrapper><span>Dashboard</span></a></MenuItem>
      <MenuItem isOpen={isOpen}><a href="/request_list"><IconWrapper><FcList /></IconWrapper><span>Request List</span></a></MenuItem>
      <MenuItem isOpen={isOpen}><a href="/request_details"><IconWrapper><FcTodoList /></IconWrapper><span>Request Detail</span></a></MenuItem>
      <MenuItem isOpen={isOpen}><a href="/reviews"><IconWrapper><FaStar /></IconWrapper><span>Reviews</span></a></MenuItem>
      <MenuItem isOpen={isOpen}><a href="/service_deatail"><IconWrapper><FcViewDetails /></IconWrapper><span>Service Detail</span></a></MenuItem>
      <MenuItem isOpen={isOpen}><a href="/calendar"><IconWrapper><FcCalendar /></IconWrapper><span>Calendar</span></a></MenuItem>
      <MenuItem isOpen={isOpen}><a href="/chat"><IconWrapper><FcVoicePresentation /></IconWrapper><span>Chat</span></a></MenuItem>
      <MenuItem isOpen={isOpen}><a href="/wallet"><IconWrapper><FaWallet /></IconWrapper><span>Wallet</span></a></MenuItem>
    </SidebarContainer>
  );
};

export default Sidebar;

