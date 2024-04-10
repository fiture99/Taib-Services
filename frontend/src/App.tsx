import React, { useEffect, useState } from 'react';
import Login from './pages/Login'; // Assuming Login component is in a file named Login.tsx
import ProviderPage from './pages/ProviderPage';
import Nav from './Nav';
import { BrowserRouter as Router } from "react-router-dom";


// function App() {
//   const [providers, setProviders] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8080/provider/service_providers")
//       .then(response => response.json())
//       .then(data => {
//         setProviders(data);
//         console.log(data);
//       })
//       .catch(error => console.error('Error fetching providers:', error));
//   }, []);

//   return (
//     <div>
//       <h1>Registered Providers</h1>
//       <ul>
//         {providers.map(provider => (
//           <li key={provider.id}>
//             <div>
//               <strong>Name:</strong> {provider.first_name} {provider.last_name}
//             </div>
//             <div><strong>Email:</strong> {provider.email}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


function App() {
  return (
    <Router>
      <Nav/>
    </Router>
  );
}

export default App;

