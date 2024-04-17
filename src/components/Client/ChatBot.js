import React, { useState, useEffect } from 'react';
import { addDoc, collection, onSnapshot, query, orderBy, serverTimestamp} from 'firebase/firestore';
import { firestore } from '../../firebase';
import './ChatBot.css';

const ChatBot = () => {
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState([]);  // To store ongoing conversations

  useEffect(() => {
    // Listen for updates in real-time
    const q = query(collection(firestore, "discussions"), orderBy("createTime", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedConversations = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setConversations(updatedConversations); // Update local state
    });

    return () => unsubscribe(); // Detach listener when the component unmounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Create a new message object as before
    const newMessage = {
      prompt: message,
      response: "",  // Response will be added by the chatbot
      createTime: serverTimestamp(),
      status: "PENDING",
    };

    try {
      await addDoc(collection(firestore, "discussions"), newMessage);
      setMessage('');  // Clear the message input after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
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
  );
};

export default ChatBot;
