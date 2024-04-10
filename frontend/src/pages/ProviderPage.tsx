import React from 'react'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";



export function ProviderPage() {

  const [provider, setProvider] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/provider/service_providers")
      .then(response => response.json())
      .then(data => {
        setProvider(data.provider);
        console.log(data);
      })
      .catch(error => console.error('Error fetching providers:', error));
  }, []);
  return (
    <Router>
    <div>
      <h1>Welcome to the Provider Page</h1>
      <p>{provider}</p>
    </div>
    </Router>
  )
}

export default ProviderPage
