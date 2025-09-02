import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createNote } from "../api/Notes.api";
import FormNav from "../components/FormNav";
import Footer from "../components/Home/Footer";
import { X, Upload } from "lucide-react";
import Header from "../components/Notes/Header";
import MetaFields from "../components/Notes/MetaFields";
import TagInput from "../components/Notes/TagInput";
import SourceInput from "../components/Notes/SourceInput";
import SubmitButton from "../components/Notes/SubmitButton";

const CreateNote = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    question: "",
    category: "",
    subCategory: "",
    tags: [],
    difficulty: "Medium",
    source: "",
    video: "",
  });

  // --- handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      return;
    }

    setSelectedFile(file);
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
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const submitData = new FormData();

      if (selectedFile) submitData.append('pdfFile', selectedFile);

      submitData.append('data', JSON.stringify(formData));

      const response = await createNote(submitData);

      console.log("Note created successfully:", response);
      navigate("/notes");

    } catch (err) {
      console.log(err);
      alert(
        "Failed to create note: " +
        (err.response?.data?.message || err.message)
      );
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
              <Header question={formData.question} setFormData={setFormData} />

              {/* PDF upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Upload PDF File
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                  >
                    <Upload size={18} className="mr-2" />
                    {selectedFile ? "Change PDF" : "Select PDF"}
                  </button>
                  {selectedFile && (
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">{selectedFile.name}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">Only PDF files are accepted</p>
              </div>

              <MetaFields 
                formData={formData} 
                setFormData={setFormData} 
                tagInput={tagInput} 
                setTagInput={setTagInput} 
                onChange={handleChange}
              />

              <TagInput 
                tags={formData.tags} 
                tagInput={tagInput} 
                setTagInput={setTagInput} 
                addTag={addTag} 
                removeTag={removeTag}
              />

              <SourceInput
                sourceValue={formData.source}
                videoValue={formData.video}
                onChange={handleChange}
              />

              <SubmitButton loading={loading} />

            </form>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateNote;
