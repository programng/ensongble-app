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
        <Link to="/"><li className="header-nav-list-item">Predict Genre</li></Link>
        <Link to="/about"><li className="header-nav-list-item">About</li></Link>
        <a href="https://www.github.com/programng/movie-tunes-project" target="_blank" rel="noopener noreferrer">
          <li className="header-nav-list-item github-link">
          <img src="GitHub-Mark-32px.png" className="github-logo" alt="Github" height="20" width="20" />
            Project Source
          </li>
        </a>
        <a href="https://www.github.com/programng/movie-tunes-app" target="_blank" rel="noopener noreferrer">
          <li className="header-nav-list-item github-link">
            <img src="GitHub-Mark-32px.png" className="github-logo" alt="Github" height="20" width="20" />
            App Source
          </li>
        </a>
        <a href="http://www.programng.com" target="_blank" rel="noopener noreferrer"><li className="header-nav-list-item">programng</li></a>
      </ul>
    </div>
  );
}

export default Header;
