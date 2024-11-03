// // src/components/Dashboard.js
// import React from 'react';
// import { Container, Typography, Grid } from '@mui/material';
// import Sidebar from './Sidebar';
// import Navbar from './Navbar';
// import Vitals from './Vitals';
// import Medicines from './Medicines';
// import Reports from './Reports';
// import Analytics from './Analytics';

// const Dashboard = () => {
//   return (
//     <div>
//       <Navbar />
//       <Grid container>
//         <Grid item xs={2}>
//           <Sidebar />
//         </Grid>
//         <Grid item xs={10}>
//           <Container>
//             <Typography variant="h4" gutterBottom>
//               Dashboard
//             </Typography>
//             <Vitals />
//             <Medicines />
//             <Reports />
//             <Analytics />
//           </Container>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default Dashboard;
// const Dashboard = () => {
//   const [refresh, setRefresh] = useState(false);

//   const handleUploadSuccess = () => {
//     setRefresh(!refresh); // Toggle refresh to trigger re-fetch
//   };

//   return (
//     <div>
//       <Navbar />
//       <Grid container>
//         <Grid item xs={2}>
//           <Sidebar />
//         </Grid>
//         <Grid item xs={10}>
//           <Container>
//             <Typography variant="h4" gutterBottom>Dashboard</Typography>
//             <Vitals key={refresh} />
//             <Medicines key={refresh} />
//             <Reports />
//             <Analytics key={refresh} />
//           </Container>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default Dashboard;
