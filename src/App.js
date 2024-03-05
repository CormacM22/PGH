//import css
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//import router
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// import components
import Home from './components/home';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthDetails from './components/AuthDetails';


function App() {
  return (
    <div className="App">
      <SignIn />
      <SignUp />
      <AuthDetails />
</div>
  );
}

export default App;
