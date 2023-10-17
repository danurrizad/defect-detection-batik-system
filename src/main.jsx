import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './tailwind.css'
import { CsvDataProvider } from './components/CsvDataContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CsvDataProvider>
      <App />
    </CsvDataProvider>
  </React.StrictMode>,
)
