import React from 'react';
import SearchBar from './SearchBar';
import './MyExercisesPage.css';

function MyExercisesPage() {
  return (
    <div>
      <h1 className="page-title">My Exercises</h1>
      <SearchBar />
      <p>This is the exercises page content.</p>
    </div>
  );
}

export default MyExercisesPage;
