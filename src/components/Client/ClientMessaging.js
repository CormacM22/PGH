import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../firebase'; // Ensure this path is correct based on your project structure
import { getAuth } from 'firebase/auth'; // Import auth module
import './ClientMessaging.css';

const ClientMessaging = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const auth = getAuth(); // Initialize auth

    useEffect(() => {
        const q = query(collection(firestore, "messages"), orderBy("timestamp"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const loadedMessages = [];
            querySnapshot.forEach((doc) => {
                loadedMessages.push(doc.data());
            });
            setMessages(loadedMessages);
        });

        return () => unsubscribe(); // Clean up on unmount
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message || !auth.currentUser) return; // Check if message is empty or if no user is logged in

        try {
            await addDoc(collection(firestore, "messages"), {
                text: message,
                senderId: auth.currentUser.uid, // Use the UID of the logged-in user
                timestamp: serverTimestamp() // Use server timestamp for consistency
            });
            setMessage(''); // Clear message input after sending
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="messaging-container">
            <div className="messages-list">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.senderId === auth.currentUser?.uid ? 'sender' : 'recipient'}`}>
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
    );
};

export default ClientMessaging;
