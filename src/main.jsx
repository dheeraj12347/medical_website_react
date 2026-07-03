import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { theme } from './utils/theme.js';
import './styles.css';

// main.jsx is the browser entry point. It mounts our React app into #root.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
