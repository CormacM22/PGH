import React from 'react';

function Home() {
    // styles for the homee page
    const pageStyles = {
        backgroundColor: '#333',
        margin: '0',
        padding: '0',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    // Styles for the container
    const containerStyle = {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#007BFF',
        borderRadius: '20px',
        width: '50%',
        color: 'white',
    };

    const headingStyle = {
        fontSize: '3em',
        marginBottom: '20px',
    };

    const timeStyle = {
        fontSize: '1.5em',
        color: 'white',
    };

    return (
        <div style={pageStyles}>
            <div style={containerStyle} className="home-container">
                <h1 style={headingStyle}>Pro Guidance Hub</h1>
            </div>
        </div>
    );
}

export default Home;