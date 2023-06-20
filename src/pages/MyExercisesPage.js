import React from 'react';
import SearchBar from './SearchBar';
import './MyExercisesPage.css';

function MyExercisesPage() {
  return (
    <div>
      <h1 className="page-title">My Exercises</h1>
      <SearchBar />
      <div className="image-options">
        <div className="image-option">
          <label htmlFor="image1">Image 1</label>
          <input type="file" id="image1" accept="image/*" />
        </div>
        <div className="image-option">
          <label htmlFor="image2">Image 2</label>
          <input type="file" id="image2" accept="image/*" />
        </div>
        <div className="image-option">
          <label htmlFor="image3">Image 3</label>
          <input type="file" id="image3" accept="image/*" />
        </div>
        <div className="image-option">
          <label htmlFor="image4">Image 4</label>
          <input type="file" id="image4" accept="image/*" />
        </div>
      </div>
    </div>
  );
}

export default MyExercisesPage;
