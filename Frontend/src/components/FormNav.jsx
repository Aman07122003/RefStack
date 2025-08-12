import React from 'react';
import { useNavigate } from 'react-router-dom';
import { navButton } from '../ui/Buttons';

const FormNav = () => {
    const navigate = useNavigate();
  return (
    <div className='h-[80px] flex items-center justify-between px-6'>
        <div
          className='w-[20%] h-[100%] flex items-center gap-1 cursor-pointer'
          onClick={() => navigate('/')}
        >
          <h1 className='text-2xl font-extrabold text-gray-900'>RefStack <span className='font-extrabold text-3xl text-green-400'>.</span></h1>
        </div>
        <div className='w-[40%] flex justify-end gap-5'>
            <button
                onClick={() => navigate('/companies/new')}
                className={navButton}
            >
                Register Company
            </button>
            <button
                onClick={() => navigate('/register-employee')}
                className={navButton}
            >
                Register Employee
            </button>
        </div>
    </div>
  )
}

export default FormNav