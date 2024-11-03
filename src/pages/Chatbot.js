// import React, { useState, useEffect, useRef } from 'react';
// import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
// import { sendMessageToChatbot } from '../services/api'; // Import the new function
// import './Chatbot.css';

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: 'user', content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const botReply = await sendMessageToChatbot(input); // Use sendMessageToChatbot
//       const botMessage = { role: 'bot', content: botReply };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Box className="chatbot-container">
//       <Typography variant="h4" className="chatbot-title">Chat with Llama</Typography>
//       <Box className="chat-history">
//         {messages.map((msg, index) => (
//           <Box key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}>
//             <Typography>{msg.content}</Typography>
//           </Box>
//         ))}
//         {isLoading && (
//           <Box className="loading">
//             <CircularProgress size={24} />
//             <Typography variant="caption">Processing your message...</Typography>
//           </Box>
//         )}
//         <div ref={chatEndRef} />
//       </Box>
//       <Box className="chat-input">
//         <TextField
//           variant="outlined"
//           fullWidth
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//         />
//         <Button variant="contained" color="primary" onClick={handleSendMessage} disabled={isLoading}>
//           Send
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Chatbot;
// import React, { useState, useEffect, useRef } from 'react';
// import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
// import { sendMessageToChatbot } from '../services/api'; // Import the new function
// import './Chatbot.css';

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: 'user', content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const botReply = await sendMessageToChatbot(input); // Call sendMessageToChatbot
//       const botMessage = { role: 'bot', content: botReply };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Box className="chatbot-container">
//       <Typography variant="h4" className="chatbot-title">Chat with Llama</Typography>
//       <Box className="chat-history">
//         {messages.map((msg, index) => (
//           <Box key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}>
//             <Typography>{msg.content}</Typography>
//           </Box>
//         ))}
//         {isLoading && (
//           <Box className="loading">
//             <CircularProgress size={24} />
//             <Typography variant="caption">Processing your message...</Typography>
//           </Box>
//         )}
//         <div ref={chatEndRef} />
//       </Box>
//       <Box className="chat-input">
//         <TextField
//           variant="outlined"
//           fullWidth
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//         />
//         <Button variant="contained" color="primary" onClick={handleSendMessage} disabled={isLoading}>
//           Send
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Chatbot;
// import React, { useState, useEffect, useRef } from 'react';
// import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
// import { sendMessageToChatbot } from '../services/api'; // Import the API function
// import './Chatbot.css';

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: 'user', content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');
//     setIsLoading(true);

//     try {
//       const botReply = await sendMessageToChatbot(input);
//       const formattedBotMessage = formatBotMessage(botReply);
//       const botMessage = { role: 'bot', content: formattedBotMessage };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formatBotMessage = (message) => {
//     // Split message lines based on newlines
//     const lines = message.split('\n').filter(line => line.trim() !== '');

//     return lines.map((line, index) => {
//       if (line.startsWith('* ')) {
//         // If line starts with "* ", treat it as a bullet point
//         return (
//           <li key={index}>
//             {line.substring(2)} {/* Remove the "* " part */}
//           </li>
//         );
//       } else if (line.match(/^\d+\./)) {
//         // If line starts with a number followed by a dot, treat it as a numbered list item
//         return (
//           <li key={index}>
//             {line}
//           </li>
//         );
//       } else {
//         // Otherwise, treat it as a normal paragraph
//         return (
//           <p key={index}>
//             {line}
//           </p>
//         );
//       }
//     });
//   };

//   return (
//     <Box className="chatbot-container">
//       <Typography variant="h4" className="chatbot-title">Chat with Llama</Typography>
//       <Box className="chat-history">
//         {messages.map((msg, index) => (
//           <Box key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}>
//             {msg.role === 'bot' ? (
//               <Box component="div" dangerouslySetInnerHTML={{ __html: msg.content }} />  // Display bot messages as formatted content
//             ) : (
//               <Typography >{msg.content}</Typography>
//             )}
//           </Box>
//         ))}
//         {isLoading && (
//           <Box className="loading">
//             <CircularProgress size={24} />
//             <Typography variant="caption">Processing your message...</Typography>
//           </Box>
//         )}
//         <div ref={chatEndRef} />
//       </Box>
//       <Box className="chat-input">
//         <TextField
//           variant="outlined"
//           fullWidth
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//         />
//         <Button variant="contained" color="primary" onClick={handleSendMessage} disabled={isLoading}>
//           Send
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Chatbot;
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import { sendMessageToChatbot } from '../services/api'; // Import the API function
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botReply = await sendMessageToChatbot(input);
      const formattedBotMessage = formatBotMessage(botReply);
      const botMessage = { role: 'bot', content: formattedBotMessage };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatBotMessage = (message) => {
    const lines = message.split('\n').filter(line => line.trim() !== '');
    let formattedMessage = "";

    lines.forEach((line) => {
      if (line.startsWith('* ')) {
        formattedMessage += `<li>${line.substring(2)}</li>`;
      } else if (line.match(/^\d+\./)) {
        formattedMessage += `<li>${line}</li>`;
      } else {
        formattedMessage += `<p>${line}</p>`;
      }
    });

    return `<ul>${formattedMessage}</ul>`;
  };

  return (
    <Box className="chatbot-container">
      <Typography variant="h4" className="chatbot-title">Chat with Llama</Typography>
      <Box className="chat-history">
        {messages.map((msg, index) => (
          <Box key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}>
            {msg.role === 'bot' ? (
              <Box component="div" dangerouslySetInnerHTML={{ __html: msg.content }} />  // Render bot messages as HTML
            ) : (
              <Typography>{msg.content}</Typography>
            )}
          </Box>
        ))}
        {isLoading && (
          <Box className="loading">
            <CircularProgress size={24} />
            <Typography variant="caption">Processing your message...</Typography>
          </Box>
        )}
        <div ref={chatEndRef} />
      </Box>
      <Box className="chat-input">
        <TextField
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} disabled={isLoading}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbot;
