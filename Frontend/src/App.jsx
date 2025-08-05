import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeRegister from './pages/EmployeeRegister.jsx';
import EmployeeProfile from './pages/EmployeeProfile.jsx';
import Employee from './pages/Employee.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/" element={<h1>Welcome to the Employee Management System</h1>} />
          <Route path="/register-employee" element={<EmployeeRegister />} />
          <Route path="/employees/:id" element={<EmployeeProfile />} />
          <Route path="/employees" element={<Employee />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App