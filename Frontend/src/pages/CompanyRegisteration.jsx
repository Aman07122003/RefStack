import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FormNav from '../components/FormNav';
import AvatarUpload from '../components/EmployeeRegisteration/AvatarUpload';
import Footer from '../components/Home/Footer';
import { createCompany } from '../api/Companies.api';

const CompanyRegisteration = () => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState({
    name: '',
    website: '',
    industry: '',
    location: '',
    description: '',
    linkedIn: '',
    careersPage: '',
    type: 'Startup',
    averageSalaryBand: 'Under 2 LPA',
  });

  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState(null);
  const logoInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle logo preview
  useEffect(() => {
    if (!logo) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(logo);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [logo]);

  const validateForm = () => {
    const { name, website, industry, location, description } = companyData;
    if (!name || !website || !industry || !location || !description) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!logo) {
      setError('Please upload a company logo');
      return false;
    }
    setError(null);
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (file) => {
    setLogo(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      Object.entries(companyData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('logo', logo);
      navigate('/companies');
    } catch (err) {
      console.error(err);
      setError('An error occurred while creating the company.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-gray-50 to-gray-100 flex flex-col justify-between p-5">
      <FormNav />

      <main className="p-4">
        <div className="max-w-xl mx-auto">
          <h2 className="font-bold mb-4 flex justify-center text-4xl font-mono">Company Registration</h2>

          {error && <p className="text-red-600 mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            <div className="flex justify-center">
              <AvatarUpload
                type="company"
                previewImage={preview}
                inputRef={logoInputRef}
                onChange={handleLogoChange}
                error={error}
              />
            </div>

            {[
              { name: 'name', label: 'Company Name' },
              { name: 'website', label: 'Website' },
              { name: 'industry', label: 'Industry' },
              { name: 'location', label: 'Location' },
              { name: 'description', label: 'Description' },
              { name: 'linkedIn', label: 'LinkedIn URL' },
              { name: 'careersPage', label: 'Careers Page URL' },
            ].map(({ name, label }) => (
              <div key={name}>
                <label className="block text-sm font-medium">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={companyData[name]}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required={['name', 'website', 'industry', 'location', 'description'].includes(name)}
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium">Company Type</label>
              <select
                name="type"
                value={companyData.type}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="Startup">Startup</option>
                <option value="Product">Product</option>
                <option value="Service">Service</option>
                <option value="Government">Government</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Average Salary Band</label>
              <select
                name="averageSalaryBand"
                value={companyData.averageSalaryBand}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="Under 2 LPA">Under 2 LPA</option>
                <option value="2 – 5 LPA">2 – 5 LPA</option>
                <option value="5 – 10 LPA">5 – 10 LPA</option>
                <option value="Over 10 LPA">Over 10 LPA</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700"
            >
              {isLoading ? 'Registering...' : 'Register Company'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyRegisteration;
