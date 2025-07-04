// my-team-app/src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Import router components
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import HomePage from './pages/HomePage.js'; // Import HomePage component
import AboutUsPage from './pages/HomePage.js'; // Import AboutUsPage component
import './index.css';
import './App.css';

/**
 * Main application component.
 * Manages the theme state and handles routing for different pages.
 */
function App() {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light-theme';
    });

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === 'light-theme' ? 'dark-theme' : 'light-theme'
        );
    };

    return (
        <Router> {/* Wrap your entire application with Router */}
            <AppContent toggleTheme={toggleTheme} theme={theme} />
        </Router>
    );
}

// Separate component to use useLocation hook within Router context
function AppContent({ toggleTheme, theme }) {
    const location = useLocation(); // Hook to get current location/URL

    // Scroll to section when hash changes (e.g., #team, #projects)
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                // Use a timeout to ensure rendering is complete before scrolling
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            // Scroll to top when navigating to a new page without a hash
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [location]); // Re-run when location changes

    return (
        <div className="App">
            <Header toggleTheme={toggleTheme} theme={theme} /> {/* Header now within Router context */}

            <main>
                <Routes> {/* Define your routes here */}
                    {/* Route for the About Us page, makes it the default/first page */}
                    <Route path="/" element={<AboutUsPage />} />
                    <Route path="/about" element={<AboutUsPage />} /> {/* Also accessible via /about */}

                    {/* Route for the Home page (contains all sections) */}
                    <Route path="/home" element={<HomePage />} />
                    {/* Catch-all for unknown routes, redirect to home or a 404 page */}
                    <Route path="*" element={<HomePage />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
