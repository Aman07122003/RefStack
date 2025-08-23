import React from 'react';
import { FiPlusCircle, FiSearch, FiUsers, FiBriefcase } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuickAction = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
      <h2 className="font-extrabold text-black mb-7 text-3xl">Quick Actions</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {/* Register Company */}
        <button
          onClick={() => navigate('/register-company')}
          className="bg-white overflow-hidden shadow rounded-lg border-none hover:shadow-lg hover:border-green-400 border transition duration-300"
        >
          <div className="px-4 py-5 sm:p-6 flex items-center">
            <FiPlusCircle className="h-8 w-8 text-green-600 mr-4" />
            <div className="text-left">
              <h3 className="text-lg font-medium text-gray-900">Register Company</h3>
              <p className="mt-1 text-sm text-gray-500">Add your company to our system</p>
            </div>
          </div>
        </button>

        {/* Find Companies */}
        <button
          onClick={() => navigate('/companies')}
          className="bg-white overflow-hidden shadow rounded-lg border-none hover:shadow-lg hover:border-green-400 border transition duration-300"
        >
          <div className="px-4 py-5 sm:p-6 flex items-center">
            <FiSearch className="h-8 w-8 text-green-600 mr-4" />
            <div className="text-left">
              <h3 className="text-lg font-medium text-gray-900">Find Companies</h3>
              <p className="mt-1 text-sm text-gray-500">Browse registered companies</p>
            </div>
          </div>
        </button>

        {/* Add Employee */}
        <button
          onClick={() => navigate('/register-employee')}
          className="bg-white overflow-hidden shadow rounded-lg border-none hover:shadow-lg hover:border-green-400 border transition duration-300"
        >
          <div className="px-4 py-5 sm:p-6 flex items-center">
            <FiUsers className="h-8 w-8 text-green-600 mr-4" />
            <div className="text-left">
              <h3 className="text-lg font-medium text-gray-900">Add Employee</h3>
              <p className="mt-1 text-sm text-gray-500">Register an employee record</p>
            </div>
          </div>
        </button>

        {/* View Employees */}
        <button
          onClick={() => navigate('/employees')}
          className="bg-white overflow-hidden shadow rounded-lg border-none hover:shadow-lg hover:border-green-400 border transition duration-300"
        >
          <div className="px-4 py-5 sm:p-6 flex items-center">
            <FiBriefcase className="h-8 w-8 text-green-600 mr-4" />
            <div className="text-left">
              <h3 className="text-lg font-medium text-gray-900">View Employees</h3>
              <p className="mt-1 text-sm text-gray-500">Access employee references</p>
            </div>
          </div>
        </button>

      </div>
    </div>
  );
};

export default QuickAction;
