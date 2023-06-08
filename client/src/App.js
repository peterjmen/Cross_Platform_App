import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MyExercisesPage from './pages/MyExercisesPage';
import SettingsPage from './pages/SettingsPage';
import TemplatesPage from './pages/TemplatesPage';
import PatientsPage from './pages/PatientsPage';
import ExerciseCatalogue from './pages/ExerciseCatalogue';

import './App.css';

function App() {
    return <Router>
        <div>
            <nav>
                <ul className="header-menu">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/templates">Templates</Link>
                    </li>
                    <li>
                        <Link to="/patients">Patients</Link>
                    </li>
                    <li>
                        <Link to="/my-exercises">My Exercises</Link>
                    </li>
                    <li>
                        <Link to="/settings">Settings</Link>
                    </li>
                    <li>
                        <Link to="/exercise-catalogue">Exercise Catalogue</Link>
                    </li>
                </ul>
            </nav>

            <div className="content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/templates" element={<TemplatesPage />} />
                    <Route path="/patients" element={<PatientsPage />} />
                    <Route path="/my-exercises" element={<MyExercisesPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route
                        path="/exercise-catalogue"
                        element={<ExerciseCatalogue />}
                    />
                </Routes>
            </div>

            <footer className="footer">
                <ul className="footer-menu">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/templates">Templates</Link>
                    </li>
                    <li>
                        <Link to="/patients">Patients</Link>
                    </li>
                    <li>
                        <Link to="/my-exercises">My Exercises</Link>
                    </li>
                    <li>
                        <Link to="/settings">Settings</Link>
                    </li>
                </ul>
            </footer>
        </div>
    </Router>;
}

export default App;
