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
      <main className="flex-1 max-w-6xl mx-auto mt-[10px] mb-[80px]">

        {/* Company Cards */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-6">Companies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companies.length > 0 ? (
              companies.map((company) => (
                <div
                  key={company._id}
                  className="w-60 bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:border-gray-400 hover:shadow-lg transition duration-200 flex flex-col items-center text-center"
                >
                  <img
                    src={company.logo || 'https://via.placeholder.com/100'}
                    className="h-24 w-24 object-cover rounded-full border mb-3"
                    alt={company.name}
                  />
                  <h3 className="text-xl font-semibold text-green-600">{company.name}</h3>
                  <p className="text-sm text-gray-500">{company.industry}</p>
                  <p className="text-sm text-gray-400 mb-2">{company.location}</p>

                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-sm hover:underline"
                    >
                      Visit Website
                    </a>
                  )}

                  <div className="mt-3 flex space-x-3">
                    {company.linkedIn && (
                      <a
                        href={company.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FiLinkedin className="w-5 h-5" />
                      </a>
                    )}
                    {company.careersPage && (
                      <a
                        href={company.careersPage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800"
                      >
                        <FiMail className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No companies found.
              </div>
            )}
          </div>
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