"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

const ViewPage = () => {
  const [formDataList, setFormDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    if (Array.isArray(storedData)) {
      setFormDataList(storedData);
      setFilteredData(storedData);
    }
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(formDataList);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const newFilteredData = formDataList.filter((item) =>
        item.title.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredData(newFilteredData);
    }
  }, [searchQuery, formDataList]);

  const handleCardClick = (index) => {
    setSelectedCard({ ...filteredData[index], index });
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const handleDelete = (index) => {
    const updatedFormDataList = formDataList.filter((_, i) => i !== index);
    setFormDataList(updatedFormDataList);
    setFilteredData(updatedFormDataList);
    localStorage.setItem("formData", JSON.stringify(updatedFormDataList));
    setSelectedCard(null);
  };

  const handleEdit = () => {
    if (selectedCard) {
      router.push(`/Add?id=${selectedCard.index}`);
    }
  };

  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const newFilteredData = formDataList.filter((item) =>
      item.title.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(newFilteredData);
  };

  return (
    <>
      <Header />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded ${
                viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded ${
                viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              List View
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title"
              className="p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Search
            </button>
          </div>
        </div>
        <div
          className={`h-full flex ${
            viewMode === "grid" ? "flex-wrap" : "flex-col"
          } items-start justify-center pt-4`}
        >
          {filteredData.length > 0 ? (
            filteredData.map((formData, index) => (
              <div
                key={index}
                className={`p-5 m-4 rounded-lg shadow-lg ${
                  viewMode === "grid" ? "max-w-xs w-full" : "max-w-full w-full mb-4"
                } cursor-pointer`}
                style={{
                  height: viewMode === "grid" ? "430px" : "520px",
                  width: viewMode === "grid" ? "auto" : "98%",
                  background: "linear-gradient(90deg, #FEAC5E, #C779D0, #4BC0C8)",
                }}
                onClick={() => handleCardClick(index)}
              >
                <h2 className={`text-3xl text-white ${viewMode === "list" ? "text-xl" : ""}`}>
                  {formData.title}
                </h2>
                {formData.imageURL && (
                  <div className="mt-4">
                    <img
                      src={formData.imageURL}
                      alt="Uploaded"
                      className="w-full rounded-lg"
                      style={{
                        height: viewMode === "grid" ? "250px" : "350px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
                <div
                  className="text-white p-4 rounded overflow-hidden"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: viewMode === "grid" ? 3 : 4,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: viewMode === "grid" ? "70px" : "80px",
                  }}
                  dangerouslySetInnerHTML={{ __html: formData.description }}
                />
              </div>
            ))
          ) : (
            <p className="text-white">No data available</p>
          )}
        </div>
        {selectedCard && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-0 right-0 mt-4 mr-4 text-black"
              >
                Close
              </button>
              <div>
                <h2 className="text-3xl">{selectedCard.title}</h2>
                {selectedCard.imageURL && (
                  <div className="mt-4">
                    <img
                      src={selectedCard.imageURL}
                      alt="Uploaded"
                      className="w-full rounded-lg"
                      style={{ height: "450px", objectFit: "cover" }}
                    />
                  </div>
                )}
                <div
                  className="bg-black text-white p-4 rounded"
                  dangerouslySetInnerHTML={{ __html: selectedCard.description }}
                />
                <button
                  onClick={handleEdit}
                  className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(selectedCard.index)}
                  className="mt-4 ml-2 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer /> 
    </>
  );
};

export default ViewPage;
