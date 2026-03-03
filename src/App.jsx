import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import LandingPage from './components/landing/LandingPage'
import EmployeeDashboard from './components/employee/EmployeeDashboard'
import ManagerDashboard from './components/manager/ManagerDashboard'
import HRDashboard from './components/hr/HRDashboard'
import ComplianceDashboard from './components/compliance/ComplianceDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/employee/*" element={<EmployeeDashboard />} />
        <Route path="/manager/*" element={<ManagerDashboard />} />
        <Route path="/hr/*" element={<HRDashboard />} />
        <Route path="/compliance/*" element={<ComplianceDashboard />} />
        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
