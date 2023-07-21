    import React, { useEffect, useRef, useState } from 'react';
    import * as d3 from 'd3';
    import './styles.css';
    import RadioButtonGroup from '../components/RadioButtons';
    import { circle } from 'leaflet';

    // convert max temperature to deviation.

    const LineGraph = ({ data }) => {
      const svgRef = useRef();
      const width = 800;
      const height = 470;
      const margin = { top: 20, right: 40, bottom: 30, left: 40 };
      const [selectedButton, setSelectedButton] = useState('both');

      useEffect(() => {
        const svg = d3.select(svgRef.current);
        const hoverLine = svg.append('line')
        .style('stroke', 'black')
        .style('stroke-width', 1)
        .style('stroke-dasharray', '3,3') // this makes the line dotted
        .style('opacity', 0); // set to 0 by default

        svg.selectAll("*").remove();

        svg.attr('viewBox', [0, 0, width, height])
          .style('background', '#F0F0F0')
          .style('margin-top', '50px')
          .style('overflow', 'visible');

        const xScale = d3.scaleTime()
          .domain(d3.extent(data, d => new Date(d.Year, 0, 1)))
          .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
          .domain([d3.min(data, d => d.deviation) -5, d3.max(data, d => d.deviation) + 5]).nice()
          .range([height - margin.bottom, margin.top]);

        const yScaleRight = d3.scaleLinear()
        .domain([d3.max(data, d=>d.Normal) + d3.min(data, d=>d.deviation) -5, d3.max(data, d=>d.Normal) + d3.max(data, d=>d.deviation) + 5  ])
        .range([height - margin.bottom, margin.top]);

        const colorScale = d3.scaleSequential()
          .domain([d3.min(data, d => d.deviation), d3.max(data, d => d.deviation)])
          .range(["blue", "red"]);
        

        const line = d3.line()
          .defined(d => !isNaN(d.deviation))
          .x(d => xScale(new Date(d.Year, 0, 1)))
          .y(d => yScale(d.deviation));

        const xAxis = d3.axisBottom(xScale)
          .ticks(d3.timeYear.every(10))
          .tickFormat(d3.timeFormat('%Y'));

        const yAxis = d3.axisLeft(yScale)
          .ticks(5);
        
        const yAxisRight = d3.axisRight(yScaleRight)
          .ticks(5);

        svg.append('g')
          .call(xAxis)
          .attr('transform', `translate(0, ${height - margin.bottom})`)
          .append('text')
          .attr('x', width / 2)
          .attr('y', margin.bottom + 5)
          .attr('text-anchor', 'middle')
          .text('Year');

        svg.append('g')
          .call(yAxis)
          .attr('transform', `translate(${margin.left}, 0)`)
          .append('text')
          // .attr('transform', 'rotate(-90)')
          .attr('y', -margin.left + 53)
          .attr('x', 24)
          .attr('text-anchor', 'bottom')
          .text('Anomaly');

          svg.append('line')
          .attr('stroke', 'black')
          .attr('stroke-width', 1)
          .attr('stroke-dasharray', '3,3');
        

        svg.append('g')
          .call(yAxisRight)
          .attr('transform', `translate(${width - margin.right}, 0)`)
          .append('text')
          // .attr('transform', 'rotate(-90)')
          .attr('y', -margin.right + 53)
          .attr('x', -50)
          .attr('text-anchor', 'left')
          .text('Temperature'); 
        

        svg.append('path')
          .datum(data)
          .attr('fill', "none")
          .attr('stroke', '#F00')
          .attr('stroke-width', 1.5)  
          .attr('d', line);

        const tooltip = d3.select("body").append("div")
          .attr("class", "tooltip")
          // .style("opacity", 0);
    
    
        svg
          .append('text')
          .attr('x', width - margin.right + 10)
          .attr('y', yScaleRight(d3.max(data, (d) => d.Normal)))
          .attr('text-anchor', 'start')
          .text(d3.max(data, (d) => d.Normal));

        svg.selectAll("dot")
          .data(data)
          .enter()
          .append("circle")
          .attr("r", 2)
          .on("mouseover", function(event, dataPoint) {
            tooltip.transition()
              .duration(200)
              .style("opacity", .9);
            
              const bisect = d3.bisector((d) => new Date(d.Year, 0, 1)).left;
              const mouseX = d3.pointer(event)[0];
              const x0 = xScale.invert(mouseX);
              const index = bisect(data, x0, 1);
              const d0 = data[index - 1];
              const d1 = data[index];
              const d = x0 - new Date(d0.Year, 0, 1) > new Date(d1.Year, 0, 1) - x0 ? d1 : d0;
            tooltip.html("Year: " + d.Year + "<br/>"  + "anamoly: " + d.deviation)
              .style("left", (event.pageX) + "px")
              .style("top", (event.pageY - 28) + "px");
              hoverLine
              .style('opacity', 1); // make the line visible
          })
          .on("mouseout", function() {
            tooltip.transition()
              .duration(500)
              .style("opacity", 0);
              hoverLine.style("opacity", 0);
          });

      }, [data]);

    const handleRadioButtonChange = (event) => {
      setSelectedButton(event.target.value);
    };

      return (
      <div className="line-graph-container">
        <RadioButtonGroup selectedButton={selectedButton} onRadioButtonChange={handleRadioButtonChange} />
      <svg ref={svgRef} width={width} height={height}>
     </svg>
      </div>
      );
    };  

    export default LineGraph;
