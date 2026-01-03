import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <img src={logo} />
      </Link>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Buy</Link>
          </li>
          <li>
            <Link to="/">Rent</Link>
          </li>
          <li>
            <Link to="/">House Prices</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
