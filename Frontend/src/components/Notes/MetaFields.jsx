import React from "react";
import { X } from "lucide-react";

const MetaFields = ({
  formData,
  setFormData,
  tagInput,
  setTagInput,
}) => {
  // handle input change for non-nested fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle tag input typing
  const handleTagInput = (e) => setTagInput(e.target.value);

  // add a tag
  const addTag = () => {
    if (tagInput.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  // remove a tag
  const removeTag = (index) => {
    const updatedTags = formData.tags.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, tags: updatedTags }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Tags */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">Tags</label>
        <div className="flex">
          <input
            type="text"
            value={tagInput}
            onChange={handleTagInput}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="Enter a tag"
            className="flex-1 border border-gray-300 rounded-l-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addTag}
            className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-1 text-red-500 hover:text-red-700"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Difficulty
        </label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g. Algorithms"
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Sub-Category */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Sub-Category
        </label>
        <input
          type="text"
          name="subCategory"
          value={formData.subCategory}
          onChange={handleChange}
          placeholder="e.g. Sorting"
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default MetaFields;
