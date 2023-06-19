import React, { useState } from 'react';
import SearchBar from './SearchBar';
import './common-styles.css';
import './HomePage.css';

function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="home-page">
      <div className="page-container">
        <h1 className="page-title">Exercise Program</h1>
        <SearchBar />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
            />
          </div>
          <button type="submit">Login</button>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
