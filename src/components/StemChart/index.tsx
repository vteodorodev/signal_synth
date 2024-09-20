import { useEffect, useRef } from "react";
import { Dataset } from "../../commons/types";
import * as d3 from "d3";

const margin = { top: 10, right: 10, bottom: 10, left: 40 },
  width = 850 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

function StemChart({ data }: { data: Dataset }) {
  const svgRef = useRef(null);

  useEffect(() => console.log("data", data), [data]);

  const buildSVG = () => {
    const xMax = data.length + 1;
    const yMax = d3.max(data, (d) => Math.abs(d as number)) as number;
    console.log(yMax);

    d3.select("svg").selectAll("*").remove();

    var svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear().domain([0, xMax]).range([0, width]);
    const xAxis = d3.axisBottom(x);

    xAxis.tickFormat((x) => "").tickSize(0);

    const y = d3.scaleLinear().domain([-yMax, yMax]).range([height, 0]);
    const yAxis = d3.axisLeft(y);

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
      .attr("y1", (d, i) => y(d as number))
      .attr("y2", (d, i) => y(0))
      .attr("stroke", "grey");

    svg
      .selectAll("mycircle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => x(i))
      .attr("cy", (d, i) => y(d as number))
      .attr("r", "4")
      .style("fill", "#69b3a2")
      .attr("stroke", "black");
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
