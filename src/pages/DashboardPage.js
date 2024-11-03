// import React, { useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import Vitals from '../components/Vitals';
// import Medicines from '../components/Medicines';
// import Analytics from '../components/Analytics';
// import UploadPrescription from '../components/UploadPrescription';
// import { Container, Typography, Grid } from '@mui/material';
// import Navbar from '../components/Navbar';

// const Dashboard = () => {
//   const [refresh, setRefresh] = useState(false);

//   // Function to handle successful uploads
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
            
//             {/* Upload Prescription Component */}
//             <UploadPrescription onUploadSuccess={handleUploadSuccess} />
            
//             {/* Vitals, Medicines, and Analytics Components */}
//             <Vitals key={refresh} />
//             <Medicines key={refresh} />
//             <Analytics key={refresh} />
//           </Container>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Vitals from '../components/Vitals';
import Medicines from '../components/Medicines';
import Analytics from '../components/Analytics';
import UploadPrescription from '../components/UploadPrescription';
import { Container, Typography, Grid } from '@mui/material';
import Navbar from '../components/Navbar';
import PrescriptionList from '../components/PrescriptionList';
const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);

  // Function to handle successful uploads
  const handleUploadSuccess = () => {
    setRefresh(!refresh); // Toggle refresh to trigger re-fetch
  };
  const userId = localStorage.getItem('userId');
  console.log("Retrieved userId from localStorage:", userId);
  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <Container>
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            
            {/* Upload Prescription Component */}
            <UploadPrescription onUploadSuccess={handleUploadSuccess} />
            <PrescriptionList  userId={userId} key={refresh} />
            {/* Vitals, Medicines, and Analytics Components */}
            <Vitals refresh={refresh} />
            <Medicines refresh={refresh} />
            <Analytics refresh={refresh} />
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
