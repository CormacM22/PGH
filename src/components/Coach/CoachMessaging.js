import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../firebase'; // Ensure this path is correct based on your project structure

const CoachMessaging = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

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
        if (!message) return;

        try {
            await addDoc(collection(firestore, "messages"), {
                text: message,
                sender: "client", // this could also dynamically change depending on the user type
                timestamp: new Date()
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
                    <div key={index} className={`message ${msg.sender}`}>
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

export default CoachMessaging;
