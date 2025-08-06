import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBriefcase, FiUsers, FiPhone, FiPlusCircle, FiSearch } from 'react-icons/fi';
import WebsiteLogo from '../assets/WebsiteLogo.png';
import logo from '../assets/logo.png'; 

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-100 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <img className="mx-auto h-32 rounded-2xl w-auto mb-6" src={WebsiteLogo} alt="RefStack Logo" />
            <h1 className="text-4xl text-black font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Streamline Your Reference Management
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-500">
              RefStack helps companies and employees manage professional references efficiently and securely.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <button
                onClick={() => navigate('/register-company')}
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10 transition duration-300"
              >
                Register Your Company
              </button>
              <button
                onClick={() => navigate('/companies')}
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition duration-300"
              >
                Browse Companies
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to manage references
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <FiBriefcase className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900">Company Management</h3>
                <p className="mt-2 text-base text-gray-500">
                  Easily register and manage your company profile for professional references.
                </p>
                <button
                  onClick={() => navigate('/register-company')}
                  className="mt-4 text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                >
                  Get started →
                </button>
              </div>

              {/* Feature 2 */}
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <FiUsers className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900">Employee References</h3>
                <p className="mt-2 text-base text-gray-500">
                  Maintain comprehensive reference records for current and former employees.
                </p>
                <button
                  onClick={() => navigate('/register-employee')}
                  className="mt-4 text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                >
                  Learn more →
                </button>
              </div>

              {/* Feature 3 */}
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <FiSearch className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-medium text-gray-900">Verification System</h3>
                <p className="mt-2 text-base text-gray-500">
                  Quickly verify employment history and professional references.
                </p>
                <button
                  onClick={() => navigate('/employees')}
                  className="mt-4 text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                >
                  Explore →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <button
              onClick={() => navigate('/register-company')}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition duration-300"
            >
              <div className="px-4 py-5 sm:p-6 flex items-center">
                <FiPlusCircle className="h-8 w-8 text-indigo-600 mr-4" />
                <div className="text-left">
                  <h3 className="text-lg font-medium text-gray-900">Register Company</h3>
                  <p className="mt-1 text-sm text-gray-500">Add your company to our system</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/companies')}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition duration-300"
            >
              <div className="px-4 py-5 sm:p-6 flex items-center">
                <FiSearch className="h-8 w-8 text-indigo-600 mr-4" />
                <div className="text-left">
                  <h3 className="text-lg font-medium text-gray-900">Find Companies</h3>
                  <p className="mt-1 text-sm text-gray-500">Browse registered companies</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/register-employee')}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition duration-300"
            >
              <div className="px-4 py-5 sm:p-6 flex items-center">
                <FiUsers className="h-8 w-8 text-indigo-600 mr-4" />
                <div className="text-left">
                  <h3 className="text-lg font-medium text-gray-900">Add Employee</h3>
                  <p className="mt-1 text-sm text-gray-500">Register an employee record</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/employees')}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition duration-300"
            >
              <div className="px-4 py-5 sm:p-6 flex items-center">
                <FiBriefcase className="h-8 w-8 text-indigo-600 mr-4" />
                <div className="text-left">
                  <h3 className="text-lg font-medium text-gray-900">View Employees</h3>
                  <p className="mt-1 text-sm text-gray-500">Access employee references</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <img className="h-8 w-auto" src={logo} alt="RefStack Logo" />
              <span className="ml-2 text-xl font-bold">RefStack</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400">© {new Date().getFullYear()} RefStack. All rights reserved.</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Contact</span>
                <FiPhone className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;