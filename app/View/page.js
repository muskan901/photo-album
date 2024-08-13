"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/Components/Header";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const View = () => {
  const router = useRouter();
  const [folder, setFolder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedFolder, setEditedFolder] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const index = parseInt(query.get("index"));

    const savedFolders = localStorage.getItem("folders");
    if (savedFolders) {
      const folders = JSON.parse(savedFolders);
      setFolder(folders[index]);
      setEditedFolder(folders[index]); 
    }
  }, [router]);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveChanges = () => {
    const savedFolders = localStorage.getItem("folders");
    if (savedFolders) {
      const folders = JSON.parse(savedFolders);
      const index = parseInt(new URLSearchParams(window.location.search).get('index'));
      folders[index] = editedFolder;
      localStorage.setItem("folders", JSON.stringify(folders));
      setFolder(editedFolder);
      setIsModalOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFolder({ ...editedFolder, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedFolder({ ...editedFolder, image: imageUrl });
    }
  };

  return (
    <>
      <Header />
      <div className="p-4 bg-gray-100 min-h-screen">
        {folder ? (
          <div className="p-5 bg-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold">{folder.folderName}</h2>
              <button
                onClick={handleEditClick}
                className="bg-orange-700 text-white px-4 py-2 rounded flex items-center"
              >
                <FaEdit className="mr-2" /> Edit
              </button>
            </div>

            {folder.image && (
              <div className="mb-4">
                <img
                  src={folder.image}
                  alt="Folder"
                  className="w-[1500px] h-[500px] rounded-[10px] object-cover border-2 border-gray-300"
                />
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">{new Date().toLocaleDateString()}</span>
              <FaHeart className="text-red-500 text-xl" />
            </div>

            <p className="text-gray-700">{folder.description}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto relative"> {/* Increased width */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-gray-600"
              >
                X
              </button>
              <h3 className="text-2xl font-bold mb-4">Edit Folder</h3>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Folder Name</label>
                <input
                  type="text"
                  name="folderName"
                  value={editedFolder?.folderName || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={editedFolder?.description || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="4"
                />
              </div>
              <button
                onClick={handleSaveChanges}
                className="bg-orange-700 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default View;
