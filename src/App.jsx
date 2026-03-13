import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import LandingPage from './components/landing/LandingPage'
import EmployeeDashboard from './components/employee/EmployeeDashboard'
import ManagerDashboard from './components/manager/ManagerDashboard'
import HRDashboard from './components/hr/HRDashboard'
import ComplianceDashboard from './components/compliance/ComplianceDashboard'

import Login from './components/auth/Login'
import FloatingChatbot from './components/common/FloatingChatbot'

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem('user_role')
  
  if (!role) {
    return <Navigate to="/login" />
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // If you're an employee trying to access admin stuff, send back to overview
    if (role === 'employee') {
      return <Navigate to="/employee/overview" />
    }
    return <Navigate to="/login" />
  }

  return children
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Root Redirect based on role */}
        <Route path="/" element={
          localStorage.getItem('user_role') === 'admin' 
            ? <Navigate to="/landing" /> 
            : localStorage.getItem('user_role') === 'employee'
              ? <Navigate to="/employee/overview" /> 
              : localStorage.getItem('user_role') === 'manager'
                ? <Navigate to="/manager/team" />
                : <Navigate to="/login" />
        } />
        
        {/* Employee Dashboard - Accessible by both employee and admin */}
        <Route 
          path="/employee/*" 
          element={
            <ProtectedRoute allowedRoles={['employee', 'admin']}>
              <EmployeeDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Admin/Manager Dashboards - ONLY for admin and manager */}
        <Route 
          path="/manager/*" 
          element={
            <ProtectedRoute allowedRoles={['admin', 'manager']}>
              <ManagerDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/hr/*" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <HRDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/compliance/*" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ComplianceDashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/landing" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <LandingPage />
            </ProtectedRoute>
          } 
        />

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <FloatingChatbot />
    </Router>
  )
}

export default App
