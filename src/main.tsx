import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import "sweetalert2/src/sweetalert2.scss"
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import "./style/main.scss"
import './styles/main.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
)
