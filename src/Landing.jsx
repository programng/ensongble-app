import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing">
      <Link to="/about">About</Link>
      <h1 className="landing-name">MOVIE TUNES</h1>
    </div>
  );
}

export default Landing;
