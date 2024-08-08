import React from "react";
import Image from "next/image";
import Link from "next/link";

const Main = () => {
  return (
    <>
      <div
        className="bg-container"
        style={{
          height: "630px",
          margin: "20px",
          marginTop: "0px",
          position: "relative",
        }}
      >
        <Image
          src="/bg.png"
          alt="Background Image"
          layout="fill"
          objectFit="fill"
          className="bg-image"
          style={{ borderRadius: "20px" }}
        />
        <div
          className="text-black flex justify-center items-center relative z-10"
          style={{ height: "calc(100% - 5px)", width: "100%" }}
        >
          <div className="text-center mr-10">
            <h2 className="text-4xl font-bold">
              Cherish yesterday, dream tomorrow, live today.
            </h2>
            <h3 className="text-2xl mt-4">Every picture tells us a story.</h3>
            <Link href="/Add">
            <button className="mt-8 mb-4 bg-orange-400 px-5 py-3 rounded text-white text-xl font-bold">
              <h3>MAKE IT</h3>
            </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
