import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './styles.css';

const LineGraph = ({ data }) => {
  const svgRef = useRef();
  const width = 960;
  const height = 500;
  const margin = { top: 20, right: 30, bottom: 30, left: 40 };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg.attr('viewBox', [0, 0, width, height])
      .style('background', 'white')
      .style('margin-top', '50px')
      .style('overflow', 'visible');

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.Year, 0, 1)))
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Max_temperature)]).nice()
      .range([height - margin.bottom, margin.top]);

    const colorScale = d3.scaleSequential()
      .domain([d3.min(data, d => d.Max_temperature), d3.max(data, d => d.Max_temperature)])
      .range(["blue", "red"]);
    

    const line = d3.line()
      .defined(d => !isNaN(d.Max_temperature))
      .x(d => xScale(new Date(d.Year, 0, 1)))
      .y(d => yScale(d.Max_temperature));

    const xAxis = d3.axisBottom(xScale)
      .ticks(d3.timeYear.every(10))
      .tickFormat(d3.timeFormat('%Y'));

    const yAxis = d3.axisLeft(yScale)
      .ticks(5);

    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .append('text')
      .attr('x', width / 2)
      .attr('y', margin.bottom)
      .attr('text-anchor', 'middle')
      .text('Year');

    svg.append('g')
      .call(yAxis)
      .attr('transform', `translate(${margin.left}, 0)`)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -margin.left + 10)
      .attr('text-anchor', 'bottom')
      .text('Max Temperature');

    svg.append('path')
      .datum(data)
      .attr('fill', "none")
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    svg.selectAll("dot")
      .data(data)
    .enter().append("circle")
      .attr("r", 2)
      .attr("cx", function(d) { return xScale(new Date(d.Year, 0, 1)); })
      .attr("cy", function(d) { return yScale(d.Max_temperature); })
      .on("mouseover", function(event, d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html("Year: " + d.Year + "<br/>"  + "Max Temp: " + d.Max_temperature)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function(event, d) {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });

  }, [data]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default LineGraph;
