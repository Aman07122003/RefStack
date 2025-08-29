import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Menu, X } from 'lucide-react';
import axios from 'axios';
import RepoCards from "./RepoCards";
import axiosInstance from '../utils/axiosInstance.js';

const GitRepo = () => {
  const [sideView, setSideView] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [showModal, setShowModal] = useState(false);
  const [repoLink, setRepoLink] = useState("");
  const [repos, setRepos] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [tag, setTag] = useState("General");
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [filter, setFilter] = useState([
    "Open Source",
    "Frontend",
    "Backend",
    "Fullstack",
    "DevOps",
    "Mobile",
    "3D Website",
    "Machine Learning",
    "AI",
    "Interview",
  ]);

  const hide = () => setSideView(!sideView);
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setRepoLink("");
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/api/githubrepos", { 
        url: repoLink, 
        tag: tag 
      });
  
      if (response.status === 201) {
        alert("Repository link submitted!");
        closeModal();
        fetchRepos(); // refresh list after adding
      } else {
        alert("Failed to submit link");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting repo");
    }
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
    // Close mobile dropdown when resizing to desktop
    if (window.innerWidth >= 768) {
      setMobileDropdownOpen(false);
    }
  };

  const fetchRepos = async () => {
    try {
      const res = await axiosInstance.get("/api/githubrepos");
      setRepos(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (error) {
      console.error("Error fetching repos:", error);
      setRepos([]);
    }
  };

  const handleFilter = async (selectedTag) => {
    try {
      setActiveFilter(selectedTag);
      const res = await axiosInstance.post("/api/githubrepos/filter", {
        tag: selectedTag,
      });
  
      setRepos(Array.isArray(res.data?.data) ? res.data.data : []);
      setMobileDropdownOpen(false); // Close dropdown after selection
    } catch (error) {
      console.error("Error filtering repos:", error);
      setRepos([]);
    }
  };

  useEffect(() => {
    fetchRepos();
    handleResize();
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-auto bg-gray-100 flex p-1 md:flex-row flex-col min-h-screen">
      {/* Desktop Sidebar */}
      {width >= 768 ? (
        <div
          className={`h-screen bg-gray-200 ${
            sideView ? "w-[10%]" : "w-[2%]"
          } fixed rounded-2xl flex flex-col gap-2 items-center`}
        >
          <div
            className={`w-[90%] h-[5%] flex items-center ${
              sideView ? "justify-between" : "justify-center"
            }`}
          >
            <div className="text-green-400 font-bold">
              {sideView ? (
                <a href="/" className="text-green-500 font-bold">
                  RefStack
                </a>
              ) : null}
            </div>
            <button onClick={hide} className="font-bold text-green-400">
              {sideView ? <ArrowLeft /> : <ArrowRight />}
            </button>
          </div>

          {sideView && (
            <div className="w-[90%] h-[95%] overflow-y-auto flex flex-col gap-3">
              <div className="text-gray-500 font-semibold">Filters</div>
              {filter.map((item, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg text-sm text-center cursor-pointer
                    ${activeFilter === item
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-700 hover:bg-green-100"}`}
                  onClick={() => handleFilter(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        // Mobile Header with Dropdown
        <div className="w-full bg-gray-200 p-4 rounded-2xl mb-2 flex justify-between items-center md:hidden">
          <a href="/" className="text-green-500 font-bold text-xl">
            RefStack
          </a>
          
          <div className="dropdown relative">
            <button 
              className="btn bg-green-500 text-white p-2 rounded-lg flex items-center gap-1"
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
            >
              {mobileDropdownOpen ? <X size={18} /> : <Menu size={18} />}
              <span>Filters</span>
            </button>
            
            {mobileDropdownOpen && (
              <div className="dropdown-content absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200 max-h-60 overflow-y-auto">
                <ul className="py-1">
                  {filter.map((item, index) => (
                    <li 
                      key={index} 
                      onClick={() => handleFilter(item)} 
                      className={`px-4 py-2 text-sm cursor-pointer
                        ${activeFilter === item
                          ? "bg-green-500 text-white"
                          : "text-gray-700 hover:bg-green-100"}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="h-full w-full flex md:justify-end justify-center items-center">
        <div
          className={`${
            sideView && width >= 768 ? "md:w-[89%]" : "md:w-[97%]"
          } h-full p-3 bg-gray-200 rounded-2xl border-[3px] border-white/5 w-full`}
        >
          <div className="flex justify-between mb-4">
            <div className="text-2xl text-green-400 font-bold">
              Repository
            </div>
            <button
              className="p-2 rounded-2xl text-white bg-green-500 text-sm"
              onClick={openModal}
            >
              Add Repository
            </button>
          </div>

          <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-6">My GitHub Repos</h1>
            <RepoCards repos={repos} />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Add Repository</h2>
            <input
              type="text"
              placeholder="Enter repo link"
              value={repoLink}
              onChange={(e) => setRepoLink(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <input
              type="text"
              placeholder="Enter tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitRepo;