import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import PropertyDetails from './components/PropertyDetails';
import './styles.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
    </Routes>
  </BrowserRouter>
);
