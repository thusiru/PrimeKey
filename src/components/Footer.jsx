import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
  LinkedinFilled,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section brand">
          <img src={logo} alt="PrimeKey Logo" className="footer-logo" />
          <p>
            Helping you find the perfect place to call home. Trusted by
            thousands of buyers across the UK.
          </p>
          <div className="social-icons">
            <FacebookFilled />
            <TwitterSquareFilled />
            <InstagramFilled />
            <LinkedinFilled />
          </div>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Properties for Sale</Link>
            </li>
            <li>
              <Link to="/">New Homes</Link>
            </li>
            <li>
              <Link to="/">Commercial</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section links">
          <h4>Support</h4>
          <ul>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
            <li>
              <Link to="/">Help Centre</Link>
            </li>
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>123 Real Estate Ave</p>
          <p>London, UK SW1A 1AA</p>
          <p>Email: hello@primekey.co.uk</p>
          <p>Phone: +44 20 7946 0000</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} PrimeKey. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
