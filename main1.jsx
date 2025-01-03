import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WishApp from './WishApp.jsx'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WishApp />
  </StrictMode>,
)
