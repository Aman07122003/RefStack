import React from "react";

const SourceInput = ({ sourceValue, videoValue, onChange }) => (
  <div className="space-y-4">
    {/* Source */}
    <div>
      <label className="block mb-2 font-medium text-gray-700">Source</label>
      <input
        type="text"
        name="source"
        value={sourceValue}
        onChange={onChange}
        placeholder="e.g. LeetCode Problem #123"
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    {/* Video URL */}
    <div>
      <label className="block mb-2 font-medium text-gray-700">Video URL</label>
      <input
        type="url"
        name="video"
        value={videoValue}
        onChange={onChange}
        placeholder="e.g. https://www.youtube.com/watch?v=xxxx"
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  </div>
);

export default SourceInput;
