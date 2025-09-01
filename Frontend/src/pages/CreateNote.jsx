import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createNote } from "../api/Notes.api";
import FormNav from "../components/FormNav";
import Footer from "../components/Home/Footer";
import Editor from "@monaco-editor/react";
import { X, Upload, Image, Code, Type, Plus, Trash2 } from "lucide-react";
import Header from "../components/Notes/Header";
import Examples from "../components/Notes/Examples";
import MetaFields from "../components/Notes/MetaFields";
import Solutions from "../components/Notes/Solutions";
import TagInput from "../components/Notes/TagInput";
import SourceInput from "../components/Notes/SourceInput";
import SubmitButton from "../components/Notes/SubmitButton";



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
    video: "",
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
        video: formData.video,
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
      console.log(formData);
    } catch (err) {
      console.error(err);
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
              <Header formData={formData} setFormData={setFormData} />

              <Examples 
                formData={formData} 
                setFormData={setFormData} 
                handleExampleImageUpload={handleExampleImageUpload} 
              />

              <Solutions
                formData={formData}
                addSolution={addSolution}
                removeSolution={removeSolution}
                addSolutionItem={addSolutionItem}
                removeSolutionItem={removeSolutionItem}
                handleSolutionChange={handleSolutionChange}
                handleSolutionImageUpload={handleSolutionImageUpload}
              />

              <MetaFields 
                formData={formData} 
                setFormData={setFormData} 
                tagInput={tagInput} 
                setTagInput={setTagInput} 
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