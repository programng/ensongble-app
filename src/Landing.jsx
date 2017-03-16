import React from 'react';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';

function Landing() {
  return (
    <div className="landing">
      <Link to="/about">About {d3.version}</Link>
      <h1 className="landing-name">MOVIE TUNES</h1>
    </div>
  );
}

export default Landing;
