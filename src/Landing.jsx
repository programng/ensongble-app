import React from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
// import { Link } from 'react-router-dom';
// import * as d3 from 'd3';
import AudioItem from './AudioItem';
import PredictionVis from './PredictionVis';

const genreColors = {
  'family': '#39CCCC',
  'horror': '#01FF70',
  'sci-fi': '#001f3f',
};

const serviceUrl = "http://api.ensongble.com";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      genres: [],
      nodeColors: [],
      predictDisabled: true,
      uploadDisabled: false,
    };
    this.handleFiles = this.handleFiles.bind(this);
    this.handleClickPredict = debounce(this.handleClickPredict.bind(this), 1000, {leading: true});
    this.handleClickPreloaded = debounce(this.handleClickPreloaded.bind(this), 2000, {leading: true});
  }

  handleClickPredict(e) {
    const data = new FormData();
    for (let i = 0; i < this.state.files.length; i += 1) {
      data.append('files', this.state.files[i]);
    }
    this.setState({ predictDisabled: true });
    axios.post(`${serviceUrl}/prediction`, data)
    .then((response) => {
      console.log('response', response);
      this.setState({
        genres: response.data,
        // predictDisabled: false,
        nodeColors: response.data.map((genre) => genreColors[genre]),
      });
    })
    .catch((error) => {
      console.log('error', error);
      // this.setState({ predictDisabled: false });
    });
  }

  handleClickPreloaded(movieId) {
    axios.get(`${serviceUrl}/demoMusic/${movieId}`)
    .then((response) => {
      console.log('response.data', response.data);
      // this.setState({
      //   genres: response.data,
      // });
    })
    .catch((error) => {
      console.log('error', error);
    });

  }

  handleFiles(e) {
    const files = e.target.files;
    if (files.length > 0) {
      this.setState({
        files,
        uploadDisabled: true,
        predictDisabled: false,
      });
    }
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
        <div className="side-panel">
          <input onChange={this.handleFiles} type="file" id="input" disabled={this.state.uploadDisabled} multiple />
          <button className="predict-button" onClick={this.handleClickPredict} disabled={this.state.predictDisabled}>
            PREDICT
          </button>
          <div className="audio-section">
            {Array.prototype.map.call(this.state.files,
              (file, i) => <AudioItem
                key={file.name}
                name={file.name}
                predictedGenre={this.state.genres[i]}
                src={URL.createObjectURL(file)}
                color={genreColors[this.state.genres[i]]}
              />)}
          </div>
        </div>
        <PredictionVis
          fileList={this.state.files}
          predictedGenres={this.state.genres}
          nodeColors={this.state.nodeColors}
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
