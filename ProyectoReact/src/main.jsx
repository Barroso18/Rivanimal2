import { StrictMode } from 'react'
import React, { createContext, useContext, useState } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom' ;
import { AuthProvider } from './Login/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
   <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Contexto dentro de Router */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)