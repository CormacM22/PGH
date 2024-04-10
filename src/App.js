import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientSignIn from './components/auth/signIn/ClientSignIn';
import Home from './components/home';
import ClientHome from './components/Client/ClientHome'; 
import ClientSignUp from './components/auth/createAccount/ClientSignUp';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ClientSignin" element={<ClientSignIn />} />
        <Route path="/ClientSignup" element={<ClientSignUp />} />
        <Route path="/ClientHome" element={<ClientHome />} />
      </Routes>
    </Router>
  );
};

export default App;
