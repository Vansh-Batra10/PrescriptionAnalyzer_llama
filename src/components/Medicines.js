// // src/components/Medicines.js
// import React from 'react';
// import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// const medicinesData = [
//   { name: 'Paracetamol', dose: '500mg', frequency: 'Twice a day', duration: '5 days' },
//   { name: 'Ibuprofen', dose: '200mg', frequency: 'Once a day', duration: '3 days' },
// ];

// const Medicines = () => {
//   return (
//     <Card>
//       <CardContent>
//         <Typography variant="h6">Medicines</Typography>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Dose</TableCell>
//                 <TableCell>Frequency</TableCell>
//                 <TableCell>Duration</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {medicinesData.map((medicine, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{medicine.name}</TableCell>
//                   <TableCell>{medicine.dose}</TableCell>
//                   <TableCell>{medicine.frequency}</TableCell>
//                   <TableCell>{medicine.duration}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>
//     </Card>
//   );
// };

// export default Medicines;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // For fetching data from backend

// const Medicines = () => {
//   const [medicines, setMedicines] = useState([]);

//   useEffect(() => {
//     // Fetch the extracted medicines data from the backend
//     const fetchMedicines = async () => {
//       const response = await axios.get('http://localhost:8000/extracted-medicines'); // Adjust endpoint as needed
//       setMedicines(response.data.medicines);
//     };

//     fetchMedicines();
//   }, []);

//   return (
//     <div>
//       <h3>Medicines</h3>
//       <ul>
//         {medicines.map((medicine, index) => (
//           <li key={index}>
//             {medicine.Name} - {medicine.Dose} - {medicine.Frequency} - {medicine.Duration}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Medicines;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Medicines = () => {
//   const [medicines, setMedicines] = useState([]);

//   useEffect(() => {
//     const fetchMedicines = async () => {
//       const response = await axios.get('http://localhost:8000/medicines');
//       setMedicines(response.data.medicines);
//     };

//     fetchMedicines();
//   }, []);

//   return (
//     <div>
//       <h3>Medicines</h3>
//       {medicines.length === 0 ? (
//         <p>No medicines data available.</p>
//       ) : (
//         <ul>
//           {medicines.map((medicine, index) => (
//             <li key={index}>
//               {medicine.name} - {medicine.dose} - {medicine.frequency} - {medicine.duration}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Medicines;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Medicines = ({ refresh }) => {
  const [prescriptions, setPrescriptions] = useState({});
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get('http://localhost:8000/medicines/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPrescriptions(response.data || {});
        const firstPrescription = Object.keys(response.data)[0];
        setSelectedPrescription(firstPrescription);
      } catch (error) {
        console.error('Error fetching medicines:', error);
        setError('Failed to load medicines data');
        setPrescriptions({});
      }
    };

    fetchMedicines();
  }, [token, refresh]); // refresh added as a dependency

  const handlePrescriptionChange = (event) => {
    setSelectedPrescription(event.target.value);
  };

  return (
    <div>
      <h3>Medicines</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Dropdown to select prescription */}
      <select onChange={handlePrescriptionChange} value={selectedPrescription}>
        {Object.keys(prescriptions).map((prescriptionId) => (
          <option key={prescriptionId} value={prescriptionId}>
            Prescription {prescriptionId}
          </option>
        ))}
      </select>

      {/* Display medicines for the selected prescription */}
      <ul>
        {selectedPrescription && prescriptions[selectedPrescription] ? (
          prescriptions[selectedPrescription].map((medicine, index) => (
            <li key={index}>
              {medicine.name} - {medicine.dose} - {medicine.frequency} - {medicine.duration}
            </li>
          ))
        ) : (
          <p>No medicines data available for this prescription.</p>
        )}
      </ul>
    </div>
  );
};

export default Medicines;
