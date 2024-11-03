// // // // src/components/Analytics.js
// // // import React from 'react';
// // // import { Card, CardContent, Typography } from '@mui/material';
// // // import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // // const data = [
// // //   { name: 'Day 1', bp: 120, pulse: 75 },
// // //   { name: 'Day 2', bp: 130, pulse: 80 },
// // //   { name: 'Day 3', bp: 125, pulse: 72 },
// // // ];

// // // const Analytics = () => {
// // //   return (
// // //     <Card>
// // //       <CardContent>
// // //         <Typography variant="h6">Health Analytics</Typography>
// // //         <ResponsiveContainer width="100%" height={300}>
// // //           <LineChart data={data}>
// // //             <CartesianGrid strokeDasharray="3 3" />
// // //             <XAxis dataKey="name" />
// // //             <YAxis />
// // //             <Tooltip />
// // //             <Legend />
// // //             <Line type="monotone" dataKey="bp" stroke="#8884d8" activeDot={{ r: 8 }} />
// // //             <Line type="monotone" dataKey="pulse" stroke="#82ca9d" />
// // //           </LineChart>
// // //         </ResponsiveContainer>
// // //       </CardContent>
// // //     </Card>
// // //   );
// // // };

// // // export default Analytics;
// // // import React, { useState, useEffect } from 'react';
// // // import { Card, CardContent, Typography } from '@mui/material';
// // // import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// // // import axios from 'axios';

// // // const Analytics = () => {
// // //   const [data, setData] = useState([]);

// // //   useEffect(() => {
// // //     const fetchVitals = async () => {
// // //       const response = await axios.get('http://localhost:8000/vitals');
// // //       const chartData = response.data.vitals.map((vital, index) => ({
// // //         name: `Day ${index + 1}`,
// // //         bp: parseInt(vital.bp.split('/')[0]), // Assuming "120/80" format for BP
// // //         pulse: vital.pulse,
// // //       }));
// // //       setData(chartData);
// // //     };

// // //     fetchVitals();
// // //   }, []);

// // //   return (
// // //     <Card>
// // //       <CardContent>
// // //         <Typography variant="h6">Health Analytics</Typography>
// // //         <ResponsiveContainer width="100%" height={300}>
// // //           <LineChart data={data}>
// // //             <CartesianGrid strokeDasharray="3 3" />
// // //             <XAxis dataKey="name" />
// // //             <YAxis />
// // //             <Tooltip />
// // //             <Legend />
// // //             <Line type="monotone" dataKey="bp" stroke="#8884d8" activeDot={{ r: 8 }} />
// // //             <Line type="monotone" dataKey="pulse" stroke="#82ca9d" />
// // //           </LineChart>
// // //         </ResponsiveContainer>
// // //       </CardContent>
// // //     </Card>
// // //   );
// // // };

// // // export default Analytics;
// // import React, { useState, useEffect } from 'react';
// // import { Card, CardContent, Typography } from '@mui/material';
// // import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// // import axios from 'axios';

// // const Analytics = () => {
// //   const [data, setData] = useState([]);   // Initialize data array for chart
// //   const [error, setError] = useState(null);  // State for handling errors
// //   const token = localStorage.getItem('token');  // Retrieve token from localStorage

// //   useEffect(() => {
// //     const fetchVitals = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:8000/vitals/history', {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });

// //         // Format the response data for the chart, defaulting to an empty array if no data
// //         const chartData = (response.data.bpHistory || []).map((vital, index) => ({
// //           name: `Day ${index + 1}`,
// //           bp: parseInt(vital.systolic, 10),  // Parse systolic BP as integer
// //           pulse: parseInt(vital.pulse, 10),  // Parse pulse as integer
// //         }));

// //         setData(chartData);
// //       } catch (error) {
// //         console.error('Error fetching analytics data:', error);
// //         setError('Failed to load analytics data');
// //       }
// //     };

// //     fetchVitals();
// //   }, [token]);

