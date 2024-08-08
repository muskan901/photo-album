import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="bg-zinc-800 text-white mt-2 shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl py-8 ">
            Keep up to date with us easily!
          </h2>
          <div className="email-input text-center mb-14">
            <input
              type="email"
              id="email"
              name="email"
              className="p-2 w-[420px]"
              placeholder="Your email address"
              required
            />
            <button className="bg-gray-500 text-white p-2">Subscribe</button>
          </div>

          <div className="container flex justify-between mt-8">
            <div className="footer-container w-1/3 h-[100px] bg-purple-500">
              <p className="text-white text-center mt-7">Contact</p>
              <p className="text-white text-center">About Us</p>
            </div>
            <div className="footer-container w-1/3 bg-fuchsia-400">
              <p className="text-white text-center mt-7">Trending</p>
              <p className="text-white text-center">FAQ</p>
            </div>
            <div className="footer-container w-1/3 bg-orange-300">
              <p className="text-white text-center mt-7">
                Follow us on social media
              </p>
              <div className="social-icons flex justify-center mt-1 space-x-4">
                <a href="https://facebook.com" target="_blank">
                <FaFacebookF />
                </a>
                <a href="https://instagram.com" target="_blank">
                <BiLogoInstagramAlt />
                </a>
                <a href="https://linkedin.com" target="_blank">
                <FaLinkedinIn />
                </a>
                <a href="https://youtube.com" target="_blank">
                <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
