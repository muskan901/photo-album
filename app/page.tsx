"use client";
import React, { useState } from 'react';
import Header from "@/Components/Header";
import Main from "@/Components/Main";
import Footer from "@/Components/Footer";

function Page() {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleFormSubmit = (formData: any) => {
    console.log("Form submitted with data:", formData);
  };

  return (
    <>
      <Header menuVisible={menuVisible} setMenuVisible={setMenuVisible} onFormSubmit={handleFormSubmit} />
      <Main menuVisible={menuVisible} />
      <Footer />
    </>
  );
}

export default Page;
