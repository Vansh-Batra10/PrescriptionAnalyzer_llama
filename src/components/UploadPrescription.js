// // import React from 'react';
// import { Button, Typography, Box } from '@mui/material';
// import { uploadPrescription } from '../services/api';

// const UploadPrescription = ({ onUploadSuccess }) => {
//   const token = localStorage.getItem('token');  // Retrieve token from localStorage

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     try {
//       const response = await uploadPrescription(file, token);
//       console.log("Upload response:", response);
//       onUploadSuccess();  // Call the callback function to refresh Dashboard
//     } catch (error) {
//       console.error("Failed to upload prescription:", error);
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h6">Upload Prescription</Typography>
//       <input
//         type="file"
//         accept=".pdf"
//         onChange={handleFileUpload}
//         style={{ display: 'none' }}
//         id="upload-button"
//       />
//       <label htmlFor="upload-button">
//         <Button variant="contained" component="span">Upload Prescription</Button>
//       </label>
//     </Box>
//   );
// };

// export default UploadPrescription;
import React, { useState } from 'react';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import { uploadPrescription } from '../services/api';

const UploadPrescription = ({ onUploadSuccess }) => {
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true); // Start loading

    try {
      const response = await uploadPrescription(file, token);
      console.log("Upload response:", response);
      onUploadSuccess(); // Trigger refresh in parent component if needed
    } catch (error) {
      console.error("Failed to upload prescription:", error);
    } finally {
      setIsLoading(false); // Stop loading once the response is received
    }
  };

  return (
    <Box>
      <Typography variant="h6">Upload Prescription</Typography>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        id="upload-button"
      />
      <label htmlFor="upload-button">
        <Button variant="contained" component="span">Upload Prescription</Button>
      </label>

      {isLoading && (
        <Box display="flex" alignItems="center" mt={2}>
          <CircularProgress size={24} />
          <Typography variant="body2" ml={1}>Processing prescription by Llama</Typography>
        </Box>
      )}
    </Box>
  );
};

export default UploadPrescription;
