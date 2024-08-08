import React from "react";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";

function Footer() {
  const footerStyle = {
    backgroundColor: "black", 
    color: "white",
    marginTop: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  const containerStyle = {
    maxWidth: "1520px",
    margin: "0 auto",
  };

  const inputStyle = {
    padding: "8px",
    width: "420px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "white", 
    color: "white",
  };

  const buttonStyle = {
    backgroundColor: "#6B7280", 
    color: "white",
    padding: "8px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  };

  const sectionStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
  };

  const boxStyle = {
    width: "33%",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", padding: "28px 0px" }}>
          Keep up to date with us easily!
        </h2>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email address"
            style={inputStyle}
            required
          />
          <button style={buttonStyle}>Subscribe</button>
        </div>
        <div style={sectionStyle}>
          <div style={{ ...boxStyle, backgroundColor: "#A855F7" }}>
            <p style={{ margin: "0" }}>Contact</p>
            <p style={{ margin: "0" }}>About Us</p>
          </div>
          <div style={{ ...boxStyle, backgroundColor: "#EC4899" }}>
            <p style={{ margin: "0" }}>Trending</p>
            <p style={{ margin: "0" }}>FAQ</p>
          </div>
          <div style={{ ...boxStyle, backgroundColor: "#FBBF24" }}>
            <p style={{ margin: "0" }}>Follow us on social media</p>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "1px", gap: "8px" }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <BiLogoInstagramAlt />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
