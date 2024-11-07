import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MedMeetApp } from './MedMeetApp'
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MedMeetApp />
  </StrictMode>,
)
