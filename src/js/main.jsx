import React from 'react'
import ReactDOM from 'react-dom/client'

//Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


// index.css'
import '../styles/index.css'

// components
import ToDo from './components/TODO';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToDo/>
  </React.StrictMode>,
)
