import React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import * as d3 from 'd3';
import AudioItem from './AudioItem';


class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      genres: [],
    };
    this.handleFiles = this.handleFiles.bind(this);
  }

  componentDidMount() {
    console.log('this.d3svg', this.d3svg);
    // force.on('tick', () => {
    //   // after force calculation starts, call updateGraph
    //   // which uses d3 to manipulate the attributes,
    //   // and React doesn't have to go through lifecycle on each tick
    //   this.d3Graph.call(updateGraph);
    // });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('nextProps', nextProps);
    console.log('nextState', nextState);
    const rectWidth = 50;
    const height = 300;
    const data = [100, 250, 175, 200, 120, 60, 20];

    // const svg = d3.select('svg');
    const enter = this.d3svg.selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('x', (d, i) => (i) * rectWidth)
      .attr('y', d => height - d)
      .attr('width', rectWidth)
      .attr('height', d => d)
    //      .attr('fill', 'blue')
      .attr('fill', (d) => {
        if (d === 250) return 'red';
        return 'blue';
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', '0px 20px');
    console.log(enter.nodes());
    console.log(enter.data());

    return true;
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
        <svg className="svg-canvas" ref={(input) => { this.d3svg = d3.select(input); }} />
      </div>
    );
  }
}

Landing.propTypes = {

};
Landing.defaultProps = {

};

export default Landing;