// //   return (
// //     <Card>
// //       <CardContent>
// //         <Typography variant="h6">Health Analytics</Typography>
// //         {error && <Typography color="error">{error}</Typography>}
// //         <ResponsiveContainer width="100%" height={300}>
// //           <LineChart data={data}>
// //             <CartesianGrid strokeDasharray="3 3" />
// //             <XAxis dataKey="name" />
// //             <YAxis />
// //             <Tooltip />
// //             <Legend />
// //             <Line type="monotone" dataKey="bp" stroke="#8884d8" activeDot={{ r: 8 }} />
// //             <Line type="monotone" dataKey="pulse" stroke="#82ca9d" />
// //           </LineChart>
// //         </ResponsiveContainer>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default Analytics;
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, Typography } from '@mui/material';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import axios from 'axios';

// const Analytics = () => {
//   const [data, setData] = useState([]);   // Initialize data array for chart
//   const [error, setError] = useState(null);  // State for handling errors
//   const token = localStorage.getItem('token');  // Retrieve token from localStorage

//   useEffect(() => {
//     const fetchVitals = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/vitals/history', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         // Format the response data for the chart
//         const chartData = response.data.map((vital, index) => {
//           const [systolic, diastolic] = vital.bp ? vital.bp.split('/').map(Number) : [null, null];
//           return {
//             name: `Day ${index + 1}`,
//             systolic: systolic || 0,      // Systolic BP value, default to 0 if missing
//             diastolic: diastolic || 0,    // Diastolic BP value, default to 0 if missing
//             pulse: parseInt(vital.pulse, 10) || 0,  // Pulse, default to 0 if missing
//           };
//         });

//         setData(chartData);
//       } catch (error) {
//         console.error('Error fetching analytics data:', error);
//         setError('Failed to load analytics data');
//       }
//     };

//     fetchVitals();
//   }, [token]);

//   return (
//     <Card>
//       <CardContent>
//         <Typography variant="h6">Health Analytics</Typography>
//         {error && <Typography color="error">{error}</Typography>}
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="systolic" stroke="#8884d8" name="Systolic BP" activeDot={{ r: 8 }} />
//             <Line type="monotone" dataKey="diastolic" stroke="#82ca9d" name="Diastolic BP" />
//             <Line type="monotone" dataKey="pulse" stroke="#ff7300" name="Pulse" />
//           </LineChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// };

// export default Analytics;
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Analytics = ({refresh}) => {
  const [data, setData] = useState([]); // Initialize data array for chart
  const [error, setError] = useState(null); // State for handling errors
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  useEffect(() => {
    const fetchVitals = async () => {
      try {
        const response = await axios.get('http://localhost:8000/vitals/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Format the response data for the chart
        const chartData = response.data.map((vital, index) => {
          // Check if bp data is available and correctly formatted
          if (!vital.bp || !vital.bp.includes('/')) {
            console.warn(`BP data format issue at index ${index}: ${vital.bp}`);
          }

          // Split systolic and diastolic values, handling missing data gracefully
          const [systolic, diastolic] = vital.bp
            ? vital.bp.split('/').map(num => parseInt(num, 10) || 0) // Parse and set 0 if NaN
            : [0, 0];
          
          console.log(`Parsed BP for index ${index}: systolic=${systolic}, diastolic=${diastolic}`);

          return {
            name: `Day ${index + 1}`,
            systolic: systolic || 0, // Systolic BP value, default to 0 if missing
            diastolic: diastolic || 0, // Diastolic BP value, default to 0 if missing
            pulse: parseInt(vital.pulse, 10) || 0, // Pulse, default to 0 if missing
          };
        });

        setData(chartData);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setError('Failed to load analytics data');
      }
    };

    fetchVitals();
  }, [token,refresh]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Health Analytics</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="systolic" stroke="#8884d8" name="Systolic BP" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="diastolic" stroke="#82ca9d" name="Diastolic BP" />
            <Line type="monotone" dataKey="pulse" stroke="#ff7300" name="Pulse" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Analytics;
