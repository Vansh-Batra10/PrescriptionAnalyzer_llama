// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../services/api';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { setToken } = useAuth(); // Get the setToken function from context

//    const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await login(email, password);
//       console.log("Full login response:", response); // Debugging: Log the entire response

//       const access_token = response?.access_token; // Access token with optional chaining
//       if (access_token) {
//         console.log("Extracted access_token:", access_token); // Debugging: Check token extracted
//         localStorage.setItem('token', access_token); // Store token in localStorage
//         navigate('/dashboard');
//       } else {
//         setError('Token not found in response.');
//         console.error('Token not found in response:', response); // Additional logging
//       }
//     } catch (err) {
//       setError('Invalid credentials. Please try again.');
//       console.error('Login error:', err); // Additional logging
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log("Full login response:", response); // Debugging: Log full response

      const token = response?.token; // Use `token` instead of `access_token`
      if (token) {
        console.log("Extracted token:", token); // Debugging: Check extracted token
        localStorage.setItem('token', token); 
        localStorage.setItem('userId', response.user_id);// Store token in localStorage
        navigate('/dashboard');
      } else {
        setError('Token not found in response.');
        console.error('Token not found in response:', response); // Additional logging
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', err); // Additional logging
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
