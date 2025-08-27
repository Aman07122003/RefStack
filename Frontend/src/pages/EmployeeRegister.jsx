import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FormNav from '../components/FormNav';
import AvatarUpload from '../components/EmployeeRegisteration/AvatarUpload';
import Footer from '../components/Home/Footer';
import { getCompanies } from '../api/Companies.api'; 
import { createEmployee } from '../api/Employees.api'; 

const EmployeeRegister = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    fullName: '',
    emails: [''],       // start with one email input
    phoneNumbers: [''], // start with one phone number input
    designation: '',
    linkedIn: '',
    github: '',
    twitter: '',
    companyId: '',
  });
  
  // handle change for array fields
  const handleArrayChange = (e, index, field) => {
    const { value } = e.target;
    setEmployeeData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };
  
  // add new input field
  const addField = (field) => {
    setEmployeeData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  // remove input field
  const removeField = (field, index) => {
    if (employeeData[field].length <= 1) return; // Don't remove the last field
    
    setEmployeeData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };
  
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
    const { fullName, emails, designation, companyId } = employeeData;
    
    // Check required fields
    if (!fullName.trim() || !designation.trim() || !companyId) {
      setError('Please fill in all required fields');
      return false;
    }
    
    // Check if at least one email is provided and valid
    const validEmails = emails.filter(email => email.trim() && /\S+@\S+\.\S+/.test(email));
    if (validEmails.length === 0) {
      setError('Please provide at least one valid email address');
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
    
    // Check if this is an array field
    if (name === 'emails' || name === 'phoneNumbers') {
      // This shouldn't happen with the current structure, but handle it
      setEmployeeData(prev => ({
        ...prev,
        [name]: [value] // Convert to array with single item
      }));
    } else {
      setEmployeeData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
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
      
      // Add non-array fields
      formData.append('fullName', employeeData.fullName);
      formData.append('designation', employeeData.designation);
      formData.append('linkedIn', employeeData.linkedIn);
      formData.append('github', employeeData.github);
      formData.append('twitter', employeeData.twitter);
      formData.append('companyId', employeeData.companyId);
      
      // Add array fields - check your API expects this format
      employeeData.emails.forEach(email => {
        if (email.trim()) formData.append('emails', email);
      });
      
      employeeData.phoneNumbers.forEach(phone => {
        if (phone.trim()) formData.append('phoneNumbers', phone);
      });
      
      formData.append('avatar', avatar); // Changed from 'avatar' to 'image' to match your display component

      await createEmployee(formData);
      navigate('/employees');
    } catch (err) {
      console.error('Create employee error:', err);
      setError(err.response?.data?.message || 'Failed to register employee');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-gray-50 to-gray-100 flex flex-col">
      <div>
        <FormNav />
      </div>
      
      <main className="flex-1 p-4 mt-2">
        <div className="max-w-xl mx-auto">
          <h2 className="font-bold mb-4 text-center text-2xl md:text-4xl font-mono">
            Register Employee
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

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
              { name: 'fullName', label: 'Full Name', type: 'text', required: true },
              { name: 'designation', label: 'Designation', type: 'text', required: true },
              { name: 'linkedIn', label: 'LinkedIn URL', type: 'url' },
              { name: 'twitter', label: 'Twitter URL', type: 'url' },
              { name: 'github', label: 'GitHub URL', type: 'url' },
            ].map(({ name, label, type = 'text', required = false }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={type}
                  name={name}
                  value={employeeData[name]}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={required}
                />
              </div>
            ))}

            {/* Emails Section */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Addresses <span className="text-red-500">*</span>
              </label>
              {employeeData.emails.map((email, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleArrayChange(e, index, 'emails')}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={index === 0}
                    placeholder="email@example.com"
                  />
                  {employeeData.emails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField('emails', index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField('emails')}
                className="text-blue-600 hover:text-blue-800 text-sm mt-1"
              >
                + Add another email
              </button>
            </div>

            {/* Phone Numbers Section */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Numbers
              </label>
              {employeeData.phoneNumbers.map((phone, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => handleArrayChange(e, index, 'phoneNumbers')}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+1234567890"
                  />
                  {employeeData.phoneNumbers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField('phoneNumbers', index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField('phoneNumbers')}
                className="text-blue-600 hover:text-blue-800 text-sm mt-1"
              >
                + Add another phone
              </button>
            </div>

            {/* Company Select Dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Company <span className="text-red-500">*</span>
              </label>
              <select
                name="companyId"
                value={employeeData.companyId}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
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