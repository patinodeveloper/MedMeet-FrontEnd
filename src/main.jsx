import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MedMeetApp } from './MedMeetApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MedMeetApp />
  </StrictMode>,
)
