import React, { useEffect, useState } from 'react';
import {
  getEmployees,
  getEmployeesByCompanyId
} from '../api/Employees.api.js'; 
import { getCompanies } from '../api/Companies.api.js';
import FormNav from '../components/FormNav.jsx';
import Footer from '../components/Home/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import { FiLinkedin, FiInstagram, FiMail, FiTwitter, FiGithub, FiPhoneCall } from 'react-icons/fi';

const Employee = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [error, setError] = useState(null);

  const fetchAllEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to load employees.');
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await getCompanies();
      setCompanies(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Failed to load companies.');
      setCompanies([]);
    }
  };

  const fetchEmployeesByCompany = async (companyId) => {
    try {
      const response = await getEmployeesByCompanyId(companyId);
      setEmployees(response.data);
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Fixed Navbar */}
      <div className=" top-0 left-0 w-full">
        <FormNav />
      </div>

      {/* Scrollable Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-6 mt-[20px] mb-[80px]">
        <h2 className="text-3xl font-bold mb-6">Employees</h2>

        {/* Filter by Company */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            Filter by Company:
          </label>
          <select
            className="w-full p-2 border  rounded-lg shadow-sm"
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

        {/* Employee Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(employees) && employees.length > 0 ? (
            employees.map((employee) => (
              <div
                key={employee._id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:border-gray-400 hover:shadow-lg transition duration-200 flex flex-col items-center text-center"
              >
                <img
                  src={employee.image}
                  className="h-28 w-28 rounded-full border-1 border-gray-200 object-cover mb-3"
                />
                
                <h2 className="text-lg font-semibold text-green-500">{employee.fullName}</h2>

                {/* Emails */}
                {/* Emails */}
                  {Array.isArray(employee.emails) && employee.emails.length > 0 ? (
                    <div className="text-gray-600 text-sm">
                      {employee.emails.map((email, idx) => (
                        <p key={idx}>
                          <a href={`mailto:${email}`} className="hover:underline">
                            {email}
                          </a>
                        </p>
                      ))}
                    </div>
                  ) : employee.email ? (
                    <div className="text-gray-600 text-sm">
                      <p>
                        <a href={`mailto:${employee.email}`} className="hover:underline">
                          {employee.email}
                        </a>
                      </p>
                    </div>
                  ) : null}
                <p className="mt-1 text-sm text-gray-500">{employee.designation}</p>

                <div className="mt-4 space-x-3 flex flex-wrap justify-center">
                  {employee.linkedIn && (
                    <a
                      href={employee.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiLinkedin className="w-6 h-6" />
                    </a>
                  )}
                  {employee.github && (
                    <a
                      href={employee.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-gray-800"
                    >
                      <FiGithub className="w-6 h-6" />
                    </a>
                  )}
                  {Array.isArray(employee.phoneNumbers) &&
                    employee.phoneNumbers.map((phone, idx) => (
                      <a
                        key={idx}
                        href={`tel:${phone}`}
                        className="text-black hover:text-gray-800"
                      >
                        <FiPhoneCall className="w-6 h-6" />
                      </a>
                    ))}
                  {employee.twitter && (
                    <a
                      href={employee.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-600"
                    >
                      <FiTwitter className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No employees found.
            </div>
          )}
        </div>
      </main>

      {/* Fixed Footer */}
      <div className="bottom-0 left-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Employee;