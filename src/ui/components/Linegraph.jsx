import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

const Linegraph = ({
  newValue,
  newTime,
  reset,
  title = 'Line Graph',
  width = 800,
  height = 400,
  margin = { top: 50, right: 30, bottom: 50, left: 60 },
  maxPoints = 1000
}) => {
  const svgRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (reset) {
      setData([]);
    } else if (typeof newValue === 'number' && typeof newTime === 'number') {
      setData(prevData => {
        const updatedData = [...prevData, { x: newTime, y: newValue }];
        if (updatedData.length > maxPoints) {
          return updatedData.slice(updatedData.length - maxPoints);
        }
        return updatedData;
      });
    }
  }, [newValue, newTime, reset, maxPoints]);

  useEffect(() => {
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background-color', '#fdfaf0');

    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    if (data.length === 0) {
      g.append('text')
        .attr('x', innerWidth / 2)
        .attr('y', innerHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('font-size', '16px')
        .attr('fill', '#666')
        .text('No data available');
      return;
    }

    const xValues = data.map(d => d.x);
    const yValues = data.map(d => d.y);

    const xMin = d3.min(xValues);
    const xMax = d3.max(xValues);

    const xDomain = xMin === xMax
      ? [xMin - 1, xMax + 1]
      : [xMin, xMax];

    const yMin = d3.min(yValues);
    const yMax = d3.max(yValues);

    const yDomain = [
      yMin !== undefined ? Math.min(0, yMin) : 0,
      yMax !== undefined ? Math.max(0, yMax) : 10
    ];

    const xScale = d3.scaleLinear()
      .domain(xDomain)
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain(yDomain)
      .nice(5)
      .range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale)
      .ticks(Math.min(maxPoints, 10))
      .tickFormat('')
      .tickSize(-innerHeight)
      .tickPadding(10);

    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
      .tickSize(-innerWidth)
      .tickPadding(10);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis)
      .call(g => g.selectAll('.domain').remove())
      .call(g => g.selectAll('.tick line').attr('stroke', '#e0e0e0'));

    g.append('g')
      .call(yAxis)
      .call(g => g.selectAll('.domain').remove())
      .call(g => g.selectAll('.tick line').attr('stroke', '#e0e0e0'))
      .call(g => g.selectAll('.tick text').attr('dx', '-0.5em'));

    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveCatmullRom);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#ff7f0e')
      .attr('stroke-width', 2)
      .attr('d', line);

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '20px')
      .attr('fill', '#333')
      .text(title);

  }, [data, width, height, margin, maxPoints, title]);

  return (
    <svg ref={svgRef}></svg>
  );
};

Linegraph.propTypes = {
  newValue: PropTypes.number,
  newTime: PropTypes.number,
  reset: PropTypes.bool,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number
  }),
  maxPoints: PropTypes.number
};

export default Linegraph;
