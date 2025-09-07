import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, FileDown, Pencil, Trash2, ChevronDown, ChevronUp, Filter, X, Briefcase, Eye, Video, Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Code } from 'lucide-react';
import {
  getAllNotes,
  deleteNote,
} from '../api/Notes.api.js';
import FormNav from '../components/FormNav';
import Footer from '../components/Home/Footer';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Notes = ({ groupedNotes = {}, category = '', subCategory = '' }) => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubCategories, setExpandedSubCategories] = useState({});
  const [availableCategories, setAvailableCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [pdfViewer, setPdfViewer] = useState({ 
    isOpen: false, 
    url: '', 
    title: '' 
  });
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      // Extract all unique categories
      const allCategories = [...new Set(notes.map(note => note.category).filter(Boolean))];
      setAvailableCategories(allCategories.sort());
      
      // Initialize expanded state for each category
      const initialCategoryState = {};
      allCategories.forEach(category => {
        initialCategoryState[category] = false;
      });
      setExpandedCategories(initialCategoryState);
    }
  }, [notes]);

  useEffect(() => {
    filterNotes();
  }, [notes, activeFilter, searchQuery]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await getAllNotes();
      const notesArray = response?.message?.notes || [];
      setNotes(notesArray);
      console.log(response);
      setFilteredNotes(notesArray);
    } catch (err) {
      console.error(err);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const filterNotes = () => {
    let filtered = [...notes];
    
    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(note => 
        note.category && note.category === activeFilter
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(note => 
        note.question.heading.toLowerCase().includes(query) ||
        (note.question.examples?.[0]?.description || '').toLowerCase().includes(query) ||
        (note.tags || []).some(tag => tag.toLowerCase().includes(query)) ||
        (note.category && note.category.toLowerCase().includes(query)) ||
        (note.subCategory && note.subCategory.toLowerCase().includes(query))
      );
    }
    
    setFilteredNotes(filtered);
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const toggleSubCategory = (category, subCategory) => {
    const key = `${category}-${subCategory}`;
    setExpandedSubCategories(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await deleteNote(id);
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewPDF = (pdfUrl, title) => {
    console.log('PDF URL:', pdfUrl);
    
    setPdfViewer({
      isOpen: true,
      url: pdfUrl,
      title: title
    });
    setPageNumber(1);
    setScale(1.0);
  };

  const closePdfViewer = () => {
    setPdfViewer({
      isOpen: false,
      url: '',
      title: ''
    });
  };

  const groupNotesByCategoryAndSubCategory = (notesToGroup) => {
    const grouped = {};
    
    notesToGroup.forEach(note => {
      // If note has no category, put it in "Uncategorized" category
      const category = note.category || 'Uncategorized';
      const subCategory = note.subCategory || 'General';
      
      if (!grouped[category]) {
        grouped[category] = {
          notes: [],
          subCategories: {}
        };
      }
      
      if (!grouped[category].subCategories[subCategory]) {
        grouped[category].subCategories[subCategory] = [];
      }
      
      grouped[category].subCategories[subCategory].push(note);
      grouped[category].notes.push(note);
    });
    
    return grouped;
  };

  const handleNoteClick = (category, subCategory, question) => {
    navigate(`/notes/${category}/${subCategory}/${question}`);
};


  const grouped = groupNotesByCategoryAndSubCategory(filteredNotes);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <FormNav />
      
      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {pdfViewer.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={closePdfViewer}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-screen overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold">{pdfViewer.title}</h3>
                <button
                  onClick={closePdfViewer}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-4 max-h-[70vh] overflow-auto">
                <Document
                  file={pdfViewer.url}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  loading={<div className="text-center py-8">Loading PDF...</div>}
                >
                  <Page pageNumber={pageNumber} scale={scale} />
                </Document>
              </div>
              <div className="flex items-center justify-between p-4 border-t bg-gray-50">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                    disabled={pageNumber <= 1}
                    className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-sm">
                    Page {pageNumber} of {numPages || '--'}
                  </span>
                  <button
                    onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages || prev))}
                    disabled={pageNumber >= (numPages || 1)}
                    className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setScale(prev => Math.max(prev - 0.2, 0.5))}
                    className="p-2 rounded hover:bg-gray-200"
                  >
                    <ZoomOut size={20} />
                  </button>
                  <span className="text-sm">{(scale * 100).toFixed(0)}%</span>
                  <button
                    onClick={() => setScale(prev => Math.min(prev + 0.2, 2))}
                    className="p-2 rounded hover:bg-gray-200"
                  >
                    <ZoomIn size={20} />
                  </button>
                  <a
                    href={pdfViewer.url}
                    download
                    className="p-2 rounded hover:bg-gray-200 text-blue-600"
                  >
                    <Download size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">My Notes</h1>
          
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 w-full md:w-auto"
              >
                <Filter size={16} />
                {activeFilter === 'all' ? 'All Categories' : `Category: ${activeFilter}`}
                {showFilterDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      setActiveFilter('all');
                      setShowFilterDropdown(false);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${activeFilter === 'all' ? 'bg-blue-50 text-blue-600' : ''}`}
                  >
                    All Categories
                  </button>
                  {availableCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveFilter(category);
                        setShowFilterDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${activeFilter === category ? 'bg-blue-50 text-blue-600' : ''}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => navigate('/notes/new')}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap"
            >
              <PlusCircle size={16} /> Add Note
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading notes...</p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">
              {searchQuery || activeFilter !== 'all' 
                ? 'No notes match your filters.' 
                : 'No notes available. Create one!'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.keys(grouped).map(category => (
              <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 text-lg font-medium rounded-full">
                      {category}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({grouped[category].notes.length} note{grouped[category].notes.length !== 1 ? 's' : ''})
                    </span>
                  </div>
                  {expandedCategories[category] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                
                <AnimatePresence>
                  {expandedCategories[category] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 space-y-4">
                        {Object.keys(grouped[category].subCategories).map(subCategory => (
                          <div key={subCategory} className="bg-gray-50 rounded-lg overflow-hidden">
                            <button
                              onClick={() => toggleSubCategory(category, subCategory)}
                              className="w-full flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="px-2 py-1 text-md font-medium">
                                  {subCategory}
                                </span>
                                <span className="text-sm text-gray-500">
                                  ({grouped[category].subCategories[subCategory].length} note{grouped[category].subCategories[subCategory].length !== 1 ? 's' : ''})
                                </span>
                              </div>
                              {expandedSubCategories[`${category}-${subCategory}`] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>
                            
                            <AnimatePresence>
                              {expandedSubCategories[`${category}-${subCategory}`] && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-4">
                                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                                      <table className="min-w-full divide-y divide-gray-200 bg-white">
                                        <thead className="bg-gray-50">
                                          <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Heading
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              PDF
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Tags
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Difficulty
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Code
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs flex items-center font-medium text-gray-500 uppercase tracking-wider">
                                              Video
                                            </th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                              Actions
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                          {grouped[category].subCategories[subCategory].map((note, idx) => (
                                            <motion.tr
                                              key={note._id}
                                              initial={{ opacity: 0 }}
                                              animate={{ opacity: 1 }}
                                              transition={{ delay: idx * 0.05 }}
                                              className="hover:bg-gray-50 transition-colors duration-150"
                                            >
                                              <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                  <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <span className="text-blue-800 font-medium">
                                                      {idx + 1}
                                                    </span>
                                                  </div>
                                                  <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                                      <a
                                                        className="cursor-pointer hover:text-green-400"
                                                        onClick={() => handleNoteClick(category, subCategory, note.question)}
                                                      >
                                                        {note.question}
                                                      </a>
                                                    </div>
                                                  </div>
                                                </div>
                                              </td>
                                              
                                              <td className="px-6 py-4 whitespace-nowrap">
                                                {note.pdfFile ? (
                                                  <div className="flex gap-2">
                                                    <button
                                                      onClick={() => handleViewPDF(note.pdfFile, note.question.heading || note.question)}
                                                      className="text-blue-600 hover:text-blue-800 transition-colors"
                                                      title="View PDF"
                                                    >
                                                      <Eye size={16} />
                                                    </button>
                                                    <a
                                                      href={note.pdfFile}
                                                      download
                                                      className="text-blue-600 hover:text-blue-800 transition-colors"
                                                      title="Download PDF"
                                                    >
                                                      <Download size={16} />
                                                    </a>
                                                  </div>
                                                ) : (
                                                  <span className="text-gray-400 text-sm">No PDF</span>
                                                )}
                                              </td>
                                              
                                              <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-wrap gap-1 max-w-xs">
                                                  {note.tags?.slice(0, 4).map((t) => (
                                                    <span
                                                      key={t}
                                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                    >
                                                      #{t}
                                                    </span>
                                                  ))}
                                                  {note.tags?.length > 4 && (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                      +{note.tags.length - 4}
                                                    </span>
                                                  )}
                                                </div>
                                              </td>
                                              
                                              <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                  ${note.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : ''}
                                                  ${note.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                                                  ${note.difficulty === 'Hard' ? 'bg-red-100 text-red-800' : ''}
                                                `}>
                                                  {note.difficulty || 'Not set'}
                                                </span>
                                              </td>

                                              <td className='px-9 py-4 whitespace-nowrap ml-3'>
                                                {note.source ? (
                                                  <a
                                                    href={note.source}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                                                  >
                                                    <Code size={16} />
                                                  </a>
                                                ) : (
                                                  <span className="text-gray-400 text-sm">No Code</span>
                                                )}
                                              </td>
                                              <td className='px-9 py-4 whitespace-nowrap ml-3'>
                                                {note.video ? (
                                                  <a
                                                    href={note.video}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                                                  >
                                                    <Video size={16} />
                                                  </a>
                                                ) : (
                                                  <span className="text-gray-400 text-sm">No Video</span>
                                                )}
                                              </td>
                                              
                                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex items-center justify-center space-x-2">
                                                  <button
                                                    onClick={() => navigate(`/notes/${note._id}`)}
                                                    className="text-blue-600 hover:text-blue-900 transition-colors"
                                                    title="View"
                                                  >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                  </button>
                                                  
                                                  <button
                                                    onClick={() => navigate(`/notes/edit/${note._id}`)}
                                                    className="text-blue-600 hover:text-blue-900 transition-colors"
                                                    title="Edit"
                                                  >
                                                    <Pencil size={16} />
                                                  </button>
                                                  
                                                  <button
                                                    onClick={() => handleDelete(note._id)}
                                                    className="text-red-600 hover:text-red-900 transition-colors"
                                                    title="Delete"
                                                  >
                                                    <Trash2 size={16} />
                                                  </button>
                                                </div>
                                              </td>
                                            </motion.tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Notes;