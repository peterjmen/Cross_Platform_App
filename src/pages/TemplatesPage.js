import React from 'react';
import SearchBar from './SearchBar';
import './TemplatesPage.css';
import './HomePage.css';

function TemplatesPage() {
  return (
    <div>
      <h1 className="page-title">Templates</h1>
      <div className="search-bar">
        <SearchBar />
      </div>
      {/* Restante do conteúdo da página */}
    </div>
  );
}

export default TemplatesPage;


