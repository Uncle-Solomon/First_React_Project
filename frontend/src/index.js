import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';



import './index.css';
import App from './App';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Router>
  //   {/* <GoogleOAuthProvider clientId={clientId}> */}
  //     <App />
  //   {/* </GoogleOAuthProvider> */}
  // </Router>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>

  
);