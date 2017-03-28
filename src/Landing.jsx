import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';

function handleFiles(e) {
  const files = e.target.files;
  const data = new FormData();
  data.append('file', files[0]);
  console.log('files', files);
  console.log('file1', files[0]);
  console.log('file2', files[1]);
  console.log('data', data);
  axios.post('/helloworld', data)
  .then((response) => {
    console.log('response', response);
  })
  .catch((error) => {
    console.log('error', error);
  });
}

function Landing() {
  return (
    <div className="landing">
      <Link to="/about">About {d3.version}</Link>
      <h1 className="landing-name">app</h1>
      <input onChange={handleFiles} type="file" id="input" multiple />
    </div>
  );
}

export default Landing;
