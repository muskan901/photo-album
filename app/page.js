"use client";
import React, { useState } from "react";
import Header from "@/Components/Header";

const Page = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [folders, setFolders] = useState([]);

  // Function to handle form submission from the Header component
  const handleFormSubmit = (formData) => {
    setFolders((prevFolders) => [...prevFolders, formData]);
  };

  return (
    <>
      <Header
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
        onFormSubmit={handleFormSubmit} // Pass the handler here
      />
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Folders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {folders.map((folder, index) => (
            <div key={index} className="bg-white p-4 border rounded shadow-md">
              <h3 className="text-xl font-semibold mb-2">{folder.folderName}</h3>
              <p className="text-gray-700 mb-2">{folder.category}</p>
              <p>{folder.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
