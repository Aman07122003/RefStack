import React from 'react'

const Header = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith("question.")) {
      const field = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        question: { ...prev.question, [field]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div>
      {/* Question Heading */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">Question Title *</label>
        <input
          type="text"
          name="question.heading"
          value={formData.question.heading}
          onChange={handleChange}
          placeholder="Enter question heading"
          required
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Question Description */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">Question Description</label>
        <textarea
          name="question.description"
          value={formData.question.description}
          onChange={handleChange}
          placeholder="Enter question description"
          rows="3"
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}

export default Header
