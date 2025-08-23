import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navButton } from '../ui/Buttons';
import { FiMenu, FiX } from 'react-icons/fi';

const FormNav = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="h-[80px] flex items-center justify-between px-6 bg-white shadow-md relative">
      {/* Logo */}
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <h1 className="text-2xl font-extrabold text-gray-900">
          RefStack <span className="font-extrabold text-3xl text-green-400">.</span>
        </h1>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-5">
        <button
          onClick={() => navigate('/companies/new')}
          className={navButton}
        >
          Register Company
        </button>
        <button
          onClick={() => navigate('/employees')}
          className={navButton}
        >
          Register Employee
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-[80px] right-0 w-full bg-white border-t border-gray-200 shadow-md flex flex-col items-center gap-4 py-4 md:hidden z-50">
          <button
            onClick={() => {
              navigate('/companies/new');
              setMenuOpen(false);
            }}
            className={navButton}
          >
            Register Company
          </button>
          <button
            onClick={() => {
              navigate('/employees');
              setMenuOpen(false);
            }}
            className={navButton}
          >
            Register Employee
          </button>
        </div>
      )}
    </div>
  );
};

export default FormNav;
