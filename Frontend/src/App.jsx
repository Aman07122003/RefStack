import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmployeeRegister from './pages/EmployeeRegister.jsx';
import EmployeeProfile from './pages/EmployeeProfile.jsx';
import Employee from './pages/Employee.jsx';
import Companies from './pages/Companies.jsx';
import CompanyRegisteration from './pages/CompanyRegisteration.jsx';
import Home from './pages/Home.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register-employee" element={<EmployeeRegister />} />
        <Route path="/employees/:id" element={<EmployeeProfile />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/new" element={<CompanyRegisteration />} />
      </Routes>
    </Router>
  );
};

export default App;
