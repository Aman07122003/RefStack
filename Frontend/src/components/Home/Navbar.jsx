import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { navButton } from '../../ui/Buttons';

const Navbar = () => {
  const navigate = useNavigate();

  const sendHome = () => {
    navigate('/');
  };

  return (
    <div className='h-[80px] w-full items-center flex justify-center fixed z-50'>
      <nav className='h-[60px] rounded-4xl w-2xl flex justify-between p-4 bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl'>
        <div
          className='w-[20%] h-[100%] flex items-center gap-1 cursor-pointer'
          onClick={sendHome}
        >
          <h1 className='text-2xl font-extrabold text-gray-900'>RefStack <span className='font-extrabold text-3xl text-green-400'>.</span></h1>
        </div>

        <div className='w-[70%] flex justify-between items-center gap-3 mr-2'>
          <button
            onClick={() => navigate('/companies/new')}
            className={navButton}
          >
            Features
          </button>

          <button
            onClick={() => navigate('/companies')}
            className={navButton}
          >
            Dashbord
          </button>

          <button
            onClick={() => navigate('/companies')}
            className={navButton}
          >
            About
          </button>

          <button
            onClick={() => navigate('/companies')}
            className={navButton}
          >
            Contact
          </button>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
