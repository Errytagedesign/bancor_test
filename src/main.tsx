import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'animate.css';
import './index.css';
import { GlobalProvider } from './context/GlobalContext.tsx';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalProvider>
      <Toaster position='top-center' />
      <App />
    </GlobalProvider>
  </React.StrictMode>,
);
