import React from "react";
import Image from "next/image";
import Link from "next/link";

const Main = () => {
  const containerStyle = {
    height: "630px",
    margin: "20px",
    marginTop: "0px",
    position: "relative",
  };

  const textContainerStyle = {
    height: "calc(100% - 5px)",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "black",
    position: "relative",
    zIndex: 10,
    textAlign: "center",
  };

  const buttonStyle = {
    marginTop: "8px",
    marginBottom: "4px",
    backgroundColor: "#F97316", // orange-400
    padding: "15px 20px",
    borderRadius: "8px",
    color: "white",
    fontSize: "1.25rem", // text-xl
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
  };

  return (
    <>
      <div style={containerStyle}>
        <Image
          src="/bg.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          style={{ borderRadius: "20px" }}
        />
        <div style={textContainerStyle}>
          <div>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
              Cherish yesterday, dream tomorrow, live today.
            </h2>
            <h3 style={{ fontSize: "1.5rem", marginTop: "16px" }}>
              Every picture tells us a story.
            </h3>
            <Link href="/Add">
              <button style={buttonStyle}>
                MAKE IT
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
