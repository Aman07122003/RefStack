import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FormNav from '../components/FormNav';
import AvatarUpload from '../components/EmployeeRegisteration/AvatarUpload';
import Footer from '../components/Home/Footer';
import {getCompanies } from '../api/Companies.api'; 
import { createEmployee } from '../api/Employees.api'; 

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
  const [avatar, setAvatar] = useState(null); // store image file
  const [preview, setPreview] = useState(null); // store preview URL
  const avatarInputRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getCompanies();
        setCompanies(Array.isArray(response.data) ? response.data : []);
        console.log('Fetched companies:', response.data);
      } catch (err) {
        console.error('Failed to fetch companies:', err);
      }
    };
    fetchCompanies();
  }, []);

  // Create preview URL whenever avatar changes
  useEffect(() => {
    if (!avatar) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(avatar);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [avatar]);

  const validateForm = () => {
    const { fullName, email, designation, companyId } = employeeData;
    if (!fullName || !email || !designation || !companyId) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!avatar) {
      setError('Please upload an avatar image');
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

  const handleAvatarChange = (file) => {
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      // Use FormData to send file + data
      const formData = new FormData();
      Object.entries(employeeData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('avatar', avatar); // key must match backend schema 'image'

      await createEmployee(formData); // Make sure your api accepts FormData and content-type is multipart/form-data

      navigate('/employees');
    } catch (err) {
      console.error('Create employee error:', err);
      setError('Failed to register employee');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[140vh] w-full bg-gradient-to-b from-white via-gray-50 to-gray-100 flex flex-col justify-between p-5">
      <div>
        <FormNav />
      </div>
      <main className='p-4 mt-2'>
      <div className="max-w-xl mx-auto">
        <h2 className="font-bold mb-4 flex justify-center md:text-4xl text-xl font-mono">Register Employee</h2>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            <div className="flex justify-center">
              <AvatarUpload
              type="employee"
              previewImage={preview}
              inputRef={avatarInputRef}
              onChange={handleAvatarChange}
              error={error}
              />
            </div>
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
