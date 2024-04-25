import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../firebase'; // Import the Firestore database from Firebase config
import { getAuth } from 'firebase/auth'; // Import Firebase authentication function
import './CoachMessaging.css'; 

const CoachMessaging = () => {
    // State for storing the current message input by the user
    const [message, setMessage] = useState('');
    // State for storing all messages from the database
    const [messages, setMessages] = useState([]);
    // Initialize Firebase Authentication to get user info
    const auth = getAuth();

    // Effect hook to subscribe to messages collection in Firestore
    useEffect(() => {
        // Create a query to fetch messages ordered by timestamp
        const q = query(collection(firestore, "messages"), orderBy("timestamp"));
        // Subscribe to query with real-time updates
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            // Map through documents and set state with new message data
            const loadedMessages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(loadedMessages);
        });

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    // Function to handle sending a message
    const sendMessage = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (!message || !auth.currentUser) return; // Check if message is empty or if there is no logged in user

        try {
            // Add a new document to Firestore in the "messages" collection
            await addDoc(collection(firestore, "messages"), {
                text: message,
                senderId: auth.currentUser.uid, // Include sender ID for reference
                timestamp: serverTimestamp() // Use server timestamp for consistency
            });
            setMessage(''); // Clear the message input after sending
        } catch (error) {
            console.error("Error sending message:", error); // Log any errors during message sending
        }
    };

    return (
        <div className="home-container">
            <div className="header">
                <div className="header-left"></div> 
                <h1 className="site-title">Pro Guidance Hub</h1> 
                <div className="header-right">
                    <Link to="/coachhome" className="menu-link">Home</Link> 
                </div>
            </div>
            <div className="messaging-container">
                <div className="messages-list">
                    {messages.map((msg) => (
                        // Display each message and style based on sender ID
                        <div key={msg.id} className={`message ${msg.senderId === auth.currentUser?.uid ? 'coach' : 'client'}`}>
                            <span className="message-content">{msg.text}</span>
                        </div>
                    ))}
                </div>
                <form onSubmit={sendMessage} className="send-message-form">
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

export default CoachMessaging; 
