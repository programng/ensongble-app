import React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import * as d3 from 'd3';
import AudioItem from './AudioItem';
import PredictionVis from './PredictionVis';


class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      genres: [],
    };
    this.handleFiles = this.handleFiles.bind(this);
  }

  handleFiles(e) {
    this.setState({
      files: e.target.files,
    });
    const files = e.target.files;
    console.log('files:', files);
    const data = new FormData();
    for (let i = 0; i < files.length; i += 1) {
      data.append('files', files[i]);
    }
    axios.post('/prediction', data)
    .then((response) => {
      console.log('response', response);
      this.setState({
        genres: response.data,
      });
    })
    .catch((error) => {
      console.log('error', error);
    });
  }

  render() {
    return (
      <div className="landing">
        {/* <Link to="/about">About {d3.version}</Link> */}
        {/* <div className="landing-heading">
          <h1 className="landing-name">ENSONGBLE</h1>
          <h2 className="landing-sub-name">
            made with <span className="heart">&#9829;</span> by Jonathan Ng
          </h2>
        </div> */}
        <div className="audio-section">
          <input onChange={this.handleFiles} type="file" id="input" multiple />
          {Array.prototype.map.call(this.state.files,
            (file, i) => <AudioItem
              key={file.name}
              name={file.name}
              predictedGenre={this.state.genres[i]}
              src={URL.createObjectURL(file)}
            />)}
        </div>
        <PredictionVis
          fileList={this.state.files}
          predictedGenres={this.state.genres}
        />
      </div>
    );
  }
}

Landing.propTypes = {

};
Landing.defaultProps = {

};

export default Landing;
