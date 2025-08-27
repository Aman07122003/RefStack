import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import axios from 'axios';
import RepoCards from "./RepoCards";

const GitRepo = () => {
  const [sideView, setSideView] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [repoLink, setRepoLink] = useState("");
  const [repos, setRepos] = useState([]);
  const [tag, setTag] = useState("General");

  const hide = () => setSideView(!sideView);
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setRepoLink("");
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/githubrepos", { 
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

  const fetchRepos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/githubrepos");
      // backend returns: { statusCode, data, message }
      setRepos(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (error) {
      console.error("Error fetching repos:", error);
      setRepos([]);
    }
  };

  // ✅ call fetchRepos on component mount
  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <div className="h-auto bg-gray-100 flex p-1">
      {/* Sidebar */}
      <div
        className={`h-screen bg-gray-200 ${
          sideView ? "w-[10%]" : "w-[2%]"
        } fixed rounded-2xl flex flex-col justify-between items-center`}
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
      </div>

      {/* Main Content */}
      <div className="h-full w-full flex justify-end items-center">
        <div
          className={`${
            sideView ? "w-[89%]" : "w-[97%]"
          } h-full p-3 bg-gray-200 rounded-2xl border-[3px] border-white/5`}
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
          className="fixed inset-0 flex items-center justify-center bg-black/50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-lg p-6 w-[400px]"
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
