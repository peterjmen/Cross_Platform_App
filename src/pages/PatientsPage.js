import React from 'react';
import SearchBar from './SearchBar';
import './PatientsPage.css';

function PatientsPage() {
  return (
    <div>
      <h1 className="page-title">Patients</h1>
      <SearchBar />
      <p>This is the patients page content.</p>
    </div>
  );
}

export default PatientsPage;
