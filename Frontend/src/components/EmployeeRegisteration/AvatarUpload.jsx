import React from 'react';
import { FiUser, FiCamera } from 'react-icons/fi';

const AvatarUpload = ({ type, previewImage, inputRef, onChange, error }) => {
  const onImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e.target.files[0]);
    }
  };

  // Keyboard accessibility handler
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div className="mb-6">
      <label className='font-bold'>Profile Image</label>
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload profile image"
        className="relative w-22 h-22 rounded-full mt-4 overflow-hidden border-2 border-green-500 shadow-md cursor-pointer focus:outline-none focus:ring-4 focus:ring-green-300 group"
        onClick={() => inputRef.current?.click()}
        onKeyDown={handleKeyDown}
      >
        {previewImage ? (
          <img
            src={previewImage}
            alt="Profile preview"
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-green-50 text-green-400">
            <FiUser className="w-10 h-10" />
          </div>
        )}

        <div
          className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          title="Change profile image"
        >
          <FiCamera className="w-7 h-7 text-white" />
        </div>
      </div>

      <input
        type="file"
        ref={inputRef}
        onChange={onImageChange}
        accept="image/*"
        className="hidden"
      />

      {error && (
        <p className="mt-2 text-sm text-red-600 font-medium select-none" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default AvatarUpload;
