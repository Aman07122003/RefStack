import React, { useState } from 'react';
import { AlignJustify, ArrowLeft, ArrowRight } from 'lucide-react';

const GitRepo = () => {
  const [sideView, setSideView] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [repoLink, setRepoLink] = useState("");

  const hide = () => {
    setSideView(!sideView);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setRepoLink("");
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/repo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: repoLink }),
      });

      if (response.ok) {
        alert("Repository link submitted!");
        closeModal();
      } else {
        alert("Failed to submit link");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting repo");
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex p-1">
      {/* Sidebar */}
      <div
        className={`h-full bg-gray-200 ${
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
            ) : (
              ""
            )}
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
          <div className="flex justify-between">
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
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50"
          onClick={closeModal} // close when clicking backdrop
        >
          <div
            className="bg-white rounded-2xl shadow-lg p-6 w-[400px]"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <h2 className="text-xl font-bold mb-4">Add Repository</h2>
            <input
              type="text"
              placeholder="Enter repo link"
              value={repoLink}
              onChange={(e) => setRepoLink(e.target.value)}
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
