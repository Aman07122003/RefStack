import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createNote } from "../api/Notes.api";
import FormNav from "../components/FormNav";
import Footer from "../components/Home/Footer";
import Editor from "@monaco-editor/react";
import { X, Upload, Image, Code, Type, Plus, Trash2 } from "lucide-react";

const CreateNote = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    question: {
      heading: "",
      description: "",
      examples: [
        { items: [] }
      ]
    },
    solutions: [
        {
          items: []
        }
      ],
    category: "",
    subCategory: "",
    tags: [],
    difficulty: "Medium",
    source: "",
  });

  // Track files to be uploaded
  const [filesToUpload, setFilesToUpload] = useState([]);

  // --- handlers ---
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

  const handleTagInput = (e) => {
    setTagInput(e.target.value);
  };

  const addTag = (e) => {
    if (e) e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const removeTag = (index) => {
    const updatedTags = [...formData.tags];
    updatedTags.splice(index, 1);
    setFormData(prev => ({ ...prev, tags: updatedTags }));
  };

  const handleExampleChange = (index, value) => {
    const updatedExamples = [...formData.question.examples];
    updatedExamples[index].value = value;
    setFormData(prev => ({
      ...prev,
      question: { ...prev.question, examples: updatedExamples }
    }));
  };

  const addExample = (type) => {
    setFormData(prev => ({
      ...prev,
      question: {
        ...prev.question,
        examples: [...prev.question.examples, { type, value: "" }]
      }
    }));
  };

  const removeExample = (index) => {
    const updatedExamples = [...formData.question.examples];
    updatedExamples.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      question: { ...prev.question, examples: updatedExamples }
    }));
  };

  const handleExampleImageUpload = (e, exampleIndex, itemIndex) => {
    const file = e.target.files[0];
    if (!file) return;
  
    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }
  
    // Create a temporary URL for preview
    const objectUrl = URL.createObjectURL(file);
  
    const updatedExamples = [...formData.question.examples];
  
    // Replace inside the correct example group + item
    updatedExamples[exampleIndex].items[itemIndex] = {
      type: "image",
      value: objectUrl,
      file: file, // keep the file for upload
    };
  
    setFormData((prev) => ({
      ...prev,
      question: { ...prev.question, examples: updatedExamples },
    }));
  
    // Keep track of files separately if needed
    setFilesToUpload((prev) => [...prev, file]);
  };
  

  const handleSolutionChange = (solutionIndex, itemIndex, field, value) => {
    const updatedSolutions = [...formData.solutions];
    updatedSolutions[solutionIndex].items[itemIndex][field] = value;
  
    setFormData((prev) => ({
      ...prev,
      solutions: updatedSolutions,
    }));
  };
  

  const handleSolutionImageUpload = (e, solutionIndex, itemIndex) => {
    const file = e.target.files[0];
    if (!file) return;
  
    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }
  
    const objectUrl = URL.createObjectURL(file);
  
    const updatedSolutions = [...formData.solutions];
    updatedSolutions[solutionIndex].items[itemIndex] = {
      type: "image",
      value: objectUrl,
      file: file,
    };
  
    setFormData((prev) => ({
      ...prev,
      solutions: updatedSolutions,
    }));
  
    setFilesToUpload((prev) => [...prev, file]);
  };
  

  const addSolution = () => {
    setFormData((prev) => ({
      ...prev,
      solutions: [...prev.solutions, { items: [] }]
    }));
  };
  
  const addSolutionItem = (solutionIndex, type) => {
    const updatedSolutions = [...formData.solutions];
    updatedSolutions[solutionIndex].items.push({ type, value: "" });
  
    setFormData((prev) => ({
      ...prev,
      solutions: updatedSolutions,
    }));
  };
  
  const removeSolutionItem = (solutionIndex, itemIndex) => {
    const updatedSolutions = [...formData.solutions];
    updatedSolutions[solutionIndex].items.splice(itemIndex, 1);
  
    setFormData((prev) => ({
      ...prev,
      solutions: updatedSolutions,
    }));
  };
  
  const removeSolution = (solutionIndex) => {
    const updatedSolutions = [...formData.solutions];
    updatedSolutions.splice(solutionIndex, 1);
  
    setFormData((prev) => ({
      ...prev,
      solutions: updatedSolutions,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Prepare the payload according to the backend model
      const payload = {
        question: {
          heading: formData.question.heading,
          description: formData.question.description || "",
          examples: formData.question.examples.map(example => ({
            type: example.type,
            value: example.type === "image" ? "placeholder" : example.value
          }))
        },
        solutions: formData.solutions.map(solution => ({
          type: solution.type,
          value: solution.type === "image" ? "placeholder" : solution.value
        })),
        category: formData.category,
        subCategory: formData.subCategory,
        tags: formData.tags,
        difficulty: formData.difficulty,
        source: formData.source,
      };

      // Create FormData to handle file uploads
      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(payload));
      
      // Add any image files that need to be uploaded
      let fileIndex = 0;
      
      // Check examples for images that need uploading
      formData.question.examples.forEach((example, index) => {
        if (example.type === "image" && example.file) {
          formDataToSend.append('files', example.file);
        }
      });
      
      // Check solutions for images that need uploading
      formData.solutions.forEach((solution, index) => {
        if (solution.type === "image" && solution.file) {
          formDataToSend.append('files', solution.file);
        }
      });

      await createNote(formDataToSend);

      navigate("/notes");
    } catch (err) {
      console.error(err);
      console.log(formData);
      alert("Failed to create note: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <FormNav />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Note</h1>

            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
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

              {/* Examples */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <label className="font-medium text-gray-700">Examples</label>
                  <div className="">
                    <button
                        type="button"
                        onClick={() => {
                            setFormData(prev => ({
                            ...prev,
                            question: {
                                ...prev.question,
                                examples: [...prev.question.examples, { items: [] }]
                            }
                            }));
                        }}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                        >
                        ➕ Add Example
                    </button>

                  </div>
                </div>
                
                <div className="space-y-4">
                {formData.question.examples.map((exampleGroup, exIdx) => (
                <div key={exIdx} className="border rounded-lg p-4 bg-white space-y-4">
                    <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700">Example {exIdx + 1}</h3>
                    <button
                        type="button"
                        onClick={() => {
                        const updated = formData.question.examples.filter((_, i) => i !== exIdx);
                        setFormData(prev => ({
                            ...prev,
                            question: { ...prev.question, examples: updated }
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
                        setFormData(prev => ({ ...prev, question: { ...prev.question, examples: updated } }));
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
                        setFormData(prev => ({ ...prev, question: { ...prev.question, examples: updated } }));
                        }}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                    >
                        <Image size={16} /> Add Image
                    </button>
                    </div>

                    {/* render the items inside this group */}
                    {exampleGroup.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="border rounded-md p-3">
                        {item.type === "text" ? (
                        <textarea
                            value={item.value}
                            onChange={(e) => {
                            const updated = [...formData.question.examples];
                            updated[exIdx].items[itemIdx].value = e.target.value;
                            setFormData(prev => ({ ...prev, question: { ...prev.question, examples: updated } }));
                            }}
                            placeholder="Example text"
                            className="w-full border rounded-md p-2"
                        />
                        ) : (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleExampleImageUpload(e, exIdx, itemIdx)}
                        />
                        )}
                    </div>
                    ))}
                </div>
                ))}

                </div>
              </div>

              {/* Solutions */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <label className="font-medium text-gray-700">Solutions</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => addSolution("text")}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                    >
                      <Type size={16} /> Add Solution
                    </button>
                  </div>
                </div>
                
                {formData.solutions.map((solution, solIdx) => (
                <div key={solIdx} className="border rounded-md p-4 bg-white mb-4">
                    <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Solution {solIdx + 1}</h3>
                    <button onClick={() => removeSolution(solIdx)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={16} />
                    </button>
                    </div>

                    {/* Render each item inside the solution */}
                    {solution.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="mb-3">
                        {item.type === "text" && (
                        <textarea
                            value={item.value}
                            onChange={(e) => handleSolutionChange(solIdx, itemIdx, "value", e.target.value)}
                            placeholder="Solution explanation"
                            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                            rows="4"
                        />
                        )}

                        {item.type === "image" && (
                        item.value ? (
                            <div className="relative inline-block">
                            <img src={item.value} alt={`Solution ${solIdx + 1}`} className="h-40 w-auto rounded border" />
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
                            <Upload size={18} className="mr-2 text-gray-400" />
                            <span>Upload Image</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleSolutionImageUpload(e, solIdx, itemIdx)}
                                className="hidden"
                            />
                            </label>
                        )
                        )}

                        {item.type === "code" && (
                        <Editor
                            height="200px"
                            language="javascript"
                            value={item.value}
                            onChange={(value) => handleSolutionChange(solIdx, itemIdx, "value", value || "")}
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

                    {/* Add new item buttons inside each solution */}
                    <div className="flex gap-2 mt-2">
                    <button onClick={() => addSolutionItem(solIdx, "text")} className="px-3 py-1 bg-blue-100 rounded">
                        <Type size={14} /> Add Text
                    </button>
                    <button onClick={() => addSolutionItem(solIdx, "image")} className="px-3 py-1 bg-blue-100 rounded">
                        <Image size={14} /> Add Image
                    </button>
                    <button onClick={() => addSolutionItem(solIdx, "code")} className="px-3 py-1 bg-blue-100 rounded">
                        <Code size={14} /> Add Code
                    </button>
                    </div>
                </div>
                ))}

              </div>

              {/* Meta Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Tags
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={handleTagInput}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
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
                      <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center">
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

                <div>
                  <label className="block mb-2 font-medium text-gray-700">Difficulty</label>
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

                <div>
                  <label className="block mb-2 font-medium text-gray-700">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Algorithms"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Sub-Category</label>
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

              <div>
                <label className="block mb-2 font-medium text-gray-700">Source</label>
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  placeholder="e.g. LeetCode Problem #123"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium transition-colors"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Note"}
              </button>
            </form>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateNote;