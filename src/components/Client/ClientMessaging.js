import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../firebase'; // Import Firebase Firestore instance
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication
import './ClientMessaging.css'; // Import CSS for styling

const ClientMessaging = () => {
    // State to manage message input
    const [message, setMessage] = useState('');
    // State to store messages fetched from Firestore
    const [messages, setMessages] = useState([]);
    // Initialize Firebase Authentication
    const auth = getAuth();

    // Effect hook to subscribe to Firestore and listen for updates on the "messages" collection
    useEffect(() => {
        const q = query(collection(firestore, "messages"), orderBy("timestamp")); // Define query to fetch messages ordered by timestamp
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            // Snapshot listener that updates the messages state whenever changes occur
            const loadedMessages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMessages(loadedMessages);
        });

        return () => unsubscribe(); // Cleanup function to unsubscribe from the snapshot listener
    }, []);

    // Function to handle message sending
    const sendMessage = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (!message || !auth.currentUser) return; // Guard clause to prevent sending empty messages or if no user is logged in

        try {
            // Add new message to Firestore "messages" collection
            await addDoc(collection(firestore, "messages"), {
                text: message,
                senderId: auth.currentUser.uid, // Use logged in user's ID as sender ID
                timestamp: serverTimestamp() // Firebase server timestamp for consistency
            });
            setMessage(''); // Clear message field after sending
        } catch (error) {
            console.error("Error sending message:", error); // Log any errors during message send
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
            <div className="messaging-container">
                <div className="messages-list">
                    {messages.map((msg) => (
                        // Display each message and apply styling based on the sender
                        <div key={msg.id} className={`message ${msg.senderId === auth.currentUser?.uid ? 'client' : 'coach'}`}>
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

export default ClientMessaging; 
