import React, { useState } from 'react';
import axios from 'axios';

const GetTargetAudi = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      // Add the user's message to the conversation
      setMessages([...messages, { text: inputText, isUser: true }]);
      setInputText('');

      // Simulate response from ChatGPT
      simulateResponseFromChatGPT(inputText);
    }
  };

  const simulateResponseFromChatGPT = async (userMessage) => {
    // Simulate a response from ChatGPT
    const API = 'AIzaSyChUafLzUt7SKD_G0gUefsEdJqqpHmw_dk';
    const dat = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API}`,
      {
        contents: [
          {
            parts: [
              {
                text: `I am a business owner and you are my business analyst which keeps track of my competitors and give me advice. ${userMessage}`
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const responseMessage = dat.data.candidates[0].content.parts[0];
    console.log(responseMessage);
    // Add ChatGPT's response to the conversation
    setMessages((prevMessages) => [...prevMessages, { text: responseMessage.text, isUser: false }]);
  };
  const handleLogout = () => {
    // Logic for logging out the user
    // For example, clearing user session data and redirecting to login page
    console.log("User logged out");
    // Assuming you use localStorage to manage user sessions
    localStorage.removeItem('userSession');
    window.location.href = '/login'; // Adjust the path to your login page
};
const handleGoHome = () => {
  window.location.href = '/homepage'; // Adjust the path to your homepage
};
  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: 'center',fontSize:'80px' }}>Get Advice to beat your competitors and help reach your product to many!!</h1>
      <div style={styles.chatWindow}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: message.isUser ? 'flex-end' : 'center', // Center-align the responses
            }}
          >
            <div
              style={{
                ...styles.messageBubble,
                backgroundColor: message.isUser ? '#007bff' : '#e0e0e0',
                color: message.isUser ? '#fff' : '#333',fontSize:'30px'
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.button}>
          Give Advice
        </button>
        
      </div>
      <button className="logout-button" onClick={handleLogout} style={{padding:'30px',fontSize:'50px'}}>Logout</button>
      <button className="go-home-button" onClick={handleGoHome} style={{padding:'30px',fontSize:'50px'}}>Go to Homepage</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  chatWindow: {
    width: '90%',
    height: '50%',
    overflowY: 'auto',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column', // Ensure messages are stacked vertically
    
  },
  message: {
    display: 'flex',
    justifyContent: 'center', // Center-align the message container
    marginBottom: '10px',
  },
  messageBubble: {
    padding: '10px',
    borderRadius: '10px',
    maxWidth: '70%',
    textAlign: 'center', // Center-align the text within the bubble
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '80%', // Ensure the input container matches the chat window width
    
  },
  input: {
    flex: '1',
    padding: '50px',
    marginRight: '10px',
    fontSize: '40px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '80px',
    cursor: 'pointer',
  },
};

export default GetTargetAudi;
