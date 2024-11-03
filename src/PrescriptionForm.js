import React, { useState } from 'react';
import { extractPrescription } from './api'; // Import the function you created in api.js

const PrescriptionForm = () => {
  const [prescriptionText, setPrescriptionText] = useState('');
  const [extractedData, setExtractedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await extractPrescription(prescriptionText);
      setExtractedData(result);
    } catch (err) {
      setError('Failed to extract prescription data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Extract Prescription Details</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          cols="50"
          value={prescriptionText}
          onChange={(e) => setPrescriptionText(e.target.value)}
          placeholder="Enter prescription text here"
        />
        <br />
        <button type="submit" disabled={loading}>Extract</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {extractedData && (
        <div>
          <h2>Extracted Data:</h2>
          <pre>{JSON.stringify(extractedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PrescriptionForm;
