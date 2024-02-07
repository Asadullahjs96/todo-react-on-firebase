import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContextProvider from './contextUser/UserContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextProvider>
        <App />
    </UserContextProvider>
  
)
