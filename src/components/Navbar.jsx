import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    // Implement login logic (mocking for now)
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);  // Reset login state
  };

  return (
    <header className="bg-background text-text shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img src="./src/assets/logo.png" alt="Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold text-primary">JalDarpan</h1>
        </div>

        {/* Menu Section */}
        <div
          className={`fixed top-0 right-0 z-20 h-screen w-2/3 bg-background shadow-lg transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform md:relative md:h-auto md:w-auto md:shadow-none md:translate-x-0`}
        >
          <div className="flex flex-col items-center justify-center space-y-6 p-6 md:flex-row md:space-y-0 md:space-x-6">
            <Link
              to="/"
              className="hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/dashboard"
              className="hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/alert"
              className="hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Alert
            </Link>
            <Link
              to="/tutorial"
              className="hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Tutorial
            </Link>
        
            <div className="flex space-x-4">
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-secondary hover:text-primary"
                >
                  <i className="bx bx-log-in"></i> <span>Login</span>
                </Link>
              ) : (
                <div className="flex items-center space-x-2">
                  <i className="bx bx-user-circle text-2xl text-primary"></i>
                  <button
                    className="text-secondary hover:text-primary"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`z-30 flex flex-col items-center justify-center space-y-1 md:hidden ${isMenuOpen ? 'text-primary' : 'text-text'
            }`}
          onClick={toggleMenu}
        >
          <span className="block h-1 w-6 bg-current"></span>
          <span className="block h-1 w-6 bg-current"></span>
          <span className="block h-1 w-6 bg-current"></span>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
