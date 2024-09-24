import * as d3 from "d3";

import { FourierSignal, Layout, Margin, RealSignal } from "../commons/types";

export function buildCanvas(
  svgRef: React.RefObject<SVGElement>,
  layout: Layout,
  margin: Margin,
  id: string
) {
  const svg = d3
    .select(svgRef.current)
    .attr("viewBox", `0 0 ${layout.width} ${layout.height}`)
    .attr("id", id)
    // .attr("width", width + margin.left + margin.right)
    .attr("width", "100%")
    // .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  return svg;
}

export function clearCanvas(id: string) {
  d3.select(`#${id}`).selectAll("*").remove();
}

export function getAxesDomain(data: RealSignal | FourierSignal, type: "time" | "frequency") {
  let xMin, xMax, yMin, yMax: number;

  switch (type) {
    case "time":
      xMin = 0;
      xMax = data.length + 1;
      yMax = d3.max(data as RealSignal, (d) => Math.abs(d)) as number;
      yMin = -yMax;
      break;
    case "frequency":
      xMax = d3.max(data as FourierSignal, (d) => Math.abs(d.w)) as number;
      xMin = -xMax;
      yMin = 0;
      yMax = Math.ceil((d3.max(data as FourierSignal, (d) => d.r) as number) / 2) * 2;
      break;
  }

  return { xDomain: [xMin, xMax] as [number, number], yDomain: [yMin, yMax] as [number, number] };
}

export function makeLinearScale(
  xDomain: [number, number],
  yDomain: [number, number],
  width: number,
  height: number,
  type: "time" | "frequency"
) {
  const xScale = d3.scaleLinear().domain(xDomain).range([0, width]);
  const yScale = d3.scaleLinear().domain(yDomain).range([height, 0]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  xAxis.tickSizeOuter(0);

  switch (type) {
    case "time":
      xAxis.tickFormat((d) => "");
      break;
    case "frequency":
      xAxis.tickFormat((d) => (d === 0 ? "" : `${d}`));
      yAxis.tickFormat((d) => (d === 0 ? "" : `${d}`));
  }

  xAxis.tickSize(0);

  return { xScale, yScale, xAxis, yAxis };
}

export function appendAxes(
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  xAxisId: string,
  yAxisId: string,
  xAxis: d3.Axis<d3.NumberValue>,
  yAxis: d3.Axis<d3.NumberValue>,
  xAxisOffset: number,
  yAxisOffset: number
) {
  svg
    .append("g")
    .attr("id", xAxisId)
    .attr("transform", "translate(0," + xAxisOffset + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "center");

  svg
    .append("g")
    .attr("id", yAxisId)
    .attr("transform", "translate(" + yAxisOffset + ", 0)")
    .call(yAxis);
}

export function appendStems(
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  data: RealSignal | FourierSignal,
  xScale: d3.ScaleLinear<number, number, never>,
  yScale: d3.ScaleLinear<number, number, never>,
  type: "time" | "frequency"
) {
  switch (type) {
    case "time":
      svg
        .append("g")
        .attr("id", "stem-time-lines")
        .selectAll("time-lines")
        .data(data as RealSignal)
        .enter()
        .append("line")
        .attr("x1", (d, i) => xScale(i))
        .attr("x2", (d, i) => xScale(i))
        .attr("y1", (d, i) => yScale(d))
        .attr("y2", (d, i) => yScale(0))
        .attr("stroke", "lightblue");

      svg
        .append("g")
        .attr("id", "time-circles")
        .selectAll("time-circles")
        .data(data as RealSignal)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => xScale(i))
        .attr("cy", (d, i) => yScale(d))
        .attr("r", "2")
        .style("fill", "blue");
      break;
    case "frequency":
      svg
        .append("g")
        .attr("id", "stem-frequency-lines")
        .selectAll("frequency-line")
        .data(data as FourierSignal)
        .enter()
        .append("line")
        .attr("x1", (d, i) => xScale(d.w))
        .attr("x2", (d, i) => xScale(d.w))
        .attr("y1", (d, i) => yScale(d.r))
        .attr("y2", (d, i) => yScale(0))
        .attr("stroke", "lightblue");

      svg
        .append("g")
        .attr("id", "stem-frequency-circles")
        .selectAll("frequency-circle")
        .data(data as FourierSignal)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => xScale(d.w))
        .attr("cy", (d, i) => yScale(d.r))
        .attr("r", "2")
        .style("fill", "blue");
      break;
  }
}

export function appendLines(
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  data: RealSignal | FourierSignal,
  xScale: d3.ScaleLinear<number, number, never>,
  yScale: d3.ScaleLinear<number, number, never>,
  type: "time" | "frequency"
) {
  switch (type) {
    case "time":
      svg
        .append("path")
        .datum(data as RealSignal)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3.line(
            (d, i) => xScale(i),
            (d, i) => yScale(d)
          )
        );
      break;
    case "frequency":
      svg
        .append("path")
        .datum(data as FourierSignal)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3.line(
            (d, i) => xScale(d.w),
            (d, i) => yScale(d.r)
          )
        );
      break;
  }
}

export function appendAxesLabels(
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  chartWidth: number,
  chartHeight: number,
  xLabel?: string,
  yLabel?: string
) {
  svg
    .append("text")
    .attr("class", "x-label")
    .attr("text-anchor", "end")
    .attr("x", chartWidth)
    .attr("y", chartHeight + 30)
    .text(xLabel ?? "");
}

const layoutHeight = 300;
const layoutWidth = 960;

const margin = { top: 10, right: 10, bottom: 50, left: 40 },
  width = layoutWidth - margin.left - margin.right,
  height = layoutHeight - margin.top - margin.bottom;

export function buildRealStemChart(data: RealSignal, svgRef: any) {
  const { xDomain, yDomain } = getAxesDomain(data, "time");

  const { xScale, yScale, xAxis, yAxis } = makeLinearScale(xDomain, yDomain, width, height, "time");

  clearCanvas("time-chart");

  const svg = buildCanvas(
    svgRef,
    { width: layoutWidth, height: layoutHeight },
    margin,
    "time-chart"
  );

  appendAxes(svg, "time-x-axis", "time-y-axis", xAxis, yAxis, yScale(0), xScale(0));

  appendStems(svg, data, xScale, yScale, "time");

  appendLines(svg, data, xScale, yScale, "time");
}

export function buildMagnitudeStemChart(data: FourierSignal, svgRef: any) {
  const { xDomain, yDomain } = getAxesDomain(data, "frequency");

  const { xScale, yScale, xAxis, yAxis } = makeLinearScale(
    xDomain,
    yDomain,
    width,
    height,
    "frequency"
  );

  clearCanvas("magnitude-chart");

  const svg = buildCanvas(
    svgRef,
    { width: layoutWidth, height: layoutHeight },
    margin,
    "magnitude-chart"
  );

  appendStems(svg, data, xScale, yScale, "frequency");

  appendAxesLabels(svg, width, height, "Frequency (Hz)");

  appendLines(svg, data, xScale, yScale, "frequency");

  appendAxes(svg, "magnitude-x-axis", "magnitude-y-axis", xAxis, yAxis, yScale(0), xScale(0));
}
