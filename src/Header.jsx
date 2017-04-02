import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="header-title">
        <Link to="/">
          ENSONGBLE
          <p className="header-title-sub">
            made with <span className="heart">&#9829;</span> by Jonathan Ng
          </p>
        </Link>
      </div>
      <ul className="header-nav-list">
        <Link to="/about"><li className="header-nav-list-item">About</li></Link>
        <Link to="/portfolio"><li className="header-nav-list-item">App Source Code</li></Link>
        <Link to="/portfolio"><li className="header-nav-list-item">Project Source Code</li></Link>
        <a href="http://www.programng.com" target="_blank" rel="noopener noreferrer"><li className="header-nav-list-item">programng</li></a>
      </ul>
    </div>
  );
}

export default Header;
