import React from 'react';
import { Route, Routes } from "react-router-dom";
import {ProviderPage} from "./pages/ProviderPage";
import {Login} from './pages/Login';
// import {ProviderSingUp} from './pages/ProviderSingUp';
// import {UserSingUp} from './pages/UserSingUp';
import SignUp from './pages/SignUp';
import ProviderRegistration from './pages/ProviderRegistration';
import CustomerRegistration from './pages/CustomerRegistration';
export function Nav() {
  return (
      <Routes>
        <Route path="/providerPage" element={<ProviderPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/providerRegistration" element={<ProviderRegistration />} />
        <Route path="/customerRegistration" element={<CustomerRegistration />} />
      </Routes>
  )
}

export default Nav
