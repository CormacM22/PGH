import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';

const CoachMessaging = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const q = query(collection(firestore, "messages"), orderBy("timestamp"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const loadedMessages = [];
            querySnapshot.forEach((doc) => {
                loadedMessages.push({ id: doc.id, ...doc.data() });
            });
            setMessages(loadedMessages);
        });

        return () => unsubscribe();
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message) return;

        try {
            await addDoc(collection(firestore, "messages"), {
                text: message,
                sender: "coach", // Assuming you are distinguishing messages by sender role
                timestamp: new Date()
            });
            setMessage('');
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="messaging-container">
            <div className="messages-list">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.sender}`}>
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
