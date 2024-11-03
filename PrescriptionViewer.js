import React, { useState } from 'react';

function PrescriptionViewer() {
  const [prescriptionData, setPrescriptionData] = useState(null);

  const fetchPrescriptionData = async () => {
    const response = await fetch('http://localhost:8000/extract_prescription/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prescription_text: `Your prescription text here`,
      }),
    });

    const data = await response.json();
    setPrescriptionData(data.extracted_data);
  };

  return (
    <div>
      <button onClick={fetchPrescriptionData}>Fetch Prescription Data</button>
      {prescriptionData && (
        <pre>{JSON.stringify(prescriptionData, null, 2)}</pre> )}
    </div>
  );
}

export default PrescriptionViewer;
