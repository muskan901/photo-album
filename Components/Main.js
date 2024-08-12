import React from "react";
import { FaHeart, FaClock, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Card = ({ imageUrl, name, date, showHeart = true }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col" style={{ width: "270px", height: "360px" }}>
      <img src={imageUrl} alt={name} className="w-full h-44 object-cover rounded-t-lg" />
      <div className="flex flex-col p-4">
        <div className="flex flex-col mb-4">
          <div className="flex items-center mb-1">
            <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
            {showHeart && <FaHeart className="text-red-500 ml-2" />}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaClock className="mr-2 text-gray-500" />
            <span>{date}</span>
          </div>
        </div>
        <button className="px-3 py-2 mt-5 bg-rose-400 text-white rounded-full hover:bg-red-500 w-32">
          See Folder
        </button>
      </div>
    </div>
  );
};

const Main = ({ menuVisible }) => {
  return (
    <div className="p-5 bg-gray-100 min-h-screen" style={{ marginLeft: menuVisible ? '16rem' : '0', transition: 'margin-left 0.3s ease' }}>
      <div className="text-2xl font-bold mb-4 pl-4">Recent Folder</div>
      <div className="relative flex items-center pl-4">
        <div className="flex space-x-8 overflow-x-auto">
          <Card
            imageUrl="https://via.placeholder.com/300"
            name="Sample Folder"
            date="2024-08-11"
          />
          <Card
            imageUrl="https://via.placeholder.com/300"
            name="Sample Folder"
            date="2024-08-11"
          />
        </div>
      </div>
      <div className="text-2xl font-bold mb-8 mt-8 pl-4">People</div>
      <div className="relative flex items-center pl-4">
        <div className="flex space-x-6 overflow-x-auto">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              <img
                src="https://via.placeholder.com/100"
                alt="Person"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        {menuVisible && (
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full hover:bg-gray-400">
            <FaChevronRight />
          </button>
        )}
      </div>
      <div className="text-2xl font-bold mb-8 mt-8 pl-4">Favourite</div>
      <div className="relative flex items-center pl-4">
        <div className="flex space-x-5 overflow-x-auto">
          {[...Array(5)].map((_, i) => (
            <Card
              key={i}
              imageUrl="https://via.placeholder.com/300"
              name="Favourite Item"
              date="2024-08-11"
              showHeart={false}
            />
          ))}
        </div>
        {menuVisible && (
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full hover:bg-gray-400">
            <FaChevronRight />
          </button>
        )}
      </div>
      <div className="text-2xl font-bold mb-8 mt-8 pl-4">Other</div>
      <div className="relative flex items-center pl-4">
        <div className="flex space-x-5 overflow-x-auto">
          {[...Array(5)].map((_, i) => (
            <Card
              key={i}
              imageUrl="https://via.placeholder.com/300"
              name="Other Item"
              date="2024-08-11"
            />
          ))}
        </div>
        {menuVisible && (
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full hover:bg-gray-400">
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Main;
