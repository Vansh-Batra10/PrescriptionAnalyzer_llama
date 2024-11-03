// // src/components/Navbar.js
// import React from 'react';
// import { AppBar, Toolbar, Typography } from '@mui/material';

// const Navbar = () => {
//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6">Health Dashboard</Typography>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Navbar = () => {
//   const { token, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <nav>
//       <h1>Health Dashboard</h1>
//       {token ? (
//         <button onClick={handleLogout}>Logout</button>
//       ) : (
//         <Link to="/">Login</Link>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Check if the token exists in localStorage
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from localStorage
    navigate('/'); // Redirect to home or login page
  };

  return (
    <nav>
      <h1>Health Dashboard</h1>
      {token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
