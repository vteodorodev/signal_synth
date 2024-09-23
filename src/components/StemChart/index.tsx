import { useEffect, useRef } from "react";
import { Dataset, FourierSignal, RealSignal, StemChartProps } from "../../commons/types";
import * as d3 from "d3";

const layoutHeight = 300;
const layoutWidth = 960;

const margin = { top: 10, right: 10, bottom: 50, left: 40 },
  width = layoutWidth - margin.left - margin.right,
  height = layoutHeight - margin.top - margin.bottom;

function buildRealStemChart(data: RealSignal, svgRef: any) {
  let xMin, xMax: number;
  let yMin, yMax: number;

  let x: d3.ScaleLinear<number, number, never>;
  let y: d3.ScaleLinear<number, number, never>;

  let xAxis: d3.Axis<d3.NumberValue>;
  let yAxis: d3.Axis<d3.NumberValue>;

  xMin = 0;
  xMax = data.length + 1;
  yMax = d3.max(data as RealSignal, (d) => Math.abs(d)) as number;

  x = d3.scaleLinear().domain([xMin, xMax]).range([0, width]);
  y = d3.scaleLinear().domain([-yMax, yMax]).range([height, 0]);

  xAxis = d3.axisBottom(x);
  yAxis = d3.axisLeft(y);

  xAxis.tickFormat((x) => "").tickSize(0);

  d3.select("#time-chart").selectAll("*").remove();

  var svg = d3
    .select(svgRef.current)
    .attr("viewBox", `0 0 ${layoutWidth} ${layoutHeight}`)
    .attr("id", "time-chart")
    .attr("width", "100%")
    //.attr("width", width + margin.left + margin.right)
    //.attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg
    .append("g")
    .attr("id", "time-x-axis")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "center");

  svg.append("g").attr("id", "time-y-axis").call(yAxis);

  svg
    .append("g")
    .attr("id", "time-lines")
    .selectAll("time-lines")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", (d, i) => x(i))
    .attr("x2", (d, i) => x(i))
    .attr("y1", (d, i) => y(d))
    .attr("y2", (d, i) => y(0))
    .attr("stroke", "lightblue");

  svg
    .append("g")
    .attr("id", "time-circles")
    .selectAll("time-circles")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => x(i))
    .attr("cy", (d, i) => y(d as number))
    .attr("r", "4")
    .style("fill", "blue");
}

function buildMagnitudeStemChart(data: FourierSignal, svgRef: any) {
  let xMin, xMax: number;
  let yMin, yMax: number;

  let xScale: d3.ScaleLinear<number, number, never>;
  let yScale: d3.ScaleLinear<number, number, never>;

  let xAxis: d3.Axis<d3.NumberValue>;
  let yAxis: d3.Axis<d3.NumberValue>;

  xMax = d3.max(data, (d) => d.w) as number;
  yMin = 0;
  yMax = d3.max(data, (d) => d.r) as number;
  // yMax = Math.ceil((d3.max(data, (d) => d.r) as number) / 5) * 5;

  xScale = d3.scaleLinear().domain([-xMax, xMax]).range([0, width]);
  yScale = d3.scaleLinear().domain([yMin, yMax]).range([height, 0]);

  xAxis = d3.axisBottom(xScale);
  yAxis = d3.axisLeft(yScale);

  d3.select("#magnitude-chart").selectAll("*").remove();

  const svg = d3
    .select(svgRef.current)
    .attr("viewBox", `0 0 ${layoutWidth} ${layoutHeight}`)
    .attr("id", "magnitude-chart")
    // .attr("width", width + margin.left + margin.right)
    .attr("width", "100%")
    // .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const xAxisSvg = svg
    .append("g")
    .attr("id", "magnitude-x-axis")
    .attr("transform", "translate(0," + yScale(0) + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "center");

  svg
    .append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + 30)
    .text("Frequency (Hz)");

  svg
    .append("g")
    .attr("id", "magnitude-y-axis")
    .attr("transform", "translate(" + xScale(0) + ", 0)")
    .call(yAxis);

  svg
    .append("g")
    .attr("id", "lines")
    .selectAll("lines")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", (d, i) => xScale(d.w))
    .attr("x2", (d, i) => xScale(d.w))
    .attr("y1", (d, i) => yScale(d.r))
    .attr("y2", (d, i) => yScale(0))
    .attr("stroke", "lightblue");

  svg
    .append("g")
    .attr("id", "circles")
    .selectAll("mycircle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => xScale(d.w))
    .attr("cy", (d, i) => yScale(d.r))
    .attr("r", "4")
    .style("fill", "blue");
}

function StemChart({ data, type }: StemChartProps) {
  const svgRef = useRef(null);

  const buildSVG = () => {
    switch (type) {
      case "time":
        buildRealStemChart(data as RealSignal, svgRef);
        break;
      case "magnitude":
      case "phase":
        buildMagnitudeStemChart(data as FourierSignal, svgRef);
        break;
    }
  };

  useEffect(buildSVG, [data]);

  // Parse the Data

  return (
    <div className="d-flex ps-2">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default StemChart;
