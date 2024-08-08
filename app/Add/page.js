"use client";
import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import "react-quill/dist/quill.snow.css";
import "../styles/quill.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["code-block"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const AddPageContent = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if there is data to edit
    const id = searchParams.get("id");
    if (id) {
      const storedData = JSON.parse(localStorage.getItem("formData")) || [];
      const item = storedData.find((_, index) => index === parseInt(id));
      if (item) {
        setValue("title", item.title);
        setDescription(item.description);
        setImageURL(item.imageURL);
      }
    }
  }, [searchParams, setValue]);

  const onSubmit = (data) => {
    const newEntry = {
      ...data,
      description,
      image,
      imageURL,
    };

    const id = searchParams.get("id");
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];

    if (id) {
      // Update existing entry
      storedData[parseInt(id)] = newEntry;
    } else {
      // Add new entry
      storedData.push(newEntry);
    }

    localStorage.setItem("formData", JSON.stringify(storedData));
    setMessage("Text Saved");
    reset();
    setDescription("");
    setImage(null);
    setImageURL(null);

    // Navigate to the view page
    router.push("/View");
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImageURL(reader.result); // Set base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full flex items-start justify-center pt-8">
      <div className="bg-black p-5 rounded-lg shadow-lg max-w-5xl w-full mb-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <label className="block text-xl text-white mb-4">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter title"
              className="w-full p-2 text-white placeholder-white bg-black focus:outline-none focus:ring-2 focus:ring-emerald-400"
              style={{
                height: "70px",
                borderWidth: "3px",
                borderStyle: "solid",
                borderImageSlice: 1,
                borderImageSource:
                  "linear-gradient(to right, #10B981, #EC4899, #8B5CF6)",
              }}
            />
          </div>

          <div>
            <label className="block text-xl text-white mb-4">Image</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full p-2 border border-gray-300 rounded text-white placeholder-white bg-black"
              style={{
                borderWidth: "3px",
                borderStyle: "solid",
                borderImageSlice: 1,
                borderImageSource:
                  "linear-gradient(to right, #10B981, #EC4899, #8B5CF6)",
              }}
            />
            {imageURL && (
              <div className="mt-4">
                <img
                  src={imageURL}
                  alt="Preview"
                  className="w-full rounded-lg"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xl text-white mb-4">Description</label>
            <ReactQuill
              value={description}
              onChange={setDescription}
              modules={modules}
              className="bg-black text-white"
              theme="snow"
              style={{
                borderWidth: "3px",
                borderStyle: "solid",
                borderImageSlice: 1,
                borderImageSource:
                  "linear-gradient(to right, #10B981, #EC4899, #8B5CF6)",
              }}
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {message && <p className="mt-4 text-green-500 text-xl">{message}</p>}
      </div>
    </div>
  );
};

const AddPage = () => (
  <>
    <Header />
    <Suspense fallback={<div>Loading...</div>}>
      <AddPageContent />
    </Suspense>
    <Footer />
  </>
);

export default AddPage;
