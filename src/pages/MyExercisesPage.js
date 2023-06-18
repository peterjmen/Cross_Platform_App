import React from 'react';
import SearchBar from './SearchBar';
import './MyExercisesPage.css';

function MyExercisesPage() {
  return (
    <div>
      <h1 className="page-title">My Exercises</h1>
      <div className="search-bar">
        <SearchBar />
      </div>
      <p>This is the my exercises page content.</p>
    </div>
  );
}

export default MyExercisesPage;
