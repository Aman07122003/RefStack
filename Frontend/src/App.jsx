import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeeRegister from './pages/EmployeeRegister.jsx';
import EmployeeProfile from './pages/EmployeeProfile.jsx';
import Employee from './pages/Employee.jsx';

const App = () => {
  return (
    <Router>
      <div className="p-4 bg-gray-100 shadow mb-6">
        <nav className="flex gap-4">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <Link to="/register-employee" className="text-blue-600 hover:underline">Register Employee</Link>
          <Link to="/employees" className="text-blue-600 hover:underline">View Employees</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<h1 className="text-2xl font-bold p-4">Welcome to the Employee Management System</h1>} />
        <Route path="/register-employee" element={<EmployeeRegister />} />
        <Route path="/employees/:id" element={<EmployeeProfile />} />
        <Route path="/employees" element={<Employee />} />
      </Routes>
    </Router>
  );
};

export default App;
