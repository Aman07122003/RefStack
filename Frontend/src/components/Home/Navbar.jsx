import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navButton } from '../../ui/Buttons';
import { Menu, X } from 'lucide-react'; // hamburger and close icons

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const sendHome = () => {
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-[80px] w-full flex items-center justify-center fixed z-50">
      <nav className="h-[60px] rounded-4xl w-11/12 md:w-2xl flex justify-between items-center px-4 bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
        
        {/* Logo */}
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={sendHome}
        >
          <h1 className="text-2xl font-extrabold text-gray-900">
            RefStack <span className="font-extrabold text-3xl text-green-400">.</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={() => navigate('/')} className={navButton}>
            Features
          </button>
          <button onClick={() => navigate('/')} className={navButton}>
            Dashboard
          </button>
          <button onClick={() => navigate('/')} className={navButton}>
            About
          </button>
          <button onClick={() => navigate('/')} className={navButton}>
            Contact
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-900">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-white/90 backdrop-blur-md shadow-lg flex flex-col items-center gap-4 py-6 md:hidden">
          <button onClick={() => { navigate('/'); setIsOpen(false); }} className={navButton}>
            Features
          </button>
          <button onClick={() => { navigate('/'); setIsOpen(false); }} className={navButton}>
            Dashboard
          </button>
          <button onClick={() => { navigate('/'); setIsOpen(false); }} className={navButton}>
            About
          </button>
          <button onClick={() => { navigate('/'); setIsOpen(false); }} className={navButton}>
            Contact
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
