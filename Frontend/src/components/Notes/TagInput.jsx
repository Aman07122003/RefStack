// components/Notes/TagInput.jsx
import React from "react";
import { X } from "lucide-react";

const TagInput = ({ tags, tagInput, setTagInput, addTag, removeTag }) => {
  return (
    <div>
      <label className="block mb-2 font-medium text-gray-700">Tags</label>
      <div className="flex flex-wrap items-center gap-2 border p-2 rounded-lg">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-1 text-blue-500 hover:text-blue-700"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTag(e)}
          placeholder="Add a tag..."
          className="flex-1 min-w-[120px] outline-none p-1"
        />
      </div>
    </div>
  );
};

export default TagInput;
