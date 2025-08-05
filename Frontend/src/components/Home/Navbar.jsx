import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  const sendHome = () => {
    navigate('/');
  };

  return (
    <div>
      <nav className='h-[70px] w-full flex justify-between p-2 bg-black'>
        <div
          className='w-[20%] h-[100%] flex items-center gap-1 cursor-pointer'
          onClick={sendHome}
        >
          <img className='h-[100%]' src={logo} alt="RefStack Logo" />
          <h1 className='text-2xl font-extrabold text-gray-300'>RefStack</h1>
        </div>

        <div className='w-[40%] flex justify-between items-center gap-3 mr-2'>
          <button
            onClick={() => navigate('/register-company')}
            className="text-black hover:text-black font-medium rounded-md px-4 py-2 bg-gray-100 hover:bg-gray-200 transition duration-300"
          >
            Register Company
          </button>

          <button
            onClick={() => navigate('/companies')}
            className="text-black hover:text-black font-medium rounded-md px-4 py-2 bg-gray-100 hover:bg-gray-200 transition duration-300"
          >
            View Company
          </button>

          <button
            onClick={() => navigate('/register-employee')}
            className="text-black hover:text-black font-medium rounded-md px-4 py-2 bg-gray-100 hover:bg-gray-200 transition duration-300"
          >
            Register Employee
          </button>

          <button
            onClick={() => navigate('/employees')}
            className="text-black hover:text-black font-medium rounded-md px-4 py-2 bg-gray-100 hover:bg-gray-200 transition duration-300"
          >
            View Employees
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
