import React, { useEffect, useState } from 'react';
import { getPatientSummary } from '../services/api'; // Assuming this is the path to api.js
import { Typography, Container, CircularProgress } from '@mui/material';

const Reports = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token'); // Get token from localStorage
  console.log(token)
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summaryData = await getPatientSummary(token);
        setSummary(summaryData);
      } catch (error) {
        console.error("Failed to fetch patient summary:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [token]);

  if (loading) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '20px' }}>
        <CircularProgress />
        <Typography>Loading patient report...</Typography>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>Patient Summary Report</Typography>
      {summary ? (
         <Typography component="div" dangerouslySetInnerHTML={{ __html: summary }} />
      ) : (
        <Typography variant="body1">No summary available.</Typography>
      )}
    </Container>
  );
};

export default Reports;
