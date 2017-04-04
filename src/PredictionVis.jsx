import React from 'react';
import * as d3 from 'd3';

const genres = ['family', 'horror'];

class PredictionVis extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('this.props', this.props);
    console.log('this.d3Svg', this.d3Svg);

  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('this.props', this.props);
    console.log('nextProps', nextProps);
    console.log('this.state', this.state);
    console.log('nextState', nextState);
    // const fileList = nextProps.files;
    // const predictedGenres = nextProps.predictedGenres;
    const { fileList, predictedGenres } = nextProps;

    const chartWidth = document.querySelector(".svg-canvas").clientWidth;
    const chartHeight = document.querySelector(".svg-canvas").clientHeight;
    const midWidth = chartWidth / 2;
    const midHeight = chartHeight / 2;

    console.log(fileList);
    console.log(predictedGenres);
    const fileSizeExtent = d3.extent(fileList, file => file['size']);
    console.log(fileSizeExtent);

    const radiusScale = d3.scaleLinear()
      .domain(fileSizeExtent)
      .range([20, 30]);

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    };

    const focusPoints = {};
    const numberOfGenres = genres.length;
    const focusXLocations = shuffleArray(d3.range(0, numberOfGenres).map(i => {
      return ((i + 1) / (numberOfGenres + 1)) * chartWidth;
    }));
    const focusYLocations = shuffleArray(d3.range(0, numberOfGenres).map(i => {
      return ((i + 1) / (numberOfGenres + 1)) * chartHeight;
    }));
    for (let i = 0; i < numberOfGenres; i++) {
      focusPoints[genres[i]] = {
        focusX: focusXLocations.pop(),
        focusY: focusYLocations.pop(),
      };
    }
    console.log('focusPoints', focusPoints);

    if (this.props.fileList !== nextProps.fileList) {
      console.log('CREATING NEW NODES');
      this.nodesData = Array.prototype.map.call(fileList, (file, i) => {
        return {
          label: "l"+i ,
          r: radiusScale(file['size']),
          x: ~~d3.randomUniform(0, chartWidth)(),
          y: ~~d3.randomUniform(0, chartHeight)(),
          focusX: predictedGenres.length > 0 ? focusPoints[predictedGenres[i]]['focusX'] : 0,
          focusY: predictedGenres.length > 0 ? focusPoints[predictedGenres[i]]['focusY'] : 0,
        };
      });
      this.node = this.d3Svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(this.nodesData, d => d['label'])
        .enter().append("circle")
    };


    console.log('this.nodesData', this.nodesData);

    // focusX: focusPoints[predictedGenres[i]]['focusX'],
    // focusY: focusPoints[predictedGenres[i]]['focusY'],

    // this.node = this.d3Svg.append("g")
    //   .attr("class", "nodes")
    //   .selectAll("circle")
    //   .data(this.nodesData, d => d['label'])
    //   .enter().append("circle")

    this.node.attr("r", function(d){  return d.r })
      .attr("cx", function(d){  return d.x })
      .attr("cy", function(d){  return d.y })
    console.log('THIS.NODE', this.node);

    const ticked = () => {
      console.log(this.node);
      this.node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    }

    const startSimulation = () => {
      const simulation = d3.forceSimulation()
        .force("collide", d3.forceCollide( d => d.r + 5 ).iterations(1))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(midWidth, midHeight))
        // .force("y", d3.forceY(0))
        .force('y', d3.forceY().y(d => d.focusY))
        // .force("x", d3.forceX(0))
        .force('x', d3.forceX().x(d => d.focusX))

      simulation
        .nodes(this.nodesData)
        .on("tick", ticked)
    }

    if (this.props.predictedGenres !== nextProps.predictedGenres && nextProps.predictedGenres.length > 0) {
      for (let i = 0; i < this.nodesData.length; i++) {
        this.nodesData[i]['focusX'] = focusPoints[predictedGenres[i]]['focusX'] ;
        this.nodesData[i]['focusY'] = focusPoints[predictedGenres[i]]['focusY'] ;
      };
      startSimulation();
    };

    // setTimeout(startSimulation, 1000);

    return false;
  }

  render() {
    return (
      <svg className="svg-canvas" ref={(input) => { this.d3Svg = d3.select(input); }} />
    );
  }
}

PredictionVis.propTypes = {

};
PredictionVis.defaultProps = {

};

export default PredictionVis;
