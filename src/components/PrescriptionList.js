// import React, { useEffect, useState } from 'react';
// import { getPrescriptions, viewPrescriptionLink } from '../services/api';

// const PrescriptionList = () => {
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const fileNames = await getPrescriptions();
//         setFiles(fileNames);
//       } catch (error) {
//         console.error("Error loading prescriptions:", error);
//       }
//     };

//     fetchFiles();
//   }, []);

//   return (
//     <div>
//       <h3>Prescriptions</h3>
//       <ul>
//         {files.map((file, index) => (
//           <li key={index}>
//             <a href={viewPrescriptionLink(file)} target="_blank" rel="noopener noreferrer">
//               {file}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PrescriptionList;
import React, { useEffect, useState } from 'react';
import { getPrescriptions, openPrescription } from '../services/api'; // Import the new function
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const PrescriptionList = ({ userId }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const token = localStorage.getItem('token');
  const actualUserId = userId || localStorage.getItem('userId');

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const filenames = await getPrescriptions(token);
        setPrescriptions(filenames);
      } catch (error) {
        console.error("Failed to fetch prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, [token]);

  const handleFileOpen = (filename) => {
    openPrescription(actualUserId, filename, token); // Call openPrescription with necessary parameters
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>Uploaded Prescriptions</Typography>
      <List>
        {prescriptions.map((filename, index) => (
          <ListItem 
            button 
            key={index} 
            onClick={() => handleFileOpen(filename)}  // Call handleFileOpen on click
          >
            <ListItemText primary={filename} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PrescriptionList;
