import React, { useEffect, useState } from 'react';
import {
  getEmployees,
  getEmployeesByCompanyId
} from '../api/Employees.api.js'; 
import { getCompanies } from '../api/Companies.api.js';
import Navbar from '../components/Home/Navbar.jsx';


const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [error, setError] = useState(null);

  const fetchAllEmployees = async () => {
    try {
      const response = await getEmployees();
      const data = response.data;
      setEmployees(data);
    } catch (err) {
      setError('Failed to load employees.');
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await getCompanies();
      const companies = Array.isArray(response.data) ? response.data : [];
      console.log('Fetched companies:', companies);
      setCompanies(companies);
    } catch (err) {
      setError('Failed to load companies.');
      setCompanies([]); // fallback to prevent undefined
    }
  };
  

  const fetchEmployeesByCompany = async (companyId) => {
    try {
      const response = await getEmployeesByCompanyId(companyId);
      const data = response.data;
      console.log('Filtered employees:', data);
      setEmployees(data);
    } catch (err) {
      setError('Failed to filter employees.');
    }
  };

  useEffect(() => {
    fetchCompanies();
    fetchAllEmployees();
  }, []);

  const handleFilterChange = (e) => {
    const companyId = e.target.value;
    setSelectedCompany(companyId);
    if (companyId === '') {
      fetchAllEmployees();
    } else {
      fetchEmployeesByCompany(companyId);
    }
  };

  return (
    <div className='h-screen w-full'>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Employees</h2>

      {/* Filter by Company */}
      <div className="mb-4"> 
        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Company:</label>
        <select 
          className="w-full p-2 border rounded shadow-sm"
          value={selectedCompany}
          onChange={handleFilterChange}
        >
          <option value="">All Companies</option>
          {(companies || []).map((company) => (
            <option key={company._id} value={company._id}>
              {company.name} ({company.type})
            </option>
          ))}
        </select>
      </div>

      {/* Employee Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Designation</th>
              <th className="text-left px-4 py-2">Company</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(employees) && employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee._id} className="border-b">
                  <td className="px-4 py-2">{employee.fullName}</td>
                  <td className="px-4 py-2">{employee.email}</td>
                  <td className="px-4 py-2">{employee.designation}</td>
                  <td className="px-4 py-2">
                    {employee.companyId ? employee.companyId.name : 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={`/employees/${employee._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Profile
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-4 py-2">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
      </div>
    </div>
  );
};

export default Employee;
