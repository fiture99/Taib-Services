import React from 'react';
import { Route, Routes } from "react-router-dom";
import {ProviderPage} from "./pages/ProviderPage";
import {Login} from './pages/Login';
// import {ProviderSingUp} from './pages/ProviderSingUp';
// import {UserSingUp} from './pages/UserSingUp';
import SignUp from './pages/SignUp';
import ProviderRegistration from './pages/ProviderRegistration';
import CustomerRegistration from './pages/CustomerRegistration';
import CustomerPage from './pages/CustomerPage';
import RequestDescription from './ui/RequestDescription';
import CustomerRequests from './pages/CustomerRequests';

export function Nav() {
  return (
      <Routes>
        <Route path="/providerPage" element={<ProviderPage/>} />
        <Route path="/customerPage" element={<CustomerPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/providerRegistration" element={<ProviderRegistration />} />
        <Route path="/customerRegistration" element={<CustomerRegistration />} />
        <Route path="/requests" element={<RequestDescription />} />
        <Route path="/customerPage/CustomerRequests" element={<CustomerRequests />} />
        
      </Routes>
  )
}

export default Nav
