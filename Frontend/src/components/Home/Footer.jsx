import React from 'react'
import { FiInstagram, FiLinkedin, FiPhone } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="w-full bg-white/80 backdrop-blur-md border-t border-gray-200 px-4 rounded-2xl py-6 mt-3">
      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
        
        {/* Logo */}
        <h1 className="text-2xl font-extrabold text-gray-900 text-center md:text-left">
          RefStack <span className="font-extrabold text-3xl text-green-400">.</span>
        </h1>
        
        {/* Copyright */}
        <p className="text-gray-500 text-center md:text-left">
          © {new Date().getFullYear()} RefStack. All rights reserved.
        </p>
        
        {/* Social Links */}
        <div className="flex gap-4 justify-center md:justify-end">
          <a href="#" className="bg-green-500 p-2 rounded-full text-white hover:bg-green-600 transition">
            <FiPhone className="h-5 w-5" />
          </a>
          <a href="#" className="bg-green-500 p-2 rounded-full text-white hover:bg-green-600 transition">
            <FiInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="bg-green-500 p-2 rounded-full text-white hover:bg-green-600 transition">
            <FiLinkedin className="h-5 w-5" />
          </a>
        </div>

      </div>
    </footer>
  )
}

export default Footer
