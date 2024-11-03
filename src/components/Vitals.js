// // // src/components/Vitals.js
// // import React from 'react';
// // import { Card, CardContent, Typography } from '@mui/material';

// // const Vitals = () => {
// //   return (
// //     <Card>
// //       <CardContent>
// //         <Typography variant="h6">Vitals</Typography>
// //         <Typography variant="body2">BP: 120/80 mmHg</Typography>
// //         <Typography variant="body2">Pulse: 72 bpm</Typography>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default Vitals;
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Typography } from '@mui/material';
// import axios from 'axios';

// // const Vitals = () => {
// //   const [vitals, setVitals] = useState([]);

// //   useEffect(() => {
// //     const fetchVitals = async () => {
// //       const response = await axios.get('http://localhost:8000/vitals');
// //       setVitals(response.data.vitals);
// //     };

// //     fetchVitals();
// //   }, []);
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// const Vitals = () => {
//   const [vitals, setVitals] = useState([]);  // Initialize vitals as an empty array
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem('token');  // Get the token from localStorage

//   useEffect(() => {
//     const fetchVitals = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/vitals/history', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setVitals(response.data.bpHistory || []); // Set vitals, default to empty array if not found
//       } catch (error) {
//         console.error('Error fetching vitals:', error);
//         setError('Failed to load vitals data');
//         setVitals([]);  // Ensure vitals is an array on error
//       }
//     };

//     fetchVitals();
//   }, [token]);

//   return (
//     <div>
//       <h3>Vitals History</h3>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {vitals.length > 0 ? (
//         <ul>
//           {vitals.map((vital, index) => (
//             <li key={index}>
//               Date: {vital.date}, BP: {vital.systolic}/{vital.diastolic}, Pulse: {vital.pulse}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No vitals data available.</p>
//       )}
//     </div>
//   );
// };

// export default Vitals;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vitals = ({ refresh }) => {
  const [vitals, setVitals] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchVitals = async () => {
      try {
        const response = await axios.get('http://localhost:8000/vitals/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVitals(response.data || []);
      } catch (error) {
        console.error('Error fetching vitals:', error);
        setError('Failed to load vitals data');
        setVitals([]);
      }
    };

    fetchVitals();
  }, [token, refresh]); // refresh added as a dependency

  return (
    <div>
      <h3>Vitals History</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {vitals.length > 0 ? (
        <ul>
          {vitals.map((vital, index) => {
            const [systolic, diastolic] = vital.bp.split('/');
            return (
              <li key={index}>
                Date: {vital.date}, BP: {systolic}/{diastolic}, Pulse: {vital.pulse} bpm
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No vitals data available.</p>
      )}
    </div>
  );
};

export default Vitals;
