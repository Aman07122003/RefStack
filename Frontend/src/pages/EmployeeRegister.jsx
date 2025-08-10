import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../api/Employees.api';
import { getCompanies } from '../api/Companies.api';
import FormNav from '../components/FormNav';
import Footer from '../components/Home/Footer'; // Assuming you have a Footer component


const EmployeeRegister = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    fullName: '',
    email: '',
    PhoneNumber: '',
    designation: '',
    linkedIn: '',
    github: '',
    twitter: '',
    companyId: '',
  });
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getCompanies(); // response = { data: [...companies], ... }
        const companyList = Array.isArray(response.data) ? response.data : [];

  
        setCompanies(companyList); // ✅ Store the companies in state
  
        setEmployeeData((prev) => ({
          ...prev,
          companyId: '', 
        }));
      } catch (err) {
        console.error('Failed to fetch companies:', err);
      }
    };
  
    fetchCompanies();
  }, []);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateForm = () => {
    const { fullName, email, designation, companyId } = employeeData;
    if (!fullName || !email || !designation || !companyId) {
      setError('Please fill in all required fields');
      return false;
    }
    setError(null);
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      setIsLoading(true);
      console.log('Submitting employee data:', employeeData); // ✅ ADD THIS
      await createEmployee(employeeData);
      navigate('/employees');
    } catch (err) {
      console.error('Create employee error:', err); // ✅ Detailed logging
      setError('Failed to register employee');
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    <div className="h-[120vh] w-full bg-gradient-to-b from-white via-green-50 to-lime-50 flex flex-col justify-between p-5">
      <div>
        <FormNav />
      </div>
      <main className='p-4'>
      <div className="max-w-xl mx-auto">
        <h2 className="font-bold mb-4 flex justify-center text-4xl font-mono">Register Employee</h2>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 mt-15">
          {[
            { name: 'fullName', label: 'Full Name' },
            { name: 'email', label: 'Email' },
            { name: 'PhoneNumber', label: 'Phone Number' },
            { name: 'designation', label: 'Designation' },
            { name: 'linkedIn', label: 'LinkedIn' },
            { name: 'twitter', label: 'Twitter' },
            { name: 'github', label: 'GitHub' },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="block text-sm font-medium">{label}</label>
              <input
                type="text"
                name={name}
                value={employeeData[name]}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required={['fullName', 'email', 'designation'].includes(name)}
              />
            </div>
          ))}

          {/* Company Select Dropdown */}
          <div>
            <label className="block text-sm font-medium">Company</label>
            <select
              name="companyId"
              value={employeeData.companyId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700"
          >
            {isLoading ? 'Registering...' : 'Register Employee'}
          </button>
        </form>
      </div>
      </main>
      <Footer />
    </div>
  );
};

export default EmployeeRegister;
