"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaPlus, FaUser, FaBars, FaHome, FaFolder, FaStar, FaBell, FaCog, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import Link from "next/link";

const Header = ({ menuVisible, setMenuVisible, onFormSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    folderName: "",
    description: "",
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const router = useRouter();

  const handleMenuClick = () => {
    setMenuVisible(prevVisible => !prevVisible);
  };

  const handleAddFolderClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setImagePreview(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        image: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeof onFormSubmit === "function") {
      let imageBase64 = null;
      if (formData.image) {
        imageBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(formData.image);
        });
      }

      const formDataWithImage = { ...formData, image: imageBase64 };

      onFormSubmit(formDataWithImage);

      const savedFolders = localStorage.getItem('folders');
      const folders = savedFolders ? JSON.parse(savedFolders) : [];
      localStorage.setItem('folders', JSON.stringify([...folders, formDataWithImage]));

      handleCloseModal();
      router.push("/Add");
    } else {
      console.error("onFormSubmit is not a function");
    }
  };

  return (
    <header className="sticky top-0 flex items-center justify-between p-4 h-14 bg-white text-black z-10 shadow-md">
      <div className="flex items-center">
        <button
          className="text-xl text-black focus:outline-none"
          onClick={handleMenuClick}
        >
          <FaBars />
        </button>
        <div
          className={`absolute top-14 left-0 w-64 h-[95vh] bg-white text-black p-4 ${
            menuVisible ? "block" : "hidden"
          } flex flex-col`}
        >
          <div className="flex flex-col flex-grow">
            <Link href="/">
              <div className="flex items-center gap-2 mb-4 cursor-pointer hover:bg-orange-700 p-2 rounded">
                <FaHome />
                <span>Home</span>
              </div>
            </Link>
            <Link href="/Add">
              <div className="flex items-center gap-2 mb-4 cursor-pointer hover:bg-orange-700 p-2 rounded">
                <FaFolder />
                <span>Folder</span>
              </div>
            </Link>
            <Link href="/Profile">
              <div className="flex items-center gap-2 mb-4 cursor-pointer hover:bg-orange-700 p-2 rounded">
                <FaStar />
                <span>Favourite</span>
              </div>
            </Link>
            <Link href="/Profile">
              <div className="flex items-center gap-2 mb-4 cursor-pointer hover:bg-orange-700 p-2 rounded">
                <FaBell />
                <span>Notification</span>
              </div>
            </Link>
          </div>
          <div className="w-full h-px bg-black mt-[5rem]" />
          <div className="flex flex-col mt-auto">
            <Link href="/Profile">
              <div className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-orange-700 p-2 rounded">
                <FaCog />
                <span>Settings</span>
              </div>
            </Link>
            <Link href="/Profile">
              <div className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-orange-700 p-2 rounded">
                <FaSignOutAlt />
                <span>Logout</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="flex items-center gap-[38rem] transition-transform"
        style={{
          marginLeft: menuVisible ? "16rem" : "0",
          transition: "margin-left 0.3s ease",
        }}
      >
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full font-bold bg-gray-300 text-black transition-transform"
          style={{ width: "350px" }}
        >
          <FaSearch />
          Search
        </button>
        <button
          onClick={handleAddFolderClick}
          className="flex items-center gap-2 px-4 py-2 bg-orange-700 text-white rounded-full font-bold"
        >
          Add Folder
          <FaPlus />
        </button>
      </div>
      <div className="flex items-center">
        <Link href="/Profile">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-300 text-black">
            <FaUser />
          </div>
        </Link>
        <button className="text-xl text-black focus:outline-none ml-4">
          <FaChevronDown />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-semibold mb-1">Create Folder</h2>
            <div className="w-full h-px bg-gray-300 mb-4" />
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <div className="flex space-x-4 overflow-x-auto mb-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="family"
                      checked={formData.category === "family"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span>Family</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="work"
                      checked={formData.category === "work"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span>Work</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="travel"
                      checked={formData.category === "travel"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span>Travel</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value="other"
                      checked={formData.category === "other"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span>Other</span>
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Folder Name</label>
                <input
                  type="text"
                  name="folderName"
                  placeholder="Enter folder name"
                  value={formData.folderName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded h-24"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Image preview"
                    className="mt-2 w-full h-auto border rounded"
                  />
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-black rounded-full hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-700 text-white rounded-full hover:bg-orange-800"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
