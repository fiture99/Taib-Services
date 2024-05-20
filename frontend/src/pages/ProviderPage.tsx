import React, { useEffect, useState } from 'react';
import NavBar from './NavBar'

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
    <div>
      <NavBar/>
      <h1>Welcome to the Provider Page</h1>
      <p>{provider}</p>
    </div>
  )
}

export default ProviderPage;
