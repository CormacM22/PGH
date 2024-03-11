import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/signIn/ClientSignIn';
import Home from './components/home';
import SignUp from './components/auth/SignUp';
import UserHome from './components/Client/ClientHome'; // corrected the component name
import SignInOptions from './components/auth/SignInOptions';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignInOptions" element={<SignInOptions />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userHome" element={<UserHome />} />
      </Routes>
    </Router>
  );
};

export default App;
