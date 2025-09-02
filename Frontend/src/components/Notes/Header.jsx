import React from 'react';

const Header = ({ question, setFormData }) => {
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, question: e.target.value }));
  };

  return (
    <div>
      <label className="block mb-2 font-medium text-gray-700">Question *</label>
      <input
        type="text"
        value={question}
        onChange={handleChange}
        placeholder="Enter your question"
        required
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default Header;
