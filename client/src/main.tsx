import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { LoadingProvider } from './LoadingContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </LoadingProvider>
  </StrictMode>
)
