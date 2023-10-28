import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './tailwind.css'
import { CsvDataProvider } from './components/CsvDataContext'
import { UserProvider } from './components/UserContext.jsx'
import { ForecastValueProvider } from './components/context/ForecastValueContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <CsvDataProvider>
        <ForecastValueProvider>
          <App />
        </ForecastValueProvider>
      </CsvDataProvider>
    </UserProvider>
  </React.StrictMode>,
)
