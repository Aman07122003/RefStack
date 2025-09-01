import React from "react";
import { Trash2, X, Upload, Image, Code, Type, Plus } from "lucide-react";
import Editor from "@monaco-editor/react";

const Solutions = ({
  formData,
  addSolution,
  removeSolution,
  addSolutionItem,
  removeSolutionItem,
  handleSolutionChange,
  handleSolutionImageUpload,
}) => {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-3">
        <label className="font-medium text-gray-700">Solutions</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => addSolution("text")}
            className="px-3 py-1 bg-green-100 flex items-center gap-1 text-green-700 rounded-md hover:bg-green-200"
          >
            <Plus size={16} /> Add Solution
          </button>
        </div>
      </div>

      {formData.solutions.map((solution, solIdx) => (
        <div
          key={solIdx}
          className="border rounded-md p-4 bg-white mb-4"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Solution {solIdx + 1}</h3>
            <button
              type="button"
              onClick={() => removeSolution(solIdx)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* Render each item inside the solution */}
          {solution.items.map((item, itemIdx) => (
            <div key={itemIdx} className="mb-3">
              {item.type === "text" && (
                <textarea
                  value={item.value}
                  onChange={(e) =>
                    handleSolutionChange(
                      solIdx,
                      itemIdx,
                      "value",
                      e.target.value
                    )
                  }
                  placeholder="Solution explanation"
                  className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                  rows="4"
                />
              )}

              {item.type === "image" &&
                (item.value ? (
                  <div className="relative inline-block">
                    <img
                      src={item.value}
                      alt={`Solution ${solIdx + 1}`}
                      className="h-40 w-auto rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeSolutionItem(solIdx, itemIdx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center p-3 border-2 border-dashed rounded-md cursor-pointer hover:border-blue-500">
                    <Upload
                      size={18}
                      className="mr-2 text-gray-400"
                    />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleSolutionImageUpload(e, solIdx, itemIdx)
                      }
                      className="hidden"
                    />
                  </label>
                ))}

              {item.type === "code" && (
                <Editor
                  height="200px"
                  language="javascript"
                  value={item.value}
                  onChange={(value) =>
                    handleSolutionChange(
                      solIdx,
                      itemIdx,
                      "value",
                      value || ""
                    )
                  }
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              )}
            </div>
          ))}

          {/* Add new item buttons */}
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => addSolutionItem(solIdx, "text")}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
            >
              <Type size={16} /> Add Text
            </button>
            <button
              type="button"
              onClick={() => addSolutionItem(solIdx, "image")}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
            >
              <Image size={16} /> Add Image
            </button>
            <button
              type="button"
              onClick={() => addSolutionItem(solIdx, "code")}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
            >
              <Code size={16} /> Add Code
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Solutions;
