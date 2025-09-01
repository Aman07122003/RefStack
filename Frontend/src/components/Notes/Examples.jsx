import React from "react";
import { Trash2, Type, Image, Plus } from "lucide-react";

const Examples = ({ formData, setFormData, handleExampleImageUpload }) => {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-3">
        <label className="font-medium text-gray-700">Examples</label>
        <div>
          <button
            type="button"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                question: {
                  ...prev.question,
                  examples: [...prev.question.examples, { items: [] }],
                },
              }));
            }}
            className="px-3 py-1 flex items-center gap-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
          >
            <Plus size={16} /> Add Example
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {formData.question.examples.map((exampleGroup, exIdx) => (
          <div key={exIdx} className="border rounded-lg p-4 bg-white space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-700">
                Example {exIdx + 1}
              </h3>
              <button
                type="button"
                onClick={() => {
                  const updated = formData.question.examples.filter(
                    (_, i) => i !== exIdx
                  );
                  setFormData((prev) => ({
                    ...prev,
                    question: { ...prev.question, examples: updated },
                  }));
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* buttons to add items inside this example */}
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => {
                  const updated = [...formData.question.examples];
                  updated[exIdx].items.push({ type: "text", value: "" });
                  setFormData((prev) => ({
                    ...prev,
                    question: { ...prev.question, examples: updated },
                  }));
                }}
                className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
              >
                <Type size={16} /> Add Text
              </button>
              <button
                type="button"
                onClick={() => {
                  const updated = [...formData.question.examples];
                  updated[exIdx].items.push({ type: "image", value: "" });
                  setFormData((prev) => ({
                    ...prev,
                    question: { ...prev.question, examples: updated },
                  }));
                }}
                className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
              >
                <Image size={16} /> Add Image
              </button>
            </div>

            {/* render the items inside this group */}
            {exampleGroup.items.map((item, itemIdx) => (
              <div key={itemIdx} className=" p-3">
                {item.type === "text" ? (
                  <textarea
                    value={item.value}
                    onChange={(e) => {
                      const updated = [...formData.question.examples];
                      updated[exIdx].items[itemIdx].value = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        question: { ...prev.question, examples: updated },
                      }));
                    }}
                    placeholder="Example text"
                    className="w-full border rounded-md p-2"
                  />
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleExampleImageUpload(e, exIdx, itemIdx)
                    }
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Examples;
