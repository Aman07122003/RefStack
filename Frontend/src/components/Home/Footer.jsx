import React from 'react'
import { FiInstagram, FiLinkedin, FiPhone } from 'react-icons/fi';

const Footer = () => {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            <h1 className='text-2xl font-extrabold text-gray-900'>RefStack <span className='font-extrabold text-3xl text-green-400'>.</span></h1>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400">© {new Date().getFullYear()} RefStack. All rights reserved.</p>
            </div>
            <div className='flex gap-3'>
                <div className="mt-4 md:mt-0 flex bg-green-500 p-2 rounded-full space-x-6">
                <a href="#" className="text-white">
                    <span className="sr-only">Contact</span>
                    <FiPhone className="h-6 w-6" />
                </a>
                </div>
                <div className="mt-4 md:mt-0 flex bg-green-500 p-2 rounded-full space-x-6">
                <a href="#" className="text-white">
                    <span className="sr-only">Contact</span>
                    <FiInstagram className="h-6 w-6" />
                </a>
                </div>
                <div className="mt-4 md:mt-0 flex bg-green-500 p-2 rounded-full space-x-6">
                <a href="#" className="text-white">
                    <span className="sr-only">Contact</span>
                    <FiLinkedin className="h-6 w-6" />
                </a>
                </div>
            </div>
          </div>
        </div>
  )
}

export default Footer