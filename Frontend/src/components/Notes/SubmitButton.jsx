// components/Notes/SubmitButton.jsx
import React from "react";

const SubmitButton = ({ loading }) => (
  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium transition-colors"
    disabled={loading}
  >
    {loading ? "Creating..." : "Create Note"}
  </button>
);

export default SubmitButton;
