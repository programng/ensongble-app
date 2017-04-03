import React from 'react';
import * as d3 from 'd3';


class PredictionVis extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    console.log('this.d3Svg', this.d3Svg);

    const chartWidth = document.querySelector(".svg-canvas").clientWidth;
    const chartHeight = document.querySelector(".svg-canvas").clientHeight;
    const midWidth = chartWidth / 2;
    const midHeight = chartHeight / 2;

    const range = 50
    const data = {
        nodes: d3.range(0, range).map((d) => {
          return {
            label: "l"+d ,
            r:~~d3.randomUniform(2, 10)(),
            x: ~~d3.randomUniform(0, 500)(),
            y: ~~d3.randomUniform(0, 500)(),
            focusX: Math.random() > .5 ? 50 : 300,
          }
        }),
    }


    const node = this.d3Svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(data.nodes)
      .enter().append("circle")
      .attr("r", function(d){  return d.r })
      .attr("cx", function(d){  return d.x })
      .attr("cy", function(d){  return d.y })

    const ticked = function() {
      node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    }

    // const simulation = d3.forceSimulation()
    //   .force("collide", d3.forceCollide( function(d){return d.r + 2 }).strength(0.9))
    //   .force("charge", d3.forceManyBody())
    //   .force("center", d3.forceCenter(midWidth, midHeight))
    //   .force("y", d3.forceY(0))
    //   // .force("x", d3.forceX(0))
    //   .force('x', d3.forceX().x(d => d.focusX))
    //   // .velocityDecay(0.1)
    //   // .alphaMin(0.6);
    //   // .force("x", d3.forceX().x((d)=> {
    //   //   console.log('d', d);
    //   //   return d.focusX;
    //   // }))

    // simulation
    //   .nodes(data.nodes)
    //   .on("tick", ticked);
    // setTimeout(() => {simulation.on("tick", ticked);}, 1000);
    setTimeout(() => {
      const simulation = d3.forceSimulation()
        .force("collide", d3.forceCollide( function(d){return d.r + 2 }).strength(0.9))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(midWidth, midHeight))
        .force("y", d3.forceY(0))
        // .force("x", d3.forceX(0))
        .force('x', d3.forceX().x(d => d.focusX))

      simulation
        .nodes(data.nodes)
        .on("tick", ticked)
    },
      3000);
  }


  shouldComponentUpdate(nextProps, nextState) {
    console.log('nextProps', nextProps);
    console.log('nextState', nextState);

    // const rectWidth = 50;
    // const height = 300;
    // const data = [100, 250, 175, 200, 120, 60, 20];

    // // const svg = d3.select('svg');
    // const enter = this.d3Graph.selectAll('rect')
    //   .data(data)
    //   .enter().append('rect')
    //   .attr('x', (d, i) => (i) * rectWidth)
    //   .attr('y', d => height - d)
    //   .attr('width', rectWidth)
    //   .attr('height', d => d)
    // //      .attr('fill', 'blue')
    //   .attr('fill', (d) => {
    //     if (d === 250) return 'red';
    //     return 'blue';
    //   })
    //   .attr('stroke', '#fff')
    //   .attr('stroke-width', '0px 20px');
    // console.log(enter.nodes());
    // console.log(enter.data());

    return true;
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
