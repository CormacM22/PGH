import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientSignIn from './components/auth/signIn/ClientSignIn';
import Home from './components/home';
import ClientHome from './components/Client/ClientHome'; 
import ClientSignUp from './components/auth/createAccount/ClientSignUp';
import ExerciseTutorials from './components/Client/ExerciseTutorials';
import ClientMessaging from './components/Client/ClientMessaging';
import CoachMessaging from './components/Coach/CoachMessaging';
import CoachSignIn from './components/auth/signIn/CoachSignIn';
import CoachSignUp from './components/auth/createAccount/CoachSignUp';
import LogInOptions from './components/auth/LogInOptions/LogInOptions';
import CoachHome from './components/Coach/CoachHome';
import ChatBot from './components/Client/ChatBot';
import LogCalories from './components/Client/LogCalories';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ClientSignin" element={<ClientSignIn />} />
        <Route path="/ClientSignup" element={<ClientSignUp />} />
        <Route path="/ClientHome" element={<ClientHome />} />
        <Route path="/ExerciseTutorials" element={<ExerciseTutorials />} />
        <Route path="/ClientMessaging" element={<ClientMessaging />} />
        <Route path="/CoachMessaging" element={<CoachMessaging />} />
        <Route path="/CoachSignIn" element={<CoachSignIn />} />
        <Route path="/CoachSignUp" element={<CoachSignUp />} />
        <Route path="/LogInOptions" element={<LogInOptions />} />
        <Route path="/CoachHome" element={<CoachHome />} />
        <Route path="/ChatBot" element={<ChatBot />} />
        <Route path="/LogCalories" element={<LogCalories />} />
      </Routes>
    </Router>
  );
};

export default App;
