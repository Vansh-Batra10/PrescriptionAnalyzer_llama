import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const registerUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
  };
  
export const uploadPrescription = async (file, token) => {
  const formData = new FormData();
  console.log("Authorization header being sent:", `Bearer ${token}`);
  formData.append('file', file);
  
  try {
    const response = await axios.post('http://localhost:8000/prescriptions/upload', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,  // Set the token in the Authorization header
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error in uploadPrescription API call:', error);
    throw error;
  }
};
export const getVitalsHistory = async (token) => {

  const response = await axios.get(`${API_URL}/vitals/history`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  console.log(response)
  return response.data;
};
// // Function to fetch the list of prescriptions for a specific user
// export const getPrescriptions = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/prescriptions/list`);
//     return response.data.files; // Returns array of file names
//   } catch (error) {
//     console.error("Error fetching prescription list:", error);
//     throw error;
//   }
// };


// Generate view link for each file
export const viewPrescriptionLink = (filename) => `${API_URL}/prescriptions/view/${filename}`;

export const sendMessageToChatbot = async (message) => {
  const token = localStorage.getItem('token');  // Get the token from local storage
  const response = await axios.post(
    'http://localhost:8000/chatbot',  // Update with your actual backend URL
    { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,  // Send the token for authentication
      },
    }
  );
  return response.data.reply;
};
export const fetchChatHistory = async () => {
  const response = await axios.get('http://localhost:8000/chat_history', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if required for authentication
    }
  });
  return response.data;
};
export const getPatientSummary = async (token) => {
  try {
    const response = await axios.get(`http://localhost:8000/generatepatientsummary`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data.summary;
  } catch (error) {
    console.error("Error fetching patient summary:", error);
    throw error;
  }
};

export const getPrescriptions = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/prescriptions`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data.files; // Returns array of file names
  } catch (error) {
    console.error("Error fetching prescription list:", error);
    throw error;
  }
};

// export const openPrescription = async (userId, filename, token) => {
//   try {
//     const response = await axios.get(`${API_URL}/files/${userId}/${filename}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       },
//       responseType: 'blob' // Receive file as a blob
//     });

//     // Create a blob URL for the file
//     const fileURL = window.URL.createObjectURL(new Blob([response.data]));

//     // Open the file in a new tab
//     window.open(fileURL, '_blank', 'noopener,noreferrer');

//     // Clean up the blob URL after a short delay (optional but recommended)
//     setTimeout(() => {
//       window.URL.revokeObjectURL(fileURL);
//     }, 100);

//   } catch (error) {
//     console.error("Error opening prescription file:", error);
//     throw error;
//   }
// };
export const openPrescription = (userId, filename, token) => {
  // Construct the URL directly with the token as a query parameter
  const fileURL = `${API_URL}/files/${userId}/${filename}?token=${token}`;

  // Open the URL in a new tab directly
  window.open(fileURL, '_blank', 'noopener,noreferrer');
};