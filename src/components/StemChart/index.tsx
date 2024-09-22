import { useEffect, useRef } from "react";
import { Dataset, FourierSignal, RealSignal, StemChartProps } from "../../commons/types";
import * as d3 from "d3";

const margin = { top: 10, right: 10, bottom: 50, left: 40 },
  width = 900 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

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

  d3.select("svg").selectAll("*").remove();

  var svg = d3
    .select(svgRef.current)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg
    .append("g")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "center");

  svg.append("g").call(yAxis);

  svg
    .selectAll("myline")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", (d, i) => x(i))
    .attr("x2", (d, i) => x(i))
    .attr("y1", (d, i) => y(d))
    .attr("y2", (d, i) => y(0))
    .attr("stroke", "lightblue");

  svg
    .selectAll("mycircle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => x(i))
    .attr("cy", (d, i) => y(d as number))
    .attr("r", "4")
    .style("fill", "blue");
}

function buildMagnitudeStemChart(data: FourierSignal, svgRef: any) {
  let shiftedData = [
    ...data.slice(Math.floor(data.length / 2) + 1),
    ...data.slice(0, Math.floor(data.length / 2) + 1),
  ];

  console.log(shiftedData);

  let xMin, xMax: number;
  let yMin, yMax: number;

  let x: d3.ScaleLinear<number, number, never>;
  let y: d3.ScaleLinear<number, number, never>;

  let xAxis: d3.Axis<d3.NumberValue>;
  let yAxis: d3.Axis<d3.NumberValue>;

  xMax = d3.max(data, (d) => d.w) as number;
  yMin = 0;
  yMax = d3.max(data, (d) => d.r) as number;

  x = d3.scaleLinear().domain([0, xMax]).range([0, width]);
  y = d3.scaleLinear().domain([yMin, yMax]).range([height, 0]);

  xAxis = d3.axisBottom(x);
  yAxis = d3.axisLeft(y);

  d3.select("svg").selectAll("*").remove();

  var svg = d3
    .select(svgRef.current)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg
    .append("g")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "center");

  svg.append("g").call(yAxis);

  svg
    .selectAll("myline")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", (d, i) => x(d.w))
    .attr("x2", (d, i) => x(d.w))
    .attr("y1", (d, i) => y(d.r))
    .attr("y2", (d, i) => y(0))
    .attr("stroke", "lightblue");

  svg
    .selectAll("mycircle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => x(d.w))
    .attr("cy", (d, i) => y(d.r))
    .attr("r", "4")
    .style("fill", "blue");
}

function StemChart({ data, type }: StemChartProps) {
  const svgRef = useRef(null);

  console.log("data", data);

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
