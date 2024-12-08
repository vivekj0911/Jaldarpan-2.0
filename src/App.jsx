import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Reading from './components/Reading';
import Services from './components/Services';
import AuthPage from './components/AuthPage';


// Optionally, import global styles if not done in `index.js`
import './index.css'; // Ensure you have global styles if required

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reading" element={<Reading />} />
                <Route path="/services" element={<Services />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/signup" element={<AuthPage />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
