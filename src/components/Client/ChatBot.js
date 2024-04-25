import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addDoc, collection, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../firebase';
import './ChatBot.css';

const ChatBot = () => {
  // State to store the current message input by the user
  const [message, setMessage] = useState('');
  // State to store conversation history
  const [conversations, setConversations] = useState([]);

  // useEffect to subscribe to the Firestore collection on component mount
  useEffect(() => {
    // Query to get discussions ordered by createTime descending
    const q = query(collection(firestore, "discussions"), orderBy("createTime", "desc"));
    // Subscribe to the Firestore collection
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // Mapping documents to state upon snapshot update
      const updatedConversations = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setConversations(updatedConversations);
    });

    // Cleanup function to unsubscribe from Firestore on component unmount
    return () => unsubscribe();
  }, []);

  // Handle form submission for sending a message
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form behavior
    if (!message.trim()) return; // Ignore empty message submissions

    // Message object to be sent to Firestore
    const newMessage = {
      prompt: message,
      response: "",
      createTime: serverTimestamp(), // Set server-side timestamp for consistency
      status: "PENDING", // Initial status of the message
    };

    // Attempt to send the message to Firestore
    try {
      await addDoc(collection(firestore, "discussions"), newMessage);
      setMessage(''); // Clear message input on successful send
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="header">
        <div className="header-left"></div> 
        <h1 className="site-title">Pro Guidance Hub</h1> 
        <div className="header-right">
          <Link to="/clienthome" className="menu-link">Home</Link> 
        </div>
      </div>
      <div className="chat-container">
        <div className="messages-container">
          {/* Loop through conversations to display each message */}
          {conversations.map(convo => (
            <div key={convo.id} className={`message ${convo.response ? 'bot-message' : 'user-message'}`}>
              <p>{convo.prompt}</p>
              {convo.response && <p>{convo.response}</p>} 
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="message-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="message-input"
          />
          <button type="submit" className="send-button">Send</button> 
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
