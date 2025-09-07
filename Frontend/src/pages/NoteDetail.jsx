import { useParams } from 'react-router-dom';
import React from 'react';
import { useEffect, useState } from 'react';
import { dsaNotes } from '../api/Notes.api';
import { Code, Files, ArrowLeft, ArrowRight, Youtube, BookOpen, ExternalLink, Layers } from 'lucide-react';
import jsPDF from "jspdf";
import "jspdf-autotable";

const NoteDetail = () => {
    const { category, subCategory, question } = useParams();
    const [contentData, setcontentData] = useState({
        sections: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [leftView, setLeftView] = useState('content'); // 'content' or 'code'
    const [rightView, setRightView] = useState('youtube'); // 'youtube' or 'code'
    const [currentSection, setCurrentSection] = useState(0);
    const [video, setVideo] = useState(null);
    const [code, setCode] = useState(null);
    const [additionalResources, setAdditionalResources] = useState({});

    useEffect(() => {
        if (!category || !subCategory || !question) return;
    
        const fetchNote = async () => {
            try {
                const requestData = {
                    Section: category,
                    Subsection: subCategory,
                    Topic: question,
                };
                const result = await dsaNotes(requestData);
    
                // Set content and code
                setcontentData({
                    sections: result.data.content || []
                });
                setCode(result.data.code || null);
                const resources = result.data.AdditionalResources?.[0] || {};
                setAdditionalResources(resources);

                // Format video URL and set state
                if (result.data.video) {
                    let videoId = "";
                    const link = result.data.video;
    
                    if (link.includes("youtu.be")) {
                        const url = new URL(link);
                        videoId = url.pathname.slice(1);
                    } else if (link.includes("youtube.com")) {
                        const url = new URL(link);
                        videoId = url.searchParams.get("v");
                    }
    
                    if (videoId) {
                        setVideo(`https://www.youtube.com/embed/${videoId}`);
                    } else {
                        console.error("Invalid YouTube URL");
                        setVideo(null);
                    }
                } else {
                    setVideo(null);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchNote();
    }, [category, subCategory, question]);
    

    const generatePDF = (contentData) => {
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height;
        const marginTop = 20;
        const marginBottom = 20;
        const usableHeight = pageHeight - marginBottom;
      
        let yPos = marginTop;
      
        const addNewPage = () => {
          doc.addPage();
          yPos = marginTop;
        };
      
        contentData.sections.forEach((section, sectionIndex) => {
          // Section heading
          doc.setFontSize(18);
          doc.text(section.heading, 10, yPos);
          yPos += 12;
      
          section.content.forEach((item) => {
            // --- Subheading ---
            if (item.subheading) {
              const needed = 8;
              if (yPos + needed > usableHeight) addNewPage();
              doc.setFontSize(14);
              doc.text(item.subheading, 12, yPos);
              yPos += needed;
            }
      
            // --- Paragraph ---
            if (item.para) {
              doc.setFontSize(11);
              const splitText = doc.splitTextToSize(item.para, 180);
              const needed = splitText.length * 6 + 4;
              if (yPos + needed > usableHeight) addNewPage();
              doc.text(splitText, 12, yPos);
              yPos += needed;
            }
      
            // --- Image ---
            if (item.image) {
              const imgHeight = 50;
              if (yPos + imgHeight > usableHeight) addNewPage();
              doc.addImage(item.image, "PNG", 12, yPos, 80, imgHeight);
              yPos += imgHeight + 5;
            }
          });
      
          // After each section, ensure proper spacing / page break
          if (sectionIndex !== contentData.sections.length - 1) {
            addNewPage();
          }
        });
      
        // Save PDF
        doc.save("graphs_tutorial.pdf");
      };

      console.log(contentData);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading note: {error.message || JSON.stringify(error)}</div>;

    return (
        <div className="flex w-screen h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {/* Left Panel */}
          <div className="flex flex-col w-1/2 bg-white border-r border-gray-200 shadow-lg rounded-r-xl m-2 ml-0">
            {/* Panel header with toggle buttons */}
            <div className="flex ml-1">
            <button
                onClick={() => generatePDF(contentData)}
                className="px-4 py-2 hover:text-green-400 hover:border hover:border-green-400 text-black boder border-black rounded-lg shadow"
                >
                Download PDF
                </button>
    
              <button 
                className={`px-4 py-1 mr-2 ml-2 rounded-lg font-medium transition-all duration-200 flex items-center ${
                  leftView === 'content' 
                    ? 'bg-green-400 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm'
                }`}
                onClick={() => setLeftView('content')}
              >
                <Files  className='text-green-600'/>
                <div className='ml-1 text-sm'>Content</div>
              </button>
              <button 
                className={`px-3 py-1 rounded-lg font-medium transition-all duration-200 flex items-center ${
                  leftView === 'code' 
                    ? 'bg-green-400 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 shadow-sm'
                }`}
                onClick={() => setLeftView('code')}
              >
                
                <Code className='text-green-600'/>
                <div className='ml-1 text-sm'>Code</div>
              </button>
            </div>
            
            {/* Panel content */}
            <div className="flex-1 p-3 overflow-auto bg-white">
              {leftView === 'content' ? (
                <div className="h-full flex flex-col">
                  <div className="mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium bg-green-100 text-green-800">
                      Section {currentSection + 1} of {contentData.sections.length || 0}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {contentData.sections[currentSection].heading}
                    </h2>
    
                    {contentData.sections[currentSection].content.map((item, idx) => (
                        
                    <div key={idx} className="mb-6">
                        {item.subheading && (
                        <h3 className="text-xl font-bold text-gray-700 mb-2">
                            {item.subheading}
                        </h3>
                        )}
                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                        {item.para}
                        </p>
                        {item.image && (
                            <img 
                                src={`http://localhost:3000${item.image}`} 
                                alt="Content visual" 
                                className="rounded-xl shadow-md mt-4 border border-gray-200"
                            />
                        )}
                    </div>
                    ))}
    
                    {/* optional image field, only if you add it later */}
                    {contentData.sections[currentSection].image && (
                    <img
                        src={contentData.sections[currentSection].image}
                        alt="Content visual"
                        className="w-full rounded-xl shadow-md mb-6 border border-gray-200"
                    />
                    )}
    
                  <div className="mt-auto flex justify-between items-center p-2 border-t border-gray-200">
                    <button 
                      className={`px-3 py-1 rounded-lg font-medium flex items-center transition-all ${
                        currentSection === 0
                          ? 'bg-green-100 text-green-600 cursor-not-allowed'
                          : 'bg-green-100 text-green-600 hover:bg-green-100 shadow-md hover:shadow-lg'
                      }`}
                      disabled={currentSection === 0}
                      onClick={() => setCurrentSection(prev => prev - 1)}
                    >
                      <ArrowLeft className='text-green-400'/>
                      <div className='text-sm ml-1'>Previous</div>
                    </button>
                    
                    <div className="flex space-x-2">
                      {contentData.sections.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentSection ? 'bg-green-500' : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          onClick={() => setCurrentSection(index)}
                        />
                      ))}
                    </div>
                    
                    <button 
                      className={`px-3 py-1 rounded-lg font-medium flex items-center transition-all ${
                        currentSection === contentData.sections.length - 1
                          ? 'bg-green-100 text-green-600 cursor-not-allowed'
                          : 'bg-green-100 text-green-600 hover:bg-green-100 shadow-md hover:shadow-lg'
                      }`}
                      disabled={currentSection === contentData.sections.length - 1}
                      onClick={() => setCurrentSection(prev => prev + 1)}
                    >
                      <div className='text-sm ml-1'></div>
                      <div className='text-sm'>Next</div>
                      <ArrowRight className='text-green-400 ml-1'/>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative h-full">
                  <div className="absolute top-3 right-3 z-10 flex space-x-2">
                    <button className="px-3 py-1 bg-green-200 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-300">
                      Copy
                    </button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-300">
                      Format
                    </button>
                  </div>
                  <textarea 
                    className="w-full h-full p-4 border border-gray-300 rounded-xl resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    defaultValue={code}
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Right Panel */}
          <div className="flex flex-col w-1/2 bg-white shadow-lg rounded-l-xl m-1 mr-0">
            {/* Panel header with toggle buttons */}
            <div className="flex p-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 rounded-tl-xl">
              <button 
                className={`px-4 mr-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center ${
                  rightView === 'youtube' 
                    ? 'bg-[rgb(248,38,51)] text-white shadow-md' 
                    : 'bg-white text-[rgb(248,38,51)] hover:bg-gray-100 border border-gray-200 shadow-sm'
                }`}
                onClick={() => setRightView('youtube')}
              >
                <Youtube />
                <div className='ml-1'>Youtube</div>
              </button>
              <button 
                className={`px-4 py-1 rounded-lg font-medium transition-all duration-200 flex items-center ${
                  rightView === 'code' 
                    ? 'bg-green-400 text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-green-100 border border-gray-200 shadow-sm'
                }`}
                onClick={() => setRightView('code')}
              >
                <Code className='text-green-600'/>
                <div className='ml-1 text-sm'>Code</div>
              </button>
            </div>
            
            {/* Panel content */}
            <div className="flex-1 overflow-hidden">
            {rightView === 'youtube' ? (
      <div className="w-full h-full flex flex-col">
        {/* Video Player */}
        <div className="flex-1 flex items-center justify-center bg-black p-4">
          <iframe
            width="100%"
            height="100%"
            src={video}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="max-w-full max-h-full rounded-lg shadow-lg"
          ></iframe>
        </div>
        
        {/* Resources Section */}
        <div className="bg-white border-t border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            Additional Resources
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a
              href={additionalResources.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 group-hover:text-blue-700">LeetCode Problems</h4>
                <p className="text-xs text-gray-500">Practice graph problems</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            
            <a
              href={additionalResources.gfg}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors group"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 group-hover:text-green-700">GeeksforGeeks</h4>
                <p className="text-xs text-gray-500">Graph tutorials & examples</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            
            <a
              href={additionalResources.visualgo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors group"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 group-hover:text-purple-700">VisuAlgo</h4>
                <p className="text-xs text-gray-500">Visualize graph algorithms</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            
            <a
              href={additionalResources.youtubePlaylist}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors group"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 group-hover:text-red-700">YouTube Playlist</h4>
                <p className="text-xs text-gray-500">Complete graph series</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    ): (
                <div className="relative h-full">
                  <div className="absolute top-3 right-3 z-10 flex space-x-2 mr-2">
                    <button className="px-3 py-1 bg-gray-700 text-gray-200 rounded-md text-xs font-medium hover:bg-gray-600">
                      Copy
                    </button>
                    <button className="px-3 py-1 bg-gray-700 text-gray-200 rounded-md text-xs font-medium hover:bg-gray-600">
                      Format
                    </button>
                  </div>
                  <textarea 
                    className="w-full h-full p-4 bg-gray-900 text-gray-100 rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={code}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      );
};

export default NoteDetail;
