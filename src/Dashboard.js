import React, { useState, useEffect } from 'react';
import { getVitals, getVitalsHistory, getMedicines, getReports } from './api'; // Assuming you have these APIs
import Chart from 'chart.js/auto'; // Assuming you're using Chart.js
import PrescriptionForm from './PrescriptionForm';
import ResponseDisplay from './ResponseDisplay';

const Dashboard = () => {
  const [vitals, setVitals] = useState(null);
  const [vitalsHistory, setVitalsHistory] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [reports, setReports] = useState([]);
  const [chatbotResponse, setChatbotResponse] = useState('');
  
  useEffect(() => {
    // Fetch vitals and medicine data when the dashboard loads
    const fetchVitals = async () => {
      const result = await getVitals();
      setVitals(result);
    };
    const fetchVitalsHistory = async () => {
      const result = await getVitalsHistory();
      setVitalsHistory(result.bpHistory);
    };
    const fetchMedicines = async () => {
      const result = await getMedicines();
      setMedicines(result);
    };
    const fetchReports = async () => {
      const result = await getReports();
      setReports(result);
    };
    fetchVitals();
    fetchVitalsHistory();
    fetchMedicines();
    fetchReports();
  }, []);

  // Function to handle chatbot queries
  const handleChatbotSubmit = async (query) => {
    const response = await chatbotInteraction(query); // API call to get chatbot response
    setChatbotResponse(response.reply);
  };

  return (
    <div className="dashboard-container">
      <h1>Patient Dashboard</h1>
      
      <section className="prescription-section">
        <h2>Upload Prescription</h2>
        <PrescriptionForm />
      </section>
      
      <section className="vitals-section">
        <h2>Vitals</h2>
        {vitals ? (
          <div>
            <p>Blood Pressure: {vitals.bp}</p>
            <p>Pulse: {vitals.pulse}</p>
            <p>Temperature: {vitals.temperature}</p>
          </div>
        ) : <p>Loading vitals...</p>}
        <h3>Blood Pressure History</h3>
        <canvas id="bpChart"></canvas>
      </section>

      <section className="medicines-section">
        <h2>Medicines</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Dose</th>
              <th>Frequency</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med, index) => (
              <tr key={index}>
                <td>{med.name}</td>
                <td>{med.dose}</td>
                <td>{med.frequency}</td>
                <td>{med.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="chatbot-section">
        <h2>Health Chatbot</h2>
        <input
          type="text"
          placeholder="Ask a question..."
          onKeyDown={(e) => e.key === 'Enter' && handleChatbotSubmit(e.target.value)}
        />
        <ResponseDisplay response={chatbotResponse} />
      </section>
    </div>
  );
};

export default Dashboard;