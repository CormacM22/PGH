import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientSignIn from './components/auth/signIn/ClientSignIn';
import Home from './components/home';
import ClientHome from './components/Client/ClientHome'; // corrected the component name
import SignInOptions from './components/auth/signIn/SignInOptions';
import CoachSignIn from './components/auth/signIn/CoachSignIn';
import ClientSignUp from './components/auth/createAccount/ClientSignUp';
import CoachSignUp from './components/auth/createAccount/CoachSignUp';
import CoachHome from './components/Coach/CoachHome';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignInOptions" element={<SignInOptions />} />
        <Route path="/ClientSignin" element={<ClientSignIn />} />
        <Route path="/CoachSignin" element={<CoachSignIn />} />
        <Route path="/ClientSignup" element={<ClientSignUp />} />
        <Route path="/ClientHome" element={<ClientHome />} />
        <Route path="/CoachHome" element={<CoachHome />} />
        <Route path="/CoachSignUp" element={<CoachSignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
