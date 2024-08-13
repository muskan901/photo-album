"use client";
import React, { useState, useEffect, useRef } from "react";
import Header from "@/Components/Header";
import { FaEdit, FaCopy, FaShare, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Add = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [folders, setFolders] = useState([]);
  const [moreMenuVisible, setMoreMenuVisible] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedFolders, setSelectedFolders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    folderName: "",
    image: "",
    category: "",
    description: ""
  });
  const [imageFile, setImageFile] = useState(null);

  const moreButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const savedFolders = localStorage.getItem("folders");
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !moreButtonRef.current.contains(event.target)
      ) {
        setMoreMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newFolders = [...folders, formData];
    setFolders(newFolders);
    localStorage.setItem("folders", JSON.stringify(newFolders));
    setFormData({
      folderName: "",
      image: "",
      category: "",
      description: ""
    });
    setImageFile(null);
  };

  const toggleMoreMenu = () => {
    setMoreMenuVisible((prev) => !prev);
  };

  const handleDelete = () => {
    setSelectionMode(true);
    setEditMode(false);
    setMoreMenuVisible(false);
  };

  const handleEdit = () => {
    if (selectedFolders.length > 0) {
      setEditMode(true);
      setMoreMenuVisible(false);
      setSelectionMode(false);
    } else {
      alert("Please select at least one folder to edit.");
    }
  };

  const handleCheckboxChange = (folderIndex) => {
    setSelectedFolders((prev) =>
      prev.includes(folderIndex)
        ? prev.filter((index) => index !== folderIndex)
        : [...prev, folderIndex]
    );
  };

  const handleDeleteSelected = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    const filteredFolders = folders.filter(
      (_, index) => !selectedFolders.includes(index)
    );
    setFolders(filteredFolders);
    localStorage.setItem("folders", JSON.stringify(filteredFolders));
    setSelectionMode(false);
    setSelectedFolders([]);
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  const handleEditFolder = () => {
    const updatedFolders = folders.map((folder, index) =>
      selectedFolders.includes(index)
        ? {
            ...folder,
            ...formData,
            image: imageFile ? URL.createObjectURL(imageFile) : folder.image,
          }
        : folder
    );
    setFolders(updatedFolders);
    localStorage.setItem("folders", JSON.stringify(updatedFolders));
    setEditMode(false);
    setSelectedFolders([]);
    setFormData({
      folderName: "",
      image: "",
      category: "",
      description: ""
    });
    setImageFile(null);
  };

  const handleEditClick = (index) => {
    setFormData(folders[index]);
    setImageFile(null);
    setEditMode(true);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleFolderClick = (index) => {
    router.push(`/View?index=${index}`);
  };

  return (
    <>
      <Header
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
        onFormSubmit={handleFormSubmit}
      />
      <div className="flex min-h-screen">
        <div
          className={`flex-1 transition-margin duration-300 ${
            menuVisible ? "ml-64" : "ml-0"
          } bg-gray-100`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Folders</h2>
              <button
                ref={moreButtonRef}
                className="bg-orange-700 text-white px-4 py-2 rounded-full font-bold hover:bg-orange-800 transition-colors relative"
                onClick={toggleMoreMenu}
              >
                More
              </button>
            </div>

            {moreMenuVisible && (
              <div
                ref={dropdownRef}
                className="absolute top-16 right-4 bg-white border border-gray-300 rounded-lg shadow-lg z-50"
              >
                <div className="p-4 flex flex-col space-y-2">
                  <button
                    className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
                    onClick={handleEdit}
                  >
                    <FaEdit className="text-gray-600" />
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded">
                    <FaCopy className="text-gray-600" />
                    <span>Copy</span>
                  </button>
                  <button className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded">
                    <FaShare className="text-gray-600" />
                    <span>Share</span>
                  </button>
                  <button
                    className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
                    onClick={handleDelete}
                  >
                    <FaTrash className="text-gray-600" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            )}

            {selectionMode ? (
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <button
                    onClick={handleDeleteSelected}
                    className="bg-red-600 text-white px-4 py-2 rounded-full font-bold hover:bg-red-700 transition-colors"
                  >
                    Delete Selected
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {folders.map((folder, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-300 rounded-lg shadow-md flex flex-col relative max-w-sm cursor-pointer"
                      onClick={() => handleCheckboxChange(index)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedFolders.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                        className="absolute top-2 right-2"
                      />
                      <div className="p-4 border-b border-gray-300 flex items-center">
                        <h3 className="text-xl font-bold">{folder.folderName}</h3>
                      </div>
                      <div className="relative">
                        {folder.image && (
                          <img
                            src={folder.image}
                            alt="Folder"
                            className="w-full h-auto rounded-t-lg border-b border-gray-300"
                          />
                        )}
                        {folder.image && (
                          <div className="absolute bottom-2 right-2 bg-orange-700 text-white text-center px-4 py-2 rounded-full max-w-[150px]">
                            {folder.category}
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col">
                        <p className="text-gray-700">{folder.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {folders.map((folder, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-300 rounded-lg shadow-md flex flex-col relative max-w-sm cursor-pointer"
                    onClick={() => handleFolderClick(index)}
                  >
                    <div className="p-4 border-b border-gray-300 flex items-center">
                      <h3 className="text-xl font-bold">{folder.folderName}</h3>
                    </div>
                    <div className="relative">
                      {folder.image && (
                        <img
                          src={folder.image}
                          alt="Folder"
                          className="w-full h-auto rounded-t-lg border-b border-gray-300"
                        />
                      )}
                      {folder.image && (
                        <div className="absolute bottom-2 right-2 bg-orange-700 text-white text-center px-4 py-2 rounded-full max-w-[150px]">
                          {folder.category}
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex flex-col">
                      <p className="text-gray-700">{folder.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete the selected folders?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-full font-bold hover:bg-red-700 transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full font-bold hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Add;
