import React from 'react';
import { FiBriefcase, FiUsers, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Freatures = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section heading */}
      <div className="lg:text-center">
        <h2 className="text-base text-green-500 animate-bounce font-bold tracking-wide uppercase">
          Features
        </h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          A better way to manage references
        </p>
      </div>

      {/* Features grid */}
      <div className="mt-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Feature 1 */}
          <div className="text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
              <FiBriefcase className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-medium text-gray-900">
              Company Management
            </h3>
            <p className="mt-2 text-base text-gray-500">
              Easily register and manage your company profile for professional references.
            </p>
            <button
              onClick={() => navigate('/register-company')}
              className="mt-4 text-green-600 hover:text-green-500 text-sm font-medium"
            >
              Get started →
            </button>
          </div>

          {/* Feature 2 */}
          <div className="text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
              <FiUsers className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-medium text-gray-900">
              Employee References
            </h3>
            <p className="mt-2 text-base text-gray-500">
              Maintain comprehensive reference records for current and former employees.
            </p>
            <button
              onClick={() => navigate('/register-employee')}
              className="mt-4 text-green-600 hover:text-green-500 text-sm font-medium"
            >
              Learn more →
            </button>
          </div>

          {/* Feature 3 */}
          <div className="text-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
              <FiSearch className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-medium text-gray-900">
              Verification System
            </h3>
            <p className="mt-2 text-base text-gray-500">
              Quickly verify employment history and professional references.
            </p>
            <button
              onClick={() => navigate('/employees')}
              className="mt-4 text-green-600 hover:text-green-500 text-sm font-medium"
            >
              Explore →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Freatures;
