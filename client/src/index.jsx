import React from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from './layout';
import './default.css';

const root = createRoot(document.getElementById('root'));
root.render(<React.StrictMode><Layout /></React.StrictMode>);
